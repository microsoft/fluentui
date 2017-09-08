import { mergeStyleSets } from './mergeStyleSets';
import {
  Stylesheet,
  InjectionMode
} from './Stylesheet';

const { expect } = chai;
const _stylesheet: Stylesheet = Stylesheet.getInstance();

_stylesheet.setConfig({ injectionMode: InjectionMode.none });

describe('mergeStyleSets', () => {
  beforeEach(() => {
    _stylesheet.reset();
  });

  it('can merge style sets', () => {

    // tslint:disable-next-line:no-any
    const result = mergeStyleSets<any>(
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

    expect(result).eqls({
      root: 'css-0',
      a: 'css-1',
      b: 'css-2'
    });

    expect(_stylesheet.getRules()).equals(
      '.css-0{background:red;}.css-0:hover{background:yellow;}' +
      '.css-1{background:white;}' +
      '.css-2{background:blue;}'
    );
  });
});