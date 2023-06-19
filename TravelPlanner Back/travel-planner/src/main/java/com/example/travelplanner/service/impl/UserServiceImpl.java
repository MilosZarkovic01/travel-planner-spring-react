package com.example.travelplanner.service.impl;

import com.example.travelplanner.domain.User;
import com.example.travelplanner.dto.UserDto;
import com.example.travelplanner.persistence.UserRepository;
import com.example.travelplanner.service.UserService;
import org.apache.velocity.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public User updateUser(String email, UserDto userDto) {
        User userToUpdate = userRepository.findByEmail(email).
                orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));
        userToUpdate.setFirstName(userDto.getFirstName());
        userToUpdate.setLastName(userDto.getLastName());
        userToUpdate.setPhoneNumber(userDto.getPhoneNumber());

        return userRepository.save(userToUpdate);
    }

    @Override
    public Optional<User> deleteUser(Long userId) {
        Optional<User> userToDelete = userRepository.findById(userId);
        userToDelete.ifPresent(userRepository::delete);
        return userToDelete;
    }

}
