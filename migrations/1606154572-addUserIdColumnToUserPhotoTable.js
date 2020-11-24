exports.up = async (sql) => {
  await sql`
    ALTER TABLE user_photos
      ADD COLUMN user_id INT REFERENCES users (id);
  `;
};

exports.down = async (sql) => {
  await sql`
    ALTER TABLE user_photos
      DROP COLUMN users;
  `;
};
