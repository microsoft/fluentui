import { mergeStyleSetsWithOptions } from './mergeStyleSetsWithOptions';
import { Stylesheet, InjectionMode } from './Stylesheet';

const _stylesheet: Stylesheet = Stylesheet.getInstance();

_stylesheet.setConfig({ injectionMode: InjectionMode.none });

describe('mergeStyleSetsWithOptions', () => {
  beforeEach(() => {
    _stylesheet.reset();
  });

  it('can merge different directions of rules', () => {
    const styleSet = {
      root: {
        borderLeft: 42
      }
    };

    let result = mergeStyleSetsWithOptions({ rtl: false }, styleSet);

    // First render in ltr. New rule.
    expect(result.root).toBe('root-0');
    expect(_stylesheet.getRules()).toEqual('.root-0{border-left:42px;}');

    // Second, render the same rule in ltr. Should return same as first.
    result = mergeStyleSetsWithOptions({ rtl: false }, styleSet);
    expect(result.root).toBe('root-0');

    // Third, render it in rtl. Expect a new rule with flipped border.
    result = mergeStyleSetsWithOptions({ rtl: true }, styleSet);
    expect(result.root).toBe('root-1');
    expect(_stylesheet.getRules()).toEqual('.root-0{border-left:42px;}.root-1{border-right:42px;}');
  });
});
