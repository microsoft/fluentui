import { mount } from 'enzyme';
import * as React from 'react';

import { Box } from 'src/components/Box/Box';
import { TreeTitle } from 'src/components/Tree/TreeTitle';
import { isConformant, implementsShorthandProp } from 'test/specs/commonTests';

describe('TreeTitle', () => {
  isConformant(TreeTitle, { testPath: __filename, constructorName: 'TreeTitle' });

  implementsShorthandProp(TreeTitle)('selectionIndicator', Box, {
    mapsValueToProp: 'children',
    requiredProps: { selectable: true },
  });

  describe('selectable', () => {
    it('do not render "selectionIndicator" if false', () => {
      const wrapper = mount(<TreeTitle selectionIndicator={{ children: 'Foo' }} />);

      expect(wrapper.find({ children: 'Foo' })).toHaveLength(0);
    });
  });
});
