package com.vivvo.onboardingwebapp.controller;

public class PhoneController {
}


/*
* package com.vivvo.onboardingwebapp.controller;

import com.vivvo.onboarding.client.UserClient;
import com.vivvo.onboarding.dto.PhoneDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/users/{userId}/phones")
public class WebappPhoneController {

    @Autowired
    private UserClient userClient;

    @GetMapping
    public List<PhoneDto> getPhoneList(@PathVariable("userId") UUID userId) {
        return userClient.findPhonesByUserId(userId); }

    @GetMapping("/{phoneId}")
    public PhoneDto get(@PathVariable("userId") UUID userId, @PathVariable("phoneId") UUID phoneId) {
        return userClient.getPhone(userId, phoneId); }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public PhoneDto create(@PathVariable("userId") UUID userId, @RequestBody PhoneDto dto) {
        return userClient.createPhone(userId, dto);
    }

    @PutMapping("/{phoneId}")
    public PhoneDto update(@PathVariable("userId") UUID userId, @PathVariable("phoneId") UUID phoneId,
                           @RequestBody PhoneDto dto) {
        dto.setPhoneId(phoneId);
        return userClient.updatePhone(userId, dto);
    }

    @DeleteMapping("/{phoneId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable("userId") UUID userId, @PathVariable("phoneId") UUID phoneId) {
        userClient.deletePhone(userId, phoneId);
    }

    @PostMapping("/{phoneId}/sendVerificationCode")
    public void sendVerificationCode(@PathVariable("userId") UUID userId,
                                     @PathVariable("phoneId") UUID phoneId) {
        userClient.beginVerification(userId, phoneId);
    }

    @PostMapping("/{phoneId}/submitVerificationCode/{verificationCode}")
    public PhoneDto submitVerificationCode(@PathVariable("userId") UUID userId,
                                           @PathVariable("phoneId") UUID phoneId,
                                           @PathVariable("verificationCode") String verificationCode) {
        return userClient.verifyPhone(userId, phoneId, verificationCode);
    }
}
* */