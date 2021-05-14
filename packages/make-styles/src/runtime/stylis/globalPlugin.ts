import { Middleware, RULESET, tokenize } from 'stylis';

type MiddlewareParams = Parameters<Middleware>;

/**
 * A plugin for Stylis that adds support for ":global()" selector.
 */
export function globalPlugin(element: MiddlewareParams[0]): string | void {
  if (element.type === RULESET) {
    element.props = (element.props as string[]).map(value => {
      // ".foo:global(body)" => [ '.foo', ':', 'global', '(body)' ]
      const tokens = tokenize(value);

      const result = tokens
        .map((token, index, children) => {
          if (token === 'global') {
            // :global(body)
            //         ^ selector i.e. parens contents
            const selectorOfGlobal = children[index + 1].slice(1, -1);

            // .foo:global(body)
            // ^ everything before global
            const selectorsBeforeGlobal = children.slice(0, index - 1).join('');

            // removes previous token ":"
            children[index - 1] = '';
            // removes next token (parens contents)
            children[index + 1] = '';

            //      👇 will be used as a delimiter
            return '\f' + selectorOfGlobal + ' ' + selectorsBeforeGlobal;
          }

          return token;
        })
        .join('');

      return result.substr(result.lastIndexOf('\f') + 1);
    });
  }
}
