"use client";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import DocToolbar from "@/app/(main)/_components/DocToolbar";

interface DocumentIdPageProps {
  params: {
    documentId: Id<"documents">;
  };
}
//다이나믹폴더 param넘어옴
const DocumentIdPage = ({ params }: DocumentIdPageProps) => {
  const document = useQuery(api.documents.getDocumentById, {
    documentId: params.documentId,
  });

  if (document === undefined) {
    return <div> Loading...</div>;
  }

  if (document === undefined) {
    return <div>Not found.</div>;
  }
  return (
    <div className="pb-40 ">
      <div className="h-[35vh]" />
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
        <DocToolbar initialData={document} />
      </div>
    </div>
  );
};

export default DocumentIdPage;
