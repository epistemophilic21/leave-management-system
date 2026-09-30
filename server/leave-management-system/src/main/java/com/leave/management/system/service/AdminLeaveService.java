package com.leave.management.system.service;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import com.leave.management.system.entity.LeaveBalance;
import com.leave.management.system.entity.LeaveRequest;
import com.leave.management.system.enums.LeaveStatus;
import com.leave.management.system.repository.LeaveBalanceRepository;
import com.leave.management.system.repository.LeaveRequestRepository;
import com.leave.management.system.response.AdminLeaveResponse;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminLeaveService {

    private final LeaveRequestRepository leaveRepository;
    private final LeaveBalanceRepository balanceRepository;

    public AdminLeaveResponse approveLeave(Long id) {

        LeaveRequest leave = leaveRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Leave request not found"));

        if (leave.getStatus() != LeaveStatus.PENDING) {
            throw new RuntimeException("Leave already reviewed");
        }

        LeaveBalance balance = balanceRepository.findByUserId(leave.getUser().getId())
                .orElseThrow(() -> new RuntimeException("Leave balance not found"));

        balance.setUsedDays(balance.getUsedDays() + leave.getDays());
        balance.setRemainingDays(balance.getRemainingDays() - leave.getDays());

        leave.setStatus(LeaveStatus.APPROVED);
        leave.setReviewedAt(LocalDateTime.now());

        balanceRepository.save(balance);
        leaveRepository.save(leave);

        return new AdminLeaveResponse(
                leave.getId(),
                leave.getUser().getName(),
                leave.getUser().getEmail(),
                leave.getLeaveType(),
                leave.getStartDate(),
                leave.getEndDate(),
                leave.getDays(),
                leave.getReason(),
                leave.getStatus());
    }

    public AdminLeaveResponse rejectLeave(Long id) {

        LeaveRequest leave = leaveRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Leave request not found"));

        if (leave.getStatus() != LeaveStatus.PENDING) {
            throw new RuntimeException("Leave already reviewed");
        }

        leave.setStatus(LeaveStatus.REJECTED);
        leave.setReviewedAt(LocalDateTime.now());

        leaveRepository.save(leave);

        return new AdminLeaveResponse(
                leave.getId(),
                leave.getUser().getName(),
                leave.getUser().getEmail(),
                leave.getLeaveType(),
                leave.getStartDate(),
                leave.getEndDate(),
                leave.getDays(),
                leave.getReason(),
                leave.getStatus());
    }
}
