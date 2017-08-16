import { mergeStyles } from './mergeStyles';
import {
  Stylesheet,
  InjectionMode
} from './Stylesheet';

let { expect } = chai;
let _stylesheet: Stylesheet = Stylesheet.getInstance();

_stylesheet.setConfig({ injectionMode: InjectionMode.none });

describe('mergeStyles', () => {
  beforeEach(() => {
    _stylesheet.reset();
  });

  it('can join strings', () => {
    expect(mergeStyles('a', false, null, undefined, 'b')).equals('a b');
  });

  it('can join arrays of strings', () => {
    expect(mergeStyles(['a', 'b', 'c'], false, null, undefined)).equals('a b c');
  });

  it('can mix styles and classnames together', () => {
    expect(mergeStyles('foo', { background: 'red' })).equals('foo css-0');
    expect(_stylesheet.getRules()).equals('.css-0{background:red;}');
  });
});
