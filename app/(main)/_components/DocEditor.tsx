"use client";
import { useTheme } from "next-themes";
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import "@blocknote/core/style.css";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import { useEdgeStore } from "@/lib/edgestore";

interface DocEditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
}

const DocEditor = ({ onChange, initialContent, editable }: DocEditorProps) => {
  const { resolvedTheme } = useTheme();
  const { edgestore } = useEdgeStore();

  const hanldeUpload = async (file: File) => {
    const response = await edgestore.publicFiles.upload({ file });
    return response.url;
  };

  // Creates a new editor instance.
  const editior: BlockNoteEditor = useBlockNote({
    editable,
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
    onEditorContentChange: (editior) => {
      console.log("editior:::", editior);
      onChange(JSON.stringify(editior.topLevelBlocks, null, 2));
    },
    uploadFile: hanldeUpload,
  });
  return (
    <div>
      {/*  Renders the editor instance using a React component. */}
      {/* Next.js usage (or other server-side React frameworks)  */}
      {/* Are you using Next.js (create-next-app)?  */}
      {/* Because BlockNote is a client-only component, make sure to disable  */}
      {/* server-side rendering of BlockNote. Read our guide on setting up Next.js + BlockNote */}
      <BlockNoteView
        editor={editior}
        theme={resolvedTheme === "dark" ? "dark" : "light"}
      />
    </div>
  );
};

export default DocEditor;
