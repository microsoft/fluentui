import { GriffelStyle } from '@fluentui/react-components';
import { grid } from './Grid.mixins';

const testMixin = (mixin: GriffelStyle | undefined, expectedStyle: GriffelStyle) => {
  test(JSON.stringify(expectedStyle), () => {
    const result = { ...mixin };
    expect(result).toEqual(expectedStyle);
  });
};

describe('Grid.mixins', () => {
  describe('rows', () => {
    testMixin(grid.rows('5'), { gridTemplateRows: 'repeat(5, 1fr)' });
    testMixin(grid.rows('repeat(5, 1fr)'), {
      gridTemplateRows: 'repeat(5, 1fr)',
    });
  });

  describe('columns', () => {
    testMixin(grid.columns('5'), { gridTemplateColumns: 'repeat(5, 1fr)' });
    testMixin(grid.columns('repeat(5, 1fr)'), {
      gridTemplateColumns: 'repeat(5, 1fr)',
    });
  });
});
