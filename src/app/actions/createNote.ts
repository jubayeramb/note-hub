"use server";

import { executeQuery } from "@/db/query";
import { uploadFile } from "@/helper/media";
import { cookies } from "next/headers";
import { v4 as uid } from "uuid";

export async function createNote(data: Record<string, any>) {
  const cookieStore = cookies();
  const user = cookieStore.get("user");
  const userData = JSON.parse(user?.value || "{}");

  const { title, content, images } = data;

  const imagesUrls = await Promise.all(
    Array.from(images || []).map(async (image, index) => {
      return await uploadFile(image as File, uid());
    })
  );

  try {
    if (!userData.id) {
      throw "User not found";
    }
    await executeQuery('create_note', [userData.id, title, content, imagesUrls]);
  } catch (error) {
    console.log(error);
    return null;
  }
}
