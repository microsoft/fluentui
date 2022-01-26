import * as Babel from '@babel/core';
import generator from '@babel/generator';

import { expressionTpl } from './evaluatePathsInVM';

describe('expressionTpl', () => {
  it('returns an expression based on a template', () => {
    const expression = Babel.types.identifier('foo');

    const result = expressionTpl({ expression, wrapName: 'wrap' });
    const resultCode = generator(result).code;

    expect(Babel.types.isCallExpression(result)).toBe(true);
    expect(resultCode).toMatchInlineSnapshot(`"wrap(() => foo)"`);
  });
});
