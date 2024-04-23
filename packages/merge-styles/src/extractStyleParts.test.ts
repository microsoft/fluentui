import { extractStyleParts } from './extractStyleParts';
import { mergeCss } from './mergeStyles';
import { Stylesheet, InjectionMode } from './Stylesheet';

const _stylesheet: Stylesheet = Stylesheet.getInstance();

_stylesheet.setConfig({ injectionMode: InjectionMode.none });

describe('extractStyleParts', () => {
  beforeEach(() => {
    _stylesheet.reset();
  });

  it('can extract classes and objects', () => {
    const { classes, objects } = extractStyleParts(_stylesheet, 'a', 'b', ['c', 'd'], { left: 1 }, [
      'e',
      { left: 2 },
      { left: 3 },
    ]);

    expect(classes).toEqual(['a', 'b', 'c', 'd', 'e']);
    expect(objects).toEqual([{ left: 1 }, { left: 2 }, { left: 3 }]);
  });

  it('can expand previously registered rules', () => {
    const className = mergeCss({ left: 1 });
    const { classes, objects } = extractStyleParts(_stylesheet, className, { left: 2 });

    expect(classes).toEqual([]);
    expect(objects).toEqual([{ left: 1 }, { left: 2 }]);
  });
});
