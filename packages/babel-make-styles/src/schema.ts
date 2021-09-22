import type { JSONSchema7 } from 'json-schema';

export const configSchema: JSONSchema7 = {
  $schema: 'http://json-schema.org/schema',
  $id: 'babel-plugin-options',

  type: 'object',
  properties: {
    modules: {
      type: 'array',
      items: {
        type: 'object',
        required: ['moduleSource', 'importName'],
        properties: {
          moduleSource: {
            type: 'string',
          },
          importName: {
            type: 'string',
          },
        },
      },
    },
    babelOptions: {
      type: 'object',
      properties: {
        plugins: {
          type: 'array',
        },
        presets: {
          type: 'array',
        },
      },
    },
    evaluationRules: {
      type: 'array',
      items: {
        type: 'object',
        required: ['action'],
        properties: {
          action: {
            anyOf: [{}, { type: 'string' }, { const: 'ignore' }],
          },
          test: {},
        },
      },
    },
  },
  additionalProperties: false,
};
