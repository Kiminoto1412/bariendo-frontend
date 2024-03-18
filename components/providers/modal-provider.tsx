"use client";

import { useEffect, useState } from "react";
import ChangePasswordDialogue from "../Login/ChangePasswordDialogue";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <ChangePasswordDialogue />
    </>
  );
};
