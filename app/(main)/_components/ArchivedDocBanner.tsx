"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ConfirmModal } from "@/components/modals/confirmModal";
// import { useRouter } from "next/router";

type ArchivedDocBannerProps = {
  documentId: Id<"documents">;
};
const ArchivedDocBanner = ({ documentId }: ArchivedDocBannerProps) => {
  const router = useRouter();
  const removeDoc = useMutation(api.documents.remove);
  const restoreDoc = useMutation(api.documents.restore);

  const onRemove = () => {
    const promise = removeDoc({ id: documentId });
    toast.promise(promise, {
      loading: "Deleting note...",
      success: "Note deleted!",
      error: "Failed to delete note.",
    });
    router.push("/documents");
  };

  const onRestore = () => {
    const promise = restoreDoc({ id: documentId });
    toast.promise(promise, {
      loading: "Restoring note...",
      success: "Note restored!",
      error: "Failed to restore note.",
    });
  };

  return (
    <div className="w-full bg-rose-500 text-center text-sm p-2 text-white flex items-center gap-x-2 justify-center">
      <p>This page is in the Trash.</p>
      <Button
        size={"sm"}
        onClick={onRestore}
        variant={"outline"}
        className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal"
      >
        Restore Page
      </Button>
      <ConfirmModal onConfirm={onRemove}>
        <Button
          size={"sm"}
          //   onClick={onRemove}
          variant={"outline"}
          className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal"
        >
          Delete Permanently
        </Button>
      </ConfirmModal>
    </div>
  );
};

export default ArchivedDocBanner;
