package com.vivvo.onboarding;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;

public class TwilioSmsTester {

    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");
    public static final String MY_PHONE_NUM = System.getenv("MY_PHONE_NUM");
    public static final String MY_TWILIO_NUM = System.getenv("MY_TWILIO_NUM");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Message message = Message.creator(
                new com.twilio.type.PhoneNumber(MY_PHONE_NUM), // to
                new com.twilio.type.PhoneNumber(MY_TWILIO_NUM), // from
                "Test").create();

        System.out.println(message.getSid());
    }
}
