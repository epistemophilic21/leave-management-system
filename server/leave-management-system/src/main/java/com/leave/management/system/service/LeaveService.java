package com.leave.management.system.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.leave.management.system.entity.LeaveBalance;
import com.leave.management.system.entity.LeaveRequest;
import com.leave.management.system.entity.User;
import com.leave.management.system.enums.LeaveStatus;
import com.leave.management.system.repository.LeaveBalanceRepository;
import com.leave.management.system.repository.LeaveRequestRepository;
import com.leave.management.system.repository.UserRepository;
import com.leave.management.system.request.ApplyLeaveRequest;
import com.leave.management.system.response.LeaveBalanceResponse;
import com.leave.management.system.response.LeaveHistoryResponse;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LeaveService {

    private final UserRepository userRepository;
    private final LeaveBalanceRepository balanceRepository;
    private final LeaveRequestRepository leaveRepository;

    public LeaveRequest applyLeave(String email, ApplyLeaveRequest request) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        LeaveBalance balance = balanceRepository.findByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException("Leave balance not found"));

        int days = (int) (request.getEndDate().toEpochDay() - request.getStartDate().toEpochDay()) + 1;

        if (days <= 0) {
            throw new RuntimeException("Invalid dates");
        }

        if (days > balance.getRemainingDays()) {
            throw new RuntimeException("Insufficient leave balance");
        }

        LeaveRequest leave = LeaveRequest.builder()
                .user(user)
                .leaveType(request.getLeaveType())
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .days(days)
                .reason(request.getReason())
                .status(LeaveStatus.PENDING)
                .createdAt(LocalDateTime.now())
                .build();

        return leaveRepository.save(leave);
    }

    public List<LeaveHistoryResponse> getMyLeaves(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return leaveRepository.findByUserId(user.getId())
                .stream()
                .map(leave -> new LeaveHistoryResponse(
                        leave.getId(),
                        leave.getLeaveType(),
                        leave.getStartDate(),
                        leave.getEndDate(),
                        leave.getDays(),
                        leave.getReason(),
                        leave.getStatus()))
                .toList();
    }

    public LeaveBalanceResponse getBalance(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        LeaveBalance balance = balanceRepository.findByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException("Leave balance not found"));

        return new LeaveBalanceResponse(
                balance.getTotalDays(),
                balance.getUsedDays(),
                balance.getRemainingDays());
    }
}
