// @ts-check

const { AST_NODE_TYPES } = require('@typescript-eslint/utils');
const { requiresQuoting } = require('@typescript-eslint/type-utils');
const createRule = require('../utils/createRule');

const MemberNameType = {
  Private: 1,
  Quoted: 2,
  Normal: 3,
  Expression: 4,
};

/**
 * @typedef {import('@typescript-eslint/utils').TSESTree.MethodDefinition} MethodDefinition
 * @typedef {import('@typescript-eslint/utils').TSESTree.PropertyDefinition} PropertyDefinition
 * @typedef {import('@typescript-eslint/utils').TSESTree.Property} Property
 * @typedef {import('@typescript-eslint/utils').TSESTree.TSAbstractMethodDefinition} TSAbstractMethodDefinition
 * @typedef {import('@typescript-eslint/utils').TSESTree.TSAbstractPropertyDefinition} TSAbstractPropertyDefinition
 * @typedef {import('@typescript-eslint/utils').TSESTree.TSMethodSignature} TSMethodSignature
 * @typedef {import('@typescript-eslint/utils').TSESTree.TSPropertySignature} TSProperySignature
 * @typedef {import('@typescript-eslint/utils').TSESLint.SourceCode}  SourceCode
 */

// Nasty syntax required for type imports until https://github.com/microsoft/TypeScript/issues/22160 is implemented.
// For some reason just importing TSESTree and accessing properties off that doesn't work.
/**
 * @typedef {import("@typescript-eslint/utils").TSESTree.PropertyDefinition} ClassProperty
 * @typedef {import("@typescript-eslint/utils").TSESTree.Identifier} Identifier
 * @typedef {import("@typescript-eslint/utils").TSESTree.Node} Node
 * @typedef {import("@typescript-eslint/utils").TSESTree.TSParameterProperty} ParameterProperty
 */

/**
 * Gets a string name representation of the name of the given MethodDefinition
 * or PropertyDefinition node, with handling for computed property names.
 * @param {MethodDefinition | PropertyDefinition | Property | TSAbstractMethodDefinition | TSAbstractPropertyDefinition | TSMethodSignature | TSProperySignature} member The node to get the name of.
 * @param {SourceCode} sourceCode The source code object.
 * @returns {{ type: number; name: string }} The name of the member.
 */

function getNameFromMember(member, sourceCode) {
  if (member.key.type === 'Identifier') {
    return {
      type: MemberNameType.Normal,
      name: member.key.name,
    };
  }
  if (member.key.type === 'PrivateIdentifier') {
    return {
      type: MemberNameType.Private,
      name: `#${member.key.name}`,
    };
  }
  if (member.key.type === 'Literal') {
    const name = `${member.key.value}`;
    if (requiresQuoting(name)) {
      return {
        type: MemberNameType.Quoted,
        name: `"${name}"`,
      };
    }
    return {
      type: MemberNameType.Normal,
      name,
    };
  }

  return {
    type: MemberNameType.Expression,
    name: sourceCode.text.slice(...member.key.range),
  };
}

/** */
module.exports = createRule({
  name: 'no-visibility-modifiers',
  meta: {
    type: 'problem',
    docs: {
      description: 'Forbid visibility modifiers on class properties and methods.',
    },
    messages: {
      modifierPresent: 'Visibility modifier present on {{type}} {{name}}',
    },
    schema: [],
  },
  defaultOptions: [],
  create: context => {
    const { sourceCode } = context;

    /**
     * Generates the report for rule violations
     * @param {string} nodeType
     * @param {Node} node
     * @param  {{ type: number; name: string } | string} nodeName
     */
    function reportIssue(nodeType, node, nodeName) {
      context.report({
        node,
        messageId: 'modifierPresent',
        data: {
          type: nodeType,
          name: nodeName,
        },
      });
    }

    /** @param {string} fileName */
    function isTypeScriptFile(fileName) {
      return /\.tsx?$/i.test(fileName || '');
    }

    /**
     * Checks if a method declaration has an accessibility modifier.
     * @param {MethodDefinition} methodDefinition The node representing a MethodDefinition.
     */
    function checkMethodAccessibilityModifier(methodDefinition) {
      let nodeType = 'method definition';

      if (['get', 'set'].includes(methodDefinition.kind)) {
        nodeType = `${methodDefinition.kind} property accessor`;
      }

      if (isTypeScriptFile(context.filename)) {
        const methodName = getNameFromMember(methodDefinition, sourceCode);

        if (methodDefinition.accessibility) {
          reportIssue(nodeType, methodDefinition, methodName);
        }
      }
    }

    /**
     * Checks if property has an accessibility modifier.
     * @param {ClassProperty} classProperty The node representing a ClassProperty.
     */
    function checkPropertyAccessibilityModifier(classProperty) {
      const nodeType = 'class property';

      if (isTypeScriptFile(context.filename)) {
        const propertyName = getNameFromMember(classProperty, sourceCode);

        if (classProperty.accessibility) {
          reportIssue(nodeType, classProperty, propertyName);
        }
      }
    }

    /**
     * Checks that the parameter property has the desired accessibility modifiers set.
     * @param {ParameterProperty} node The node representing a Parameter Property
     */
    function checkParameterPropertyAccessibilityModifier(node) {
      const nodeType = 'parameter property';

      if (isTypeScriptFile(context.filename)) {
        // HAS to be an identifier or assignment or TSC will throw
        if (
          node.parameter.type !== AST_NODE_TYPES.Identifier &&
          node.parameter.type !== AST_NODE_TYPES.AssignmentPattern
        ) {
          return;
        }

        const nodeName =
          node.parameter.type === AST_NODE_TYPES.Identifier
            ? node.parameter.name
            : // has to be an Identifier or TSC will throw an error
              /** @type {Identifier} */ (node.parameter.left).name;

        if (node.accessibility) {
          reportIssue(nodeType, node, nodeName);
        }
      }
    }

    return {
      TSParameterProperty: checkParameterPropertyAccessibilityModifier,
      ClassProperty: checkPropertyAccessibilityModifier,
      MethodDefinition: checkMethodAccessibilityModifier,
    };
  },
});
