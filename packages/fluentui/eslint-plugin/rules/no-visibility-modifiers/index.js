const util = require('@typescript-eslint/eslint-plugin/dist/util')
const isTypeScriptFile = require('../../utils/isTypeScriptFile')
const { AST_NODE_TYPES, ESLintUtils } = require('@typescript-eslint/experimental-utils')

const createRule = ESLintUtils.RuleCreator(
  name =>
    `https://github.com/microsoft/fluent-ui-react/tree/master/packages/eslint-plugin/rules/${name}/index.js`,
)

module.exports = createRule({
  name: 'no-visibility-modifiers',
  meta: {
    type: 'problem',
    docs: {
      description: 'Require omit modifiers on class properties and methods',
      category: 'Best Practices',
      recommended: 'error',
    },
    messages: {
      presentModifier: 'Present accessibility modifier on {{type}} {{name}}.',
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    const sourceCode = context.getSourceCode()

    /**
     * Generates the report for rule violations
     */
    function reportIssue(messageId, nodeType, node, nodeName) {
      context.report({
        node,
        messageId,
        data: {
          type: nodeType,
          name: nodeName,
        },
      })
    }

    /**
     * Checks if a method declaration has an accessibility modifier.
     * @param methodDefinition The node representing a MethodDefinition.
     */
    function checkMethodAccessibilityModifier(methodDefinition) {
      let nodeType = 'method definition'

      if (['get', 'set'].includes(methodDefinition.kind)) {
        nodeType = `${methodDefinition.kind} property accessor`
      }

      if (isTypeScriptFile(context.getFilename())) {
        const methodName = util.getNameFromClassMember(methodDefinition, sourceCode)

        if (!!methodDefinition.accessibility) {
          reportIssue('presentModifier', nodeType, methodDefinition, methodName)
        }
      }
    }

    /**
     * Checks if property has an accessibility modifier.
     * @param classProperty The node representing a ClassProperty.
     */
    function checkPropertyAccessibilityModifier(classProperty) {
      const nodeType = 'class property'

      if (isTypeScriptFile(context.getFilename())) {
        const propertyName = util.getNameFromPropertyName(classProperty.key)

        if (!!classProperty.accessibility) {
          reportIssue('presentModifier', nodeType, classProperty, propertyName)
        }
      }
    }

    /**
     * Checks that the parameter property has the desired accessibility modifiers set.
     * @param {TSESTree.TSParameterProperty} node The node representing a Parameter Property
     */
    function checkParameterPropertyAccessibilityModifier(node) {
      const nodeType = 'parameter property'

      if (isTypeScriptFile(context.getFilename())) {
        // HAS to be an identifier or assignment or TSC will throw
        if (
          node.parameter.type !== AST_NODE_TYPES.Identifier &&
          node.parameter.type !== AST_NODE_TYPES.AssignmentPattern
        ) {
          return
        }

        const nodeName =
          node.parameter.type === AST_NODE_TYPES.Identifier
            ? node.parameter.name
            : // has to be an Identifier or TSC will throw an error
              node.parameter.left.name

        if (!!node.accessibility) {
          reportIssue('presentModifier', nodeType, node, nodeName)
        }
      }
    }

    return {
      TSParameterProperty: checkParameterPropertyAccessibilityModifier,
      ClassProperty: checkPropertyAccessibilityModifier,
      MethodDefinition: checkMethodAccessibilityModifier,
    }
  },
})
