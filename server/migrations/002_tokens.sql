-- Up Migration
CREATE TABLE x_csrf_tokens(
  id UUID PRIMARY KEY,
  created_at timestamp NOT NULL DEFAULT NOW(),
  updated_at timestamp NOT NULL DEFAULT NOW(),
  xcsrf_token varchar(255) UNIQUE NOT NULL,
  user_id UUID UNIQUE REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE refresh_tokens(
  id UUID PRIMARY KEY,
  created_at timestamp NOT NULL DEFAULT NOW(),
  updated_at timestamp NOT NULL DEFAULT NOW(),
  refresh_token varchar(255) UNIQUE NOT NULL,
  user_id UUID UNIQUE REFERENCES users(id) ON DELETE CASCADE
);

-- Down Migration
DROP TABLE x_csrf_tokens;

DROP TABLE refresh_tokens;