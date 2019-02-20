import { InjectionMode, Stylesheet } from './Stylesheet';

import { setRTL } from './transforms/rtlifyRules';
import { styleToClassName } from './styleToClassName';
import { renderStatic } from './server';

const _stylesheet: Stylesheet = Stylesheet.getInstance();

_stylesheet.setConfig({ injectionMode: InjectionMode.none });

describe('styleToClassName', () => {
  beforeEach(() => {
    _stylesheet.reset();
  });

  it('can register classes and avoid re-registering', () => {
    let className = styleToClassName({ background: 'red' });

    expect(className).toEqual('css-0');
    expect(_stylesheet.getRules()).toEqual('.css-0{background:red;}');

    className = styleToClassName({ background: 'red' });

    expect(className).toEqual('css-0');
    expect(_stylesheet.getRules()).toEqual('.css-0{background:red;}');

    className = styleToClassName({ background: 'green' });

    expect(className).toEqual('css-1');
    expect(_stylesheet.getRules()).toEqual('.css-0{background:red;}.css-1{background:green;}');
  });

  it('can have child selectors', () => {
    styleToClassName({
      selectors: {
        '.foo': { background: 'red' }
      }
    });

    expect(_stylesheet.getRules()).toEqual('.css-0 .foo{background:red;}');
  });

  it('can have child selectors with comma', () => {
    styleToClassName({
      selectors: {
        '.foo, .bar': { background: 'red' }
      }
    });

    expect(_stylesheet.getRules()).toEqual('.css-0 .foo, .css-0 .bar{background:red;}');
  });

  it('can have child selectors with comma with pseudo selectors', () => {
    styleToClassName({
      selectors: {
        ':hover, :active': { background: 'red' }
      }
    });

    expect(_stylesheet.getRules()).toEqual('.css-0:hover, .css-0:active{background:red;}');
  });

  it('can have child selectors with comma with @media query', () => {
    styleToClassName({
      selectors: {
        '@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none)': {
          background: 'red'
        }
      }
    });

    expect(_stylesheet.getRules()).toEqual(
      '@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none){.css-0{background:red;}}'
    );
  });

  it('can have same element class selectors', () => {
    styleToClassName({
      selectors: {
        '&.foo': [{ background: 'red' }]
      }
    });

    expect(_stylesheet.getRules()).toEqual('.css-0.foo{background:red;}');
  });

  it('can register pseudo selectors', () => {
    const className = styleToClassName({
      selectors: {
        ':hover': { background: 'red' }
      }
    });

    expect(className).toEqual('css-0');
    expect(_stylesheet.getRules()).toEqual('.css-0:hover{background:red;}');
  });

  it('can register parent and sibling selectors', () => {
    const className = styleToClassName({
      selectors: {
        '& .child': { background: 'red' },
        '.parent &': { background: 'green' }
      }
    });

    expect(className).toEqual('css-0');
    expect(_stylesheet.getRules()).toEqual('.css-0 .child{background:red;}.parent .css-0{background:green;}');
  });

  it('can merge rules', () => {
    let className = styleToClassName(null, false, undefined, { backgroundColor: 'red', color: 'white' }, { backgroundColor: 'green' });

    expect(className).toEqual('css-0');
    expect(_stylesheet.getRules()).toEqual('.css-0{background-color:green;color:white;}');

    className = styleToClassName({ backgroundColor: 'green', color: 'white' });
    expect(className).toEqual('css-0');
  });

  it('returns blank string with no input', () => {
    expect(styleToClassName()).toEqual('');
  });

  it('does not emit a rule which has an undefined value', () => {
    expect(styleToClassName({ fontFamily: undefined })).toEqual('');
    expect(_stylesheet.getRules()).toEqual('');
  });

  it('returns the same class name for a rule that only has a displayName', () => {
    expect(styleToClassName({ displayName: 'foo' })).toEqual('foo-0');
    expect(styleToClassName({ displayName: 'foo' })).toEqual('foo-0');
    expect(_stylesheet.getRules()).toEqual('');
  });

  it('can preserve displayName in names', () => {
    expect(styleToClassName({ displayName: 'DisplayName', background: 'red' })).toEqual('DisplayName-0');
    expect(_stylesheet.getRules()).toEqual('.DisplayName-0{background:red;}');
  });

  it('can flip rtl and add units', () => {
    setRTL(true);

    styleToClassName({ left: 40 });
    expect(_stylesheet.getRules()).toEqual('.css-0{right:40px;}');

    setRTL(false);
  });

  it('can prefix webkit specific things', () => {
    styleToClassName({ WebkitFontSmoothing: 'none' });
    expect(_stylesheet.getRules()).toEqual('.css-0{-webkit-font-smoothing:none;}');
  });

  it('can expand previously defined rules', () => {
    const className = styleToClassName({ background: 'red' });
    const newClassName = styleToClassName(className, { color: 'white' });

    expect(newClassName).toEqual('css-1');
    expect(_stylesheet.getRules()).toEqual('.css-0{background:red;}.css-1{background:red;color:white;}');
  });

  it('can expand previously defined rules in selectors', () => {
    const className = styleToClassName({ background: 'red' });
    const newClassName = styleToClassName({
      selectors: {
        '& > *': className
      }
    });

    expect(newClassName).toEqual('css-1');
    expect(_stylesheet.getRules()).toEqual('.css-0{background:red;}.css-1 > *{background:red;}');
  });

  it('can register global selectors', () => {
    const className = styleToClassName({
      selectors: {
        ':global(button)': { background: 'red' }
      }
    });

    expect(className).toEqual('css-0');
    expect(_stylesheet.getRules()).toEqual('button{background:red;}');
  });

  it('can register global selectors for a parent', () => {
    const className = styleToClassName({
      selectors: {
        '& :global(button)': { background: 'red' }
      }
    });

    expect(className).toEqual('css-0');
    expect(_stylesheet.getRules()).toEqual('.css-0 button{background:red;}');
  });

  it('can register global selectors hover parent for a selector', () => {
    const className = styleToClassName({
      selectors: {
        ':global(.ms-button):hover &': { background: 'red' }
      }
    });

    expect(className).toEqual('css-0');
    expect(_stylesheet.getRules()).toEqual('.ms-button:hover .css-0{background:red;}');
  });

  it('can register multiple selectors within a global wrapper', () => {
    const className = styleToClassName({
      selectors: {
        ':global(.class1, .class2, .class3)': { top: 140 }
      }
    });

    expect(className).toEqual('css-0');
    expect(_stylesheet.getRules()).toEqual('.class1, .class2, .class3{top:140px;}');
  });

  it('can register multiple selectors wrapped within a global wrappers', () => {
    const className = styleToClassName({
      selectors: {
        ':global(.class1), :global(.class2), :global(.class3)': { top: 140 }
      }
    });

    expect(className).toEqual('css-0');
    expect(_stylesheet.getRules()).toEqual('.class1, .class2, .class3{top:140px;}');
  });

  it('can process a ":global(.class3, button)" selector', () => {
    const className = styleToClassName({
      selectors: {
        ':global(.class3, button)': { top: 140 }
      }
    });

    expect(className).toEqual('css-0');
    expect(_stylesheet.getRules()).toEqual('.class3, button{top:140px;}');
  });

  it('can process a ":global(.class3 button)" selector', () => {
    const className = styleToClassName({
      selectors: {
        ':global(.class3 button)': { top: 140 }
      }
    });

    expect(className).toEqual('css-0');
    expect(_stylesheet.getRules()).toEqual('.class3 button{top:140px;}');
  });

  it('can process a "button:focus, :global(.class1, .class2, .class3)" selector', () => {
    const className = styleToClassName({
      selectors: {
        'button:focus, :global(.class1, .class2, .class3)': { top: 140 }
      }
    });

    expect(className).toEqual('css-0');
    expect(_stylesheet.getRules()).toEqual('.css-0 button:focus, .class1, .class2, .class3{top:140px;}');
  });

  it('can process a complex multiple global selector', () => {
    const className = styleToClassName({
      selectors: {
        ':global(.css20, .css50, #myId) button:hover :global(.class1, .class2, .class3)': { top: 140 }
      }
    });

    expect(className).toEqual('css-0');
    expect(_stylesheet.getRules()).toEqual('.css20, .css50, #myId button:hover .class1, .class2, .class3{top:140px;}');
  });

  it('can expand an array of rules', () => {
    styleToClassName([{ background: 'red' }, { background: 'white' }]);
    expect(_stylesheet.getRules()).toEqual('.css-0{background:white;}');
  });

  it('can expand increased specificity rules', () => {
    styleToClassName({
      selectors: {
        '&&&': {
          background: 'red'
        }
      }
    });

    expect(_stylesheet.getRules()).toEqual('.css-0.css-0.css-0{background:red;}');
  });

  it('can apply media queries', () => {
    styleToClassName({
      background: 'blue',
      selectors: {
        '@media(min-width: 300px)': {
          background: 'red',
          selectors: {
            ':hover': {
              background: 'green'
            }
          }
        }
      }
    });

    expect(_stylesheet.getRules()).toEqual(
      '.css-0{background:blue;}' +
        '@media(min-width: 300px){' +
        '.css-0{background:red;}' +
        '}' +
        '@media(min-width: 300px){' +
        '.css-0:hover{background:green;}' +
        '}'
    );
  });

  it('can apply @support queries', () => {
    styleToClassName({
      selectors: {
        '@supports(display: grid)': {
          display: 'grid'
        }
      }
    });

    expect(_stylesheet.getRules()).toEqual('@supports(display: grid){' + '.css-0{display:grid;}' + '}');
  });

  it('ignores undefined property values', () => {
    styleToClassName({
      background: 'red',
      color: undefined
    });

    expect(_stylesheet.getRules()).toEqual('.css-0{background:red;}');
  });
});
