import { setRTL } from './transforms/rtlifyRules';
import { styleToClassName } from './styleToClassName';
import {
  InjectionMode,
  Stylesheet
} from './Stylesheet';

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
    let className = styleToClassName(
      null,
      false,
      undefined,
      { backgroundColor: 'red', color: 'white' },
      { backgroundColor: 'green' }
    );

    expect(className).toEqual('css-0');
    expect(_stylesheet.getRules()).toEqual('.css-0{background-color:green;color:white;}');

    className = styleToClassName({ backgroundColor: 'green', color: 'white' });
    expect(className).toEqual('css-0');
  });

  it('returns blank string with no input', () => {
    expect(styleToClassName()).toEqual('');
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

  it('can expand an array of rules', () => {
    styleToClassName([
      { background: 'red' },
      { background: 'white' }
    ]);
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

  it('can avoid registering classnames', () => {
    expect(styleToClassName({
      background: 'red',
      selectors: {
        '& .ms-Foo': {}
      }
    })).toEqual('css-0');

    expect(_stylesheet.getRules()).toEqual('');
  });
});
