exports.up = async (sql) => {
  await sql`
    ALTER TABLE hobby_photos
      ADD COLUMN user_id INT REFERENCES users (id);
  `;
};

exports.down = async (sql) => {
  await sql`
    ALTER TABLE hobby_photos
      DROP COLUMN users;
  `;
};
