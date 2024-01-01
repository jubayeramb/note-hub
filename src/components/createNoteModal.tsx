"use client";

import { createNote } from "@/app/actions/createNote";
import { uploadFile } from "@/helper/media";
import Image from "next/image";
import { FormEvent, useState } from "react";
/* eslint-disable @next/next/no-img-element */
import { FiPlusCircle } from "react-icons/fi";
import { IoMdImage } from "react-icons/io";

export function CreateNoteModal({
  name,
  image,
}: {
  name: string;
  image: string;
}) {
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState<FileList>();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = { ...Object.fromEntries(formData), images };

    await createNote(data);
    setOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 border rounded-full pl-3 pr-4 py-2 mt-10"
      >
        <FiPlusCircle size={25} />
        <p>Create Note</p>
      </button>
      <dialog open={open} className="modal bg-[#00000080]">
        <div className="modal-box overflow-auto">
          <form onSubmit={onSubmit}>
            <div>
              <div className="flex justify-between items-center">
                <div className="flex gap-3 items-center">
                  <Image
                    width={35}
                    height={35}
                    className="rounded-full w-10 h-10"
                    src={image}
                    alt=""
                  />
                  <div>
                    <div className="text-sm font-bold">{name}</div>
                    <div className="text-xs">{"12:00 PM"}</div>
                  </div>
                </div>
              </div>

              <input
                type="text"
                name="title"
                className="w-full bg-slate-700 rounded-md p-3 mt-6 text-base text-white"
                placeholder="Note Title"
              />

              <textarea
                rows={5}
                name="content"
                className="w-full bg-slate-700 rounded-md p-3 mt-6 text-base text-white"
                placeholder="Write your note here..."
              />

              <div className="grid grid-cols-3 gap-2">
                {images &&
                  Array.from(images).map((image) => (
                    <Image
                      width={100}
                      height={100}
                      key={image.name}
                      src={URL.createObjectURL(image)}
                      alt={image.name}
                      className="h-40 w-[100%] object-contain bg-black"
                    />
                  ))}
              </div>
              <label
                htmlFor="file"
                className="btn btn-outline flex items-center gap-2 mt-4"
              >
                <IoMdImage size={20} />
                <p className="text-sm">Select image</p>
              </label>
              <input
                type="file"
                id="file"
                name="images"
                multiple
                className="hidden"
                onChange={(v) => v.target.files && setImages(v.target.files)}
              />
            </div>
            <div className="modal-action">
              <button
                className="btn btn-sm btn-ghost text-white"
                onClick={() => setOpen(false)}
              >
                Close
              </button>
              <button className="btn btn-sm btn-warning" type="submit">
                <FiPlusCircle size={20} />
                Post
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
}
