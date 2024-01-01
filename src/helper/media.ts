import path from "path";
import { writeFile } from "fs/promises";

export const uploadFile = async (file: File, filename: FormDataEntryValue | null) => {
  const buffer = Buffer.from(await file.arrayBuffer());
  const fileName = `${filename || Date.now()}.png`;
  try {
    await writeFile(
      path.join(process.cwd(), "public/uploads/" + fileName),
      buffer
    );
    return fileName;
  } catch (error) {
    console.log("Error occured ", error);
  }
};