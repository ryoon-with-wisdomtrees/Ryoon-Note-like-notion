import { useEffect, useState } from "react";

export const useOrigin = () => {
  const [mounted, setMounted] = useState(false);
  //   The Window.location read-only property returns a Location object with information
  // about the current location of the document.
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";
  //origin returns Returns a string containing the canonical form of the origin of the specific location.
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return "";
  }
  return origin;
};
