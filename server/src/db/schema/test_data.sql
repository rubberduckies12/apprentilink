INSERT INTO users (user_type, username, email, password_hash)
VALUES ('ADMIN', 'admin', 'admin@airbus', 'admin_pw');

INSERT INTO users (user_type, username, email, password_hash)
VALUES ('COMPANY', 'Amazon', 'jobs@amazon', '123456');

INSERT INTO users (user_type, username, email, password_hash)
VALUES ('CANDIDATE', 'Joe Bloggs', 'someone@example.com', 'password');

INSERT INTO candidate_preferences (user_id, industry, distance_km, preferred_role, start_date, apprenticeship_level)
VALUES (3, 'Space', 50, 'Electrical', '2026-07-01', 3);