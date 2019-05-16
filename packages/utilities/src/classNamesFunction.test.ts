import { classNamesFunction } from './classNamesFunction';
import { Stylesheet } from '@uifabric/merge-styles';

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
    let styleFunctionCalled = false;

    const getClassNames = classNamesFunction();
    const getStyles = [
      (props: { a: number }) => {
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
