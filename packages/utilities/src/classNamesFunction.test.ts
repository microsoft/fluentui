import { Stylesheet } from '@fluentui/merge-styles';
import { classNamesFunction } from './classNamesFunction';
import { getRTL, setRTL } from './rtl';
import type { IStyle } from '@fluentui/merge-styles';

describe('classNamesFunction', () => {
  beforeEach(() => {
    Stylesheet.getInstance().reset();
    Stylesheet.getInstance().setConfig({
      onInsertRule: () => {
        /*no-op*/
      },
    });
  });

  afterEach(() => {
    Stylesheet.getInstance().setConfig({
      onInsertRule: undefined,
    });
  });

  it('can cache rules', () => {
    let styleFunction1Called = false;
    let styleFunction2Called = false;
    const getClassNames = classNamesFunction<{ a: number; b: string }, { root: IStyle }>();
    const getStyles1 = (props: { a: number; b: string }) => {
      styleFunction1Called = true;
      return {
        root: { width: props.a },
      };
    };

    const getStyles2 = (props: { a: number; b: string }) => {
      styleFunction2Called = true;
      return {
        root: { height: props.a },
      };
    };

    const classNames1 = getClassNames(getStyles1, { a: 1, b: 'test' });
    const classNames2 = getClassNames(getStyles2, { a: 1, b: 'test' });
    expect(styleFunction1Called).toEqual(true);
    expect(styleFunction2Called).toEqual(true);
    styleFunction1Called = false;
    styleFunction2Called = false;

    expect(getClassNames(getStyles1, { a: 1, b: 'test' })).toEqual(classNames1);
    expect(styleFunction1Called).toEqual(false);

    expect(getClassNames(getStyles2, { a: 1, b: 'test' })).toEqual(classNames2);
    expect(styleFunction2Called).toEqual(false);

    expect(getClassNames(getStyles1, { a: 2, b: 'test' })).not.toEqual(classNames1);
    expect(styleFunction1Called).toEqual(true);
    styleFunction1Called = false;

    getClassNames(getStyles1, { a: 2, b: 'test' });
    expect(styleFunction1Called).toEqual(false);
  });

  describe('ltr/rtl from theme', () => {
    let originalRtl: boolean;
    let setRule: string;

    beforeEach(() => {
      Stylesheet.getInstance().setConfig({
        onInsertRule: (rule: string) => {
          setRule = rule;
        },
      });
    });

    beforeEach(() => (originalRtl = getRTL()));
    afterEach(() => setRTL(originalRtl));

    const getClassNames = classNamesFunction<{ theme: {} }, { root: IStyle }>();
    const getStyles = () => {
      return {
        root: { left: 1 },
      };
    };

    it('renders rtl if specified in theme', () => {
      setRTL(false);
      getClassNames(getStyles, { theme: { rtl: true } });
      expect(setRule).toEqual('.root-0{right:1px;}');
    });

    it('renders ltr if specified in theme', () => {
      setRTL(true);
      getClassNames(getStyles, { theme: { rtl: false } });
      expect(setRule).toEqual('.root-0{left:1px;}');
    });
  });
});
