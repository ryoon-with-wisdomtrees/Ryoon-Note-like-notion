"use client";

import { Spinner } from "@/components/Spinner";
import { ConfirmModal } from "@/components/modals/confirmModal";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { Search, Trash, Undo } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const TrashBox = () => {
  const router = useRouter();
  const params = useParams();
  const documents = useQuery(api.documents.getTrash);
  const restore = useMutation(api.documents.restore);

  const remove = useMutation(api.documents.remove);

  const [search, setSearch] = useState("");
  const filteredDoc = documents?.filter((doc) => {
    return doc.title.toLowerCase().includes(search.toLowerCase());
  });

  //이동
  const onClick = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };

  //복구
  const onRestore = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    documentId: Id<"documents">
  ) => {
    event.stopPropagation();
    const promise = restore({ id: documentId });
    toast.promise(promise, {
      loading: "Restoring Note...",
      success: "Note Restored",
      error: "Failed to Restored",
    });
  };

  //완전삭제
  const onDelete = (documentId: Id<"documents">) => {
    const promise = remove({ id: documentId });
    toast.promise(promise, {
      loading: "Deleting Note...",
      success: "Note Deleted",
      error: "Failed to Deleted",
    });

    if (params.documentId === documentId) {
      router.push("/documents");
    }
  };

  //아직 Db에서 안가져왔을때는, Spinner(loading)
  if (documents === undefined) {
    return (
      <div className="h-full flex items-center justify-center p-4 ">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="text-sm">
      <div className="flex flex-row items-center gap-x-1 p-2">
        <Search className="h-4 w-4 " />
        <Input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          className="h-7 px-2 focus-visible:ring-transparent bg-secondary"
          placeholder="Filter by page title..."
        />
      </div>
      <div className="mt-2 px-1 pb-1">
        <p className="hidden last:block text-sm text-center text-muted-foreground ">
          {/**only visible if it's the last element inside of this list */}
          No Documents found
        </p>
        {filteredDoc?.map((doc) => (
          <div
            key={doc._id}
            role="button"
            onClick={(e) => {
              onClick(doc._id);
            }}
            className="text-sm rounded-sm w-full hover:bg-primary/5 flex items-center text-primary justify-between "
          >
            <span className="truncate pl-2">{doc.title}</span>
            <div className="flex items-center">
              <div
                onClick={(e) => {
                  onRestore(e, doc._id);
                }}
                role="button"
                className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600"
              >
                <Undo className="h-4 w-4 text-muted-foreground" />
              </div>
              <ConfirmModal
                onConfirm={() => {
                  onDelete(doc._id);
                }}
              >
                <div
                  role="button"
                  className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600"
                >
                  <Trash className="h-4 w-4 text-muted-foreground" />
                </div>
              </ConfirmModal>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrashBox;
