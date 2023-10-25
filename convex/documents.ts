import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";
// Mutations insert, update and remove data from the database,
// check authentication or perform other business logic,
// and optionally return a response to the client application.
//CRUD 정의하는 파일. 도큐먼트 스키마에 대하여. 이아이가 convex서버에서의 api

export const getNote = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity(); //convex서버에서 제공하는 함수
    if (!identity) {
      throw new Error("Not authenticated");
    }
    const documents = await ctx.db.query("documents").collect();
    return documents;
  },
});
// 노션작성 로직
export const create = mutation({
  args: {
    title: v.string(),
    parentDocument: v.optional(v.id("documents")),
  },
  handler: async (ctx, args) => {
    //컨텍스트와 아규먼트
    //일단 현재 로그인한 유저 Fetch
    const identity = await ctx.auth.getUserIdentity(); //convex서버에서 제공하는 함수
    if (!identity) {
      throw new Error("Not authenticated");
    }

    // 유저있으면, db에 insert
    const userId = identity.subject;
    const document = await ctx.db.insert("documents", {
      title: args.title,
      parentDocument: args.parentDocument,
      userId,
      isArchived: false,
      isPublished: false,
    });
    return document;
  },
});
