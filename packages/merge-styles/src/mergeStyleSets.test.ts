import { mergeStyleSets } from './mergeStyleSets';
import { Stylesheet, InjectionMode } from './Stylesheet';

const _stylesheet: Stylesheet = Stylesheet.getInstance();

interface ITestClasses {
  root: string;
}

_stylesheet.setConfig({ injectionMode: InjectionMode.none });

describe('mergeStyleSets', () => {
  beforeEach(() => {
    _stylesheet.reset();
  });

  it('can merge style sets', () => {
    const fn1 = jest.fn().mockReturnValue({
      root: { background: 'green', fontSize: 12 }
    });

    const fn2 = jest.fn().mockReturnValue({
      root: {
        background: 'yellow',
        color: 'pink'
      }
    });

    const empty: { c?: string } = {};
    const result = mergeStyleSets(
      empty,
      {
        root: { background: 'red' },
        a: { background: 'green' },
        subComponentStyles: {
          labelStyles: fn1
        }
      },
      {
        a: { background: 'white' },
        b: { background: 'blue' }
      },
      {
        root: {
          selectors: {
            ':hover': { background: 'yellow' }
          }
        },
        subComponentStyles: {
          labelStyles: fn2
        }
      }
    );

    expect(result.root).toBe('root-0');
    expect(result.a).toBe('a-1');
    expect(result.b).toBe('b-2');
    expect(result.subComponentStyles).toBeDefined();
    const mergedLabelStyles = result.subComponentStyles!.labelStyles({});
    expect(mergedLabelStyles).toEqual({
      root: [{ background: 'green', fontSize: 12 }, { background: 'yellow', color: 'pink' }]
    });

    expect(_stylesheet.getRules()).toEqual(
      '.root-0{background:red;}.root-0:hover{background:yellow;}' + '.a-1{background:white;}' + '.b-2{background:blue;}'
    );
  });

  it('can merge correctly when falsey values are provided as inputs', () => {
    const result = mergeStyleSets(
      undefined,
      {
        root: { background: 'red' },
        a: { background: 'green' }
      },
      null,
      {
        a: { background: 'white' },
        b: { background: 'blue' }
      }
    );

    expect(result.root).toBe('root-0');
    expect(result.a).toBe('a-1');
    expect(result.b).toBe('b-2');

    expect(_stylesheet.getRules()).toEqual(
      '.root-0{background:red;}' + '.a-1{background:white;}' + '.b-2{background:blue;}'
    );
  });

  it('can merge correctly when all inputs are falsey', () => {
    // poor 0 is missing out on the party.
    // he will not be missed.
    const result = mergeStyleSets(undefined, false, null);

    expect(result).toEqual({ subComponentStyles: {} });
    expect(_stylesheet.getRules()).toBe('');
  });

  it('can expand child selectors', () => {
    const result = mergeStyleSets({
      a: {
        selectors: {
          ':hover $b': {
            background: 'green'
          },
          ':focus $c-foo': {
            background: 'red'
          },
          ':active .d': {
            background: 'pink'
          }
        }
      },
      b: {
        background: 'blue'
      },
      'c-foo': {}
    });

    expect(result).toEqual({
      a: 'a-0',
      b: 'b-1',
      'c-foo': 'c-foo-2',
      subComponentStyles: {}
    });

    expect(_stylesheet.getRules()).toEqual(
      '.a-0:hover .b-1{background:green;}' +
        '.a-0:focus .c-foo-2{background:red;}' +
        '.a-0:active .d{background:pink;}' +
        '.b-1{background:blue;}'
    );
  });

  it('can expand child selectors with static class names', () => {
    const styles = mergeStyleSets({
      root: [
        'a',
        {
          selectors: {
            '&:hover $child': { background: 'red' }
          }
        }
      ],
      child: [
        'd',
        {
          background: 'green'
        }
      ]
    });

    expect(styles).toEqual({
      root: 'a root-0',
      child: 'd child-1',
      subComponentStyles: {}
    });
    expect(_stylesheet.getRules()).toEqual('.root-0:hover .child-1{background:red;}' + '.child-1{background:green;}');
  });

  it('can merge class names', () => {
    expect(mergeStyleSets({ root: ['a', 'b', { background: 'red' }] })).toEqual({
      root: 'a b root-0',
      subComponentStyles: {}
    });
  });

  it('can auto expand a previously registered style', () => {
    const styles: ITestClasses = mergeStyleSets({ root: { background: 'red' } });
    const styles2: ITestClasses = mergeStyleSets({ root: [{ background: 'purple' }, styles.root] });

    expect(styles.root).toEqual(styles2.root);

    expect(_stylesheet.getRules()).toEqual('.root-0{background:red;}');
  });

  it('can normalize duplicate static class names', () => {
    const styles: ITestClasses = mergeStyleSets({ root: ['a', { background: 'red' }] });
    const styles1: ITestClasses = mergeStyleSets(styles, styles);

    expect(styles1).toEqual({ root: 'a root-0', subComponentStyles: {} });
  });

  it('can auto expand a previously registered style embedded in static classname', () => {
    const styles: ITestClasses = mergeStyleSets({ root: ['a', { background: 'red' }] });
    const styles2: ITestClasses = mergeStyleSets({ root: ['b', { background: 'purple' }] }, styles);
    const styles3: ITestClasses = mergeStyleSets(styles, { root: ['b', { background: 'purple' }] });
    const styles4: ITestClasses = mergeStyleSets(styles, styles2, styles3, { root: 'c' });

    expect(styles).toEqual({ root: 'a root-0', subComponentStyles: {} });
    expect(styles2).toEqual({ root: 'b a root-0', subComponentStyles: {} });
    expect(styles3).toEqual({ root: 'a b root-1', subComponentStyles: {} });
    expect(styles4).toEqual({ root: 'a b c root-1', subComponentStyles: {} });
  });

  it('can merge two sets with class names', () => {
    const styleSet1: ITestClasses = mergeStyleSets({
      root: ['ms-Foo', { background: 'red' }]
    });
    const styleSet2: ITestClasses = mergeStyleSets(styleSet1, {
      root: ['ms-Bar', { background: 'green' }]
    });

    expect(styleSet2).toEqual({ root: 'ms-Foo ms-Bar root-1', subComponentStyles: {} });
    expect(_stylesheet.getRules()).toEqual('.root-0{background:red;}' + '.root-1{background:green;}');
  });
});
