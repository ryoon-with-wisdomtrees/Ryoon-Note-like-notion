"use client";

import { useEffect, useState } from "react";
import SettingModal from "@/components/modals/SettingModal";
import { CoverImageModal } from "@/components/modals/CoverImageModal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  // none of the modals are gonna be rendered unless we are fully on the client side.
  if (!isMounted) return null;
  return (
    <>
      <SettingModal />
      <CoverImageModal />
    </>
  );
};
