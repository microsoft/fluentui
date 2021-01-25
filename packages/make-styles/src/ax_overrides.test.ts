import { ax } from './ax';
import { makeOverrides } from './makeOverrides';
import { createDOMRenderer } from './renderer/createDOMRenderer';
import { MakeStylesOptions } from './types';

const options: MakeStylesOptions<{}> = {
  renderer: createDOMRenderer(),
  tokens: {},
};

describe('ax', () => {
  it('performs deduplication for multiple arguments', () => {
    const className1 = makeOverrides({ root: { display: 'block' } })(options);
    const className2 = makeOverrides({ root: { display: 'flex' } })(options);
    const className3 = makeOverrides({ root: { display: 'grid' } })(options);
    const className4 = makeOverrides({ root: { padding: '5px' } })(options);

    const resultClassName = makeOverrides({ root: { display: 'grid', padding: '5px' } })(options);

    expect(ax(className1.root, className2.root, className3.root, className4.root)).toBe(resultClassName.root);
  });

  // xit('performs deduplication for RTL classes', () => {
  //   const ltrClassName = makeStyles([[null, { borderLeft: '5px' }]])({}, options);
  //   // property names are the same for flipped classes except the RTL prefix
  //   const rtlClassName = makeStyles([[null, { borderLeft: '5px' }]])({}, { ...options, rtl: true });
  //
  //   expect(ax(ltrClassName, rtlClassName)).toBe(rtlClassName);
  // });

  it('TODO MULTILEVEL', () => {
    const className1 = makeOverrides({ root: { display: 'block' } })(options);
    const className2 = makeOverrides({ root: { display: 'flex' } })(options);

    const sequence1 = ax('ui-button', className1.root, className2.root);

    const className3 = makeOverrides({ root: { display: 'grid' } })(options);
    const className4 = makeOverrides({ root: { padding: '5px' } })(options);
    const className5 = makeOverrides({ root: { marginTop: '5px' } })(options);

    const sequence2 = ax('ui-flex', className3.root, className4.root);
    const sequence3 = ax(sequence1, sequence2, className5.root);

    expect(sequence1).toBe(`ui-button ${className2.root}`);
    expect(sequence2).toBe('ui-flex __9a122w0 f13qh94s f1sbtcvk fwiuce90 fdghr900 f15vdbe4');
    expect(sequence3).toBe('ui-button ui-flex __xzc3aa0 f13qh94s f1sbtcvk fwiuce90 fdghr900 f15vdbe4 f1rqyxcv');
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
