CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL
        CHECK (role IN ('EMPLOYEE', 'ADMIN')),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE leave_balances (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL UNIQUE,
    total_days INT NOT NULL DEFAULT 24,
    used_days INT NOT NULL DEFAULT 0,
    remaining_days INT NOT NULL DEFAULT 24,

    CONSTRAINT fk_leave_balance_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT chk_leave_balance_values
        CHECK (
            total_days >= 0
            AND used_days >= 0
            AND remaining_days >= 0
        )
);

CREATE TABLE leave_requests (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    leave_type VARCHAR(20) NOT NULL
        CHECK (leave_type IN ('CASUAL', 'SICK', 'EARNED')),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    days INT NOT NULL,
    reason VARCHAR(500),
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING'
        CHECK (status IN ('PENDING', 'APPROVED', 'REJECTED')),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    reviewed_at TIMESTAMP,

    CONSTRAINT fk_leave_request_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT chk_leave_request_dates
        CHECK (end_date >= start_date),

    CONSTRAINT chk_leave_request_days
        CHECK (days > 0)
);

CREATE INDEX idx_leave_requests_user_id
    ON leave_requests(user_id);

CREATE INDEX idx_leave_requests_status
    ON leave_requests(status);