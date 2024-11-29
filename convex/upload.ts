import {mutation} from "./_generated/server";


export const generateUpload =  mutation(async (ctx) => {
    return await ctx.storage.generateUploadUrl();
});