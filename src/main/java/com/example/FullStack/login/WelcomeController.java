package com.example.FullStack.login;


import com.example.FullStack.users.User;
import com.example.FullStack.users.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import javax.management.Notification;
import java.util.Optional;

@Controller
public class WelcomeController {

    @Autowired
    private UserRepository repo;



    @GetMapping("/")
    public String defaultPage(Model model){
        model.addAttribute("user", new User());
        return "login";
    }

    @GetMapping("/login")
    public String loginPage(Model model){
        model.addAttribute("user", new User());
        return "login";
    }

    private String getLoggedinUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName();
    }


    @RequestMapping(value = "/invalid_password", method = RequestMethod.POST)
    public String processRegistration(User user){
        if(user.getPassword().equals(user.getConfirmPassword())) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String encodedPassword = encoder.encode(user.getPassword());
        user.setPassword(encodedPassword);
        repo.save(user);
        return "proceed";
        }
        else {
            return "error";
        }

    }

    @RequestMapping(value = "/process_register", method = RequestMethod.GET)
    public String successfulRegister(){
       return "proceed";
    }


    @RequestMapping(value = "/index", method = RequestMethod.GET)
    public String successfulLogin(ModelMap modelMap){
        modelMap.put("user", getLoggedinUsername());
        return "index";
    }

}