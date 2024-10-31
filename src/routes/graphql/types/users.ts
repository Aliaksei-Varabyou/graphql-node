import { GraphQLID, GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";

export const UserType = new GraphQLObjectType ({
  name: 'UserType',
  fields: () => ({
    id: { type: GraphQLID },
    name: {type: GraphQLString },
    balance: {type: GraphQLInt },
  })
});
