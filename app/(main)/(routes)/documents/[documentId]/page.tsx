"use client";
import { useMemo } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import DocToolbar from "@/app/(main)/_components/DocToolbar";
import DocCover from "@/components/DocCover";
import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";
// import DocEditor from "@/app/(main)/_components/DocEditor";

interface DocumentIdPageProps {
  params: {
    documentId: Id<"documents">;
  };
}
//다이나믹폴더 param넘어옴
const DocumentIdPage = ({ params }: DocumentIdPageProps) => {
  const DocEditor = useMemo(
    () =>
      dynamic(() => import("@/app/(main)/_components/DocEditor"), {
        ssr: false,
      }),
    []
  );
  const document = useQuery(api.documents.getDocumentById, {
    documentId: params.documentId,
  });

  const updateDocApi = useMutation(api.documents.updateDocument);
  const onChange = (content: string) => {
    //에디터에서 인자값으로 string화돼서 오는 컨텐트 업데이트
    console.log("content:::::::::::::::\n", content);
    updateDocApi({
      id: params.documentId,
      content,
    });
  };

  if (document === undefined) {
    return (
      <div>
        <DocCover.Skeleton />
        <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
          <div className="space-y-4 pl-8 pt-4">
            <Skeleton className="h-14 w-[50%]" />
            <Skeleton className="h-4 w-[80%]" />
            <Skeleton className="h-4 w-[40%]" />
            <Skeleton className="h-4 w-[60%]" />
          </div>
        </div>
      </div>
    );
  }

  if (document === undefined) {
    return <div>Not found.</div>;
  }
  return (
    <div className="pb-40 ">
      {/* <div className="h-[35vh]" /> */}
      <DocCover imgUrl={document.coverImage || ""} />
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
        <DocToolbar initialData={document} />
        <DocEditor onChange={onChange} initialContent={document.content} />
      </div>
    </div>
  );
};

export default DocumentIdPage;
