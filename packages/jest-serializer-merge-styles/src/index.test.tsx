import { print, test } from './index';
import { Stylesheet, InjectionMode, mergeStyles } from '@uifabric/merge-styles';

const _stylesheet: Stylesheet = Stylesheet.getInstance();
_stylesheet.setConfig({ injectionMode: InjectionMode.none });

describe('test', () => {
  beforeEach(() => {
    _stylesheet.reset();
  });

  it('returns true if the attribute value contains merged styles', () => {
    mergeStyles({ background: 'red', color: 'white' });
    expect(test('a b css-0')).toEqual(true);
    expect(test('a b')).toEqual(false);
  });

});

describe('print', () => {
  beforeEach(() => {
    _stylesheet.reset();
  });

  it('can format, sort, and indent the class names', () => {

    const indent = (val: string): string => '    ' + val;
    const classNames = mergeStyles(
      'ms-GlobalClassName',
      {
        color: 'white',
        background: 'red',
        selectors: {
          ':hover': {
            background: 'green'
          }
        }
      }
    );

    expect(
      print(
        classNames,
        () => '',
        indent
      )
    ).toEqual([
      '',
      indent('ms-GlobalClassName'),
      indent('{'),
      indent('  background: red;'),
      indent('  color: white;'),
      indent('}'),
      indent('&:hover {'),
      indent('  background: green;'),
      indent('}'),
    ].join('\n'));
  });

});