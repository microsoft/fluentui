import { GriffelStyle } from '@fluentui/react-components';
import { flexItem } from './FlexItem.mixins';

const testMixin = (mixin: GriffelStyle | undefined, expectedStyle: GriffelStyle | undefined) => {
  const name = expectedStyle ? JSON.stringify(expectedStyle) : 'empty';
  test(name, () => {
    const result = { ...mixin };
    expect(result).toEqual(expectedStyle || {});
  });
};

describe('FlexItem.mixins', () => {
  describe('align', () => {
    testMixin(flexItem.align('auto'), { alignSelf: 'auto' });
    testMixin(flexItem.align('start'), { alignSelf: 'flex-start' });
    testMixin(flexItem.align('end'), { alignSelf: 'flex-end' });
    testMixin(flexItem.align('center'), { alignSelf: 'center' });
    testMixin(flexItem.align('baseline'), { alignSelf: 'baseline' });
    testMixin(flexItem.align('stretch'), { alignSelf: 'stretch' });
  });

  describe('size', () => {
    testMixin(flexItem.size('half'), { flexBasis: '50%' });
    testMixin(flexItem.size('quarter'), { flexBasis: '25%' });
    testMixin(flexItem.size('small'), { flexBasis: '150px' });
    testMixin(flexItem.size('medium'), { flexBasis: '200px' });
    testMixin(flexItem.size('large'), { flexBasis: '300px' });
  });

  describe('grow', () => {
    testMixin(flexItem.grow(true), { flexGrow: 1 });
    testMixin(flexItem.grow(5), { flexGrow: 5 });
    testMixin(flexItem.grow(false), undefined);
  });

  describe('shrink', () => {
    testMixin(flexItem.shrink(false), { flexShrink: 0 });
    testMixin(flexItem.shrink(5), { flexShrink: 5 });
    testMixin(flexItem.shrink(true), undefined);
  });

  describe('pushRow', () => {
    testMixin(flexItem.pushRow(), { marginLeft: 'auto' });
  });

  describe('pushColumn', () => {
    testMixin(flexItem.pushColumn(), { marginTop: 'auto' });
  });
});
