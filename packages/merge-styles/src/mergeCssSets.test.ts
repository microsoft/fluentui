import { mergeCssSets } from './mergeStyleSets';
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
        borderLeft: 42,
      },
    };

    let result = mergeCssSets([styleSet], { rtl: false });

    // First render in ltr. New rule.
    expect(result.root).toBe('root-0');
    expect(_stylesheet.getRules()).toEqual('.root-0{border-left:42px;}');

    // Second, render the same rule in ltr. Should return same as first.
    result = mergeCssSets([styleSet], { rtl: false });
    expect(result.root).toBe('root-0');

    // Third, render it in rtl. Expect a new rule with flipped border.
    result = mergeCssSets([styleSet], { rtl: true });
    expect(result.root).toBe('root-1');
    expect(_stylesheet.getRules()).toEqual('.root-0{border-left:42px;}.root-1{border-right:42px;}');
  });

  it('is typed correctly for multiple styleSets', () => {
    const styleSet0 = {
      root0: {
        borderLeft: 42,
      },
    };

    const styleSet1 = {
      root1: {
        borderLeft: 42,
      },
    };

    const result = mergeCssSets([styleSet0, styleSet1], { rtl: false });
    // compilation of this test case is the most valuable scenario;
    // these assertions are essentially no-ops.
    expect(result.root0).not.toBeNull();
    expect(result.root1).not.toBeNull();
  });
});
