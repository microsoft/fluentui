import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { RangeSlider } from './RangeSlider';

const thumbLabels = {
  startInput: { 'aria-label': 'Minimum' },
  endInput: { 'aria-label': 'Maximum' },
};

const getThumbs = (container: HTMLElement) => {
  const [startThumb, endThumb] = Array.from(container.querySelectorAll('[role="presentation"]')) as HTMLElement[];
  return { startThumb, endThumb };
};

describe('RangeSlider', () => {
  isConformant({
    Component: RangeSlider,
    displayName: 'RangeSlider',
    requiredProps: { 'aria-label': 'Price', ...thumbLabels },
    // RangeSlider has two input slots (startInput/endInput); native props go to the root group.
    disabledTests: ['primary-slot-gets-native-props'],
  });

  it('renders a labelled group with two range inputs', () => {
    render(<RangeSlider aria-label="Price" defaultValue={{ start: 20, end: 80 }} {...thumbLabels} />);

    expect(screen.getByRole('group', { name: 'Price' })).toBeInTheDocument();
    expect(screen.getByRole('slider', { name: 'Minimum' })).toHaveValue('20');
    expect(screen.getByRole('slider', { name: 'Maximum' })).toHaveValue('80');
  });

  it('exposes the start and end positions as CSS variables on the root', () => {
    const { container } = render(<RangeSlider defaultValue={{ start: 20, end: 80 }} {...thumbLabels} />);
    const root = container.firstElementChild as HTMLElement;

    expect(root.style.getPropertyValue('--fui-RangeSlider--start-progress')).toBe('20%');
    expect(root.style.getPropertyValue('--fui-RangeSlider--end-progress')).toBe('80%');
  });

  it('calls onChange with sorted values when a thumb changes', () => {
    const onChange = jest.fn();
    render(<RangeSlider defaultValue={{ start: 20, end: 80 }} onChange={onChange} {...thumbLabels} />);

    fireEvent.change(screen.getByRole('slider', { name: 'Minimum' }), { target: { value: '30' } });

    expect(onChange.mock.calls[0][1]).toEqual(
      expect.objectContaining({ type: 'change', value: { start: 30, end: 80 } }),
    );
  });

  describe('data attributes', () => {
    it('omits state attributes by default', () => {
      const { container } = render(<RangeSlider defaultValue={{ start: 20, end: 80 }} {...thumbLabels} />);
      const root = container.firstElementChild as HTMLElement;
      const { startThumb, endThumb } = getThumbs(container);

      expect(root).not.toHaveAttribute('data-disabled');
      expect(root).not.toHaveAttribute('data-vertical');
      expect(startThumb).not.toHaveAttribute('data-disabled');
      expect(endThumb).not.toHaveAttribute('data-disabled');
    });

    it('sets data-disabled on the root and both thumbs when disabled', () => {
      const { container } = render(<RangeSlider disabled defaultValue={{ start: 20, end: 80 }} {...thumbLabels} />);
      const { startThumb, endThumb } = getThumbs(container);

      expect(container.firstElementChild).toHaveAttribute('data-disabled', '');
      expect(startThumb).toHaveAttribute('data-disabled', '');
      expect(endThumb).toHaveAttribute('data-disabled', '');
    });

    it('sets data-vertical when vertical', () => {
      const { container } = render(<RangeSlider vertical defaultValue={{ start: 20, end: 80 }} {...thumbLabels} />);

      expect(container.firstElementChild).toHaveAttribute('data-vertical', '');
    });

    it('sets data-disabled only on a thumb disabled through its slot', () => {
      const { container } = render(
        <RangeSlider
          defaultValue={{ start: 20, end: 80 }}
          startInput={{ 'aria-label': 'Minimum', disabled: true }}
          endInput={{ 'aria-label': 'Maximum' }}
        />,
      );
      const { startThumb, endThumb } = getThumbs(container);

      expect(container.firstElementChild).not.toHaveAttribute('data-disabled');
      expect(startThumb).toHaveAttribute('data-disabled', '');
      expect(endThumb).not.toHaveAttribute('data-disabled');
      expect(screen.getByRole('slider', { name: 'Minimum' })).toHaveAttribute('aria-disabled', 'true');
    });

    it('moves data-active to the last focused thumb', () => {
      const { container } = render(<RangeSlider defaultValue={{ start: 50, end: 50 }} {...thumbLabels} />);
      const { startThumb, endThumb } = getThumbs(container);

      expect(startThumb).toHaveAttribute('data-active', '');
      expect(endThumb).not.toHaveAttribute('data-active');

      fireEvent.focus(screen.getByRole('slider', { name: 'Maximum' }));

      expect(startThumb).not.toHaveAttribute('data-active');
      expect(endThumb).toHaveAttribute('data-active', '');
    });

    it('keeps data-active on the enabled thumb when the other thumb is disabled', () => {
      const { container } = render(
        <RangeSlider
          defaultValue={{ start: 50, end: 50 }}
          startInput={{ 'aria-label': 'Minimum', disabled: true }}
          endInput={{ 'aria-label': 'Maximum' }}
        />,
      );
      const { startThumb, endThumb } = getThumbs(container);

      fireEvent.focus(screen.getByRole('slider', { name: 'Minimum' }));

      expect(startThumb).not.toHaveAttribute('data-active');
      expect(endThumb).toHaveAttribute('data-active', '');
    });

    it('does not let consumer props misrepresent the state', () => {
      const { container } = render(
        <RangeSlider
          defaultValue={{ start: 20, end: 80 }}
          data-disabled=""
          data-vertical=""
          startThumb={{ 'data-disabled': '' } as React.HTMLAttributes<HTMLDivElement>}
          {...thumbLabels}
        />,
      );
      const { startThumb } = getThumbs(container);

      expect(container.firstElementChild).not.toHaveAttribute('data-disabled');
      expect(container.firstElementChild).not.toHaveAttribute('data-vertical');
      expect(startThumb).not.toHaveAttribute('data-disabled');
    });
  });
});
