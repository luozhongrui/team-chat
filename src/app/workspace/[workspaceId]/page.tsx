"use client";
import { useMemo, useEffect } from "react";
import { useRouter, redirect } from "next/navigation";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { useCreateChannelModal } from "@/features/channels/store/use-create-channel-modal";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useGetChannels } from "@/features/channels/api/use-get-channels";
import { useCurrentMember } from "@/features/members/api/use-current-member";
import { Loader, TriangleAlert } from "lucide-react";
import { useConvexAuth } from "convex/react";

const WorkspaceIdPage = () => {
  const router = useRouter();
  const workspaceId = useWorkspaceId();
  const [open, setOpen] = useCreateChannelModal();

  const { data: member, isLoading: memberLoading } = useCurrentMember({
    workspaceId,
  });

  const { data: workspace, isLoading: workspaceLoading } = useGetWorkspace({
    id: workspaceId,
  });
  const { data: channels, isLoading: channelsLoading } = useGetChannels({
    workspaceId,
  });

  const channelId = useMemo(() => channels?.[0]?._id, [channels]);

  const isAdmin = useMemo(() => member?.role === "admin", [member?.role]);
  useEffect(() => {
    if (
      workspaceLoading ||
      channelsLoading ||
      memberLoading ||
      !member ||
      !workspace
    )
      return;
    if (channelId) {
      router.push(`/workspace/${workspaceId}/channel/${channelId}`);
    } else if (!open && isAdmin) {
      setOpen(true);
    }
  }, [
    member,
    memberLoading,
    isAdmin,
    channelId,
    workspaceLoading,
    channelsLoading,
    workspace,
    open,
    setOpen,
    router,
    workspaceId,
  ]);

  const { isAuthenticated, isLoading } = useConvexAuth();

  if (isLoading) {
    return <div className="h-full flex-1 items-center justify-center flex-col gap-2">
    <Loader className="size-6 animate-spin text-muted-foreground" />
  </div>;
  }

  if (!isAuthenticated) {
    redirect("/");
  }

  if (workspaceLoading || channelsLoading || memberLoading)
    return (
      <div className="h-full flex-1 items-center justify-center flex-col gap-2">
        <Loader className="size-6 animate-spin text-muted-foreground" />
      </div>
    );

  if (!workspace || !member) {
    return (
      <div className="h-full flex-1 items-center justify-center flex-col gap-2">
        <TriangleAlert className="size-6 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">
          Workspace not found
        </span>
      </div>
    );
  }
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.5rem",
      }}
    >
      <TriangleAlert
        style={{ fontSize: "1.5rem", color: "var(--muted-foreground)" }}
      />
      <span style={{ fontSize: "0.875rem", color: "var(--muted-foreground)" }}>
        Not channel found
      </span>
    </div>
  );
};

export default WorkspaceIdPage;
