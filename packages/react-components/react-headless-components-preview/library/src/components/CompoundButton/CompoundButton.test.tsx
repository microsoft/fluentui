import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { isConformant } from '../../testing/isConformant';
import { CompoundButton } from './CompoundButton';

expect.extend(toHaveNoViolations);

describe('CompoundButton', () => {
  isConformant({
    Component: CompoundButton,
    displayName: 'CompoundButton',
  });

  it('renders a button with primary and secondary text in its accessible name', () => {
    const { getByRole } = render(<CompoundButton secondaryContent="Secondary">Primary</CompoundButton>);
    const button = getByRole('button', { name: 'Primary Secondary' });

    expect(button).toHaveAttribute('type', 'button');
  });

  it('supports anchor polymorphism and href', () => {
    const { getByRole } = render(
      <CompoundButton as="a" href="#compound-button">
        Link
      </CompoundButton>,
    );

    expect(getByRole('link', { name: 'Link' })).toHaveAttribute('href', '#compound-button');
  });

  it('forwards root className and style', () => {
    const { getByRole } = render(
      <CompoundButton className="root-class" style={{ cursor: 'pointer' }}>
        Button
      </CompoundButton>,
    );

    expect(getByRole('button')).toHaveClass('root-class');
    expect(getByRole('button')).toHaveStyle({ cursor: 'pointer' });
  });

  it('forwards icon, contentContainer, and secondaryContent slot props', () => {
    const { container } = render(
      <CompoundButton
        icon={{ children: 'Icon', className: 'icon-class' }}
        contentContainer={{ className: 'content-class' }}
        secondaryContent={{ children: 'Secondary', className: 'secondary-class' }}
      >
        Primary
      </CompoundButton>,
    );

    expect(container.querySelector('.icon-class')).toHaveTextContent('Icon');
    expect(container.querySelector('.content-class')).toHaveTextContent('PrimarySecondary');
    expect(container.querySelector('.secondary-class')).toHaveTextContent('Secondary');
  });

  it.each([
    ['before', 'icon', 'content'],
    ['after', 'content', 'icon'],
  ] as const)('renders an icon %s the content', (iconPosition, first, last) => {
    const { container, getByRole } = render(
      <CompoundButton
        icon={{ children: 'Icon', className: 'icon' }}
        contentContainer={{ className: 'content' }}
        iconPosition={iconPosition}
      >
        Primary
      </CompoundButton>,
    );
    const button = getByRole('button');

    expect(button.firstElementChild).toBe(container.querySelector(`.${first}`));
    expect(button.lastElementChild).toBe(container.querySelector(`.${last}`));
  });

  it('renders secondary content without primary content', () => {
    const { getByRole } = render(<CompoundButton secondaryContent="Secondary" />);

    expect(getByRole('button', { name: 'Secondary' })).toBeInTheDocument();
  });

  it('blocks activation and emits an exact disabled presence attribute when disabled', () => {
    const onClick = jest.fn();
    const { getByRole } = render(
      <CompoundButton disabled onClick={onClick}>
        Disabled
      </CompoundButton>,
    );
    const button = getByRole('button');

    fireEvent.click(button);

    expect(onClick).not.toHaveBeenCalled();
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('data-disabled', '');
  });

  it('remains focusable, blocks activation, and emits an exact attribute when disabledFocusable', () => {
    const onClick = jest.fn();
    const { getByRole } = render(
      <CompoundButton disabledFocusable onClick={onClick}>
        Disabled focusable
      </CompoundButton>,
    );
    const button = getByRole('button');

    button.focus();
    fireEvent.click(button);

    expect(button).toHaveFocus();
    expect(button).not.toBeDisabled();
    expect(button).toHaveAttribute('aria-disabled', 'true');
    expect(button).toHaveAttribute('data-disabled-focusable', '');
    expect(onClick).not.toHaveBeenCalled();
  });

  it('allows focus but suppresses Enter and Space activation when disabledFocusable', () => {
    const onClick = jest.fn();
    const { getByRole } = render(
      <CompoundButton disabledFocusable onClick={onClick}>
        Disabled focusable
      </CompoundButton>,
    );
    const button = getByRole('button');

    button.focus();
    userEvent.keyboard('{Enter}');
    userEvent.keyboard('{space}');

    expect(button).toHaveFocus();
    expect(onClick).not.toHaveBeenCalled();
  });

  it('emits an exact icon-only presence attribute', () => {
    const { getByRole } = render(<CompoundButton icon="Icon" aria-label="Icon button" />);

    expect(getByRole('button')).toHaveAttribute('data-icon-only', '');
  });

  it('secondary content prevents icon-only state', () => {
    const { getByRole } = render(
      <CompoundButton icon="Icon" secondaryContent="Secondary">
        Primary
      </CompoundButton>,
    );
    const button = getByRole('button');

    expect(button).not.toHaveAttribute('data-icon-only');
    expect(button).toHaveAttribute('data-has-secondary-content', '');
  });

  it('marks string secondary content as rendered', () => {
    const { getByRole } = render(<CompoundButton secondaryContent="Secondary">Primary</CompoundButton>);

    expect(getByRole('button')).toHaveAttribute('data-has-secondary-content', '');
  });

  it('marks React element secondary content as rendered', () => {
    const { getByRole } = render(<CompoundButton secondaryContent={<em>Secondary</em>}>Primary</CompoundButton>);

    expect(getByRole('button')).toHaveAttribute('data-has-secondary-content', '');
  });

  it('marks a secondary slot object with children as rendered', () => {
    const { getByRole } = render(<CompoundButton secondaryContent={{ children: 'Secondary' }}>Primary</CompoundButton>);

    expect(getByRole('button')).toHaveAttribute('data-has-secondary-content', '');
  });

  it('keeps an icon-only button when the secondary slot object is empty', () => {
    const { getByRole } = render(<CompoundButton icon="Icon" secondaryContent={{}} aria-label="Icon button" />);
    const button = getByRole('button');

    expect(button).toHaveAttribute('data-icon-only', '');
    expect(button).not.toHaveAttribute('data-has-secondary-content');
  });

  it.each([
    ['null', null],
    ['undefined', undefined],
  ] as const)('omits has-secondary-content for %s secondary content', (_name, secondaryContent) => {
    const { getByRole } = render(<CompoundButton secondaryContent={secondaryContent}>Primary</CompoundButton>);

    expect(getByRole('button')).not.toHaveAttribute('data-has-secondary-content');
  });

  it('overwrites conflicting reserved attributes for present states', () => {
    const { getByRole } = render(
      <>
        <CompoundButton
          disabled
          disabledFocusable
          icon="Icon"
          aria-label="Reserved attributes"
          data-disabled="consumer"
          data-disabled-focusable="consumer"
          data-icon-only="consumer"
        />
        <CompoundButton secondaryContent="Secondary" data-has-secondary-content="consumer">
          Primary
        </CompoundButton>
      </>,
    );
    const button = getByRole('button', { name: 'Reserved attributes' });
    const buttonWithSecondaryContent = getByRole('button', { name: 'Primary Secondary' });

    expect(button).toHaveAttribute('data-disabled', '');
    expect(button).toHaveAttribute('data-disabled-focusable', '');
    expect(button).toHaveAttribute('data-icon-only', '');
    expect(buttonWithSecondaryContent).toHaveAttribute('data-has-secondary-content', '');
  });

  it('removes conflicting reserved attributes for absent states', () => {
    const { getByRole } = render(
      <CompoundButton
        data-disabled="consumer"
        data-disabled-focusable="consumer"
        data-icon-only="consumer"
        data-has-secondary-content="consumer"
      >
        Primary
      </CompoundButton>,
    );
    const button = getByRole('button');

    expect(button).not.toHaveAttribute('data-disabled');
    expect(button).not.toHaveAttribute('data-disabled-focusable');
    expect(button).not.toHaveAttribute('data-icon-only');
    expect(button).not.toHaveAttribute('data-has-secondary-content');
  });

  it('has no accessibility violations in a representative group', async () => {
    const { container } = render(
      <div role="group" aria-label="Compound button examples">
        <CompoundButton secondaryContent="Secondary">Primary</CompoundButton>
        <CompoundButton as="a" href="#compound-button">
          Link
        </CompoundButton>
        <CompoundButton disabled>Disabled</CompoundButton>
        <CompoundButton disabledFocusable>Disabled focusable</CompoundButton>
        <CompoundButton icon="Icon" aria-label="Icon button" />
      </div>,
    );

    expect(await axe(container)).toHaveNoViolations();
  });
});
