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

    // TODOS
    // validation (red messages below fields)       follow the baeldung tutorial
    // create (users)                                       tour-of-heroes          (DONE)
    // link from list page (link from summary to details)   tour-of-heroes          (DONE)
    // create/update/delete phones                  should be a similar process
    // delete users (from summary page)             should be a similar process     (DONE)
    // twilio message verification stuff            still no idea what this is

    // run with npm start

    @Bean
    public UserClient userClient() {
        UserClient userClient = new UserClient();
        userClient.setBaseUri("http://localhost:4444");
        return userClient;
    }
}





