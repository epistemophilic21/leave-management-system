package com.leave.management.system.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class LeaveBalanceResponse {
    
    private Integer totalDays;
    private Integer usedDays;
    private Integer remainingDays;
}
