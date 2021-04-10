import { ax } from './ax';
import { makeStyles } from './makeStyles';
import { createDOMRenderer } from './renderer/createDOMRenderer';
import { MakeStylesOptions } from './types';
import { SEQUENCE_PREFIX } from './constants';

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
    expect(ax('ui-button')).toBe('ui-button');
    expect(ax('ui-button', 'ui-button-content')).toBe('ui-button ui-button-content');
  });

  it('handles empty params', () => {
    expect(ax('ui-button', undefined)).toBe('ui-button');
    expect(ax(undefined, false)).toBe('');
  });

  it('performs deduplication for multiple arguments', () => {
    const classes = makeStyles({
      block: { display: 'block' },
      flex: { display: 'flex' },
      grid: { display: 'grid' },
      padding: { padding: '5px' },
    })(options);

    const resultClassName = makeStyles({ root: { display: 'grid', padding: '5px' } })(options).root;

    expect(ax(classes.block, classes.flex, classes.grid, classes.padding)).toBe(resultClassName);
  });

  it('order of classes is not important', () => {
    const className = makeStyles({ root: { display: 'block' } })(options).root;

    expect(ax('ui-button', className, 'ui-button-content')).toBe(`ui-button ui-button-content ${className}`);
  });

  it('order of classes is not important for multilevel overrides', () => {
    const className1 = ax('ui-button', makeStyles({ root: { display: 'block' } })(options).root, 'ui-button-content');
    const className2 = makeStyles({ root: { display: 'grid' } })(options).root;

    expect(ax(className1, className2)).toBe(`ui-button ui-button-content ${className2}`);
  });

  it('merges multi-level overrides properly', () => {
    const className1 = makeStyles({ root: { display: 'block' } })(options).root;
    const className2 = makeStyles({ root: { display: 'flex' } })(options).root;

    const sequence1 = ax('ui-button', className1, className2);

    const className3 = makeStyles({ root: { display: 'grid' } })(options).root;
    const className4 = makeStyles({ root: { padding: '5px' } })(options).root;
    const className5 = makeStyles({ root: { marginTop: '5px' } })(options).root;

    const sequence2 = ax('ui-flex', className3, className4);
    const sequence3 = ax(sequence1, sequence2, className5);

    expect(sequence1).toBe(`ui-button ${className2}`);
    expect(sequence2).toBe('ui-flex __9a122w0 f13qh94s f1sbtcvk fwiuce90 fdghr900 f15vdbe4');
    expect(sequence3).toBe('ui-button ui-flex __xzc3aa0 f13qh94s f1sbtcvk fwiuce90 fdghr900 f15vdbe4 f1rqyxcv');
  });

  it('warns if an unregistered sequence was passed', () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const error = jest.spyOn(console, 'error').mockImplementationOnce(() => {});
    const className = makeStyles({ root: { display: 'block' } })(options).root;

    expect(ax(className, `${SEQUENCE_PREFIX}abcdefg oprsqrt`)).toBe(className);
    expect(error).toHaveBeenCalledWith(expect.stringMatching(/passed string contains an identifier \(__abcdefg\)/));
  });

  it('warns if strings are not properly merged', () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const error = jest.spyOn(console, 'error').mockImplementationOnce(() => {});

    const className1 = makeStyles({ root: { display: 'block' } })(options).root;
    const className2 = makeStyles({ root: { display: 'flex' } })(options).root;

    ax(className1 + ' ' + className2);

    expect(error).toHaveBeenCalledWith(
      expect.stringMatching(/a passed string contains multiple identifiers of atomic classes/),
    );
  });

  it('warns if classes with different directions are passed', () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const error = jest.spyOn(console, 'error').mockImplementationOnce(() => {});

    const ltrClassName = makeStyles({ root: { display: 'block' } })(options).root;
    const rtlClassName = makeStyles({ root: { display: 'flex' } })({ ...options, dir: 'rtl' }).root;

    ax(ltrClassName, rtlClassName);
    expect(error).toHaveBeenCalledWith(expect.stringMatching(/that has different direction \(dir="rtl"\)/));
  });

  describe('"dir" option', () => {
    it('performs deduplication for RTL classes', () => {
      const computeClasses = makeStyles({
        start: { borderLeft: '5px' },
        end: { borderRight: '5px' },
      });

      const rtlClasses1 = computeClasses({ ...options, dir: 'rtl' });
      const rtlClasses2 = computeClasses({ ...options, dir: 'rtl' });

      expect(ax(rtlClasses1.start, rtlClasses2.start)).toBe(rtlClasses1.start);
      expect(ax(rtlClasses1.start, rtlClasses2.start)).toBe(rtlClasses2.start);

      expect(ax(rtlClasses1.start, rtlClasses2.start, rtlClasses1.end, rtlClasses2.end)).toBe(
        '__1lxk7b0 rfo2qazs0 rf93e62u0',
      );
    });

    it('merges multi-level overrides properly', () => {
      const classes = makeStyles({
        block: { display: 'block' },
        grid: { display: 'grid' },
      })({ ...options, dir: 'rtl' });

      const sequence1 = ax('ui-button', classes.block);
      const sequence2 = ax(sequence1, classes.grid);

      expect(sequence2).toBe(`ui-button ${classes.grid}`);
    });
  });

  describe('unstable functionality', () => {
    it('deduplicates classes with mixed priority', () => {
      // Classnames with numeric suffix has increased specificity
      const className1 = makeStyles({ root: { display: 'grid' } })(options).root;
      const className2 = makeStyles({ root: { display: 'flex' } }, 1)(options).root;

      expect(ax(className1, className2)).toBe(className2);
    });
  });
});
