import "dotenv/config";
import pg from "pg";
const { Pool } = pg;
const pool = new Pool();

export async function execQuery<T extends pg.QueryResultRow>(
  query: string,
  params: any[]
): Promise<pg.QueryResult<T>> {
  try {
    const connection = await pool.connect();
    const result = await connection.query<T>(query, params);
    connection.release();

    return result;
  } catch (error) {
    const err = error as pg.DatabaseError;
    throw err;
  }
}
