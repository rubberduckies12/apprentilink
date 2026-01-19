-- Drop existing tables
DROP TABLE IF EXISTS application_status_history CASCADE;
DROP TABLE IF EXISTS applications CASCADE;
DROP TABLE IF EXISTS saved_apprenticeships CASCADE;
DROP TABLE IF EXISTS candidate_preferences CASCADE;
DROP TABLE IF EXISTS matches CASCADE;
DROP TABLE IF EXISTS apprenticeship_skills CASCADE;
DROP TABLE IF EXISTS candidate_skills CASCADE;
DROP TABLE IF EXISTS skills CASCADE;
DROP TABLE IF EXISTS apprenticeships CASCADE;
DROP TABLE IF EXISTS companies CASCADE;
DROP TABLE IF EXISTS candidate_profiles CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Create ENUM types
CREATE TYPE user_role AS ENUM ('candidate', 'company', 'admin');
CREATE TYPE user_status AS ENUM ('active', 'inactive', 'suspended');
CREATE TYPE application_status AS ENUM ('pending', 'reviewed', 'shortlisted', 'rejected', 'accepted', 'withdrawn');
CREATE TYPE apprenticeship_status AS ENUM ('draft', 'active', 'closed', 'filled');
CREATE TYPE match_status AS ENUM ('pending', 'accepted', 'declined', 'expired');
CREATE TYPE employment_type AS ENUM ('full-time', 'part-time');

-- Users table (authentication and basic info)
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role user_role NOT NULL,
    status user_status DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP
);

