import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { clsx } from "clsx";
import { TrashIcon } from "lucide-react";

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
  const [value, setValue] = useState(initialValue);
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
          <button
            disabled={false}
            onClick={() => {}}
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
