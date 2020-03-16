package com.vivvo.onboarding.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.UUID;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class UserNotFoundException extends RuntimeException {

	public UserNotFoundException(UUID userId) {
		super("User not found by id: " + userId);
	}
	public UserNotFoundException(String username) { super("User not found by username: " + username);}

}
