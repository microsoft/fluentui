import 'es6-map/implement';
import { setRTL } from '@uifabric/utilities/lib/rtl';
import { styleToClassName } from './styleToClassName';
import {
  InjectionMode,
  Stylesheet
} from './Stylesheet';

let { expect } = chai;
let _stylesheet: Stylesheet = Stylesheet.getInstance();

_stylesheet.setConfig({ injectionMode: InjectionMode.none });

describe('styleToClassName', () => {
  beforeEach(() => {
    _stylesheet.reset();
  });

  it('can register classes and avoid re-registering', () => {
    let className = styleToClassName({ background: 'red' });

    expect(className).equals('css-0');
    expect(_stylesheet.getRules()).equals('.css-0{background:red;}');

    className = styleToClassName({ background: 'red' });

    expect(className).equals('css-0');
    expect(_stylesheet.getRules()).equals('.css-0{background:red;}');

    className = styleToClassName({ background: 'green' });

    expect(className).equals('css-1');
    expect(_stylesheet.getRules()).equals('.css-0{background:red;}.css-1{background:green;}');
  });

  it('can register pseudo selectors', () => {
    let className = styleToClassName({
      selectors: {
        ':hover': { background: 'red' }
      }
    });

    expect(className).equals('css-0');
    expect(_stylesheet.getRules()).equals('.css-0:hover{background:red;}');
  });

  it('can register parent and sibling selectors', () => {
    let className = styleToClassName({
      selectors: {
        '& .child': { background: 'red' },
        '.parent &': { background: 'green' }
      }
    });

    expect(className).equals('css-0');
    expect(_stylesheet.getRules()).equals('.css-0 .child{background:red;}.parent .css-0{background:green;}');
  });

  it('can merge rules', () => {
    let className = styleToClassName(
      null,
      false,
      undefined,
      { backgroundColor: 'red', color: 'white' },
      { backgroundColor: 'green' }
    );

    expect(className).equals('css-0');
    expect(_stylesheet.getRules()).equals('.css-0{background-color:green;color:white;}');

    className = styleToClassName({ backgroundColor: 'green', color: 'white' });
    expect(className).equals('css-0');
  });

  it('returns blank string with no input', () => {
    expect(styleToClassName()).equals('');
  });

  it('can preserve displayName in names', () => {
    expect(styleToClassName({ displayName: 'DisplayName', background: 'red' })).equals('DisplayName-0');
    expect(_stylesheet.getRules()).equals('.DisplayName-0{background:red;}');
  });

  it('can flip rtl and add units', () => {
    setRTL(true);

    styleToClassName({ left: 40 });
    expect(_stylesheet.getRules()).equals('.css-0{right:40px;}');

    setRTL(false);
  });

  it('can prefix webkit specific things', () => {
    styleToClassName({ WebkitFontSmoothing: 'none' });
    expect(_stylesheet.getRules()).equals('.css-0{-webkit-font-smoothing:none;}');
  });

  it('can expand previously defined rules', () => {
    let className = styleToClassName({ background: 'red' });
    let newClassName = styleToClassName(className, { color: 'white' });

    expect(newClassName).equals('css-1');
    expect(_stylesheet.getRules()).equals('.css-0{background:red;}.css-1{background:red;color:white;}');
  });

  it('can expand an array of rules', () => {
    styleToClassName([
      { background: 'red' },
      { background: 'white' }
    ]);
    expect(_stylesheet.getRules()).equals('.css-0{background:white;}');
  });

});
