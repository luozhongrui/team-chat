import { UserButton } from "@/features/auth/components/user-button";
import { WorkspaceSwitcher } from "./workspace-switcher";
export const Sidebar = () => {
  return (
    <aside
      style={{
        width: "70px",
        height: "100%",
        backgroundColor: "#481349",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        alignItems: "center",
        paddingTop: "9px",
        paddingBottom: "16px",
      }}
    >
      <WorkspaceSwitcher />
      <div className="flex flex-col items-center justify-center gap-y-1 mt-auto">
        <UserButton />
      </div>
    </aside>
  );
};
