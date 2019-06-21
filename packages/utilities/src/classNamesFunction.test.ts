import { classNamesFunction } from './classNamesFunction';
import { Stylesheet, IStyle } from '@uifabric/merge-styles';

describe('classNamesFunction', () => {
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
    let styleFunctionCalled = false;
    const getClassNames = classNamesFunction<{ a: number; b: string }, { root: IStyle }>();
    const getStyles = (props: { a: number; b: string }) => {
      styleFunctionCalled = true;
      return {
        root: { width: props.a }
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
});
