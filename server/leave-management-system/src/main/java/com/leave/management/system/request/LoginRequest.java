package com.leave.management.system.request;

import lombok.Data;

@Data
public class LoginRequest {
    private String email;
    private String password;
}