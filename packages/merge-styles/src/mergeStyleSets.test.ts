import { mergeStyleSets } from './mergeStyleSets';
import {
  Stylesheet,
  InjectionMode
} from './Stylesheet';

const _stylesheet: Stylesheet = Stylesheet.getInstance();

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

});