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
import { executeQuery } from "@/db/query";
import { Note, User } from "@/types";
import { getUser } from "@/helper/user";
import { QueryNames } from "@/db/query/index.type";

type Props = {
  searchParams: { tab: string; note: string };
};

export default async function Home({ searchParams }: Props) {
  const isSavedNoteTab = searchParams.tab === "saved notes";
  const isMyNoteTab = searchParams.tab === "my notes";
  const isNotePage = searchParams.note !== undefined;

  let notes: Note[] = [];
  let mostLoveNotes: Note[] = [];

  const userData = getUser();

  try {
    const queryName: QueryNames = isSavedNoteTab
      ? "get_all_saved_notes"
      : isMyNoteTab
      ? "get_notes_by_user_id"
      : isNotePage
      ? "get_note_by_id"
      : "get_all_notes";
    const queryValue = Array.from(
      { length: isSavedNoteTab || isMyNoteTab ? 3 : 2 },
      () => userData.id
    );
    if (isNotePage) {
      queryValue.push(+searchParams.note);
    }

    notes = await executeQuery<Note[]>(queryName, queryValue);
    mostLoveNotes = await executeQuery<Note[]>("get_most_liked_notes", []);
  } catch (error) {
    console.log(error);
  }

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
                <a href="/"> Home </a>
                <a href="/?tab=saved%20notes"> Saved Notes </a>
                <a href="/?tab=my%20notes"> My Notes </a>
                <CreateNoteModal
                  image={
                    userData.avatar ||
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1200px-User-avatar.svg.png"
                  }
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
                  src={
                    userData.avatar ||
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1200px-User-avatar.svg.png"
                  }
                  alt="Avatar"
                />
                <p className="text-xl font-[500]">{userData.full_name}</p>
              </div>
            </div>
          </div>
        </Section>
        <Section className="min-w-[46%] overflow-auto border-x border-slate-700">
          <div className="flex flex-col">
            {notes?.length > 0
              ? notes.map((note) => (
                  <PostCard
                    id={note.id}
                    key={note.id}
                    title={note.title}
                    description={note.content}
                    authorImage={note.author_image}
                    author={note.author_name}
                    createdAt={note.created_at}
                    images={note.images ? note.images.split(",") : []}
                    isLiked={note.is_liked}
                    isSaved={note.is_saved}
                    likeCount={note.like_count}
                  />
                ))
              : null}
          </div>
        </Section>
        <Section className="w-[27%] py-5 flex justify-start">
          <div className="flex justify-between flex-col">
            <div>
              <p className="text-3xl font-extrabold">Most Loved</p>
              <div className="mt-10 text-lg flex flex-col gap-5">
                {mostLoveNotes?.map((note) => (
                  <a
                    href={`/?note=${note.id}`}
                    key={note.id}
                    className="hover:underline cursor-pointer"
                  >
                    {note.title}
                  </a>
                ))}
              </div>
            </div>
            <LogoutButton />
          </div>
        </Section>
      </div>
    </div>
  );
}
