package com.example.route_optimizer_backend.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.support.SimpleTriggerContext;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path = "api/v1/user")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getUsers();
    }

    @RequestMapping(value = "/details", method = RequestMethod.GET)
    public Map<String, String> getUsernameById(@RequestHeader("UserId") Long userId) {
        User user = userService.findUserById(userId);
        Map<String, String> userDetails = new HashMap<>();
        userDetails.put("username", user.getUsername());
        userDetails.put("name", user.getName());
        userDetails.put("password", user.getPassword());
        return userDetails;
    }

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public void addUser(@RequestHeader("Name") String name,
                        @RequestHeader("Username") String username,
                        @RequestHeader("Password") String password) {
        userService.addNewUser(new User(name, username, password));
    }

    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public User login(@RequestHeader("Username") String username,
                      @RequestHeader("Password") String password) {
        return userService.findUserByUsernameAndPassword(username, password);
    }

//    @DeleteMapping(path = "{userId}")
//    public void removeUser(@PathVariable("userId") Long id) {
//        userService.removeUser(id);
//    }
//
//    @PutMapping(path = "{userId}")
//    public void updateName(@PathVariable("userId") Long id, @RequestParam String name) {
//        userService.changeName(id, name);
//    }
//
//    @PutMapping(path = "{userId}")
//    public void updatePassword(@PathVariable("userId") Long id, @RequestParam String password) {
//        userService.changePassword(id, password);
//    }

}
