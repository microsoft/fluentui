import { MakeStylesRenderer } from '@fluentui/make-styles';
import { getDocument } from '@fluentui/utilities';

type Renderer = {
  node: HTMLStyleElement;
  index: number;
};

const targets = new WeakMap<Document, Renderer>();
function createTarget(targetDocument: Document): Renderer {
  let newTarget = targets.get(targetDocument);

  if (newTarget) {
    return newTarget;
  }

  const node = targetDocument.createElement('style');

  node.setAttribute('FCSS', 'RULE');
  targetDocument.head.appendChild(node);

  newTarget = { node, index: 0 };

  targets.set(targetDocument, newTarget);

  return newTarget;
}

let document: Document | undefined;
if (document === undefined) {
  document = getDocument();
}
let target: Renderer;
if (document) {
  target = createTarget(document);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const insertStyles: MakeStylesRenderer['insertDefinitions'] = (lookupTable, resolvedDefinitions, rtl) => {
  let classes = '';

  // eslint-disable-next-line guard-for-in
  for (const propName in resolvedDefinitions) {
    const definition = resolvedDefinitions[propName];
    // className || css || rtlCSS

    const className = definition[0];
    const rtlCSS = definition[2];

    const ruleClassName = rtl ? (rtlCSS ? 'r' + className : className) : className;

    // Should be done always to return classes
    classes += ' ' + ruleClassName; // adds useless empty string on beginning

    if (lookupTable[ruleClassName]) {
      continue;
    }

    const css = definition[1];
    const ruleCSS = rtl ? rtlCSS || css : css;

    lookupTable[ruleClassName] = [propName, definition];

    (target.node.sheet as CSSStyleSheet).insertRule(ruleCSS, target.index);
    target.index++;
  }

  // console.log('insertStyles:classes', classes);
  return classes;
};
