import * as React from 'react';
import { render } from '@testing-library/react';
import { Label } from './Label';
import { isConformant } from '../../testing/isConformant';

describe('Label', () => {
  isConformant({
    Component: Label,
    displayName: 'Label',
    requiredProps: { children: "I'm a label." },
    testOptions: {
      'has-static-classnames': [
        {
          props: { required: 'Required Test' },
        },
      ],
    },
  });

  it('renders a default state', () => {
    const result = render(<Label>Default Label</Label>);
    expect(result.container).toMatchSnapshot();
  });

  it('renders a custom asterisk', () => {
    const result = render(
      <Label required="foo" data-testid="label-id">
        I'm a label
      </Label>,
    );
    const label = result.getByTestId('label-id');
    const requiredSlot = label.children[0];
    if (requiredSlot) {
      expect(requiredSlot.innerHTML).toBe('foo');
    } else {
      throw Error('Custom required text was not rendered');
    }
    expect(result.baseElement).toMatchSnapshot();
  });
});

describe('Label DOM attributes', () => {
  it('does not render component props as DOM attributes', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    const { container } = render(
      <Label disabled required size="large" weight="semibold">
        Text
      </Label>,
    );

    expect(consoleError).not.toHaveBeenCalled();
    consoleError.mockRestore();
    expect((container.firstElementChild as HTMLElement).getAttributeNames().sort()).toEqual(['class']);
  });
});
