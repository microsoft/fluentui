import {
  compile,
  DECLARATION,
  Middleware,
  middleware,
  prefixer,
  rulesheet,
  RULESET,
  serialize,
  stringify,
} from 'stylis';

type MiddlewareParams = Parameters<Middleware>;

function trim(element: MiddlewareParams[0], index: MiddlewareParams[1], children: MiddlewareParams[2]) {
  if (element.type === RULESET) {
    // element.children[element.children.length - 1].value
    // element.children[element.children.length - 1].value.slice(0, -1)
    // console.log(element, children);
  }

  if (element.type === DECLARATION) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const siblings = element.parent.children;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (siblings[siblings.length - 1] === element) {
      element.return = element.return.slice(0, -1);
    }
  }
}

export function compileCSSRules(cssRules: string): string[] {
  const rules: string[] = [];

  serialize(
    compile(cssRules),
    middleware([
      prefixer,
      trim,
      stringify,

      // 💡 we are using `.insertRule()` API for DOM operations, which does not support
      // insertion of multiple CSS rules in a single call. `rulesheet` plugin extracts
      // individual rules to be used with this API
      rulesheet(rule => rules.push(rule)),
    ]),
  );

  return rules;
}
