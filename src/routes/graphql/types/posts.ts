import { GraphQLID, GraphQLObjectType, GraphQLString } from "graphql";
import { MemberTypeEnum } from "./member-types.js";

export const PostType = new GraphQLObjectType ({
  name: 'PostType',
  fields: () => ({
    id: { type: GraphQLID },
    title: {type: GraphQLString },
    content: {type: GraphQLString },
    authorId: { type: MemberTypeEnum },
  })
});
