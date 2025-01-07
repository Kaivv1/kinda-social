-- Up Migration
CREATE TABLE users (
  id UUID PRIMARY KEY,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  username TEXT NOT NULL
);

-- Down Migration
DROP TABLE users;