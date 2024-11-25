import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { TrashIcon } from "lucide-react";
import { useUpdateWorkspace } from "@/features/workspaces/api/use-update-workspace";
import { useRemoveWorkspace } from "@/features/workspaces/api/use-remove-workspace";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface PreferencesModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  initialValue: string;
}

export const PreferencesModal = ({
  open,
  setOpen,
  initialValue,
}: PreferencesModalProps) => {
  const workspaceId = useWorkspaceId();
  const router = useRouter();

  const [value, setValue] = useState(initialValue);

  const [editOpen, setEditOpen] = useState(false);

  const { mutate: updateWorkspace, isPending: isUpdatingWorkspace } =
    useUpdateWorkspace();

  const { mutate: removeWorkspace, isPending: isRemovingWorkspace } =
    useRemoveWorkspace();

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateWorkspace(
      {
        id: workspaceId,
        name: value,
      },
      {
        onSuccess: () => {
          toast.success("Workspace updated successfully");
          setEditOpen(false);
        },
        onError: () => {
          toast.error("Failed to update workspace");
        },
      }
    );
  };

  const handleRemove = () => {
    removeWorkspace(
      {
        id: workspaceId,
      },
      {
        onSuccess: () => {
          toast.success("Workspace removed successfully");
          router.push("/");
        },
        onError: () => {
          toast.error("Failed to remove workspace");
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-0 bg-gray-50 overflow-hidden">
        <DialogHeader className="p-4 border-b bg-white">
          <DialogTitle>{value}</DialogTitle>
        </DialogHeader>
        <div
          style={{
            padding: "0 16px 16px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <Dialog open={editOpen} onOpenChange={setEditOpen}>
            <DialogTrigger asChild>
              <div
                style={{
                  padding: "16px 20px",
                  backgroundColor: "white",
                  borderRadius: "8px",
                  border: "1px solid #e5e7eb",
                  cursor: "pointer",
                  transition: "background-color 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#f9fafb")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "white")
                }
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <p style={{ fontSize: "14px", fontWeight: "600" }}>
                    Workspace name
                  </p>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#1264a3",
                      fontWeight: "600",
                      textDecoration: "underline",
                      cursor: "pointer",
                    }}
                  >
                    Edit
                  </p>
                </div>
                <p style={{ fontSize: "14px" }}>{value}</p>
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Rename this workspace</DialogTitle>
              </DialogHeader>
              <form className="space-y-4" onSubmit={handleEdit}>
                <Input
                  value={value}
                  disabled={isUpdatingWorkspace}
                  onChange={(e) => setValue(e.target.value)}
                  required
                  autoFocus
                  minLength={3}
                  maxLength={80}
                  placeholder="Workspace name e.g. 'Marketing'"
                />
                <DialogFooter>
                  <DialogClose>
                    <Button variant="outline" disabled={isUpdatingWorkspace}>
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button disabled={isUpdatingWorkspace}>Save</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
          <button
            disabled={isRemovingWorkspace}
            onClick={handleRemove}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "16px 20px",
              backgroundColor: "white",
              borderRadius: "8px",
              border: "1px solid #e5e7eb",
              cursor: "pointer",
              color: "#e11d48",
              transition: "background-color 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#f9fafb")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "white")
            }
          >
            <TrashIcon style={{ width: "16px", height: "16px" }} />
            <p style={{ fontSize: "14px", fontWeight: "600" }}>
              Delete workspace
            </p>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
