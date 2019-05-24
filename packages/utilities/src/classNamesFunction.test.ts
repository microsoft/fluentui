import { classNamesFunction } from './classNamesFunction';
import { IStyle, IStyleFunctionOrObject, Stylesheet } from '@uifabric/merge-styles';

describe('classNamesFunction', () => {
  let lastRule: string;

  beforeEach(() => {
    Stylesheet.getInstance().setConfig({
      onInsertRule: () => {
        /*no-op*/
      }
    });
  });

  afterEach(() => {
    Stylesheet.getInstance().setConfig({
      onInsertRule: undefined
    });
  });

  it('can cache rules', () => {
    type ITestStyleProps = { a: number; b?: string };
    type ITestStyles = { root: IStyle };
    let styleFunctionCalled = false;
    const getClassNames = classNamesFunction<ITestStyleProps, ITestStyles>();
    const getStyles: (IStyleFunctionOrObject<ITestStyleProps, ITestStyles> | undefined)[] = [
      (props: ITestStyleProps) => {
        styleFunctionCalled = true;
        return {
          root: { width: props.a }
        };
      },
      undefined,
      undefined
    ];

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
});
