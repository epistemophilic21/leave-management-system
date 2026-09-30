package com.leave.management.system.response;

import java.time.LocalDate;

import com.leave.management.system.enums.LeaveStatus;
import com.leave.management.system.enums.LeaveType;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter 
@AllArgsConstructor
public class AdminLeaveResponse {

    private Long id;
    private String employeeName;
    private String employeeEmail;
    private LeaveType leaveType;
    private LocalDate startDate;
    private LocalDate endDate;
    private Integer days;
    private String reason;
    private LeaveStatus status;
}
