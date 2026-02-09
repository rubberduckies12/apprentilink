INSERT INTO users (user_type, first_name, last_name, email, password_hash)
VALUES ('ADMIN', 'admin', 'admin','admin@airbus', 'admin_pw');

INSERT INTO users (user_type, first_name, last_name, email, password_hash)
VALUES ('COMPANY', 'Amazon', 'Admin', 'jobs@amazon', '123456');

INSERT INTO users (user_type, first_name, last_name, email, password_hash)
VALUES ('CANDIDATE', 'Joe', 'Bloggs', 'someone@example.com', 'password');

-- INSERT INTO candidate_preferences (user_id, industry, distance_km, preferred_role, start_date, apprenticeship_level)
-- VALUES (3, 'Space', 50, 'Electrical', '2026-07-01', 3);

INSERT INTO subjects (name)
VALUES ('Maths'), ('English'), ('Physics'), ('Chemistry'), ('Biology'), ('Computer Science');

INSERT INTO user_subjects (user_id, subject_id, education_level, details)
VALUES (3, 1, 'GCSE', 'Grade 9'),
       (3, 2, 'GCSE', 'Grade 7');

INSERT INTO skills (name)
VALUES ('Teamwork'), ('Critical Thinking'), ('Presentation'), ('Python'), ('Java'), ('GitHub');

INSERT INTO user_skills (user_id, skill_id)
VALUES (3, 1),
       (3, 3),
       (3, 5),
       (3,6)