"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { useCoverImage } from "@/hooks/use-cover-image";
import { SingleImageDropzone } from "@/components/singleImageDropzone";
import { useState } from "react";
import { useEdgeStore } from "@/lib/edgestore";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";

export const CoverImageModal = () => {
  const params = useParams();
  console.log("params:", params);
  const updateDocApi = useMutation(api.documents.updateDocument);
  const coverImage = useCoverImage();
  const { edgestore } = useEdgeStore();

  const [file, setFile] = useState<File>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onClose = () => {
    setFile(undefined);
    setIsSubmitting(false);
    coverImage.onClose();
  };
  const onChangeCoverImg = async (file?: File) => {
    if (file) {
      setIsSubmitting(true);
      setFile(file);
      // let res;
      const res = await edgestore.publicFiles.upload({
        file,
        options: {
          replaceTargetUrl: coverImage.url,
        },
        // ...
      });
      // if (coverImage.url) {
      //   //있으면 replace
      //   res = await edgestore.publicFiles.upload({
      //     file,
      //     options: {
      //       replaceTargetUrl: coverImage.url,
      //     },
      //   });
      // } else {
      //   res = await edgestore.publicFiles.upload({ file }); //edgestore에 저장하고
      // }

      await updateDocApi({
        id: params.documentId as Id<"documents">,
        coverImage: res.url, // (await result).url //convex에 저장.
      });
      onClose();
    }
  };

  return (
    <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
      <DialogContent>
        <DialogHeader>
          <h2 className="text-center text-lg font-semibold">Cover Image</h2>
        </DialogHeader>
        <SingleImageDropzone
          className="w-full outline-none"
          disabled={isSubmitting}
          value={file}
          onChange={onChangeCoverImg}
        />
      </DialogContent>
    </Dialog>
  );
};
