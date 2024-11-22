"use client";

import { UserButton } from "@/features/auth/components/user-button";
import { useAuthActions } from "@convex-dev/auth/react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { signOut } = useAuthActions();

  return (
    <div>
      logged in!
      <UserButton />
      {/* <Button onClick={() => signOut()}>Sign Out</Button> */}
    </div>
  );
}
