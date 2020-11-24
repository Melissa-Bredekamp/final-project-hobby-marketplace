exports.up = async (sql) => {
  await sql`
    ALTER TABLE hobby
      ADD COLUMN hobby_offer varchar(40);
  `;
};

exports.down = async (sql) => {
  await sql`
    ALTER TABLE hobby
      DROP COLUMN hobby_offer;
  `;
};
