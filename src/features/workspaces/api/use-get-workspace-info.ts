import { api } from "../../../../convex/_generated/api";
import { useQuery } from "convex/react";
import { Id } from "../../../../convex/_generated/dataModel";
import { getInfoById } from '../../../../convex/workspaces';

interface useGetWorkspaceInfoProps {
  id: Id<"workspaces">;
}

export const useGetWorkspaceInfo = ({id}: useGetWorkspaceInfoProps) => {
  const data = useQuery(api.workspaces.getInfoById, {id});
  const isLoading = data === undefined;
  return { data, isLoading };
};
