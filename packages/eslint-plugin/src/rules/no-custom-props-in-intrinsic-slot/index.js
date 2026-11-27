// @ts-check
const { AST_NODE_TYPES, ESLintUtils } = require('@typescript-eslint/utils');
const { isTypeFlagSet } = require('@typescript-eslint/type-utils');
const ts = require('typescript');

const createRule = require('../../utils/createRule');
const { getTypeServices } = require('../../utils/type-services');

/**
 * @import { TSESTree } from '@typescript-eslint/utils'
 */

/**
 * Props that React consumes or that every slot accepts, even though they are not
 * declared on every intrinsic element type.
 */
const ALWAYS_ALLOWED = new Set(['as', 'ref', 'key', 'children']);

/** @param {string} name */
const isAlwaysAllowed = name => ALWAYS_ALLOWED.has(name) || name.startsWith('data-') || name.startsWith('aria-');

/**
 * @param {ts.Type} type
 * @returns {ts.Type[]}
 */
const getConstituents = type => (type.isUnion() ? type.types : [type]);

/**
 * @param {TSESTree.ObjectExpression} options
 * @returns {TSESTree.Node | undefined}
 */
function getElementTypeValue(options) {
  for (const property of options.properties) {
    if (
      property.type === AST_NODE_TYPES.Property &&
      !property.computed &&
      property.key.type === AST_NODE_TYPES.Identifier &&
      property.key.name === 'elementType'
    ) {
      return property.value;
    }
  }
  return undefined;
}

/**
 * @param {TSESTree.ObjectExpression} object
 * @param {TSESTree.SpreadElement} spread
 * @returns {Set<string>} keys that are set explicitly after `spread`, so they override the spread value
 */
function getKeysOverriddenAfter(object, spread) {
  const keys = new Set();
  const index = object.properties.indexOf(spread);
  for (const property of object.properties.slice(index + 1)) {
    if (property.type !== AST_NODE_TYPES.Property || property.computed) {
      continue;
    }
    if (property.key.type === AST_NODE_TYPES.Identifier) {
      keys.add(property.key.name);
    } else if (property.key.type === AST_NODE_TYPES.Literal && typeof property.key.value === 'string') {
      keys.add(property.key.value);
    }
  }
  return keys;
}

module.exports = createRule({
  name: 'no-custom-props-in-intrinsic-slot',
  defaultOptions: [],
  meta: {
    type: 'problem',
    docs: {
      description:
        'Disallow spreading props that are not valid attributes of the intrinsic element into a `slot.always` / `slot.optional` call',
    },
    messages: {
      customProps:
        '{{names}} {{verb}} not valid on <{{tags}}> but {{verb}} spread into the slot, so React renders {{pronoun}} as DOM attributes. Destructure {{pronoun}} before spreading.',
    },
    schema: [],
  },
  create(context) {
    const { esTreeNodeToTSNodeMap } = ESLintUtils.getParserServices(context);
    const { getType, typeChecker } = getTypeServices(context);

    /** @type {Map<string, Set<string>> | undefined} */
    let intrinsicProps;

    /**
     * Lazily maps every intrinsic tag name to the prop names its JSX type accepts.
     * @param {ts.Node} location
     */
    function getIntrinsicProps(location) {
      if (!intrinsicProps) {
        intrinsicProps = new Map();
        for (const tag of typeChecker.getJsxIntrinsicTagNamesAt(location)) {
          const propsType = typeChecker.getTypeOfSymbolAtLocation(tag, location);
          intrinsicProps.set(tag.name, new Set(typeChecker.getPropertiesOfType(propsType).map(prop => prop.name)));
        }
      }
      return intrinsicProps;
    }

    /**
     * @param {TSESTree.Node} node
     * @returns {string[] | undefined} intrinsic tag names, or undefined when the element type is a component or unknown
     */
    function getIntrinsicTags(node) {
      const type = getType(node);
      if (!type) {
        return undefined;
      }
      const tags = [];
      for (const constituent of getConstituents(type)) {
        if (!constituent.isStringLiteral()) {
          return undefined;
        }
        tags.push(constituent.value);
      }
      return tags.length > 0 ? tags : undefined;
    }

    /**
     * @param {ts.Symbol} prop
     * @param {ts.Node} location
     */
    function isNeverSet(prop, location) {
      const type = typeChecker.getTypeOfSymbolAtLocation(prop, location);
      return getConstituents(type).every(
        t => isTypeFlagSet(t, ts.TypeFlags.Never) || isTypeFlagSet(t, ts.TypeFlags.Undefined),
      );
    }

    return {
      /** @param {TSESTree.CallExpression} node */
      CallExpression(node) {
        const { callee } = node;
        if (
          callee.type !== AST_NODE_TYPES.MemberExpression ||
          callee.computed ||
          callee.object.type !== AST_NODE_TYPES.Identifier ||
          callee.object.name !== 'slot' ||
          callee.property.type !== AST_NODE_TYPES.Identifier ||
          (callee.property.name !== 'always' && callee.property.name !== 'optional')
        ) {
          return;
        }

        const [value, options] = node.arguments;
        if (value?.type !== AST_NODE_TYPES.ObjectExpression || options?.type !== AST_NODE_TYPES.ObjectExpression) {
          return;
        }

        const spreads = value.properties.filter(
          /** @returns {property is TSESTree.SpreadElement} */
          property => property.type === AST_NODE_TYPES.SpreadElement,
        );
        if (spreads.length === 0) {
          return;
        }

        const elementType = getElementTypeValue(options);
        const tags = elementType && getIntrinsicTags(elementType);
        if (!tags) {
          return;
        }

        const location = esTreeNodeToTSNodeMap.get(node);
        const allProps = getIntrinsicProps(location.getSourceFile());
        const tagProps = tags.map(tag => allProps.get(tag));
        if (tagProps.some(props => !props)) {
          // Unknown tag: nothing to compare against.
          return;
        }

        /** @param {string} name */
        const isValidOnSomeTag = name => tagProps.some(props => props?.has(name));

        for (const spread of spreads) {
          const spreadType = getType(spread.argument);
          if (
            !spreadType ||
            isTypeFlagSet(spreadType, ts.TypeFlags.Any) ||
            isTypeFlagSet(spreadType, ts.TypeFlags.Unknown)
          ) {
            continue;
          }

          const overridden = getKeysOverriddenAfter(value, spread);
          const invalid = new Set();
          for (const constituent of getConstituents(spreadType)) {
            for (const prop of typeChecker.getPropertiesOfType(typeChecker.getApparentType(constituent))) {
              const { name } = prop;
              if (
                isAlwaysAllowed(name) ||
                overridden.has(name) ||
                isValidOnSomeTag(name) ||
                isNeverSet(prop, location)
              ) {
                continue;
              }
              invalid.add(name);
            }
          }

          if (invalid.size > 0) {
            const names = [...invalid].sort();
            const plural = names.length > 1;
            context.report({
              node: spread,
              messageId: 'customProps',
              data: {
                names: names.map(name => `\`${name}\``).join(', '),
                tags: tags.join('> | <'),
                verb: plural ? 'are' : 'is',
                pronoun: plural ? 'them' : 'it',
              },
            });
          }
        }
      },
    };
  },
});
