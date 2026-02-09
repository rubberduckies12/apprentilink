DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS skills CASCADE;
DROP TABLE IF EXISTS job_skills CASCADE;
DROP TABLE IF EXISTS company_info CASCADE;
DROP TABLE IF EXISTS jobs CASCADE;
DROP TABLE IF EXISTS users_interested CASCADE;
DROP TABLE IF EXISTS app_stats CASCADE;
DROP TYPE IF EXISTS user_types;

CREATE TYPE user_types AS ENUM ('ADMIN', 'COMPANY', 'CANDIDATE');

-- Simplified version of the schema, if we were to remove all matching aspects to comply with laws

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    user_type user_types NOT NULL,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS company_info (
    id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    industry VARCHAR(255),
    description TEXT,
    contact_email VARCHAR(255) NOT NULL,
    contact_phone VARCHAR(255),
    logo_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS jobs (
    id SERIAL PRIMARY KEY,
    company_id INTEGER NOT NULL REFERENCES company_info(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    postcode VARCHAR(20) NOT NULL,
    description TEXT NOT NULL,
    salary INTEGER, -- May be null if company does not wish to disclose salary
    apprenticeship_level INTEGER,
    desired_education_level VARCHAR(255),
    desired_subjects VARCHAR(255)[],
    start_date TIMESTAMP WITH TIME ZONE, -- May be null if start date is TBC
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS skills (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Jobs can have 'ideal skills' for users to filter by
CREATE TABLE IF NOT EXISTS job_skills (
    id SERIAL PRIMARY KEY,
    job_id INTEGER NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
    skill_id INTEGER NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(job_id, skill_id)
);

-- Store stats for 'all time' as well as the current year (Could be expanded later to document every year)
CREATE TABLE IF NOT EXISTS app_stats (
    user_count_all_time INTEGER DEFAULT 0,
    user_count_candidates INTEGER DEFAULT 0,
    user_count_companies INTEGER DEFAULT 0,
    matches_made_all_time INTEGER DEFAULT 0,
    matches_made INTEGER DEFAULT 0,
    jobs_posted_all_time INTEGER DEFAULT 0,
    jobs_posted INTEGER DEFAULT 0
);