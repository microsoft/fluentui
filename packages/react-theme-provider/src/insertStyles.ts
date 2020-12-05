const styleNode = typeof document === 'object' ? document.createElement('style') : null;

if (styleNode) {
  styleNode.setAttribute('fcss', 'rule');
  document.head.appendChild(styleNode);
}

let index = 0;

console.log('styleSheet', styleNode);

export function insertStyles(
  definitions: any,
  cache: Record<string, [string, string]>,
  rtl: boolean,
  target: Document,
): string {
  let classes = '';

  for (const propName in definitions) {
    const definition = definitions[propName];
    const ruleClassName = rtl ? definition[2] || definition[0] : definition[0];

    // Should be done always to return classes
    classes += ' ' + ruleClassName; // adds useless empty string on beginning

    if (cache[ruleClassName]) {
      continue;
    }

    const ruleCSS = rtl ? definition[3] || definition[1] : definition[1];

    // console.log('insertStyles:definitions', definitions[propertyName][1]);

    cache[ruleClassName] = [propName, definition];

    if (styleNode) {
      (styleNode.sheet as CSSStyleSheet).insertRule(ruleCSS, index); // TODO: index can't be global, should be per node
    }

    index++;
  }

  // console.log('insertStyles:classes', classes);
  return classes;
}
