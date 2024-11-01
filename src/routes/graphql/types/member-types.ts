import { GraphQLFloat, GraphQLInt, GraphQLObjectType, GraphQLEnumType, GraphQLNonNull } from "graphql";
import { MemberTypeId } from "../../member-types/schemas.js";

export const MemberTypeEnum = new GraphQLEnumType({
  name: 'MemberTypeId',
  values: {
    [MemberTypeId.BASIC]: { value: MemberTypeId.BASIC },
    [MemberTypeId.BUSINESS]: { value: MemberTypeId.BUSINESS },
  }
})

export const MemberType = new GraphQLObjectType ({
  name: 'MemberType',
  fields: () => ({
    id: { type: new GraphQLNonNull(MemberTypeEnum) },
    discount: {type: new GraphQLNonNull(GraphQLFloat) },
    postsLimitPerMonth: { type: new GraphQLNonNull(GraphQLInt) },
  })
});
