/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { FaHeart, FaRegBookmark } from "react-icons/fa";
import { FiPlusCircle } from "react-icons/fi";
import { CreateNoteModal } from "@/components/createNoteModal";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { PostCard } from "@/components/postCard";
import { Section } from "@/components/section";
import Link from "next/link";
import { LogoutButton } from "@/components/buttons";

export default async function Home() {
  const cookieStore = cookies();
  const user = cookieStore.get("user");
  if (!user) return redirect("/login");

  return (
    <div className="h-screen flex justify-center overflow-hidden">
      <div className="container flex gap-6">
        <Section className="w-[27%] py-5 flex justify-end">
          <div className="w-[200px] flex justify-between flex-col">
            <div>
              <div className="flex items-center gap-3">
                <p className="text-3xl font-extrabold">
                  Note<span className="text-amber-400">Hub</span>
                </p>
                {/* <FiPlusCircle size={30} /> */}
              </div>
              <div className="mt-10 text-lg flex flex-col items-start gap-5">
                <Link href="/"> Home </Link>
                <Link href="/"> Saved Notes </Link>
                <CreateNoteModal
                  image={
                    "https://pbs.twimg.com/profile_images/1689224398639882240/TbTgFZFN_400x400.jpg"
                  }
                  name={"Zahin Afsar"}
                />
              </div>
            </div>
            <div>
              <div className="dropdown dropdown-top dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="flex items-center gap-3"
                >
                  <Image
                    width={40}
                    height={40}
                    className="rounded-full"
                    src="https://pbs.twimg.com/profile_images/1689224398639882240/TbTgFZFN_400x400.jpg"
                    alt=""
                  />
                  <p className="text-xl font-[500]">Zahin Afsar</p>
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] text-white menu mb-2 p-2 shadow rounded-box w-52 bg-slate-600"
                >
                  <li>
                    <LogoutButton />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Section>
        <Section className="min-w-[46%] overflow-auto border-x border-slate-700">
          <div className="flex flex-col">
            <PostCard
              title={"Zahin Afsar"}
              description={"Hello guys!"}
              image={""}
              createdAt={"12:00 PM"}
            />
            <PostCard
              title={"Zahin Afsar"}
              description={"Hello guys!"}
              image={""}
              createdAt={"12:00 PM"}
            />
            <PostCard
              title={"Zahin Afsar"}
              description={"Hello guys!"}
              image={""}
              createdAt={"12:00 PM"}
            />
          </div>
        </Section>
        <Section className="w-[27%] py-5 flex justify-start">
          <div className="flex justify-between flex-col">
            <div>
              <p className="text-3xl font-extrabold">Most Loved</p>
              <div className="mt-10 text-lg flex flex-col gap-5">
                <a className="hover:underline cursor-pointer">
                  Database B Tree notes (Naimul Pathan)
                </a>
                <a className="hover:underline cursor-pointer">
                  Algorithm BFS/DFS (Wahia Tasnim)
                </a>
              </div>
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
}
