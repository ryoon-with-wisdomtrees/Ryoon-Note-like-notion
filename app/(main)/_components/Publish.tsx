"use client";

import { Doc } from "@/convex/_generated/dataModel";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useOrigin } from "@/hooks/use-origin";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { CheckIcon, CopyIcon, GlobeIcon } from "lucide-react";

interface PublishProps {
  initialData: Doc<"documents">;
}
const Publish = ({ initialData }: PublishProps) => {
  const origin = useOrigin();
  const updateDocApi = useMutation(api.documents.updateDocument);
  const [copied, setCopied] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const url = `${origin}/preview/${initialData._id}`;

  const onPublish = () => {
    setIsSubmitting(true);
    const promise = updateDocApi({
      id: initialData._id,
      isPublished: true,
    }).finally(() => setIsSubmitting(false));

    toast.promise(promise, {
      loading: "Publishing",
      success: "Note published",
      error: "Failed to publish note.",
    });
  };

  const onUnPublish = () => {
    setIsSubmitting(true);
    const promise = updateDocApi({
      id: initialData._id,
      isPublished: false,
    }).finally(() => setIsSubmitting(false));

    toast.promise(promise, {
      loading: "Un-Publishing",
      success: "Note Unpublished",
      error: "Failed to Unpublish note.",
    });
  };

  const onCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size={"sm"} variant={"ghost"}>
          Publish
          {initialData.isPublished && (
            <GlobeIcon className="w-4 h-4 text-sky-500 ml-2" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 " align="end" alignOffset={8} forceMount>
        {initialData.isPublished ? (
          <div className="space-y-4 ">
            <div className="flex items-center gap-x-2">
              <GlobeIcon className="text-sky-500 animate-pulse h-4 w-4" />
              <p className="text-xs font-medium text-sky-500">
                This note is live on web
              </p>
            </div>
            <div className="flex items-center">
              <input
                className="flex-1 px-2 text-xs border rounded-l-md h-8 bg-muted truncate "
                value={url}
                disabled
              />
              <Button
                className="h-8 rounded-l-none"
                onClick={onCopy}
                disabled={copied}
              >
                {copied ? (
                  <CheckIcon className="h-4 w-4 " />
                ) : (
                  <CopyIcon className="h-4 w-4" />
                )}
              </Button>
            </div>
            <Button
              size={"sm"}
              disabled={isSubmitting}
              onClick={onUnPublish}
              className="w-full text-xs"
            >
              {" "}
              Unpublish
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <GlobeIcon className="h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-sm font-medium mb-2">Publish This note</p>
            <span className="text-sm text-muted-foreground mb-4">
              Share your work with others.
            </span>
            <Button
              disabled={isSubmitting}
              onClick={onPublish}
              className="w-full text-xs"
              size={"sm"}
            >
              Publish
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default Publish;
