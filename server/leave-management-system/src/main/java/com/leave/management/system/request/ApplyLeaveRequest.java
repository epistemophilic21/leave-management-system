package com.leave.management.system.request;

import java.time.LocalDate;

import com.leave.management.system.enums.LeaveType;

import lombok.Data;

@Data 
public class ApplyLeaveRequest {
    private LeaveType leaveType;
    private LocalDate startDate;
    private LocalDate endDate;
    private String reason;
}