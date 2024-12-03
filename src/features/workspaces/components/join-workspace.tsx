"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useJoinWorkspaceModal } from "../store/use-join-workspace-modal";
import { useCreateWorkspace } from "../api/use-create-workspace";

export const JoinWorkspaceModal = () => {
  const router = useRouter();
  const [open, setOpen] = useJoinWorkspaceModal();

  const [name, setName] = useState("");

  const handleClose = () => {
    setOpen(false);
    setName("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleClose();
    router.push(`${name}`);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Join a Workspace</DialogTitle>
          <DialogDescription>
            Join a workspace to chat with your Team.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <Input
            disabled={false}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoFocus
            minLength={3}
            placeholder="Join Link e.g. http:/join/k1723hsz1xbckcxk77f4fed63975j7xw"
          />
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button disabled={false} type="submit">
              Join
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
