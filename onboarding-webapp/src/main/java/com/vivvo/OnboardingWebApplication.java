package com.vivvo;

import com.vivvo.onboarding.client.UserClient;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class OnboardingWebApplication {

    public static void main(String[] args) {
        SpringApplication.run(OnboardingWebApplication.class, args);
    }

    // TODO:
    // validation (red messages below fields)               (DONE)
    // create (users)                                       (DONE)
    // link from list page (link from summary to details)   (DONE)
    // create/update/delete phones                          (DONE)
    // delete users (from summary page)                     (DONE)
    // TODO: twilio message verification stuff
    // TODOs fix bug where editing a user deletes there phones
    // TODOs (optional): validate so usernames are unique
    // run with npm start

    @Bean
    public UserClient userClient() {
        UserClient userClient = new UserClient();
        userClient.setBaseUri("http://localhost:4444");
        return userClient;
    }
}





