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
import { generateAvatarUrl } from "@/helper/media";

type User = {
  id: number;
  student_id: string;
  password: string;
  full_name: string;
  avatar: string;
};

export default async function Home() {
  const cookieStore = cookies();
  const user = cookieStore.get("user");
  if (!user) return redirect("/login");

  const userData = JSON.parse(user?.value as string) as User;

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
                  image={generateAvatarUrl(userData.avatar)}
                  name={userData.full_name}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-3">
                <Image
                  width={40}
                  height={40}
                  className="rounded-full w-10 h-10"
                  src={generateAvatarUrl(userData.avatar)}
                  alt=""
                />
                <p className="text-xl font-[500]">{userData.full_name}</p>
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
            <LogoutButton />
          </div>
        </Section>
      </div>
    </div>
  );
}
