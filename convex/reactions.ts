import { mutation, QueryCtx } from "./_generated/server";
import {Id} from "./_generated/dataModel";
import {v} from "convex/values";
import { auth } from "./auth";

const getMember = async (
    ctx: QueryCtx,
      workspaceId: Id<"workspaces">,
      userId: Id<"users">) => {

        return ctx.db
        .query("members")
        .withIndex("by_user_id_and_workspace_id", (q) =>
             q.eq("userId", userId).eq("workspaceId", workspaceId)).unique();
};

export const toggle = mutation({
    args: {messageId: v.id("messages"), value: v.string()},
    handler: async (ctx, args) => {
        const userId = await auth.getUserId(ctx);
        if (!userId) {
            throw new Error("Not authenticated");
        }
        const message = await ctx.db.get(args.messageId);
        if (!message) {
            throw new Error("Message not found");
        }
        const member = await getMember(ctx, message.workspaceId, userId);
        if (!member) {
            throw new Error("Not a member of this workspace");
        }
        const exsitingMessageReaction = await ctx.db
        .query("reactions")
        .filter((q) => 
        q.and(
            q.eq(q.field("messageId"), args.messageId),
            q.eq(q.field("memberId"), member._id),
            q.eq(q.field("value"), args.value)
        )
    )
    .first();
    if(exsitingMessageReaction){
        
        await ctx.db.delete(exsitingMessageReaction._id);
        return exsitingMessageReaction._id;
    }else{
       const newReactionId =  await ctx.db.insert("reactions", {
            value: args.value,
            memberId: member._id,
            messageId: message._id,
            workspaceId: message.workspaceId,
        });
        return newReactionId;
    }
}
});