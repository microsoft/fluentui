import { ax } from './ax';
import { makeStyles } from './makeStyles';
import { createDOMRenderer } from './renderer/createDOMRenderer';
import { MakeStylesOptions } from './types';
import { RTL_CLASSNAME } from './constants';

const options: MakeStylesOptions<{}> = {
  dir: 'ltr',
  renderer: createDOMRenderer(),
  tokens: {},
};

describe('ax', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('handles non makeStyles classes', () => {
    expect(ax('ltr', ['ui-button'])).toBe('ui-button');
    expect(ax('ltr', ['ui-button', 'ui-button-content'])).toBe('ui-button ui-button-content');
  });

  it('handles empty params', () => {
    expect(ax('ltr', ['ui-button', undefined])).toBe('ui-button');
    expect(ax('ltr', [undefined, false])).toBe('');
  });

  it('performs deduplication for multiple arguments', () => {
    const classes = makeStyles({
      block: { display: 'block' },
      flex: { display: 'flex' },
      grid: { display: 'grid' },
      padding: { padding: '5px' },
    })(options);

    const resultClassName = makeStyles({ root: { display: 'grid', padding: '5px' } })(options).root;

    expect(ax('ltr', [classes.block, classes.flex, classes.grid, classes.padding])).toBe(resultClassName);
  });

  it('order of classes is not important', () => {
    const className = makeStyles({ root: { display: 'block' } })(options).root;

    expect(ax('ltr', ['ui-button', className, 'ui-button-content'])).toBe(`ui-button ui-button-content ${className}`);
  });

  it('order of classes is not important for multilevel overrides', () => {
    const className1 = ax('ltr', [
      'ui-button',
      makeStyles({ root: { display: 'block' } })(options).root,
      'ui-button-content',
    ]);
    const className2 = makeStyles({ root: { display: 'grid' } })(options).root;

    expect(ax('ltr', [className1, className2])).toBe(`ui-button ui-button-content ${className2}`);
  });

  it('merges multi-level overrides properly', () => {
    const className1 = makeStyles({ root: { display: 'block' } })(options).root;
    const className2 = makeStyles({ root: { display: 'flex' } })(options).root;

    const sequence1 = ax('ltr', ['ui-button', className1, className2]);

    const className3 = makeStyles({ root: { display: 'grid' } })(options).root;
    const className4 = makeStyles({ root: { padding: '5px' } })(options).root;
    const className5 = makeStyles({ root: { marginTop: '5px' } })(options).root;

    const sequence2 = ax('ltr', ['ui-flex', className3, className4]);
    const sequence3 = ax('ltr', [sequence1, sequence2, className5]);

    expect(sequence1).toBe(`ui-button ${className2}`);
    expect(sequence2).toBe('ui-flex __9a122w0 f13qh94s f1sbtcvk fwiuce90 fdghr900 f15vdbe4');
    expect(sequence3).toBe('ui-button ui-flex __xzc3aa0 f13qh94s f1sbtcvk fwiuce90 fdghr900 f15vdbe4 f1rqyxcv');
  });

  it('warns if strings are not properly merged', () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const error = jest.spyOn(console, 'error').mockImplementationOnce(() => {});

    const className1 = makeStyles({ root: { display: 'block' } })(options).root;
    const className2 = makeStyles({ root: { display: 'flex' } })(options).root;

    ax('ltr', [className1 + ' ' + className2]);

    expect(error).toHaveBeenCalledWith(
      expect.stringMatching(/a passed string contains multiple identifiers of atomic classes/),
    );
  });

  describe('"dir" option', () => {
    it('property names are the same for flipped classes except the RTL classname', () => {
      const computeClasses = makeStyles({
        root: { borderLeft: '5px', marginLeft: '5px' },
      });

      const ltrClassName = computeClasses(options).root;
      const rtlClassName = computeClasses({ ...options, dir: 'rtl' }).root;

      expect(rtlClassName).toBe(`${RTL_CLASSNAME} ${ltrClassName}`);
    });

    it('performs deduplication for RTL classes', () => {
      const computeClasses = makeStyles({
        start: { borderLeft: '5px' },
        end: { borderRight: '5px' },
      });

      const ltrClasses = computeClasses(options);
      const rtlClasses = computeClasses({ ...options, dir: 'rtl' });

      expect(ax('ltr', [ltrClasses.start, rtlClasses.start])).toBe(ltrClasses.start);
      expect(ax('rtl', [ltrClasses.start, rtlClasses.start])).toBe(rtlClasses.start);

      expect(ax('ltr', [ltrClasses.start, rtlClasses.start, ltrClasses.end, rtlClasses.end])).toBe(
        '__15gxazh fo2qazs0 f93e62u0',
      );
      expect(ax('rtl', [ltrClasses.start, rtlClasses.start, ltrClasses.end, rtlClasses.end])).toBe(
        'rtl __15gxazh fo2qazs0 f93e62u0',
      );
    });

    it('merges multi-level overrides properly', () => {
      const classes = makeStyles({
        block: { display: 'block' },
        grid: { display: 'grid' },
      })({ ...options, dir: 'rtl' });

      const sequence1 = ax('rtl', ['ui-button', classes.block]);
      const sequence2 = ax('rtl', [sequence1, classes.grid]);

      expect(sequence2).toBe(`rtl ui-button ${classes.grid.replace(`${RTL_CLASSNAME} `, '')}`);
    });

    it.only('warns if strings are not properly merged', () => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      const error = jest.spyOn(console, 'error').mockImplementationOnce(() => {});
      const className = makeStyles({ root: { display: 'block' } })({ ...options, dir: 'rtl' }).root;

      ax('rtl', [`${className} ${RTL_CLASSNAME} ui-button`]);

      expect(error).toHaveBeenCalledWith(
        expect.stringMatching(/a passed string contains multiple identifiers of RTL mode/),
      );
    });
  });

  describe('unstable functionality', () => {
    it('deduplicates classes with mixed priority', () => {
      // Classnames with numeric suffix has increased specificity
      const className1 = makeStyles({ root: { display: 'grid' } })(options).root;
      const className2 = makeStyles({ root: { display: 'flex' } }, 1)(options).root;

      expect(ax('ltr', [className1, className2])).toBe(className2);
    });
  });
});
