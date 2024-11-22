"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateWorkspaceModal } from "../store/use-create-workspace-modal";
import { useCreateWorkspace } from "../api/use-create-workspace";

export const CreateWorkspaceModal = () => {
  const [open, setOpen] = useCreateWorkspaceModal();
  const { mutate } = useCreateWorkspace();

  const heandleClose = () => {
    setOpen(false);
    // TODO: Clear form
  };

  const handleSubmit = () => {
    mutate(
      { name: "Workspace 1" },
      {
        onSuccess: () => {
          // Redirect to the workspace
        },
        onError: () => {
          // Show error
        },
        onSettled: () => {
          // Reset form
        },
      }
    );
  };
  return (
    <Dialog open={open} onOpenChange={heandleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a Workspace</DialogTitle>
          <DialogDescription>
            Create a new workspace to start collaborating with your team.
          </DialogDescription>
        </DialogHeader>
        <form style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Input
            disabled={false}
            value={""}
            required
            autoFocus
            minLength={3}
            placeholder="Workspace Name e.g. 'work', 'Personal', 'Team'"
          />
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button type="submit">Create</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
