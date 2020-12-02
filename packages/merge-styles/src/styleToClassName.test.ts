import { InjectionMode, Stylesheet } from './Stylesheet';
import { styleToClassName } from './styleToClassName';
import { IStyleOptions } from './IStyleOptions';

const _stylesheet: Stylesheet = Stylesheet.getInstance();

_stylesheet.setConfig({ injectionMode: InjectionMode.none });

describe('styleToClassName', () => {
  beforeEach(() => {
    _stylesheet.reset();
  });

  it('can register classes and avoid re-registering', () => {
    let className = styleToClassName({}, { background: 'red' });

    expect(className).toEqual('css-0');
    expect(_stylesheet.getRules()).toEqual('.css-0{background:red;}');

    className = styleToClassName({}, { background: 'red' });

    expect(className).toEqual('css-0');
    expect(_stylesheet.getRules()).toEqual('.css-0{background:red;}');

    className = styleToClassName({}, { background: 'green' });

    expect(className).toEqual('css-1');
    expect(_stylesheet.getRules()).toEqual('.css-0{background:red;}.css-1{background:green;}');
  });

  it('can have child selectors', () => {
    styleToClassName(
      {},
      {
        selectors: {
          '.foo': { background: 'red' },
        },
      },
    );

    expect(_stylesheet.getRules()).toEqual('.css-0 .foo{background:red;}');
  });

  it('can have child selectors without the selectors wrapper', () => {
    styleToClassName(
      {},
      {
        '.foo': { background: 'red' },
      },
    );

    expect(_stylesheet.getRules()).toEqual('.css-0 .foo{background:red;}');
  });

  it('can have child selectors with comma', () => {
    styleToClassName(
      {},
      {
        selectors: {
          '.foo, .bar': { background: 'red' },
        },
      },
    );

    expect(_stylesheet.getRules()).toEqual('.css-0 .foo{background:red;}.css-0 .bar{background:red;}');
  });

  it('can have child selectors with comma without the selectors wrapper', () => {
    styleToClassName(
      {},
      {
        '.foo, .bar': { background: 'red' },
      },
    );

    expect(_stylesheet.getRules()).toEqual('.css-0 .foo{background:red;}.css-0 .bar{background:red;}');
  });

  it('can have child selectors with comma with pseudo selectors', () => {
    styleToClassName(
      {},
      {
        selectors: {
          ':hover, :active': { background: 'red' },
        },
      },
    );

    expect(_stylesheet.getRules()).toEqual('.css-0:hover{background:red;}.css-0:active{background:red;}');
  });

  it('can have child selectors with comma with pseudo selectors', () => {
    styleToClassName(
      {},
      {
        ':hover, :active': { background: 'red' },
      },
    );

    expect(_stylesheet.getRules()).toEqual('.css-0:hover{background:red;}.css-0:active{background:red;}');
  });

  it('can have child selectors with comma with @media query', () => {
    styleToClassName(
      {},
      {
        selectors: {
          '@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none)': {
            background: 'red',
          },
        },
      },
    );

    expect(_stylesheet.getRules()).toEqual(
      '@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none){.css-0{background:red;}}',
    );
  });

  it('can have child selectors with comma with @media query', () => {
    styleToClassName(
      {},
      {
        '@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none)': {
          background: 'red',
        },
      },
    );

    expect(_stylesheet.getRules()).toEqual(
      '@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none){.css-0{background:red;}}',
    );
  });

  it('can have same element class selectors', () => {
    styleToClassName(
      {},
      {
        selectors: {
          '&.foo': [{ background: 'red' }],
        },
      },
    );

    expect(_stylesheet.getRules()).toEqual('.css-0.foo{background:red;}');
  });

  it('can have same element class selectors without the selectors wrapper', () => {
    styleToClassName(
      {},
      {
        '&.foo': [{ background: 'red' }],
      },
    );

    expect(_stylesheet.getRules()).toEqual('.css-0.foo{background:red;}');
  });

  it('can register pseudo selectors', () => {
    const className = styleToClassName(
      {},
      {
        selectors: {
          ':hover': { background: 'red' },
        },
      },
    );

    expect(className).toEqual('css-0');
    expect(_stylesheet.getRules()).toEqual('.css-0:hover{background:red;}');
  });

  it('can register pseudo selectors without the selectors wrapper', () => {
    const className = styleToClassName(
      {},
      {
        ':hover': { background: 'red' },
      },
    );

    expect(className).toEqual('css-0');
    expect(_stylesheet.getRules()).toEqual('.css-0:hover{background:red;}');
  });

  it('can register parent and sibling selectors', () => {
    const className = styleToClassName(
      {},
      {
        selectors: {
          '& .child': { background: 'red' },
          '.parent &': { background: 'green' },
        },
      },
    );

    expect(className).toEqual('css-0');
    expect(_stylesheet.getRules()).toEqual('.css-0 .child{background:red;}.parent .css-0{background:green;}');
  });

  it('can merge rules', () => {
    let className = styleToClassName(
      {},
      null,
      false,
      undefined,
      { backgroundColor: 'red', color: 'white' },
      { backgroundColor: 'green' },
    );

    expect(className).toEqual('css-0');
    expect(_stylesheet.getRules()).toEqual('.css-0{background-color:green;color:white;}');

    className = styleToClassName({}, { backgroundColor: 'green', color: 'white' });
    expect(className).toEqual('css-0');
  });

  it('returns blank string with no input', () => {
    expect(styleToClassName({})).toEqual('');
  });

  it('does not emit a rule which has an undefined value', () => {
    expect(styleToClassName({}, { fontFamily: undefined })).toEqual('');
    expect(_stylesheet.getRules()).toEqual('');
  });

  it('returns the same class name for a rule that only has a displayName', () => {
    expect(styleToClassName({}, { displayName: 'foo' })).toEqual('foo-0');
    expect(styleToClassName({}, { displayName: 'foo' })).toEqual('foo-0');
    expect(_stylesheet.getRules()).toEqual('');
  });

  it('can preserve displayName in names', () => {
    expect(styleToClassName({}, { displayName: 'DisplayName', background: 'red' })).toEqual('DisplayName-0');
    expect(_stylesheet.getRules()).toEqual('.DisplayName-0{background:red;}');
  });

  it('can flip rtl and add units', () => {
    styleToClassName({ rtl: true }, { left: 40 });
    expect(_stylesheet.getRules()).toEqual('.css-0{right:40px;}');
  });

  it('can prefix webkit specific things', () => {
    styleToClassName({}, { WebkitFontSmoothing: 'none' });
    expect(_stylesheet.getRules()).toEqual('.css-0{-webkit-font-smoothing:none;}');
  });

  // TODO: It may not be valid to pass a previously registered rule into styleToClassName
  // since mergeStyles/mergeStyleSets should probably do this in the resolution code.
  it('can expand previously defined rules', () => {
    const className = styleToClassName({}, { background: 'red' });
    const newClassName = styleToClassName({}, className, { color: 'white' });

    expect(newClassName).toEqual('css-1');
    expect(_stylesheet.getRules()).toEqual('.css-0{background:red;}.css-1{background:red;color:white;}');
  });

  it('can expand previously defined rules in selectors', () => {
    const className = styleToClassName({}, { background: 'red' });
    const newClassName = styleToClassName(
      {},
      {
        selectors: {
          '& > *': className,
        },
      },
    );

    expect(newClassName).toEqual('css-1');
    expect(_stylesheet.getRules()).toEqual('.css-0{background:red;}.css-1 > *{background:red;}');
  });

  it('can register global selectors', () => {
    const className = styleToClassName(
      {},
      {
        selectors: {
          ':global(button)': { background: 'red' },
        },
      },
    );

    expect(className).toEqual('css-0');
    expect(_stylesheet.getRules()).toEqual('button{background:red;}');
  });

  it('can register global selectors for a parent', () => {
    const className = styleToClassName(
      {},
      {
        selectors: {
          '& :global(button)': { background: 'red' },
        },
      },
    );

    expect(className).toEqual('css-0');
    expect(_stylesheet.getRules()).toEqual('.css-0 button{background:red;}');
  });

  it('can register global selectors hover parent for a selector', () => {
    const className = styleToClassName(
      {},
      {
        selectors: {
          ':global(.ms-button):hover &': { background: 'red' },
        },
      },
    );

    expect(className).toEqual('css-0');
    expect(_stylesheet.getRules()).toEqual('.ms-button:hover .css-0{background:red;}');
  });

  it('can register multiple selectors within a global wrapper', () => {
    const className = styleToClassName(
      {},
      {
        selectors: {
          ':global(.class1, .class2, .class3)': { top: 140 },
        },
      },
    );

    expect(className).toEqual('css-0');
    expect(_stylesheet.getRules()).toEqual('.class1{top:140px;}.class2{top:140px;}.class3{top:140px;}');
  });

  it('can register multiple selectors wrapped within a global wrappers', () => {
    const className = styleToClassName(
      {},
      {
        selectors: {
          ':global(.class1), :global(.class2), :global(.class3)': { top: 140 },
        },
      },
    );

    expect(className).toEqual('css-0');
    expect(_stylesheet.getRules()).toEqual('.class1{top:140px;}.class2{top:140px;}.class3{top:140px;}');
  });

  it('can process a ":global(.class3, button)" selector', () => {
    const className = styleToClassName(
      {},
      {
        selectors: {
          ':global(.class3, button)': { top: 140 },
        },
      },
    );

    expect(className).toEqual('css-0');
    expect(_stylesheet.getRules()).toEqual('.class3{top:140px;}button{top:140px;}');
  });

  it('can process a ":global(.class3 button)" selector', () => {
    const className = styleToClassName(
      {},
      {
        selectors: {
          ':global(.class3 button)': { top: 140 },
        },
      },
    );

    expect(className).toEqual('css-0');
    expect(_stylesheet.getRules()).toEqual('.class3 button{top:140px;}');
  });

  it('can process a "button:focus, :global(.class1, .class2, .class3)" selector', () => {
    const className = styleToClassName(
      {},
      {
        selectors: {
          'button:focus, :global(.class1, .class2, .class3)': { top: 140 },
        },
      },
    );

    expect(className).toEqual('css-0');
    expect(_stylesheet.getRules()).toEqual(
      '.css-0 button:focus{top:140px;}.class1{top:140px;}.class2{top:140px;}.class3{top:140px;}',
    );
  });

  it('can process a complex multiple global selector', () => {
    const className = styleToClassName(
      {},
      {
        selectors: {
          ':global(.css20, .css50, #myId) button:hover :global(.class1, .class2, .class3)': { top: 140 },
        },
      },
    );

    expect(className).toEqual('css-0');
    expect(_stylesheet.getRules()).toEqual(
      '.css20{top:140px;}.css50{top:140px;}#myId button:hover ' +
        '.class1{top:140px;}.class2{top:140px;}.class3{top:140px;}',
    );
  });

  it('can expand an array of rules', () => {
    styleToClassName({}, [{ background: 'red' }, { background: 'white' }]);
    expect(_stylesheet.getRules()).toEqual('.css-0{background:white;}');
  });

  it('can expand increased specificity rules', () => {
    styleToClassName(
      {},
      {
        selectors: {
          '&&&': {
            background: 'red',
          },
        },
      },
    );

    expect(_stylesheet.getRules()).toEqual('.css-0.css-0.css-0{background:red;}');
  });

  it('can apply media queries', () => {
    styleToClassName(
      {},
      {
        background: 'blue',
        selectors: {
          '@media(min-width: 300px)': {
            background: 'red',
            selectors: {
              ':hover': {
                background: 'green',
              },
            },
          },
        },
      },
    );

    expect(_stylesheet.getRules()).toEqual(
      '.css-0{background:blue;}' +
        '@media(min-width: 300px){' +
        '.css-0{background:red;}' +
        '}' +
        '@media(min-width: 300px){' +
        '.css-0:hover{background:green;}' +
        '}',
    );
  });

  it('can apply @support queries', () => {
    styleToClassName(
      {},
      {
        selectors: {
          '@supports(display: grid)': {
            display: 'grid',
          },
        },
      },
    );

    expect(_stylesheet.getRules()).toEqual('@supports(display: grid){' + '.css-0{display:grid;}' + '}');
  });

  it('ignores undefined property values', () => {
    styleToClassName(
      {},
      {
        background: 'red',
        color: undefined,
      },
    );

    expect(_stylesheet.getRules()).toEqual('.css-0{background:red;}');
  });
});

