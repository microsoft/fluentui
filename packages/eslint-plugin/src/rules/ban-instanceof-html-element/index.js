// @ts-check
const { AST_NODE_TYPES } = require('@typescript-eslint/utils');
const createRule = require('../../utils/createRule');

/**
 * @typedef {import("@fluentui/react-utilities/src/utils/isHTMLElement").HTMLElementConstructorName} HTMLElementConstructorName
 *
 */

module.exports = createRule({
  name: 'ban-instanceof-html-element',
  meta: {
    type: 'problem',
    docs: {
      description: 'Ban usage of instanceof HTMLElement comparison',
      recommended: 'error',
    },
    messages: {
      invalidBinaryExpression: 'instanceof {{right}} should be avoided, use isHTMLElement instead.',
    },
    fixable: 'code',
    schema: [],
  },
  defaultOptions: [],
  create: context => ({
    // eslint-disable-next-line @typescript-eslint/naming-convention
    BinaryExpression(binaryExpression) {
      if (
        binaryExpression.operator === 'instanceof' &&
        binaryExpression.right.type === AST_NODE_TYPES.Identifier &&
        constructorNamesSet.has(binaryExpression.right.name)
      ) {
        context.report({
          node: binaryExpression,
          messageId: 'invalidBinaryExpression',
          data: {
            right: binaryExpression.right.name,
          },
        });
      }
    },
  }),
});

/** @type {HTMLElementConstructorName[]} */
const constructorNames = [
  'HTMLElement',
  'HTMLAnchorElement',
  'HTMLAreaElement',
  'HTMLAudioElement',
  'HTMLBaseElement',
  'HTMLBodyElement',
  'HTMLBRElement',
  'HTMLButtonElement',
  'HTMLCanvasElement',
  'HTMLDataElement',
  'HTMLDataListElement',
  'HTMLDetailsElement',
  // @ts-expect-error - NOTE: dialog is not supported in safari 14, also it was removed from lib-dom starting typescript 4.4
  'HTMLDialogElement',
  'HTMLDivElement',
  'HTMLDListElement',
  'HTMLEmbedElement',
  'HTMLFieldSetElement',
  'HTMLFormElement',
  'HTMLHeadingElement',
  'HTMLHeadElement',
  'HTMLHRElement',
  'HTMLHtmlElement',
  'HTMLIFrameElement',
  'HTMLImageElement',
  'HTMLInputElement',
  'HTMLModElement',
  'HTMLLabelElement',
  'HTMLLegendElement',
  'HTMLLIElement',
  'HTMLLinkElement',
  'HTMLMapElement',
  'HTMLMetaElement',
  'HTMLMeterElement',
  'HTMLObjectElement',
  'HTMLOListElement',
  'HTMLOptGroupElement',
  'HTMLOptionElement',
  'HTMLOutputElement',
  'HTMLParagraphElement',
  'HTMLParamElement',
  'HTMLPreElement',
  'HTMLProgressElement',
  'HTMLQuoteElement',
  'HTMLSlotElement',
  'HTMLScriptElement',
  'HTMLSelectElement',
  'HTMLSourceElement',
  'HTMLSpanElement',
  'HTMLStyleElement',
  'HTMLTableElement',
  'HTMLTableColElement',
  'HTMLTableRowElement',
  'HTMLTableSectionElement',
  'HTMLTemplateElement',
  'HTMLTextAreaElement',
  'HTMLTimeElement',
  'HTMLTitleElement',
  'HTMLTrackElement',
  'HTMLUListElement',
  'HTMLVideoElement',
];

/** @type {Set<string>} */
const constructorNamesSet = new Set(constructorNames);
