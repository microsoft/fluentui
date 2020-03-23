import { IStyle, Stylesheet } from '@uifabric/merge-styles';
import { classNamesFunction } from './classNamesFunction';
import { getRTL, setRTL } from './rtl';

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
    let styleFunctionCalled = false;
    const getClassNames = classNamesFunction<{ a: number; b: string }, { root: IStyle }>();
    const getStyles = (props: { a: number; b: string }) => {
      styleFunctionCalled = true;
      return {
        root: { width: props.a },
      };
    };

    const classNames = getClassNames(getStyles, { a: 1, b: 'test' });
    expect(styleFunctionCalled).toEqual(true);
    styleFunctionCalled = false;

    expect(getClassNames(getStyles, { a: 1, b: 'test' })).toEqual(classNames);
    expect(styleFunctionCalled).toEqual(false);

    expect(getClassNames(getStyles, { a: 2, b: 'test' })).not.toEqual(classNames);
    expect(styleFunctionCalled).toEqual(true);

    styleFunctionCalled = false;
    getClassNames(getStyles, { a: 2, b: 'test' });
    expect(styleFunctionCalled).toEqual(false);
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
