"use server";

import { connectDb } from "@/db/db";
import { cookies } from "next/headers";

export async function createNote(data: Record<string, any>) {
  const cookieStore = cookies();
  const user = cookieStore.get("user");
  const userData = JSON.parse(user?.value || "{}");

  const { title, content, image } = data;
  const connection = await connectDb();

  try {
    if (!userData.id) {
      throw "User not found";
    }
    const res = await connection.query(
      `INSERT INTO note (title, content, user_id) VALUES (?, ?, ?)`,
      [title, content, userData.id]
    );
  } catch (error) {
    console.log(error);
    return null;
  }
}
