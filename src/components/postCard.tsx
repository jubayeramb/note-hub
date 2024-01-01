"use client";

import Image from "next/image";
import { FaRegHeart, FaBookmark } from "react-icons/fa";
import { Carousel } from "react-responsive-carousel";

export const notes = [
  "https://mzucker.github.io/images/noteshrink/notesA1_output.png",
  "https://mzucker.github.io/images/noteshrink/notesA1_output.png",
  "https://mzucker.github.io/images/noteshrink/notesA1_output.png",
  "https://mzucker.github.io/images/noteshrink/notesA1_output.png",
  "https://mzucker.github.io/images/noteshrink/notesA1_output.png",
  "https://mzucker.github.io/images/noteshrink/notesA1_output.png",
  "https://mzucker.github.io/images/noteshrink/notesA1_output.png",
];

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
