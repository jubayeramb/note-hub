import { SubmitButton } from "@/components/submitButton";
import { connectDb } from "@/db/db";
import { uploadFile } from "@/helper/media";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { FaUser } from "react-icons/fa";

type Props = {
  searchParams: { error: string };
};

export default function Signup({ searchParams }: Props) {
  const error = searchParams.error;

  async function createUser(formData: FormData) {
    "use server";

    const student_id = formData.get("student_id");
    const full_name = formData.get("full_name");
    const password = formData.get("password");
    const avatarFile = formData.get("avatar");
    let avatar;

    try {
      const img = await uploadFile(avatarFile as File, student_id);
      avatar = img;
    } catch (err) {
      redirect("/signup?error=Image Upload Failed!");
    }

    // mutate data
    const connection = await connectDb();

    const rawData = {
      student_id,
      full_name,
      password,
      avatar,
    };

    try {
      const result = await connection.query(
        "INSERT INTO user (student_id, full_name, password, avatar) VALUES (?, ?, ?, ?)",
        Object.values(rawData)
      );
      console.log({ result });
      redirect("/login");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      <div className="w-1/2 h-screen bg-slate-700 flex justify-center items-center">
        <p className="text-6xl font-extrabold">
          Note<span className="text-amber-400">Hub</span>
        </p>
      </div>
      <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
        <h1 className="text-2xl font-semibold mb-4">Register</h1>
        <form action={createUser}>
          <div className="flex flex-col justify-center items-center gap-2 mb-2">
            <div className="w-[100px] h-[100px] rounded-full flex items-center justify-center overflow-hidden bg-slate-600">
              <FaUser size={90} className="translate-y-[6px]" />
            </div>
            <label
              htmlFor="avatar"
              className="btn btn-sm btn-outline text-gray-600"
            >
              Select Profile Picture
            </label>
            <input type="file" name="avatar" id="avatar" className="hidden" />
          </div>
          <div className="mb-4">
            <label htmlFor="student_id" className="block text-gray-600">
              Student ID
            </label>
            <input
              type="text"
              id="student_id"
              name="student_id"
              className="w-full border rounded-md py-2 px-3 bg-slate-200 text-black"
              autoComplete="off"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="full_name" className="block text-gray-600">
              Full Name
            </label>
            <input
              type="text"
              id="full_name"
              name="full_name"
              className="w-full border rounded-md py-2 px-3 bg-slate-200 text-black"
              autoComplete="off"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full border rounded-md py-2 px-3 bg-slate-200 text-black"
              autoComplete="off"
            />
          </div>
          <div className="mt-4">
            <p className="text-center text-red-500 mb-2">{error}</p>
            <SubmitButton text="Sign Up" />
          </div>
        </form>
        <div className="mt-6 text-blue-500 text-center">
          <Link href="/login" className="hover:underline">
            Already have an account? Login Here
          </Link>
        </div>
      </div>
    </div>
  );
}
