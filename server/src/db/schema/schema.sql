DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS candidate_preferences CASCADE;
DROP TABLE IF EXISTS education CASCADE;
DROP TABLE IF EXISTS skills CASCADE;
DROP TABLE IF EXISTS company_info CASCADE;
DROP TABLE IF EXISTS jobs CASCADE;
DROP TABLE IF EXISTS users_interested CASCADE;
DROP TYPE IF EXISTS user_types;

CREATE TYPE user_types AS ENUM ('ADMIN', 'COMPANY', 'CANDIDATE');

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    user_type user_types NOT NULL,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    profile_description TEXT, -- For candidates this could contain their LinkedIn, GitHub etc. For companies, it could contain their website link
    postcode VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS candidate_preferences (
    id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE, -- A user may have 1 preferences object linked to it. When the user is deleted, their preferences will be.
    industry VARCHAR(255),
    distance_km INTEGER,
    preferred_role VARCHAR(255),
    start_date TIMESTAMP WITH TIME ZONE,
    apprenticeship_level INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- One candidate can have Many education and skill entries
CREATE TABLE IF NOT EXISTS education (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    education_level VARCHAR(255) NOT NULL, -- e.g. GCSE, A-Level, BTEC
    subjects TEXT NOT NULL, -- User can write whatever they like about their subjects here (including grades if they want)
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

CREATE TABLE IF NOT EXISTS company_info (
    id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    industry VARCHAR(255),
    contact_email VARCHAR(255) NOT NULL,
    contact_phone VARCHAR(255),
    logo_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS jobs (
    id SERIAL PRIMARY KEY,
    company_id INTEGER NOT NULL REFERENCES company_info(id) ON DELETE CASCADE,
    job_title VARCHAR(255) NOT NULL,
    postcode VARCHAR(20) NOT NULL,
    description TEXT NOT NULL,
    salary INTEGER, -- May be null if company does not wish to disclose salary
    apprenticeship_level INTEGER,
    start_date TIMESTAMP WITH TIME ZONE, -- May be null if start date is TBC
    match_message TEXT, -- Message shown to candidates who are shortlisted
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
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