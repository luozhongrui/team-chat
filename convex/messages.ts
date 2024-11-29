import {v} from "convex/values";
import { mutation, QueryCtx } from './_generated/server';
import {auth} from "./auth";
import {Id} from "./_generated/dataModel";



const getMember = async (
    ctx: QueryCtx,
      workspaceId: Id<"workspaces">,
      userId: Id<"users">) => {

        return ctx.db
        .query("members")
        .withIndex("by_user_id_and_workspace_id", (q) =>
             q.eq("userId", userId).eq("workspaceId", workspaceId)).unique();
      }

export const create = mutation({
    args: {
        body: v.string(),
        image: v.optional(v.id("_storage")),
        workspaceId: v.id("workspaces"),
        channelId : v.optional(v.id("channels")),
        parentMessageId: v.optional(v.id("messages")),
        //TODO add converstionId
    },
    handler: async (ctx, args) => {
        const userId = await auth.getUserId(ctx);

        if (!userId) {
            throw new Error("Not authenticated");
        }

        const member = await getMember(ctx, args.workspaceId, userId);

        if (!member) {
            throw new Error("Not a member of this workspace");
        }
         // handle conversationId
         
        const messageId = await ctx.db.insert("messages", {
            memberId: member._id,
            body: args.body,
            image: args.image,
            channelId: args.channelId,
            workspaceId: args.workspaceId,
            parentMessageId: args.parentMessageId,
            updatedAt: Date.now(),
        });

        return messageId;
    } 
})
