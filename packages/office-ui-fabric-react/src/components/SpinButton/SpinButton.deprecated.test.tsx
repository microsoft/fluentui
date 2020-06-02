import * as React from 'react';
import * as ReactTestUtils from 'react-dom/test-utils';
import { ReactWrapper, mount } from 'enzyme';
import { SpinButton, ISpinButtonState } from './SpinButton';
import { ISpinButton, ISpinButtonProps } from './SpinButton.types';
import { mockEvent } from '../../common/testUtilities';

describe('SpinButton', () => {
  let ref: React.RefObject<ISpinButton>;
  let wrapper: ReactWrapper<ISpinButtonProps, ISpinButtonState, SpinButton> | undefined;

  beforeEach(() => {
    ref = React.createRef<ISpinButton>();
  });

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
      wrapper = undefined;
    }
  });

  // Documenting current incorrect behavior.
  // The test SHOULD be "ignores user-entered values when value prop is set"
  it('incorrectly accepts user-entered values when value prop is set', () => {
    wrapper = mount(<SpinButton componentRef={ref} value="12" />);

    const inputDOM = wrapper.getDOMNode().querySelector('input')!;
    ReactTestUtils.Simulate.input(inputDOM, mockEvent('21'));
    ReactTestUtils.Simulate.blur(inputDOM);

    // Once the incorrect behavior is fixed, these will still be '12'
    expect(ref.current!.value).toBe('21');
    expect(inputDOM.value).toBe('21');
    expect(inputDOM.getAttribute('aria-valuenow')).toBe('21');
  });
});
