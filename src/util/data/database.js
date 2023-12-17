import mysql from "mysql2/promise";

const connection = await mysql.createConnection(process.env.DATABASE_URL);

export default function executeQuery(query, values) {
    return connection.query(query, values);
}
