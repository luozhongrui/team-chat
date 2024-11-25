import { UserButton } from "@/features/auth/components/user-button";
import { WorkspaceSwitcher } from "./workspace-switcher";
import { SidebarButton } from "./sidebar-button";
import { Bell, Home, MessageSquare, MoreHorizontal } from "lucide-react";
import { usePathname } from "next/navigation";
export const Sidebar = () => {
  const pathname = usePathname();
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
      <SidebarButton
        icon={Home}
        label="Home"
        isActive={pathname.includes("/workspace")}
      />
      <SidebarButton icon={MessageSquare} label="DMs" />
      <SidebarButton icon={Bell} label="Activity" />
      <SidebarButton icon={MoreHorizontal} label="More" />
      <div className="flex flex-col items-center justify-center gap-y-1 mt-auto">
        <UserButton />
      </div>
    </aside>
  );
};
