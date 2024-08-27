CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    passkey VARCHAR(255) NOT NULL,
    profile_pic BYTEA
);

CREATE TABLE posts(
    post_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    composer VARCHAR(255),
    song BYTEA,
    date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);