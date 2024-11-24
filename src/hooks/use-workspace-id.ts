import { useParams } from "next/navigation";

import { Id} from "../../convex/_generated/dataModel";


export const useWorkspaeId = () => {
    const params = useParams();

    return params.workspaceId as Id<"workspaces">;
}