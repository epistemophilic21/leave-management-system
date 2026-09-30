package com.leave.management.system.response;

import java.time.LocalDate;

import com.leave.management.system.enums.LeaveStatus;
import com.leave.management.system.enums.LeaveType;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class LeaveHistoryResponse {

    private Long id;
    private LeaveType leaveType;
    private LocalDate startDate;
    private LocalDate endDate;
    private Integer days;
    private String reason;
    private LeaveStatus status;
}
