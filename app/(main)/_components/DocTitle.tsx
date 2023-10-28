"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useRef, useState } from "react";

interface DocTitleProps {
  initialData: Doc<"documents">;
}
const DocTitle = ({ initialData }: DocTitleProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const docsUpdateFunction = useMutation(api.documents.updateDocument);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(initialData.title || "Untitled");

  const enableInput = () => {
    setTitle(initialData.title);
    setIsEditing(true);
    setTimeout(() => {
      inputRef?.current?.focus();
      inputRef?.current?.setSelectionRange(0, inputRef.current.value.length);
      //https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/setSelectionRange
    }, 0);
  };

  const disableInput = () => {
    setIsEditing(false);
  };

  //onBlur 포커스가 해지될 때의 이벤트 설정
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    docsUpdateFunction({
      id: initialData._id,
      title: event.target.value || "Untitled",
    });
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      disableInput();
    }
  };

  return (
    <div className="flex items-center gap-x-1">
      {!!initialData.icon && <p>{initialData.icon}</p>}
      {isEditing ? (
        <Input
          ref={inputRef}
          onClick={enableInput}
          onBlur={disableInput}
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={title}
          className="h-7 px-2 focus-visible:ring-transparent"
        />
      ) : (
        <Button
          onClick={enableInput}
          variant="ghost"
          size={"sm"}
          className="font-normal h-auto p-1"
        >
          <span className="truncate"> {initialData?.title}</span>
        </Button>
      )}
    </div>
  );
};

export default DocTitle;

const DocTitleSkeleton = () => {
  return <Skeleton className="h-9 w-16 rounded-md" />;
};
// 로딩시에 나올 스켈레톤 정의
DocTitle.Skeleton = DocTitleSkeleton;
