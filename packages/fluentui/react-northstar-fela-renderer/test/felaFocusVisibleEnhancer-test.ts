import { createRenderer } from 'fela';
import { renderToString } from 'fela-tools';
import { RULE_TYPE } from 'fela-utils';

import { felaFocusVisibleEnhancer } from '../src/felaFocusVisibleEnhancer';

describe('felaFocusVisibleEnhancer', () => {
  test('replaces :focus-visible', () => {
    const renderer = createRenderer({
      enhancers: [felaFocusVisibleEnhancer],
    });

    renderer.renderRule(() => ({ borderColor: 'green' }), null);
    renderer.renderRule(() => ({ ':focus': { borderColor: 'yellow' } } as any), null);
    renderer.renderRule(() => ({ ':focus-visible': { borderColor: 'red' } } as any), null);

    expect(renderToString(renderer)).toMatchSnapshot();
  });

  test('replaces :focus-visible', () => {
    const renderer = createRenderer({
      enhancers: [felaFocusVisibleEnhancer],
    });
    const subscription = jest.fn();

    renderer.subscribe(subscription);
    renderer.renderRule(() => ({ ':focus-visible': { borderColor: 'red' } } as any), null);

    expect(subscription).toBeCalledWith(
      expect.objectContaining({
        pseudo: ':focus',
        selector: 'html[data-whatinput="keyboard"] .a:focus',
        type: RULE_TYPE,
      }),
    );
  });
});
