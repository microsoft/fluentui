import * as React from 'react';
import { ReactWrapper } from 'enzyme';
import { VanillaButton, VanillaButtonProps } from './index';
import { isConformant } from '../../common/isConformant';

describe('Button', () => {
  let wrapper: ReactWrapper | undefined;

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
      wrapper = undefined;
    }
  });

  isConformant({
    Component: VanillaButton as React.FunctionComponent<VanillaButtonProps>,
    displayName: 'Button',
  });
});
