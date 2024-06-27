// @ts-check
const _internalApiMisc =
  /** @type {{getNameFromMember(member: import('@typescript-eslint/utils').TSESTree.BaseNode, sourceCode:string | import('@typescript-eslint/utils').TSESLint.SourceCode): string}} */ (
    // @ts-expect-error - accessing private APIs 🚨 ( no types provided )
    require('@typescript-eslint/eslint-plugin/dist/util/misc')
  );

const { getNameFromMember } = _internalApiMisc;
const { AST_NODE_TYPES } = require('@typescript-eslint/utils');

const createRule = require('../utils/createRule');

// Nasty syntax required for type imports until https://github.com/microsoft/TypeScript/issues/22160 is implemented.
// For some reason just importing TSESTree and accessing properties off that doesn't work.
/**
 * @typedef {import("@typescript-eslint/utils").TSESTree.PropertyDefinition} ClassProperty
 * @typedef {import("@typescript-eslint/utils").TSESTree.Identifier} Identifier
 * @typedef {import("@typescript-eslint/utils").TSESTree.MethodDefinition} MethodDefinition
 * @typedef {import("@typescript-eslint/utils").TSESTree.Node} Node
 * @typedef {import("@typescript-eslint/utils").TSESTree.TSParameterProperty} ParameterProperty
 */

/** */
module.exports = createRule({
  name: 'no-visibility-modifiers',
  meta: {
    type: 'problem',
    docs: {
      description: 'Forbid visibility modifiers on class properties and methods.',
      // Only used by v0. Omitting visibility modifiers is generally not recommended.
      recommended: false,
    },
    messages: {
      modifierPresent: 'Visibility modifier present on {{type}} {{name}}',
    },
    schema: [],
  },
  defaultOptions: [],
  create: context => {
    const sourceCode = context.getSourceCode();

    /**
     * Generates the report for rule violations
     * @param {string} nodeType
     * @param {Node} node
     * @param {string} nodeName
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

      if (isTypeScriptFile(context.getFilename())) {
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

      if (isTypeScriptFile(context.getFilename())) {
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

      if (isTypeScriptFile(context.getFilename())) {
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
