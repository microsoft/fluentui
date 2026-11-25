import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { isConformant } from '../../../testing/isConformant';
import { AlphaSlider } from './AlphaSlider';
import { FluentProvider } from '@fluentui/react-provider';
import { webLightTheme } from '@fluentui/react-theme';

describe('AlphaSlider', () => {
  isConformant({
    Component: AlphaSlider,
    displayName: 'AlphaSlider',
    disabledTests: ['has-top-level-file-extra'],
    primarySlot: 'input',
    requiredProps: { 'aria-label': 'Alpha' },
  });

  it('renders opacity as a native range value', () => {
    const { container } = render(<AlphaSlider aria-label="Opacity" color={{ h: 20, s: 0.4, v: 0.8, a: 0.7 }} />);

    expect(screen.getByRole('slider', { name: 'Opacity' })).toHaveValue('70');
    expect(container.firstElementChild).toHaveAttribute('data-orientation', 'horizontal');
    expect(container.firstElementChild).not.toHaveAttribute('data-transparency');
  });

  it('exposes transparency state, protects reserved attributes, and reports changes', () => {
    const onChange = jest.fn();
    const { container } = render(
      <AlphaSlider
        aria-label="Transparency"
        color={{ h: 20, s: 0.4, v: 0.8, a: 0.7 }}
        onChange={onChange}
        transparency
        vertical
        // @ts-expect-error data attributes are valid runtime slot props but are not modeled by React's HTML attributes.
        root={{ 'data-orientation': 'horizontal', 'data-transparency': undefined }}
      />,
    );

    expect(container.firstElementChild).toHaveAttribute('data-orientation', 'vertical');
    expect(container.firstElementChild).toHaveAttribute('data-transparency');

    fireEvent.change(screen.getByRole('slider', { name: 'Transparency' }), { target: { value: '20' } });
    expect(onChange).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        color: { h: 20, s: 0.4, v: 0.8, a: 0.8 },
      }),
    );
  });

  it('inherits RTL transparency direction, uncontrolled alpha and orientation from the base', () => {
    const onChange = jest.fn();
    render(
      <FluentProvider dir="rtl" theme={webLightTheme}>
        <AlphaSlider defaultColor={{ h: 240, s: 0.4, v: 0.8, a: 0.6 }} transparency onChange={onChange} />
      </FluentProvider>,
    );
    const input = screen.getByRole('slider');
    expect(input).toHaveAttribute('aria-orientation', 'horizontal');
    expect(input.parentElement!.style.getPropertyValue('--fui-AlphaSlider--direction')).toBe('90deg');
    fireEvent.change(input, { target: { value: '25' } });
    expect(input).toHaveValue('25');
    expect(onChange.mock.lastCall[1].color).toEqual({ h: 240, s: 0.4, v: 0.8, a: 0.75 });
  });
});
