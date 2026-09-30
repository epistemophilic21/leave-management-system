package com.leave.management.system.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.leave.management.system.entity.LeaveRequest;
import com.leave.management.system.enums.LeaveStatus;

@Repository 
public interface LeaveRequestRepository extends JpaRepository<LeaveRequest, Long> {

    List<LeaveRequest> findByUserId(Long userId);

    List<LeaveRequest> findByStatus(LeaveStatus status);
}