describe('styleToClassName with specificityMultiplier', () => {
  const options: IStyleOptions = { specificityMultiplier: 2 };
  beforeEach(() => {
    _stylesheet.reset();
  });

  it('can repeat classname', () => {
    const className = styleToClassName(options, { background: 'red' });

    expect(className).toEqual('css-0');
    expect(_stylesheet.getRules()).toEqual('.css-0.css-0{background:red;}');
  });

  it('can repeat classname when have child selectors', () => {
    styleToClassName(options, {
      selectors: {
        '.foo': { background: 'red' },
      },
    });

    expect(_stylesheet.getRules()).toEqual('.css-0.css-0 .foo{background:red;}');
  });

  it('can repeat classname when have child selectors with comma', () => {
    styleToClassName(options, {
      selectors: {
        '.foo, .bar': { background: 'red' },
      },
    });

    expect(_stylesheet.getRules()).toEqual('.css-0.css-0 .foo{background:red;}.css-0.css-0 .bar{background:red;}');
  });

  it('can repeat classname when have child selectors with comma with pseudo selectors', () => {
    styleToClassName(options, {
      selectors: {
        ':hover, :active': { background: 'red' },
      },
    });

    expect(_stylesheet.getRules()).toEqual('.css-0.css-0:hover{background:red;}.css-0.css-0:active{background:red;}');
  });

  it('can repeat classname when have child selectors with comma with @media query', () => {
    styleToClassName(options, {
      selectors: {
        '@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none)': {
          background: 'red',
        },
      },
    });

    expect(_stylesheet.getRules()).toEqual(
      '@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none){.css-0.css-0{background:red;}}',
    );
  });

  it('do not repeat classname when have global selector', () => {
    const className = styleToClassName(options, {
      selectors: {
        ':global(.class1)': { background: 'red' },
      },
    });

    expect(className).toEqual('css-0');
    expect(_stylesheet.getRules()).toEqual('.class1{background:red;}');
  });

  it('handles numeric 0 in props with shorthand syntax (margin, padding)', () => {
    styleToClassName(
      {},
      {
        margin: 0,
      },
    );

    expect(_stylesheet.getRules()).toEqual(
      '.css-0{margin-top:0px;margin-right:0px;margin-bottom:0px;margin-left:0px;}',
    );
  });

  it('handles calc(...) in props with shorthand syntax (margin, padding)', () => {
    styleToClassName(
      {},
      {
        padding: 'calc(24px / 2) 0',
        margin: '0 2px  calc(2 * (var(--a) + var(--b))) ',
      },
    );

    expect(_stylesheet.getRules()).toEqual(
      '.css-0{' +
        'padding-top:calc(24px / 2);' +
        'padding-right:0;' +
        'padding-bottom:calc(24px / 2);' +
        'padding-left:0;' +
        'margin-top:0;' +
        'margin-right:2px;' +
        'margin-bottom:calc(2 * (var(--a) + var(--b)));' +
        'margin-left:2px;' +
        '}',
    );
  });

  it('handles !important in props with shorthand syntax (margin, padding)', () => {
    styleToClassName(
      {},
      {
        padding: '42px !important',
        margin: ' 0 2px calc(2 * (var(--a) + var(--b)))  !important ',
      },
    );

    expect(_stylesheet.getRules()).toEqual(
      '.css-0{' +
        'padding-top:42px !important;' +
        'padding-right:42px !important;' +
        'padding-bottom:42px !important;' +
        'padding-left:42px !important;' +
        'margin-top:0 !important;' +
        'margin-right:2px !important;' +
        'margin-bottom:calc(2 * (var(--a) + var(--b))) !important;' +
        'margin-left:2px !important;' +
        '}',
    );
  });
});
