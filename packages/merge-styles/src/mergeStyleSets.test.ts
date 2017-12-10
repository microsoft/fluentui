import { mergeStyleSets } from './mergeStyleSets';
import {
  Stylesheet,
  InjectionMode
} from './Stylesheet';

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
    const result: { root: string, a: string, b: string } = mergeStyleSets(
      {},
      {
        root: { background: 'red' },
        a: { background: 'green' }
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
        }
      }
    );

    expect(result).toEqual({
      root: 'root-0',
      a: 'a-1',
      b: 'b-2'
    });

    expect(_stylesheet.getRules()).toEqual(
      '.root-0{background:red;}.root-0:hover{background:yellow;}' +
      '.a-1{background:white;}' +
      '.b-2{background:blue;}'
    );
  });

  it('can expand child selectors', () => {
    const result = mergeStyleSets(
      {
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
      'c-foo': 'c-foo-2'
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
      child: 'd child-1'
    });
    expect(_stylesheet.getRules()).toEqual(
      '.root-0:hover .child-1{background:red;}' +
      '.child-1{background:green;}'
    );
  });

  it('can merge class names', () => {
    expect(mergeStyleSets({ root: ['a', 'b', { background: 'red' }] })).toEqual({
      root: 'a b root-0'
    });
  });

  it('can auto expand a previously registered style', () => {
    const styles: ITestClasses = mergeStyleSets({ root: { background: 'red' } });
    const styles2: ITestClasses = mergeStyleSets({ root: [{ background: 'purple' }, styles.root] });

    expect(styles.root).toEqual(styles2.root);

    expect(_stylesheet.getRules()).toEqual(
      '.root-0{background:red;}'
    );
  });

  it('can normalize duplicate static class names', () => {
    const styles: ITestClasses = mergeStyleSets({ root: ['a', { background: 'red' }] });
    const styles1: ITestClasses = mergeStyleSets(styles, styles);

    expect(styles1).toEqual({ root: 'a root-0' });
  });

  it('can auto expand a previously registered style embedded in static classname', () => {
    const styles: ITestClasses = mergeStyleSets({ root: ['a', { background: 'red' }] });
    const styles2: ITestClasses = mergeStyleSets({ root: ['b', { background: 'purple' }] }, styles);
    const styles3: ITestClasses = mergeStyleSets(styles, { root: ['b', { background: 'purple' }] });
    const styles4: ITestClasses = mergeStyleSets(styles, styles2, styles3, { root: 'c' });

    expect(styles).toEqual({ root: 'a root-0' });
    expect(styles2).toEqual({ root: 'b a root-0' });
    expect(styles3).toEqual({ root: 'a b root-1' });
    expect(styles4).toEqual({ root: 'a b c root-1' });
  });

  it('can merge two sets with class names', () => {
    const styleSet1: ITestClasses = mergeStyleSets({
      root: [
        'ms-Foo',
        { background: 'red' }
      ]
    });
    const styleSet2: ITestClasses = mergeStyleSets(
      styleSet1,
      {
        root: [
          'ms-Bar',
          { background: 'green' }
        ]
      }
    );

    expect(styleSet2).toEqual({ root: 'ms-Foo ms-Bar root-1' });
    expect(_stylesheet.getRules()).toEqual(
      '.root-0{background:red;}' +
      '.root-1{background:green;}'
    );
  });

});