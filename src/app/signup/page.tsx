import Link from "next/link";
import React from "react";
import { FaUser } from "react-icons/fa";

type Props = {};

export default function Login({}: Props) {
  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      <div className="w-1/2 h-screen bg-slate-700 flex justify-center items-center">
        <p className="text-6xl font-extrabold">
          Note<span className="text-amber-400">Hub</span>
        </p>
      </div>
      <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
        <h1 className="text-2xl font-semibold mb-4">Register</h1>
        <form action="#" method="POST">
          <div className="flex flex-col justify-center items-center gap-2 mb-2">
            <div className="w-[100px] h-[100px] rounded-full flex items-center justify-center overflow-hidden bg-slate-600">
              <FaUser size={90} className="translate-y-[6px]" />
            </div>
            <label
              htmlFor="file"
              className="btn btn-sm btn-outline text-gray-600"
            >
              Select Profile Picture
            </label>
            <input type="file" id="file" className="hidden" />
          </div>
          <div className="mb-4">
            <label htmlFor="studentId" className="block text-gray-600">
              Student Id
            </label>
            <input
              type="text"
              id="studentId"
              name="studentId"
              className="w-full border rounded-md py-2 px-3 bg-slate-200"
              autoComplete="off"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="fullName" className="block text-gray-600">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              className="w-full border rounded-md py-2 px-3 bg-slate-200"
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
              className="w-full border rounded-md py-2 px-3 bg-slate-200"
              autoComplete="off"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 mt-4 w-full"
          >
            Signup
          </button>
        </form>
        {/* Sign up  Link */}
        <div className="mt-6 text-blue-500 text-center">
          <Link href="/login" className="hover:underline">
            Already have an account? Login Here
          </Link>
        </div>
      </div>
    </div>
  );
}
