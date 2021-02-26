import { ax } from './ax';
import { makeStyles } from './makeStyles';
import { createDOMRenderer } from './renderer/createDOMRenderer';
import { MakeStylesOptions } from './types';

const options: MakeStylesOptions<{}> = {
  renderer: createDOMRenderer(),
  tokens: {},
};

describe('ax', () => {
  it('handles non makeStyles classes', () => {
    expect(ax('ui-button')).toBe('ui-button');
    expect(ax('ui-button', 'ui-button-content')).toBe('ui-button ui-button-content');
  });

  it('handles empty params', () => {
    expect(ax('ui-button', undefined)).toBe('ui-button');
    expect(ax(undefined, undefined)).toBe('');
  });

  it('performs deduplication for multiple arguments', () => {
    const className1 = makeStyles([[null, { display: 'block' }]])({}, options);
    const className2 = makeStyles([[null, { display: 'flex' }]])({}, options);
    const className3 = makeStyles([[null, { display: 'grid' }]])({}, options);
    const className4 = makeStyles([[null, { padding: '5px' }]])({}, options);

    const resultClassName = makeStyles([[null, { display: 'grid', padding: '5px' }]])({}, options);

    expect(ax(className1, className2, className3, className4)).toBe(resultClassName);
  });

  it('order of classes is not important', () => {
    const className = makeStyles([[null, { display: 'block' }]])({}, options);

    expect(ax('ui-button', className, 'ui-button-content')).toBe(`ui-button ui-button-content ${className}`);
  });

  it('order of classes is not important for multilevel overrides', () => {
    const className1 = ax('ui-button', makeStyles([[null, { display: 'block' }]])({}, options), 'ui-button-content');
    const className2 = makeStyles([[null, { display: 'grid' }]])({}, options);

    expect(ax(className1, className2)).toBe(`ui-button ui-button-content ${className2}`);
  });

  // TODO: consider a proper approach for this
  // xit('performs deduplication for RTL classes', () => {
  //   const ltrClassName = makeStyles([[null, { borderLeft: '5px' }]])({}, options);
  //   // property names are the same for flipped classes except the RTL prefix
  //   const rtlClassName = makeStyles([[null, { borderLeft: '5px' }]])({}, { ...options, rtl: true });
  //
  //   expect(ax(ltrClassName, rtlClassName)).toBe(rtlClassName);
  // });

  it('merges multi-level overrides properly', () => {
    const className1 = makeStyles([[null, { display: 'block' }]])({}, options);
    const className2 = makeStyles([[null, { display: 'flex' }]])({}, options);

    const sequence1 = ax('ui-button', className1, className2);

    const className3 = makeStyles([[null, { display: 'grid' }]])({}, options);
    const className4 = makeStyles([[null, { padding: '5px' }]])({}, options);
    const className5 = makeStyles([[null, { marginTop: '5px' }]])({}, options);

    const sequence2 = ax('ui-flex', className3, className4);
    const sequence3 = ax(sequence1, sequence2, className5);

    expect(sequence1).toBe(`ui-button ${className2}`);
    expect(sequence2).toBe('ui-flex __9a122w0 f13qh94s f1sbtcvk fwiuce90 fdghr900 f15vdbe4');
    expect(sequence3).toBe('ui-button ui-flex __xzc3aa0 f13qh94s f1sbtcvk fwiuce90 fdghr900 f15vdbe4 f1rqyxcv');
  });

  it('warns if strings are not properly merged', () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const error = jest.spyOn(console, 'error').mockImplementationOnce(() => {});

    const className1 = makeStyles([[null, { display: 'block' }]])({}, options);
    const className2 = makeStyles([[null, { display: 'flex' }]])({}, options);

    ax(className1 + ' ' + className2);

    expect(error).toHaveBeenCalledWith(
      expect.stringMatching(/a passed string contains multiple identifiers of atomic classes/),
    );
  });

  describe('unstable functionality', () => {
    it('deduplicates classes with mixed priority', () => {
      // Classnames with numeric suffix has increased specificity
      const className1 = makeStyles([[null, { display: 'grid' }]])({}, options);
      const className2 = makeStyles([[null, { display: 'flex' }]], 1)({}, options);

      expect(ax(className1, className2)).toBe(className2);
    });
  });
});
