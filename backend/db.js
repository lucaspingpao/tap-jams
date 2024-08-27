const Pool = require("pg").Pool;

const pool = new Pool({
    user: "tapjams_database_user",
    password: "yRxT226u5OpQaHyl4JvrGb5oDFuC46aH",
    host: "dpg-cqq48pt6l47c73anbpdg-a.ohio-postgres.render.com",
    port: 5432,
    database: "tapjams_database",
    ssl: true
});

module.exports = pool;