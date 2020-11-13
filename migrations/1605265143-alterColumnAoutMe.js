exports.up = async (sql) => {
  await sql`
    ALTER TABLE hobby
      RENAME COLUMN aboutme TO about_me;
  `;
};

exports.down = async (sql) => {
  await sql`
    ALTER TABLE hobby
      RENAME COLUMN about_me TO aboutme;
  `;
};
