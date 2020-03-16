package com.vivvo.onboarding.service;

import com.twilio.Twilio;
import com.twilio.exception.AuthenticationException;
import com.twilio.exception.TwilioException;
import com.twilio.rest.api.v2010.account.Message;
import com.vivvo.onboarding.assembler.PhoneAssembler;
import com.vivvo.onboarding.configuration.ApplicationProperties;
import com.vivvo.onboarding.dto.PhoneDto;
import com.vivvo.onboarding.entity.Phone;
import com.vivvo.onboarding.exception.PhoneNotFoundException;
import com.vivvo.onboarding.exception.PhoneVerificationException;
import com.vivvo.onboarding.exception.ValidationException;
import com.vivvo.onboarding.repository.PhoneRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.transaction.Transactional;
import java.security.SecureRandom;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional
@Slf4j
public class PhoneService {

    @Autowired
    private PhoneRepository phoneRepository;
    @Autowired
    private PhoneAssembler phoneAssembler;
    @Autowired
    private PhoneValidator phoneValidator;
    @Autowired
    private ApplicationProperties applicationProperties;

    static final String WRONG_VERIFICATION_CODE = "WRONG_VERIFICATION_CODE";

    @PostConstruct
    public void init() {
        try {
            Twilio.init(applicationProperties.getTwilio().getAccountSid(),
                    applicationProperties.getTwilio().getAuthToken());
        } catch (Exception e) {
            log.error("Failed to do twilio things. note the app won't work");
        }
    }


    public List<PhoneDto> findPhonesByUserId(UUID userId) {
        return phoneRepository.findByUserId(userId)
                .stream()
                .map(phoneAssembler::assemble)
                .collect(Collectors.toList());
    }

    public PhoneDto get(UUID userId, UUID phoneId) {
        PhoneDto tempDto = phoneRepository.findById(phoneId)
                .map(phoneAssembler::assemble)
                .orElseThrow(() -> new PhoneNotFoundException(phoneId));

        if (!tempDto.getUserId().equals(userId)) {
            throw(new PhoneNotFoundException(phoneId));
        }

        return tempDto;
    }

    public PhoneDto create(UUID userId, PhoneDto dto) {
        dto.setUserId(userId);
        dto.setVerified(false);
        phoneValidator.validateForCreateAndThrow(dto);
        Phone entity = phoneAssembler.disassemble(dto);
        Phone savedEntity = phoneRepository.save(entity);
        return phoneAssembler.assemble(savedEntity);
    }

    public PhoneDto update(UUID userId, PhoneDto dto) {
        dto.setUserId(userId);
        phoneValidator.validateForUpdateAndThrow(dto);
        return phoneRepository.findById(dto.getPhoneId())
                .map(entity -> phoneAssembler.disassembleInto(dto, entity))
                .map(phoneRepository::save)
                .map(phoneAssembler::assemble)
                .orElseThrow(() -> new PhoneNotFoundException(dto.getPhoneId()));
    }

    public void delete(UUID phoneId) {
        Phone entity = phoneRepository.findById(phoneId)
                .orElseThrow(() -> new PhoneNotFoundException(phoneId));

        phoneRepository.delete(entity);
    }

    public void verifyInit(UUID userId, UUID phoneId) throws AuthenticationException {
        PhoneDto phoneDto = get(userId, phoneId);

        SecureRandom secureRandom = new SecureRandom();
        int randomNumber = secureRandom.nextInt(8999) + 1000;
        String verificationCode = String.valueOf(randomNumber);

        try {
            Message.creator(new com.twilio.type.PhoneNumber(phoneDto.getPhoneNumber()), // TO
                    new com.twilio.type.PhoneNumber("+13235913638"),                    // FROM
                    "Your verification code: " + verificationCode).create();

            phoneDto.setVerificationCode(verificationCode);
            update(userId, phoneDto);
        } catch (TwilioException e) {
            throw new PhoneVerificationException(e.getMessage(), e.getCause());
        }
    }

    public PhoneDto verifyAttempt(UUID userId, UUID phoneId, String attemptCode) throws AuthenticationException {
        PhoneDto phoneDto = get(userId, phoneId);
        if (phoneDto.getVerified()) {
            return phoneDto;
        }

        if (phoneDto.getVerificationCode() != null && phoneDto.getVerificationCode().equals(attemptCode)) {
            return update(userId, phoneDto
                    .setVerified(true)
                    .setVerificationCode(null));
        }
        else {
            Map<String, String> verificationErrors = new LinkedHashMap<>();
            verificationErrors.put(phoneDto.getPhoneNumber(), WRONG_VERIFICATION_CODE);
            throw new ValidationException(verificationErrors);
        }
    }
}
