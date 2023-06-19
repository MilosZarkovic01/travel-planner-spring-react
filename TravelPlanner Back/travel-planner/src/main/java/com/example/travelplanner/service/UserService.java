package com.example.travelplanner.service;

import com.example.travelplanner.domain.User;
import com.example.travelplanner.dto.UserDto;

import java.util.List;
import java.util.Optional;

public interface UserService {
    List<User> getAllUsers();
    User updateUser(String email,UserDto userDto);
    Optional<User> deleteUser(Long userId);
    Optional<User> getUserByEmail(String email);
}
