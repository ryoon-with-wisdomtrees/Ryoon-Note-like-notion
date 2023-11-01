"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { MenuIcon } from "lucide-react";
import { useParams } from "next/navigation";
import DocTitle from "./DocTitle";
import DocMenu from "./DocMenu";
import ArchivedDocBanner from "./ArchivedDocBanner";
import Publish from "./Publish";
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
      <nav className="bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full flex items-center justify-between ">
        <DocTitle.Skeleton />
        <div className="flex items-center gap-x-2">
          <DocMenu.Skeleton />
        </div>
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
          <div className="flex items-center gap-x-2 ">
            <Publish initialData={document} />
            <DocMenu documentId={document._id} />
          </div>
        </div>
      </nav>
      {document.isArchived && <ArchivedDocBanner documentId={document._id} />}
    </>
  );
};

export default DocNavBar;
