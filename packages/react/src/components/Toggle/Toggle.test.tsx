import '@testing-library/jest-dom';
import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { create } from '@fluentui/test-utilities';
import { resetIds } from '@fluentui/utilities';
import { Toggle } from './Toggle';
import { isConformant } from '../../common/isConformant';
import { getBySelector } from '../../common/testUtilities';

describe('Toggle', () => {
  beforeEach(() => {
    resetIds();
  });

  it('renders a label', () => {
    render(<Toggle label="Label" />);
    expect(screen.getByText('Label')).toBeInTheDocument();
  });

  it('renders toggle correctly', () => {
    const component = create(<Toggle label="Label" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders toggle correctly with inline label (string)', () => {
    const component = create(<Toggle label="Label" inlineLabel={true} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders toggle correctly with inline label (JSX Element)', () => {
    const component = create(<Toggle label={<p>Label</p>} inlineLabel={true} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders toggle correctly with inline label and on/off text provided', () => {
    const component = create(<Toggle label="Label" inlineLabel={true} onText="On" offText="Off" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders hidden toggle correctly', () => {
    const component = create(<Toggle hidden />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  isConformant({
    Component: Toggle,
    displayName: 'Toggle',
  });

  it('renders aria-label', () => {
    const { container } = render(<Toggle label="Label" ariaLabel="AriaLabel" />);
    const button = getBySelector(container, 'button') as HTMLButtonElement;
    expect(button.getAttribute('aria-label')).toEqual('AriaLabel');
  });

  it('can call the callback on a change of toggle', () => {
    let isToggledValue;
    const callback = (ev: React.MouseEvent<HTMLElement>, isToggled?: boolean) => {
      isToggledValue = isToggled;
    };

    const { container } = render(<Toggle label="Label" onChange={callback} />);
    const button = getBySelector(container, 'button') as HTMLButtonElement;

    expect(button.getAttribute('aria-checked')).toEqual('false');

    fireEvent.click(button);

    expect(isToggledValue).toEqual(true);

    expect(button.getAttribute('aria-checked')).toEqual('true');
  });

  it(`doesn't update the state if the user provides checked`, () => {
    const { container } = render(<Toggle label="Label" checked={false} />);
    const button = getBySelector(container, 'button') as HTMLButtonElement;

    expect(button.getAttribute('aria-checked')).toEqual('false');

    fireEvent.click(button);

    expect(button.getAttribute('aria-checked')).toEqual('false');
  });

  it(`doesn't render a label element if none is provided`, () => {
    render(<Toggle checked={false} />);

    expect(screen.queryByText('label')).toBeNull();
  });

  it(`doesn't trigger onSubmit when placed inside a form`, () => {
    const onSubmit = jest.fn();

    const { container } = render(
      <form
        action="#"
        onSubmit={e => {
          onSubmit();
          e.preventDefault();
        }}
      >
        <Toggle label="Label" />
      </form>,
    );
    const button = getBySelector(container, 'button') as HTMLButtonElement;
    // simulate to change toggle state
    fireEvent.click(button);
    expect(button.getAttribute('aria-checked')).toEqual('true');
    expect(onSubmit).not.toHaveBeenCalled();
  });

  describe('aria-labelledby', () => {
    it('has no aria-labelledby attribute if ariaLabel is provided', () => {
      const { container } = render(<Toggle label="Label" ariaLabel="AriaLabel" />);
      const button = getBySelector(container, 'button') as HTMLButtonElement;

      expect(button.getAttribute('aria-labelledby')).toBeNull();
    });

    it('is labelled by the label element if no aria labels are provided', () => {
      const { container } = render(<Toggle label="Label" id="ToggleId" />);
      const button = getBySelector(container, 'button') as HTMLButtonElement;

      expect(button.getAttribute('aria-labelledby')).toBe('ToggleId-label');
    });

    it('is labelled by the state text element if no aria labels are provided and no label is provided', () => {
      const { container } = render(<Toggle onText="On" offText="Off" id="ToggleId" />);
      const button = getBySelector(container, 'button') as HTMLButtonElement;

      expect(button.getAttribute('aria-labelledby')).toBe('ToggleId-stateText');
    });

    it('is labelled by the label element alone if no aria labels are provided, and state text is provided', () => {
      const { container } = render(<Toggle label="Label" onText="On" offText="Off" id="ToggleId" />);
      const button = getBySelector(container, 'button') as HTMLButtonElement;
      expect(button.getAttribute('aria-labelledby')).toBe('ToggleId-label');
    });
  });
});
