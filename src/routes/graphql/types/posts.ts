import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { MemberTypeEnum } from "./member-types.js";
import { UUIDType } from "./uuid.js";

export const Post = new GraphQLObjectType ({
  name: 'PostType',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    title: {type: new GraphQLNonNull(GraphQLString) },
    content: {type: new GraphQLNonNull(GraphQLString) },
    // authorId: { type: UUIDType },
  })
});
