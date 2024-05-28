package com.example.route_optimizer_backend.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getUsers() {
        // Returns a list
        return userRepository.findAll();
    }

    // Used when registering
    public void addNewUser(User user) {
        Optional<User> userOptional = userRepository.findUserByUsername(user.getUsername());
        if (userOptional.isPresent()) {
            throw new IllegalStateException("This Username is Taken");
        }
        userRepository.save(user);
    }

    public User findUserByUsernameAndPassword(String username, String password) {
        Optional<User> userOptional = userRepository.findUserByUsername(username);
        if (!userOptional.isPresent()) {
            throw new IllegalStateException("This User Does Not Exist");
        }
        if (!(userOptional.get().getPassword().equals(password))) {
            throw new IllegalStateException("This Password is Incorrect");
        }
        return userOptional.get();
    }

    // Used when deleting account
    public void removeUser(Long id) {
        boolean exists = userRepository.existsById(id);
        if (!exists) {
            throw new IllegalStateException("This User does not Exist");
        }
        userRepository.deleteById(id);
    }

    // Change name for account
    public void changeName(Long id, String name) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("User with ID " + id + " does not exist"));

        if (name.length() >= 1) {
            user.setUsername(name);
        }
    }

    // Change password for account
    public void changePassword(Long id, String password) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("User with ID " + id + " does not exist"));

        if (password.length() >= 1) {
            user.setPassword(password);
        }
    }
}
