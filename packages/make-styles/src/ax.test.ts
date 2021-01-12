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
  });

  it('performs deduplication for multiple arguments', () => {
    const className1 = makeStyles([[null, { display: 'block' }]])({}, options);
    const className2 = makeStyles([[null, { display: 'flex' }]])({}, options);
    const className3 = makeStyles([[null, { display: 'grid' }]])({}, options);
    const className4 = makeStyles([[null, { padding: '5px' }]])({}, options);

    const resultClassName = makeStyles([[null, { display: 'grid', padding: '5px' }]])({}, options);

    expect(ax(className1, className2, className3, className4)).toBe(resultClassName);
  });

  xit('performs deduplication for RTL classes', () => {
    const ltrClassName = makeStyles([[null, { borderLeft: '5px' }]])({}, options);
    // property names are the same for flipped classes except the RTL prefix
    const rtlClassName = makeStyles([[null, { borderLeft: '5px' }]])({}, { ...options, rtl: true });

    expect(ax(ltrClassName, rtlClassName)).toBe(rtlClassName);
  });

  it('TODO MULTILEVEL', () => {
    const className1 = makeStyles([[null, { display: 'block' }]])({}, options);
    const className2 = makeStyles([[null, { display: 'flex' }]])({}, options);

    const sequence1 = ax('ui-button', className1, className2);

    const className3 = makeStyles([[null, { display: 'grid' }]])({}, options);
    const className4 = makeStyles([[null, { padding: '5px' }]])({}, options);
    const className5 = makeStyles([[null, { marginTop: '5px' }]])({}, options);

    const sequence2 = ax('ui-flex', className3, className4);
    const sequence3 = ax(sequence1, sequence2, className5);

    expect(sequence1).toBe(`ui-button ${className2}`);
    expect(sequence2).toBe('ui-flex __9pqz3z0 f13qh94s f1sbtcvk fwiuce9 fdghr9 f15vdbe4');
    expect(sequence3).toBe('ui-button ui-flex __1dxdpxy f13qh94s f1sbtcvk fwiuce9 fdghr9 f15vdbe4 f1rqyxcv');
  });

  // xdescribe('unstable functionality', () => {
  //   it('deduplicates classes with mixed priority', () => {
  //     // Classnames with numeric suffix has increased specificity
  //     const className1 = HASH_PREFIX + hashString('display' + 'flex') + '1';
  //     const className2 = HASH_PREFIX + hashString('display' + 'grid') + '2';
  //
  //     expect(ax(className1, className2)).toBe(className2);
  //   });
  // });
});
