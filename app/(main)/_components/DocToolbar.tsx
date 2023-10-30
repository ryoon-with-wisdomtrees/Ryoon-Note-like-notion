"use client";

import { Doc } from "@/convex/_generated/dataModel";

interface DocToolbarProps {
  initialData: Doc<"documents">;
  preview?: boolean;
}

const DocToolbar = ({ initialData, preview }: DocToolbarProps) => {
  return (
    <div className="pl-[54px] grout relative">
      {!!initialData.icon && !preview && (
        <div className="flex items-center gap-x-2 group/icon pt-6"></div>
      )}
    </div>
  );
};

export default DocToolbar;
