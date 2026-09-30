package com.leave.management.system.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.leave.management.system.repository.LeaveRequestRepository;
import com.leave.management.system.response.AdminLeaveResponse;
import com.leave.management.system.service.AdminLeaveService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin/leaves")
@RequiredArgsConstructor
public class AdminLeaveController {

    private final LeaveRequestRepository leaveRepository;
    private final AdminLeaveService adminLeaveService;

    @GetMapping
    public List<AdminLeaveResponse> getAllLeaves() {
        return leaveRepository.findAll()
                .stream()
                .map(leave -> new AdminLeaveResponse(
                        leave.getId(),
                        leave.getUser().getName(),
                        leave.getUser().getEmail(),
                        leave.getLeaveType(),
                        leave.getStartDate(),
                        leave.getEndDate(),
                        leave.getDays(),
                        leave.getReason(),
                        leave.getStatus()))
                .toList();
    }

    @PatchMapping("/{id}/approve")
    public AdminLeaveResponse approveLeave(@PathVariable Long id) {
        return adminLeaveService.approveLeave(id);
    }

    @PatchMapping("/{id}/reject")
    public AdminLeaveResponse rejectLeave(@PathVariable Long id) {
        return adminLeaveService.rejectLeave(id);
    }
}