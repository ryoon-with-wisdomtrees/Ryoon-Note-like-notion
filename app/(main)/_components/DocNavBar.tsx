"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { MenuIcon } from "lucide-react";
import { useParams } from "next/navigation";
import DocTitle from "./DocTitle";
import Banner from "./Banner";
interface DocNavBarProps {
  isCollapsed: boolean;
  onResetWidth: () => void;
}
const DocNavBar = ({ isCollapsed, onResetWidth }: DocNavBarProps) => {
  const params = useParams();
  const document = useQuery(api.documents.getDocumentById, {
    documentId: params.documentId as Id<"documents">,
  });
  if (document === undefined) {
    return (
      <nav className="bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full flex items-center ">
        <DocTitle.Skeleton />
      </nav>
    );
  }

  if (document === null) {
    return null;
  }
  return (
    <>
      <nav className="bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full flex items-center gap-x-4">
        {isCollapsed && (
          <MenuIcon
            role="button"
            onClick={onResetWidth}
            className="h-6 w-6 text-muted-foreground"
          />
        )}

        <div className="flex items-center justify-between w-full">
          <DocTitle initialData={document} />
        </div>
      </nav>
      {document.isArchived && <Banner documentId={document._id} />}
    </>
  );
};

export default DocNavBar;
