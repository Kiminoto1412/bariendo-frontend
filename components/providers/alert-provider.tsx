"use client";

import { useEffect, useState } from "react";
import AlertLoginOrganization from "../Alert/AlertLoginOrganization";
import ChangePasswordDialogue from "../Login/ChangePasswordDialogue";

export const AlertProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <AlertLoginOrganization />
      <ChangePasswordDialogue />
    </>
  );
};
