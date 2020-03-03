package com.vivvo;

import com.vivvo.onboarding.client.UserClient;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.support.MessageSourceAccessor;

@SpringBootApplication
public class OnboardingWebApplication {

    public static void main(String[] args) {
        SpringApplication.run(OnboardingWebApplication.class, args);
    }

    // TODOS
    // validation (red messages below fields)
    // create (users)
    // link from list page (link from summary to details)
    // create/update/delete phones
    // delete users (from summary page)
    // twilio message verification stuff

    @Bean
    public UserClient userClient() {
        UserClient userClient = new UserClient();
        userClient.setBaseUri("http://localhost:4444");
        return userClient;
    }
}





