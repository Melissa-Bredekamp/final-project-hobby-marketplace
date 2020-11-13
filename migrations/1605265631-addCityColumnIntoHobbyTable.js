exports.up = async (sql) => {
  await sql`
    ALTER TABLE hobby
      ADD COLUMN city varchar(40);
  `;
};

exports.down = async (sql) => {
  await sql`
    ALTER TABLE hobby
      DROP COLUMN city;
  `;
};
