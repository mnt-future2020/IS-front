import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.optional(v.string()),
    email: v.string(),
    image: v.optional(v.string()),
    tokenIdentifier: v.string(), // For authentication
  }).index("by_token", ["tokenIdentifier"]),

  conversations: defineTable({
    userId: v.id("users"),
    title: v.string(),
    lastMessageAt: v.number(),
  }).index("by_userId", ["userId"]),

  messages: defineTable({
    conversationId: v.id("conversations"),
    role: v.union(v.literal("user"), v.literal("assistant")),
    content: v.string(),
    embedding: v.optional(v.array(v.float64())), // For Vector Search
    createdAt: v.number(),
  })
    .index("by_conversationId", ["conversationId"])
    .vectorIndex("by_embedding", {
      vectorField: "embedding",
      dimensions: 1536, // Standard for OpenAI embeddings
      filterFields: ["conversationId"],
    }),

  settings: defineTable({
    userId: v.id("users"),
    theme: v.string(),
    preferredModel: v.string(),
    notificationsEnabled: v.boolean(),
  }).index("by_userId", ["userId"]),
});
