"use client";

/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import { FaRegHeart, FaHeart, FaBookmark, FaRegBookmark } from "react-icons/fa";
import { FiPlusCircle } from "react-icons/fi";
import { CreateNoteModal } from "@/components/createNoteModal";

const notes = [
  "https://mzucker.github.io/images/noteshrink/notesA1_output.png",
  "https://mzucker.github.io/images/noteshrink/notesA1_output.png",
  "https://mzucker.github.io/images/noteshrink/notesA1_output.png",
  "https://mzucker.github.io/images/noteshrink/notesA1_output.png",
  "https://mzucker.github.io/images/noteshrink/notesA1_output.png",
  "https://mzucker.github.io/images/noteshrink/notesA1_output.png",
  "https://mzucker.github.io/images/noteshrink/notesA1_output.png",
];

export const Section = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => <div className={"w-full h-full " + className}>{children}</div>;

export const PostCard = ({
  title,
  createdAt,
  description,
  image,
}: {
  title: string;
  description: string;
  image: string;
  createdAt: string;
}) => (
  <div className="border-b border-slate-700 p-6">
    <div className="bg-slate-700 rounded-lg w-full min-h-[500px] ">
      <div className="flex flex-col overflow-hidden">
        <div className="m-3">
          <div className="flex gap-3 items-center">
            <Image
              width={35}
              height={35}
              className="rounded-full"
              src="https://pbs.twimg.com/profile_images/1689224398639882240/TbTgFZFN_400x400.jpg"
              alt=""
            />
            <div>
              <div className="text-sm font-bold">{title}</div>
              <div className="text-xs">{createdAt}</div>
            </div>
          </div>
          <div className="text-sm text-slate-300 mt-3">{description}</div>
        </div>
        <Carousel showThumbs={false} showIndicators={false}>
          {notes.map((note, key) => (
            <img key={key} width={455} src={note} />
          ))}
        </Carousel>
      </div>
      <div className="flex justify-between items-center p-6">
        <div className="flex items-center gap-2">
          <FaRegHeart />
          <p className="font-bold">100</p>
        </div>
        <FaBookmark />
      </div>
    </div>
  </div>
);

export default function Home() {
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
                <p>Home</p>
                <p>Saved Notes</p>
                <CreateNoteModal
                  image={
                    "https://pbs.twimg.com/profile_images/1689224398639882240/TbTgFZFN_400x400.jpg"
                  }
                  name={"Zahin Afsar"}
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Image
                width={40}
                height={40}
                className="rounded-full"
                src="https://pbs.twimg.com/profile_images/1689224398639882240/TbTgFZFN_400x400.jpg"
                alt=""
              />
              <p className="text-xl font-[500]">Zahin Afsar</p>
            </div>
          </div>
        </Section>
        <Section className="w-[46%] overflow-auto border-x border-slate-700">
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
