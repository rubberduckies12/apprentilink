INSERT INTO users (user_type, username, email, password_hash)
VALUES ('ADMIN', 'admin', 'admin@airbus', 'admin_pw');

INSERT INTO users (user_type, username, email, password_hash)
VALUES ('COMPANY', 'Amazon', 'jobs@amazon', '123456');

INSERT INTO users (user_type, username, email, password_hash)
VALUES ('CANDIDATE', 'Joe Bloggs', 'someone@example.com', 'password');

INSERT INTO candidate_preferences (user_id, industry, distance_km, preferred_role, start_date, apprenticeship_level, skills)
VALUES (3, 'Space', 50, 'Electrical', '2026-07-01', 3, ARRAY['Problem Solving', 'Teamwork', 'Presentations']);

INSERT INTO education (user_id, education_level, subjects)
VALUES (3, 'GCSE', 'Maths, English, Physics, Chemistry, Biology');

INSERT INTO education (user_id, education_level, subjects)
VALUES (3, 'A-Level', 'Maths, Physics, Engineering');