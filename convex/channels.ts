import { query } from "./_generated/server";
import {v} from "convex/values";
import {auth} from "./auth";

export const get = query({
    args: {workspaceId: v.id("workspaces")},
    handler: async (ctx, args) => {
        const userId = await auth.getUserId(ctx);

        if(!userId){
           return [];
        }

        const memeber = await ctx.db.query("members").withIndex("by_user_id_and_workspace_id", (q)=>q.eq("userId", userId).eq("workspaceId", args.workspaceId)).unique();
        if (!memeber) {
            return []; 
        }

        const channels =  await ctx.db.query("channels").withIndex("by_workspace_id", (q)=>q.eq("workspaceId", args.workspaceId)).collect();
        return channels;
    },
});