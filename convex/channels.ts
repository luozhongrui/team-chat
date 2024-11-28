import { mutation, query } from "./_generated/server";
import {v} from "convex/values";
import {auth} from "./auth";


export const remove = mutation({
    args: {
        id: v.id("channels"),
    },
    handler: async (ctx, args) => {
        const userId = await auth.getUserId(ctx);

        if(!userId){
            throw new Error("Unauthorized");
        }

        const channel = await ctx.db.get(args.id);
        if(!channel){
            throw new Error("Channel not found");
        }

        const memeber = await ctx.db.query("members").withIndex("by_user_id_and_workspace_id", (q)=>q.eq("userId", userId).eq("workspaceId", channel.workspaceId)).unique();
        if (!memeber || memeber.role !== "admin") {
            throw new Error("Unauthorized"); 
        }
        // TODO: delete all messages in the channel

        await ctx.db.delete(args.id);
        return args.id; 
    },
});



export const update = mutation({
    args: {
        id: v.id("channels"),
        name: v.string(),
    },
    handler: async (ctx, args) => {
        const userId = await auth.getUserId(ctx);

        if(!userId){
            throw new Error("Unauthorized");
        }

        const channel = await ctx.db.get(args.id);
        if(!channel){
            throw new Error("Channel not found");
        }

        const memeber = await ctx.db.query("members").withIndex("by_user_id_and_workspace_id", (q)=>q.eq("userId", userId).eq("workspaceId", channel.workspaceId)).unique();
        if (!memeber || memeber.role !== "admin") {
            throw new Error("Unauthorized"); 
        }

        await ctx.db.patch(args.id, {name: args.name});
        return args.id; 
    },
});


export const create = mutation({
    args: {
        name: v.string(),
        workspaceId: v.id("workspaces"),
    },
    handler: async (ctx, args) => {
        const userId = await auth.getUserId(ctx);

        if(!userId){
            throw new Error("Unauthorized");
        }

        const memeber = await ctx.db.query("members").withIndex("by_user_id_and_workspace_id", (q)=>q.eq("userId", userId).eq("workspaceId", args.workspaceId)).unique();
        if (!memeber || memeber.role !== "admin") {
            throw new Error("Unauthorized"); 
        }

        const parsedName = args.name.replace(/\s+/g, "-").toLowerCase();

        const channelId = await ctx.db.insert("channels", {
            name: parsedName,
            workspaceId: args.workspaceId,
        });

        return channelId;
    },
})

export const getById = query({
    args: {id: v.id("channels")},
    handler: async (ctx, args) => {
        const userId = await auth.getUserId(ctx);
        if (!userId) {
            return null;
        }

        const channel = await ctx.db.get( args.id);
        if(!channel){
            return null;    
        }

        const member = await ctx.db.query("members").withIndex("by_user_id_and_workspace_id", (q)=>q.eq("userId", userId).eq("workspaceId", channel.workspaceId)).unique();
        if (!member) {
            return null;
        }
        
        return channel;
    },
});

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