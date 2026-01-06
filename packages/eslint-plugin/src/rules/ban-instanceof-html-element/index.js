// @ts-check
const { AST_NODE_TYPES } = require('@typescript-eslint/utils');
const createRule = require('../../utils/createRule');

/**
 * @import { HTMLElementConstructorName } from './types';
 */

module.exports = createRule({
  name: 'ban-instanceof-html-element',
  meta: {
    type: 'problem',
    docs: {
      description: 'Ban usage of instanceof HTMLElement comparison',
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
  'HTMLElement', // Base class for all HTML elements
  'HTMLAnchorElement', // <a> elements
  'HTMLAreaElement', // <area> elements
  'HTMLAudioElement', // <audio> elements
  'HTMLBaseElement', // <base> elements
  'HTMLBodyElement', // <body> elements
  'HTMLBRElement', // <br> elements
  'HTMLButtonElement', // <button> elements
  'HTMLCanvasElement', // <canvas> elements
  'HTMLDataElement', // <data> elements
  'HTMLDataListElement', // <datalist> elements
  'HTMLDetailsElement', // <details> elements
  'HTMLDialogElement', // <dialog> elements
  'HTMLDivElement', // <div> elements
  'HTMLDListElement', // <dl> elements
  'HTMLEmbedElement', // <embed> elements
  'HTMLFieldSetElement', // <fieldset> elements
  'HTMLFormElement', // <form> elements
  'HTMLHeadingElement', // <h1> to <h6> elements
  'HTMLHeadElement', // <head> elements
  'HTMLHRElement', // <hr> elements
  'HTMLHtmlElement', // <html> elements
  'HTMLIFrameElement', // <iframe> elements
  'HTMLImageElement', // <img> elements
  'HTMLInputElement', // <input> elements
  'HTMLModElement', // <ins> and <del> elements
  'HTMLLabelElement', // <label> elements
  'HTMLLegendElement', // <legend> elements
  'HTMLLIElement', // <li> elements
  'HTMLLinkElement', // <link> elements
  'HTMLMapElement', // <map> elements
  'HTMLMetaElement', // <meta> elements
  'HTMLMeterElement', // <meter> elements
  'HTMLObjectElement', // <object> elements
  'HTMLOListElement', // <ol> elements
  'HTMLOptGroupElement', // <optgroup> elements
  'HTMLOptionElement', // <option> elements
  'HTMLOutputElement', // <output> elements
  'HTMLParagraphElement', // <p> elements
  'HTMLParamElement', // <param> elements
  'HTMLPreElement', // <pre> elements
  'HTMLProgressElement', // <progress> elements
  'HTMLQuoteElement', // <blockquote> and <q> elements
  'HTMLSlotElement', // <slot> elements
  'HTMLScriptElement', // <script> elements
  'HTMLSelectElement', // <select> elements
  'HTMLSourceElement', // <source> elements
  'HTMLSpanElement', // <span> elements
  'HTMLStyleElement', // <style> elements
  'HTMLTableElement', // <table> elements
  'HTMLTableColElement', // <col> and <colgroup> elements
  'HTMLTableRowElement', // <tr> elements
  'HTMLTableSectionElement', // <thead>, <tbody>, and <tfoot> elements
  'HTMLTemplateElement', // <template> elements
  'HTMLTextAreaElement', // <textarea> elements
  'HTMLTimeElement', // <time> elements
  'HTMLTitleElement', // <title> elements
  'HTMLTrackElement', // <track> elements
  'HTMLUListElement', // <ul> elements
  'HTMLVideoElement', // <video> elements];
];

/** @type {Set<string>} */
const constructorNamesSet = new Set(constructorNames);
