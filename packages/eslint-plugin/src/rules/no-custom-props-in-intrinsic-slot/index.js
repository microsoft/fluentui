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
 * @param {TSESTree.Property} property
 * @returns {string | undefined} the key of a non-computed identifier or string-literal property
 */
function getStaticKey(property) {
  if (property.key.type === AST_NODE_TYPES.Identifier) {
    return property.key.name;
  }
  if (property.key.type === AST_NODE_TYPES.Literal && typeof property.key.value === 'string') {
    return property.key.value;
  }
  return undefined;
}

/**
 * @param {TSESTree.ObjectExpression} options
 * @param {string} name
 * @returns {TSESTree.Node | undefined}
 */
function getOptionValue(options, name) {
  for (const property of options.properties) {
    if (property.type === AST_NODE_TYPES.Property && !property.computed && getStaticKey(property) === name) {
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
    const key = property.type === AST_NODE_TYPES.Property && !property.computed ? getStaticKey(property) : undefined;
    if (key !== undefined) {
      keys.add(key);
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
     * The possible values of `as` while walking the merged slot props in order: a tag name,
     * ABSENT (`as` is unset or nullish, so the slot renders `elementType`) or UNKNOWN (a component or an arbitrary string).
     * @typedef {Set<string | symbol>} AsState
     */
    const ABSENT = Symbol('absent');
    const UNKNOWN = Symbol('unknown');

    /**
     * @param {ts.Type} type
     * @returns {AsState}
     */
    function getAsValues(type) {
      /** @type {AsState} */
      const values = new Set();
      for (const constituent of getConstituents(type)) {
        if (constituent.isStringLiteral()) {
          values.add(constituent.value);
        } else if (
          isTypeFlagSet(constituent, ts.TypeFlags.Undefined) ||
          isTypeFlagSet(constituent, ts.TypeFlags.Null)
        ) {
          values.add(ABSENT);
        } else if (!isTypeFlagSet(constituent, ts.TypeFlags.Never)) {
          values.add(UNKNOWN);
        }
      }
      return values;
    }

    /** @param {ts.Symbol} symbol */
    function isOptional(symbol) {
      // eslint-disable-next-line no-bitwise
      return (symbol.getFlags() & ts.SymbolFlags.Optional) !== 0;
    }

    /**
     * Applies a spread of `type` on top of `state`: a required `as` replaces it, an optional one may or may not.
     * @param {AsState} state
     * @param {ts.Type | undefined} type
     * @param {ts.Node} location
     * @returns {AsState}
     */
    function spreadAs(state, type, location) {
      if (!type || isTypeFlagSet(type, ts.TypeFlags.Any) || isTypeFlagSet(type, ts.TypeFlags.Unknown)) {
        return new Set([...state, UNKNOWN]);
      }
      /** @type {AsState} */
      const next = new Set();
      for (const constituent of getConstituents(type)) {
        const asProp = typeChecker.getPropertyOfType(typeChecker.getApparentType(constituent), 'as');
        if (!asProp || isOptional(asProp)) {
          state.forEach(value => next.add(value));
        }
        if (asProp) {
          getAsValues(typeChecker.getTypeOfSymbolAtLocation(asProp, location)).forEach(value => next.add(value));
        }
      }
      return next;
    }

    /**
     * Walks an object literal's entries in order, as object spread merges them.
     * @param {AsState} state
     * @param {TSESTree.ObjectExpression} object
     * @param {ts.Node} location
     * @returns {AsState}
     */
    function mergeObjectAs(state, object, location) {
      let current = state;
      for (const property of object.properties) {
        if (property.type === AST_NODE_TYPES.SpreadElement) {
          current = spreadAs(current, getType(property.argument), location);
        } else if (!property.computed && getStaticKey(property) === 'as') {
          const type = getType(property.value);
          current = type ? getAsValues(type) : new Set([UNKNOWN]);
        }
      }
      return current;
    }

    /**
     * Slots render `as ?? elementType` for intrinsic element types, after merging `{ ...defaultProps, ...value }`.
     * @param {TSESTree.ObjectExpression} value
     * @param {TSESTree.ObjectExpression} options
     * @param {string[]} elementTags
     * @param {ts.Node} location
     * @returns {string[] | undefined} the possible root tags, or undefined when `as` can be something else
     */
    function getRootTags(value, options, elementTags, location) {
      /** @type {AsState} */
      let state = new Set([ABSENT]);
      const defaultProps = getOptionValue(options, 'defaultProps');
      if (defaultProps?.type === AST_NODE_TYPES.ObjectExpression) {
        state = mergeObjectAs(state, defaultProps, location);
      } else if (defaultProps) {
        state = spreadAs(state, getType(defaultProps), location);
      }
      state = mergeObjectAs(state, value, location);

      if (state.has(UNKNOWN)) {
        return undefined;
      }
      const tags = new Set();
      for (const entry of state) {
        if (entry === ABSENT) {
          elementTags.forEach(tag => tags.add(tag));
        } else if (typeof entry === 'string') {
          tags.add(entry);
        }
      }
      return [...tags];
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

        const elementType = getOptionValue(options, 'elementType');
        const elementTags = elementType && getIntrinsicTags(elementType);
        if (!elementTags) {
          return;
        }

        const location = esTreeNodeToTSNodeMap.get(node);
        const tags = getRootTags(value, options, elementTags, location);
        if (!tags) {
          // `as` can be a component or an unknown string, so the rendered element is unknown.
          return;
        }
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
