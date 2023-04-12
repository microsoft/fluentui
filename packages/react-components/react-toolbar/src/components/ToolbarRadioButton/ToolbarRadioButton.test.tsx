import * as React from 'react';
import { render } from '@testing-library/react';
import { ToolbarRadioButton } from './ToolbarRadioButton';
import { isConformant } from '../../testing/isConformant';
import { ToggleButtonProps } from '@fluentui/react-button';
import userEvent from '@testing-library/user-event';
import { Toolbar } from '../Toolbar/Toolbar';

describe('ToolbarRadioButton', () => {
  isConformant({
    Component: ToolbarRadioButton as React.FunctionComponent<ToggleButtonProps>,
    displayName: 'ToolbarRadioButton',
    disabledTests: ['component-has-static-classnames-object'],
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(
      <ToolbarRadioButton name="name" value="value">
        Default ToolbarRadio
      </ToolbarRadioButton>,
    );
    expect(result.container).toMatchSnapshot();
  });

  it('should call onCheckedValueChange with proper value', () => {
    const onCheckedValueChange = jest.fn();

    const { getByText } = render(
      <Toolbar onCheckedValueChange={onCheckedValueChange}>
        <ToolbarRadioButton name="text" value="italic">
          italic
        </ToolbarRadioButton>
        <ToolbarRadioButton name="text" value="bold">
          bold
        </ToolbarRadioButton>
      </Toolbar>,
    );

    userEvent.click(getByText('bold'));

    expect(onCheckedValueChange).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'click',
      }),
      expect.objectContaining({
        checkedItems: expect.arrayContaining(['bold']),
      }),
    );
  });

  it('should check the proper value', () => {
    const onCheckedValueChange = jest.fn();

    const { getByText } = render(
      <Toolbar onCheckedValueChange={onCheckedValueChange}>
        <ToolbarRadioButton name="text" value="italic">
          italic
        </ToolbarRadioButton>
        <ToolbarRadioButton name="text" value="bold">
          bold
        </ToolbarRadioButton>
      </Toolbar>,
    );

    userEvent.click(getByText('bold'));

    expect(getByText('bold').getAttribute('aria-checked')).toBe('true');
  });
});
