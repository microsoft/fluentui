import { mergeStyles } from './mergeStyles';
import {
  Stylesheet,
  InjectionMode
} from './Stylesheet';

const _stylesheet: Stylesheet = Stylesheet.getInstance();

_stylesheet.setConfig({ injectionMode: InjectionMode.none });

describe('mergeStyles', () => {
  beforeEach(() => {
    _stylesheet.reset();
  });

  it('can join strings', () => {
    expect(mergeStyles('a', false, null, undefined, 'b')).toEqual('a b');
  });

  it('can join arrays of strings', () => {
    expect(mergeStyles(['a', 'b', 'c'], false, null, undefined)).toEqual('a b c');
  });

  it('can mix styles and classnames together', () => {
    expect(mergeStyles('foo', { background: 'red' })).toEqual('foo css-0');
    expect(_stylesheet.getRules()).toEqual('.css-0{background:red;}');
  });

  it('can remerge styles', () => {
    const className: string = mergeStyles({ background: 'red', color: 'black' });
    const newClassName = mergeStyles(className, { color: 'white' });

    expect(className).toEqual('css-0');
    expect(newClassName).toEqual('css-1');
    expect(_stylesheet.getRules()).toEqual(
      '.css-0{background:red;color:black;}.css-1{background:red;color:white;}'
    );
  });

  it('can normalize margins', () => {
    mergeStyles({ margin: '4px' }, { marginRight: '8px' });
    expect(_stylesheet.getRules()).toEqual(
      '.css-0{margin-top:4px;margin-right:8px;margin-bottom:4px;margin-left:4px;}'
    );
  });

});
