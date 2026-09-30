package com.leave.management.system.controller;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.leave.management.system.entity.LeaveRequest;
import com.leave.management.system.request.ApplyLeaveRequest;
import com.leave.management.system.response.LeaveBalanceResponse;
import com.leave.management.system.response.LeaveHistoryResponse;
import com.leave.management.system.service.LeaveService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/leaves")
@RequiredArgsConstructor
public class LeaveController {

    private final LeaveService leaveService;

    @PostMapping
    public LeaveRequest applyLeave(@RequestBody ApplyLeaveRequest request, Authentication authentication) {
        return leaveService.applyLeave(authentication.getName(), request);
    }

    @GetMapping("/my-leaves")
    public List<LeaveHistoryResponse> getMyLeaves(Authentication authentication) {
        return leaveService.getMyLeaves(authentication.getName());
    }

    @GetMapping("/balance")
    public LeaveBalanceResponse getBalance(Authentication authentication) {
        return leaveService.getBalance(authentication.getName());
    }
}
