"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ImageIcon, X } from "lucide-react";
import { useCoverImage } from "@/hooks/use-cover-image";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";

interface Props {
  imgUrl?: string;
  preview?: boolean;
}
const DocCover = ({ imgUrl, preview }: Props) => {
  const params = useParams();
  const coverImge = useCoverImage();
  const removeCoverImgApi = useMutation(api.documents.removeCoverImg);

  const onRemove = () => {
    removeCoverImgApi({ id: params.documentId as Id<"documents"> });
  };

  return (
    <div
      className={cn(
        "relative w-full h-[35vh] group",
        !imgUrl && "h-[12vh]",
        imgUrl && "bg-muted"
      )}
    >
      {!!imgUrl && (
        <Image src={imgUrl} fill alt="doc cover" className="object-cover" />
      )}
      {imgUrl && !preview && (
        <div className="opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2 ">
          <Button
            onClick={coverImge.onOpen}
            className="text-muted-foreground text-xs"
            variant={"outline"}
            size={"sm"}
          >
            <ImageIcon className="h-4 w-4 mr-2" />
            Change cover
          </Button>
          <Button
            onClick={onRemove}
            className="text-muted-foreground text-xs"
            variant={"outline"}
            size={"sm"}
          >
            <X className="h-4 w-4 mr-2" />
            Remove
          </Button>
        </div>
      )}
    </div>
  );
};

export default DocCover;
