DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS candidate_preferences CASCADE;
DROP TABLE IF EXISTS employment CASCADE;
DROP TABLE IF EXISTS skills CASCADE;
DROP TABLE IF EXISTS user_skills CASCADE;
DROP TABLE IF EXISTS job_skills CASCADE;
DROP TABLE IF EXISTS subjects CASCADE;
DROP TABLE IF EXISTS user_subjects CASCADE;
DROP TABLE IF EXISTS job_subjects CASCADE;
DROP TABLE IF EXISTS company_info CASCADE;
DROP TABLE IF EXISTS jobs CASCADE;
DROP TABLE IF EXISTS users_interested CASCADE;
DROP TABLE IF EXISTS match_records CASCADE;
DROP TABLE IF EXISTS app_stats CASCADE;
DROP TYPE IF EXISTS user_types;

CREATE TYPE user_types AS ENUM ('ADMIN', 'COMPANY', 'CANDIDATE');

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    user_type user_types NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    profile_description TEXT, -- 'About' page for a user. For candidates this could contain their LinkedIn, GitHub etc. For companies, it could contain their website link
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    -- TODO - Add GDPR Compliance fields for user personal data (separate table perhaps)
);

-- This table is used for automatically recommending jobs to candidates. All of these features can also be used on the front-end to manually search and filter.
CREATE TABLE IF NOT EXISTS candidate_preferences (
    id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE, -- A candidate has one of these objects linked to it. When the user is deleted, their preferences will be.
    preferred_industry VARCHAR(255),
    preferred_field VARCHAR(255),
    postcode VARCHAR(20),
    distance_km INTEGER, -- Max distance from the user's postcode that will be recommended
    preferred_role VARCHAR(255),
    start_date TIMESTAMP WITH TIME ZONE,
    apprenticeship_level INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS employment (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    job_title VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    postcode VARCHAR(20) NOT NULL,
    description TEXT NOT NULL,
    date_started TIMESTAMP WITH TIME ZONE NOT NULL,
    date_finished TIMESTAMP WITH TIME ZONE, -- Can be null if the candidate is still working this role
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- List of skills which users can choose from to say that they have that skill
CREATE TABLE IF NOT EXISTS skills (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_skills (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    skill_id INTEGER NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, skill_id)
);

CREATE TABLE IF NOT EXISTS subjects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_subjects (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    subject_id INTEGER NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
    education_level VARCHAR(255) NOT NULL,
    details TEXT NOT NULL, -- Details provided by the candidate such as grades and topics learned
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, subject_id)
);

CREATE TABLE IF NOT EXISTS company_info (
    id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    industry VARCHAR(255), -- Defence, Aerospace etc.
    contact_email VARCHAR(255) NOT NULL,
    contact_phone VARCHAR(255),
    logo_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS jobs (
    id SERIAL PRIMARY KEY,
    company_id INTEGER NOT NULL REFERENCES company_info(id) ON DELETE CASCADE,
    job_title TEXT NOT NULL,
    postcode VARCHAR(20) NOT NULL,
    description TEXT NOT NULL,
    salary INTEGER, -- May be null if company does not wish to disclose salary
    field VARCHAR(255), -- Type of work (Mechanical, Electrical, Software etc.)
    apprenticeship_level INTEGER,
    desired_education_level VARCHAR(255),
    start_date TIMESTAMP WITH TIME ZONE, -- May be null if start date is TBC
    match_message TEXT, -- Message shown to candidates who are shortlisted (perhaps via automated email)
    close_message TEXT, -- Message shown to candidates who are interested but not shortlisted when the posting is closed (deleted from DB)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Jobs can have 'ideal skills' and 'ideal education subjects' to recommend to users with a matching profile
CREATE TABLE IF NOT EXISTS job_skills (
    id SERIAL PRIMARY KEY,
    job_id INTEGER NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
    skill_id INTEGER NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(job_id, skill_id)
);

CREATE TABLE IF NOT EXISTS job_subjects (
    id SERIAL PRIMARY KEY,
    job_id INTEGER NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
    subject_id INTEGER NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(job_id, subject_id)
);

CREATE TABLE IF NOT EXISTS users_interested (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    job_id INTEGER NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
    user_saved BOOLEAN DEFAULT FALSE,
    user_interested BOOLEAN DEFAULT FALSE, -- Users can save jobs for later, or mark themselves as interested
    shortlisted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, job_id)
);

-- For GDPR - We must keep 1 year of records for matches made between users and companies.
-- Having a separate table means 'job' and 'users_interested' objects can be deleted but the match records maintained
CREATE TABLE IF NOT EXISTS match_records (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    company_id INTEGER NOT NULL REFERENCES company_info(id) ON DELETE CASCADE,
    job_title TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, company_id, job_title)
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