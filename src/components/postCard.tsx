"use client";

import { dateFormatter } from "@/helper/date";
import Image from "next/image";
import { FaRegHeart, FaBookmark } from "react-icons/fa";
import { Carousel } from "react-responsive-carousel";

export const PostCard = ({
  author,
  title,
  createdAt,
  description,
  authorImage,
  images = [],
}: {
  author: string;
  title: string;
  description: string;
  authorImage: string;
  createdAt: string;
  images: string[];
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
              src={
                authorImage ||
                "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1200px-User-avatar.svg.png"
              }
              alt="Author Image"
            />
            <div>
              <div className="text-sm font-bold">{author}</div>
              <div className="text-xs">{dateFormatter(createdAt)}</div>
            </div>
          </div>
          <div className="text-lg font-semibold text-slate-300 mt-3">
            {title}
          </div>
          <div className="text-sm text-slate-300 mt-3">{description}</div>
        </div>
        {images.length > 0 ? (
          <Carousel showThumbs={false} showIndicators={false}>
            {images.map((note, key) => (
              <img key={key} width={455} src={note} />
            ))}
          </Carousel>
        ) : null}
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
