package com.example.travelplanner.controller;

import com.example.travelplanner.config.security.JwtService;
import com.example.travelplanner.domain.User;
import com.example.travelplanner.dto.UserDto;
import com.example.travelplanner.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private final UserService userService;
    private final JwtService jwtService;

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/email")
    public ResponseEntity<User> getUserByEmail(@RequestParam String email) {
        Optional<User> user = userService.getUserByEmail(email);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(user.get());
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateUser(@RequestHeader("Authorization") String authHeader, @RequestBody UserDto userDto) {
        String token = authHeader.substring(7); // remove "Bearer " prefix
        String userEmail = jwtService.extractUsername(token);
        User updatedUser = userService.updateUser(userEmail, userDto);

        if (updatedUser == null)
            return ResponseEntity.badRequest().build();

        return ResponseEntity.ok("User is successfully updated");
    }

    @DeleteMapping("/delete/{userId}")
    public ResponseEntity<String> deleteUser(@PathVariable("userId") Long userId) {
        Optional<User> userToDelete = userService.deleteUser(userId);
        if (!userToDelete.isPresent()) {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>("User successfully deleted!", HttpStatus.OK);
    }
}
