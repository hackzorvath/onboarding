package com.vivvo.onboarding.service;

import com.vivvo.onboarding.assembler.UserAssembler;
import com.vivvo.onboarding.dto.UserDto;
import com.vivvo.onboarding.entity.User;
import com.vivvo.onboarding.exception.UserNotFoundException;
import com.vivvo.onboarding.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
public class UserService {

	@Autowired
	private UserRepository userRepository;
	@Autowired
	private UserAssembler userAssembler;
	@Autowired
	private UserValidator userValidator;

	public List<UserDto> findAll() {
		return userRepository.findAll()
				.stream()
				.map(userAssembler::assemble)
				.sorted(Comparator.comparing(UserDto::getLastName)
						.thenComparing(UserDto::getFirstName))
				.collect(Collectors.toList());
	}


	public List<UserDto> findByLastName(String lastName) {
		return userRepository.findByLastName(lastName)
				.stream()
				.map(userAssembler::assemble)
				.sorted(Comparator.comparing(UserDto::getLastName)
						.thenComparing(UserDto::getFirstName))
				.collect(Collectors.toList());
	}

	public UserDto get(UUID userId) {
		return userRepository.findById(userId)
				.map(userAssembler::assemble)
				.orElseThrow(() -> new UserNotFoundException(userId));
	}

	public UserDto findByUsername(String username) {
		return userRepository.findByUsername(username)
				.map(userAssembler::assemble)
				.orElseThrow(() -> new UserNotFoundException(username));
	}

	public UserDto create(UserDto dto) {
		userValidator.validateForCreateAndThrow(dto);
		User entity = userAssembler.disassemble(dto);
		User savedEntity = userRepository.save(entity);
		return userAssembler.assemble(savedEntity);
	}

	public UserDto update(UserDto dto) {
		userValidator.validateForUpdateAndThrow(dto);
		return userRepository.findById(dto.getUserId())
				.map(entity -> userAssembler.disassembleInto(dto, entity))
				.map(userRepository::save)
				.map(userAssembler::assemble)
				.orElseThrow(() -> new UserNotFoundException(dto.getUserId()));
	}

	public void delete(UUID userId) {
		User entity = userRepository.findById(userId)
				.orElseThrow(() -> new UserNotFoundException(userId));

		userRepository.delete(entity);
	}
}
