import fs from "fs";
import { connectDb } from "../db/db";

export async function initDb() {
  const connection = await connectDb();

  const sqlFiles = loadFilesByExtension("./src/db/schema", ".sql");

  // read sql files and execute
  for (const file of sqlFiles) {
    const sql = fs.readFileSync(`./src/db/schema/${file}`, "utf8");

    try {
      const data = await connection.query(sql);
      console.log("Migration Executed");
    } catch (error) {
      console.log("Migration Error: ", { error });
    }
  }

  // const d = await connection.query("SELECT 1 + 1 AS solution");

  // console.log("The solution is: ", d);
}

const loadFilesByExtension = (dir: string, extension: string) => {
  const files = fs.readdirSync(dir);

  return files.filter((file) => file.endsWith(extension));
};
