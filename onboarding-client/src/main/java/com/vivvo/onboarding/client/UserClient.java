package com.vivvo.onboarding.client;

import com.vivvo.onboarding.dto.PhoneDto;
import com.vivvo.onboarding.dto.UserDto;
import lombok.Setter;

import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.Entity;
import javax.ws.rs.client.WebTarget;
import javax.ws.rs.core.GenericType;
import java.util.List;
import java.util.UUID;

public class UserClient {

    private Client client;
    @Setter
    private String baseUri;

    public UserClient() {
        this.client = ClientBuilder.newClient();
    }

    public UserDto create(UserDto dto) {
        return userTarget()
                .request()
                .post(Entity.json(dto), UserDto.class);
    }

    public UserDto update(UserDto dto) {
        return userTarget(dto.getUserId())
                .request()
                .put(Entity.json(dto), UserDto.class);
    }

    public void delete(UUID userId) {
        userTarget(userId)
                .request()
                .delete(Void.class);
    }

    public UserDto get(UUID userId) {
        return userTarget(userId)
                .request()
                .get(UserDto.class);
    }

    public List<UserDto> findAll() {
        return userTarget()
                .request()
                .get(new GenericType<List<UserDto>>() {
                });
    }

    private WebTarget userTarget() {
        return client.target(baseUri)
                .path("api")
                .path("v1")
                .path("users");
    }

    private WebTarget userTarget(UUID userId) {
        return userTarget()
                .path(userId.toString());
    }

    // Phone methods

    public List<PhoneDto> findPhonesByUserId(UUID userId) {
        return phoneTarget(userId)
                .request()
                .get(new GenericType<List<PhoneDto>>(){});
    }

    public PhoneDto getPhone(UUID userId, UUID phoneId) {
        return phoneTarget(userId, phoneId)
                .request()
                .get(PhoneDto.class);
    }

    public PhoneDto createPhone(UUID userId, PhoneDto pdto) {
        return phoneTarget(pdto.getUserId())
                .request()
                .post(Entity.json(pdto), PhoneDto.class);
    }

    public PhoneDto updatePhone(UUID userId, PhoneDto pdto) {
        return phoneTarget(pdto.getUserId(), pdto.getPhoneId())
                .request()
                .put(Entity.json(pdto), PhoneDto.class);
    }

    public void deletePhone(UUID userId, UUID phoneId) {
        phoneTarget(userId, phoneId)
                .request()
                .delete(Void.class);
    }



    public PhoneDto beginVerification(UUID userId, UUID phoneId) {
        return phoneTarget(userId, phoneId)
                .path("sendVerificationCode")
                .request()
                .post(Entity.json(phoneId), PhoneDto.class);
    }

    public PhoneDto verifyPhone(UUID userId, UUID phoneId, String verificationCode) {
        return phoneTarget(userId, phoneId)
                .path("submitVerificationCode")
                .path(verificationCode)
                .request()
                .post(Entity.json(verificationCode), PhoneDto.class);
    }

    private WebTarget phoneTarget(UUID userId) {
        return client.target(baseUri)
                .path("api")
                .path("v1")
                .path("users")
                .path(userId.toString())
                .path("phones");
    }

    private WebTarget phoneTarget(UUID userId, UUID phoneId) {
        return phoneTarget(userId)
                .path(phoneId.toString());
    }
}
