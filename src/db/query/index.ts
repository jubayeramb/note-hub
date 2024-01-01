import fs from "fs";
import { QueryNames } from "./index.type";
import { connectDb } from "../db";

const queryStr = fs.readFileSync("./src/db/query/index.sql").toString();

const queries = queryStr
  .split("-- ")
  .map((query) => query.trim())
  .filter(Boolean)
  .map((query) => "-- " + query);

export function getQuery(queryName: QueryNames) {
  const query = queries.find((query) =>
    query.startsWith("-- " + queryName + ":")
  );
  if (!query) throw new Error("Query not found with the name: " + queryName);

  return query;
}

const generateIndexTypeFile = () => {
  const queryNames = queries.map(
    (query) => query.split("-- ")[1].split(":")[0]
  );

  const file = `export type QueryNames = '${queryNames.join("' | '")}';`;
  fs.writeFileSync("./src/db/query/index.type.ts", file);
};

generateIndexTypeFile();

export async function executeQuery<DataTypeT>(
  queryName: QueryNames,
  variables: object | any[] | undefined = []
): Promise<DataTypeT> {
  const connection = await connectDb();

  const queryVariables =
    variables instanceof Array ? variables : Object.values(variables);

  try {
    const query = getQuery(queryName);
    return (await connection.execute(query, queryVariables)) as DataTypeT;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
