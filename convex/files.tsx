import {v} from 'convex/values';
import { mutation, query } from './_generated/server'; 

export const createFile = mutation({
    args:{
        fileName: v.string(),
        teamId: v.string(),
        createdBy: v.string(),
        archive: v.boolean(),
        document: v.string(),
        whiteboard: v.string()
    },
    handler:async(ctx, args) => {
        const result = await ctx.db.insert('files', args);
        return result;
    },
})

export const getFiles=query({
    args:{
        teamId: v.string()
    },
    handler:async(ctx, args)=>{
        const result = ctx.db.query('files')
        .filter(q=>q.eq(q.field('teamId'),args.teamId))
        .order('desc')
        .collect();

        return result;
    },
})

export const updateDocument = mutation({
    args: {
        _id: v.id('files'),
        document: v.string()
    },
    handler: async(ctx, args) => {
        const result = await ctx.db.patch(args._id,{document:args.document});
        return result;
    },
})

export const getFileById = query({
    args: {
        _id : v.id('files')
    },
    handler:async(ctx, args) => {
        const result = await ctx.db.get(args._id);
        return result;
    }
})

export const updateWhiteboard = mutation({
    args: {
        _id: v.id('files'),
        whiteboard: v.string()
    },
    handler: async(ctx, args) => {
        const result = await ctx.db.patch(args._id,{whiteboard:args.whiteboard});
        return result;
    },
})

export const searchFiles = query({
  args: {
    query: v.string(),
  },
  handler: async (ctx, args) => {
    const allFiles = await ctx.db.query('files').collect();

    const filtered = allFiles.filter(file =>
      file.name.toLowerCase().includes(args.query.toLowerCase())
    );

    return filtered;
  },
});

export const archiveFile = mutation({
  args: { fileId: v.id("files") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.fileId, {
      archive: true,
    });
  },
});
