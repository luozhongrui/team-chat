import { query, QueryCtx  } from "./_generated/server"
import { v } from "convex/values"
import { auth } from "./auth"
import { Id } from "./_generated/dataModel"

const populateUser = (ctx: QueryCtx, id: Id<"users">) =>{
    return ctx.db.get(id);
}


export const get = query({
    args: {workspaceId: v.id("workspaces")},
    handler: async (ctx, args) => {
        const userId = await auth.getUserId(ctx)
        if (!userId) {
            return [];
        }
        const member = await ctx.db.query("members").withIndex("by_user_id_and_workspace_id", q => q.eq("userId", userId).eq("workspaceId", args.workspaceId)).unique()
        if (!member) {
            return [];
        }
        const data = await ctx.db.query("members").withIndex("by_workspace_id", q => q.eq("workspaceId", args.workspaceId)).collect();
        
        const members = [];

        for(const member of data){
            const user = await populateUser(ctx, member.userId);
            if(!user){
                continue;
            }
            members.push({...member, user});
        }
        return members;
    }
   
});

export const current = query({
    args: {workspaceId: v.id("workspaces")},
    handler: async (ctx, args) => {
        const userId = await auth.getUserId(ctx)
        if (!userId) {
            return null;
        }
        const member = await ctx.db.query("members").withIndex("by_user_id_and_workspace_id", q => q.eq("userId", userId).eq("workspaceId", args.workspaceId)).unique()
        if (!member) {
            return null;
        }
        return member;
    }

});