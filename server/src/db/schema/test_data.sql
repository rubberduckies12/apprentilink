INSERT INTO users (user_type, first_name, last_name, email, password_hash)
VALUES ('ADMIN', 'admin', 'admin','admin@airbus', 'admin_pw');

INSERT INTO users (user_type, first_name, last_name, email, password_hash)
VALUES ('COMPANY', 'Epic Space', 'Admin', 'hiring@epicspace.com', '123456');

INSERT INTO users (user_type, first_name, last_name, email, password_hash)
VALUES ('CANDIDATE', 'Joe', 'Bloggs', 'someone@example.com', 'password');

INSERT INTO company_info (user_id, industry, contact_email, contact_phone)
VALUES (2, 'Space', 'enquiries@epicspace.com', '0123456');

INSERT INTO candidate_preferences (user_id, preferred_industry, preferred_field, preferred_role, postcode, distance_km, start_date, apprenticeship_level)
VALUES (3, 'Space', 'Electrical', 'Electrical Engineer', 'F11 1FF', 50,  '2026-07-01', 3);

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
       (3,6);

INSERT INTO jobs (company_id, job_title, postcode, description, salary, field, apprenticeship_level, desired_education_level, start_date, match_message, close_message)
VALUES (1, 'Software Developer Apprentice', 'AB12 3XY', 'In this job you will write code.', null, 'Software Engineering', 6, 'A-Level', '2026-01-07 10:00', 'Congratulations', 'Regrettably...');