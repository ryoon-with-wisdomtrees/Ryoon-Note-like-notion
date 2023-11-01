"use client";

import { Doc } from "@/convex/_generated/dataModel";
import React from "react";
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";

interface DocEditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
}

const DocEditor = ({ onChange, initialContent, editable }: DocEditorProps) => {
  return <div>DocEditor</div>;
};

export default DocEditor;
