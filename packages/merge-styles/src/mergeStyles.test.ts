import { mergeStyles } from './mergeStyles';
import { Stylesheet, InjectionMode } from './Stylesheet';
import { setRTL } from './StyleOptionsState';

const _stylesheet: Stylesheet = Stylesheet.getInstance();

_stylesheet.setConfig({ injectionMode: InjectionMode.none });

describe('mergeStyles', () => {
  beforeEach(() => {
    _stylesheet.reset();
  });

  afterEach(() => {
    setRTL(false);
  });

  it('can register the same static class twice', () => {
    expect(mergeStyles('a', 'a')).toEqual('a');
  });

  it('can register left', () => {
    mergeStyles({ left: 10 });
    expect(_stylesheet.getRules()).toEqual('.css-0{left:10px;}');
  });

  it('can register left in rtl', () => {
    setRTL(true);
    mergeStyles({ left: 10 });
    expect(_stylesheet.getRules()).toEqual('.css-0{right:10px;}');
  });

  it('can register a css variable', () => {
    mergeStyles({ '--fooBar': 'baz' });
    expect(_stylesheet.getRules()).toEqual('.css-0{--fooBar:baz;}');
  });

  it('can re-register rules when rtl is flipped', () => {
    const result1 = mergeStyles({ left: 10 });
    expect(_stylesheet.getRules()).toEqual('.css-0{left:10px;}');
    expect(result1).toEqual('css-0');
    setRTL(true);
    const result2 = mergeStyles({ left: 10 });
    expect(_stylesheet.getRules()).toEqual('.css-0{left:10px;}.css-1{right:10px;}');
    expect(result2).toEqual('css-1');
  });

  it('can join strings', () => {
    expect(mergeStyles('a', false, null, undefined, 'b')).toEqual('a b');
  });

  it('can join arrays of strings', () => {
    expect(mergeStyles(['a', 'b', 'c'], false, null, undefined)).toEqual('a b c');
  });

  it('can join an object and style', () => {
    expect(mergeStyles('foo', { color: 'white' })).toEqual('foo css-0');
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
      '.css-0{background:red;color:black;}' + '.css-1{background:red;color:white;}',
    );
  });

  it('can normalize margins', () => {
    mergeStyles({ margin: '4px' }, { marginRight: '8px' });
    expect(_stylesheet.getRules()).toEqual(
      '.css-0{margin-top:4px;margin-right:8px;margin-bottom:4px;margin-left:4px;}',
    );
  });

  it('can merge comma delimitted selectors correctly', () => {
    mergeStyles(
      { selectors: { ':hover': { background: 'red' } } },
      { selectors: { ':hover, :active': { background: 'blue' } } },
    );
    expect(_stylesheet.getRules()).toEqual('.css-0:hover{background:blue;}.css-0:active{background:blue;}');
  });

  it('can expand className lists', () => {
    const classes1 = mergeStyles('ms-Foo', { background: 'red' });
    const classes2 = mergeStyles(classes1, { background: 'green' });

    expect(classes2).toEqual('ms-Foo css-1');
    expect(_stylesheet.getRules()).toEqual('.css-0{background:red;}' + '.css-1{background:green;}');
  });

  it('can register media queries', () => {
    mergeStyles({
      background: 'red',
      selectors: {
        '@media screen and (max-width: 100px)': {
          background: 'green',
        },
      },
    });

    expect(_stylesheet.getRules()).toEqual(
      '.css-0{background:red;}' + '@media screen and (max-width: 100px){.css-0{background:green;}}',
    );
  });
});