-- Candidate profiles
CREATE TABLE candidate_profiles (
    candidate_id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    date_of_birth DATE,
    location VARCHAR(255),
    city VARCHAR(100),
    postcode VARCHAR(20),
    bio TEXT,
    education_level VARCHAR(100),
    current_qualification VARCHAR(255),
    expected_graduation DATE,
    cv_url VARCHAR(500),
    linkedin_url VARCHAR(255),
    portfolio_url VARCHAR(255),
    availability_date DATE,
    willing_to_relocate BOOLEAN DEFAULT FALSE,
    preferred_locations TEXT[], -- Array of preferred locations
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Companies table
CREATE TABLE companies (
    company_id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    company_name VARCHAR(255) NOT NULL,
    industry VARCHAR(100),
    company_size VARCHAR(50), -- e.g., '1-10', '11-50', '51-200', '201-500', '500+'
    description TEXT,
    website VARCHAR(255),
    logo_url VARCHAR(500),
    headquarters_location VARCHAR(255),
    contact_name VARCHAR(255),
    contact_email VARCHAR(255),
    contact_phone VARCHAR(20),
    is_verified BOOLEAN DEFAULT FALSE,
    verified_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Apprenticeships/Jobs table
CREATE TABLE apprenticeships (
    apprenticeship_id SERIAL PRIMARY KEY,
    company_id INTEGER NOT NULL REFERENCES companies(company_id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    requirements TEXT,
    responsibilities TEXT,
    benefits TEXT,
    location VARCHAR(255) NOT NULL,
    city VARCHAR(100),
    postcode VARCHAR(20),
    remote_option BOOLEAN DEFAULT FALSE,
    employment_type employment_type DEFAULT 'full-time',
    duration_months INTEGER, -- Duration of apprenticeship
    salary_min DECIMAL(10, 2),
    salary_max DECIMAL(10, 2),
    salary_currency VARCHAR(3) DEFAULT 'GBP',
    start_date DATE,
    application_deadline DATE,
    status apprenticeship_status DEFAULT 'draft',
    positions_available INTEGER DEFAULT 1,
    positions_filled INTEGER DEFAULT 0,
    views_count INTEGER DEFAULT 0,
    applications_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    published_at TIMESTAMP
);

-- Skills table (predefined skills for matching)
CREATE TABLE skills (
    skill_id SERIAL PRIMARY KEY,
    skill_name VARCHAR(100) UNIQUE NOT NULL,
    category VARCHAR(50), -- e.g., 'technical', 'soft-skills', 'industry-specific'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Candidate skills (many-to-many)
CREATE TABLE candidate_skills (
    candidate_skill_id SERIAL PRIMARY KEY,
    candidate_id INTEGER NOT NULL REFERENCES candidate_profiles(candidate_id) ON DELETE CASCADE,
    skill_id INTEGER NOT NULL REFERENCES skills(skill_id) ON DELETE CASCADE,
    proficiency_level VARCHAR(50), -- e.g., 'beginner', 'intermediate', 'advanced', 'expert'
    years_experience DECIMAL(3, 1),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(candidate_id, skill_id)
);

-- Apprenticeship skills (many-to-many)
CREATE TABLE apprenticeship_skills (
    apprenticeship_skill_id SERIAL PRIMARY KEY,
    apprenticeship_id INTEGER NOT NULL REFERENCES apprenticeships(apprenticeship_id) ON DELETE CASCADE,
    skill_id INTEGER NOT NULL REFERENCES skills(skill_id) ON DELETE CASCADE,
    required_level VARCHAR(50), -- e.g., 'required', 'preferred', 'nice-to-have'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(apprenticeship_id, skill_id)
);Candidate job preferences for recommendations
CREATE TABLE candidate_preferences (
    preference_id SERIAL PRIMARY KEY,
    candidate_id INTEGER UNIQUE NOT NULL REFERENCES candidate_profiles(candidate_id) ON DELETE CASCADE,
    preferred_industries TEXT[], -- Array of preferred industries
    preferred_job_types TEXT[], -- e.g., 'software', 'engineering', 'business'
    min_salary DECIMAL(10, 2),
    max_commute_distance INTEGER, -- in miles/km
    remote_only BOOLEAN DEFAULT FALSE,
    notification_enabled BOOLEAN DEFAULT TRUE,
    email_frequency VARCHAR(20) DEFAULT 'daily', -- 'instant', 'daily', 'weekly'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Matches table (system-generated recommendations)
CREATE TABLE matches (
    match_id SERIAL PRIMARY KEY,
    candidate_id INTEGER NOT NULL REFERENCES candidate_profiles(candidate_id) ON DELETE CASCADE,
    apprenticeship_id INTEGER NOT NULL REFERENCES apprenticeships(apprenticeship_id) ON DELETE CASCADE,
    match_score DECIMAL(5, 2) NOT NULL, -- Overall matching score (0-100)
    
    -- Detailed scoring breakdown for transparency
    skills_match_score DECIMAL(5, 2), -- How well skills align (0-100)
    location_match_score DECIMAL(5, 2), -- Location compatibility (0-100)
    preference_match_score DECIMAL(5, 2), -- Preference alignment (0-100)
    
    -- Matching factors
    matched_skills_count INTEGER DEFAULT 0, -- Number of matching skills
    required_skills_met INTEGER DEFAULT 0, -- Required skills candidate has
    total_required_skills INTEGER DEFAULT 0, -- Total required skills
    
    status match_status DEFAULT 'pending',
    match_reason TEXT, -- Human-readable explanation
    is_viewed BOOLEAN DEFAULT FALSE,
    viewed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    responded_at TIMESTAMP,
    expires_at TIMESTAMP,
    UNIQUE(candidate_id, apprenticeship_id)
);

-- Saved/bookmarked apprenticeships
CREATE TABLE saved_apprenticeships (
    saved_id SERIAL PRIMARY KEY,
    candidate_id INTEGER NOT NULL REFERENCES candidate_profiles(candidate_id) ON DELETE CASCADE,
    apprenticeship_id INTEGER NOT NULL REFERENCES apprenticeships(apprenticeship_id) ON DELETE CASCADE,
    notes TEXT, -- Personal notes from candidate
    saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    responded_at TIMESTAMP,
    expires_at TIMESTAMP,
    UNIQUE(candidate_id, apprenticeship_id)
);

-- Applications table
CREATE TABLE applmatches_status_score ON matches(status, match_score DESC); -- For filtering and sorting recommendations
CREATE INDEX idx_matches_viewed ON matches(candidate_id, is_viewed);
CREATE INDEX idx_applications_candidate ON applications(candidate_id);
CREATE INDEX idx_applications_apprenticeship ON applications(apprenticeship_id);
CREATE INDEX idx_applications_status ON applications(status);
CREATE INDEX idx_candidate_skills_candidate ON candidate_skills(candidate_id);
CREATE INDEX idx_apprenticeship_skills_apprenticeship ON apprenticeship_skills(apprenticeship_id);
CREATE INDEX idx_saved_apprenticeships_candidate ON saved_apprenticeships(candidatefrom a match
    cover_letter TEXT,
    status application_status DEFAULT 'pending',
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    reviewed_at TIMESTAMP,
    reviewed_by INTEGER REFERENCES users(user_id),
    notes TEXT, -- Internal notes from company
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(candidate_id, apprenticeship_id)
);

-- Application status history (audit trail)
CREATE TABLE application_status_history (
    history_id SERIAL PRIMARY KEY,
    application_id INTEGER NOT NULL REFERENCES applications(application_id) ON DELETE CASCADE,
    old_status application_status,
    new_status application_status NOT NULL,
    changed_by INTEGER REFERENCES users(user_id),
    notes TEXT,
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER update_candidate_preferences_updated_at BEFORE UPDATE ON candidate_preferences
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Indexes for performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_candidate_location ON candidate_profiles(city, postcode);
CREATE INDEX idx_apprenticeships_company ON apprenticeships(company_id);
CREATE INDEX idx_apprenticeships_status ON apprenticeships(status);
CREATE INDEX idx_apprenticeships_location ON apprenticeships(city, postcode);
CREATE INDEX idx_apprenticeships_deadline ON apprenticeships(application_deadline);
CREATE INDEX idx_matches_candidate ON matches(candidate_id);
CREATE INDEX idx_matches_apprenticeship ON matches(apprenticeship_id);
CREATE INDEX idx_matches_score ON matches(match_score DESC);
CREATE INDEX idx_applications_candidate ON applications(candidate_id);
CREATE INDEX idx_applications_apprenticeship ON applications(apprenticeship_id);
CREATE INDEX idx_applications_status ON applications(status);
CREATE INDEX idx_candidate_skills_candidate ON candidate_skills(candidate_id);
CREATE INDEX idx_apprenticeship_skills_apprenticeship ON apprenticeship_skills(apprenticeship_id);

-- Trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_candidate_profiles_updated_at BEFORE UPDATE ON candidate_profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_companies_updated_at BEFORE UPDATE ON companies
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_apprenticeships_updated_at BEFORE UPDATE ON apprenticeships
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_applications_updated_at BEFORE UPDATE ON applications
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to track application status changes
CREATE OR REPLACE FUNCTION track_application_status_change()
RETURNS TRIGGER AS $$
BEGIN
    IF OLD.status IS DISTINCT FROM NEW.status THEN
        INSERT INTO application_status_history (application_id, old_status, new_status, changed_by)
        VALUES (NEW.application_id, OLD.status, NEW.status, NEW.reviewed_by);
    END IF;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER application_status_change_trigger AFTER UPDATE ON applications
    FOR EACH ROW EXECUTE FUNCTION track_application_status_change();

-- Function to update apprenticeship applications count
CREATE OR REPLACE FUNCTION update_apprenticeship_applications_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE apprenticeships 
        SET applications_count = applications_count + 1 
        WHERE apprenticeship_id = NEW.apprenticeship_id;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE apprenticeships 
        SET applications_count = applications_count - 1 
        WHERE apprenticeship_id = OLD.apprenticeship_id;
    END IF;
    RETURN NULL;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_apprenticeship_applications_count_trigger 
AFTER INSERT OR DELETE ON applications
    FOR EACH ROW EXECUTE FUNCTION update_apprenticeship_applications_count();

-- Insert some common skills
INSERT INTO skills (skill_name, category) VALUES
    -- Technical Skills
    ('JavaScript', 'technical'),
    ('Python', 'technical'),
    ('Java', 'technical'),
    ('C#', 'technical'),
    ('SQL', 'technical'),
    ('React', 'technical'),
    ('Node.js', 'technical'),
    ('Git', 'technical'),
    ('HTML/CSS', 'technical'),
    ('TypeScript', 'technical'),
    -- Engineering Skills
    ('CAD Software', 'technical'),
    ('MATLAB', 'technical'),
    ('AutoCAD', 'technical'),
    ('SolidWorks', 'technical'),
    ('Mechanical Engineering', 'technical'),
    ('Electrical Engineering', 'technical'),
    -- Soft Skills
    ('Communication', 'soft-skills'),
    ('Teamwork', 'soft-skills'),
    ('Problem Solving', 'soft-skills'),
    ('Time Management', 'soft-skills'),
    ('Leadership', 'soft-skills'),
    ('Critical Thinking', 'soft-skills'),
    ('Adaptability', 'soft-skills'),
    ('Attention to Detail', 'soft-skills'),
    -- Industry Specific
    ('Aerospace Engineering', 'industry-specific'),
    ('Defence Systems', 'industry-specific'),
    ('Project Management', 'industry-specific'),
    ('Quality Assurance', 'industry-specific'),
    ('Data Analysis', 'industry-specific'),
    ('Business Analysis', 'industry-specific');
