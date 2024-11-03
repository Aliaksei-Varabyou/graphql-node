import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { graphql, GraphQLSchema, validate, specifiedRules, parse } from 'graphql';
import { RootQueryType } from './queries.js';
import { Mutations } from './mutations.js';
import depthLimit from 'graphql-depth-limit';
import { getLoaders } from './loaders.js';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const { prisma } = fastify;

  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      const source = req.body.query;

      const document = parse(source);

      const validationErrors = validate(schema, document, [...specifiedRules, depthLimit(5)]);
      if (validationErrors.length > 0) {
        return { errors: validationErrors };
      }
      
      return graphql({
        schema,
        source,
        variableValues: req.body.variables,
        contextValue: {
          prisma: prisma,
          loaders: getLoaders(prisma)
        }
      });
    },
  });
};

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: Mutations,
});

export default plugin;
