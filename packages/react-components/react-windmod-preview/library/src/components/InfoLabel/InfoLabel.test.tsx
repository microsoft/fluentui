import * as React from 'react';
import { render } from '@testing-library/react';

import { isConformant } from '../../testing/isConformant';
import { Field } from '../Field';
import { Input } from '../Input';
import type { LabelProps } from '../Label';
import { InfoLabel } from './InfoLabel';
import type { InfoLabelState } from './InfoLabel.types';
import { infoLabelClassNames, useInfoLabelStyles } from './useInfoLabelStyles';

import styles from './InfoLabel.module.css';

// Frozen-state guard — see testing/freezeState.ts.
jest.mock('@fluentui/react-headless-components-preview/info-label', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/info-label');
  const { deepFreezeState } = require('../../testing/freezeState');

  return {
    ...actual,
    useInfoLabel: (...args: unknown[]) =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- forwarding the hook's own signature
      deepFreezeState((actual.useInfoLabel as any)(...args)),
  };
});

// Read structurally, never by class query: generateTestIdent drops the component token under
// jest, so InfoLabel's `.label` and any other module's `.label` stringify identically.
const parts = (container: HTMLElement) => {
  const root = container.querySelector('span')!;

  return {
    root,
    label: container.querySelector('label')!,
    button: container.querySelector('button'),
    glyphs: Array.from(container.querySelectorAll('button svg')),
  };
};

describe('InfoLabel', () => {
  isConformant({
    Component: InfoLabel,
    displayName: 'InfoLabel',
    // The ref reaches the label, not the root — the label is the primary slot on both libraries.
    primarySlot: 'label',
    requiredProps: { children: 'Label text', info: 'Example info' },
  });

  it('carries the marker pair in order', () => {
    const { root } = parts(render(<InfoLabel info="i">L</InfoLabel>).container);

    expect(root).toHaveClass('fui-info-label');
    expect(root).toHaveClass('group/fui-info-label');
    expect(root.classList[0]).toBe('fui-info-label');
    expect(root.className).toContain(infoLabelClassNames.root);
  });

  it('applies its own classes to both children', () => {
    const { label, button } = parts(render(<InfoLabel info="i">L</InfoLabel>).container);

    expect(label).toHaveClass(styles.label);
    expect(button).toHaveClass(styles.infoButton);
  });

  it('renders the windmod Label and InfoButton', () => {
    const { label, button } = parts(render(<InfoLabel info="i">L</InfoLabel>).container);

    expect(label).toHaveClass('fui-label');
    expect(label).toHaveClass('group/fui-label');
    expect(button).toHaveClass('fui-info-button');
    expect(button).toHaveClass('group/fui-info-button');
  });

  // The headless hook forwards `size` to the Label only by accident and drops it for the info
  // button entirely; windmod re-injects it into both. Without this the glyph is 16px where
  // Griffel renders 20px.
  it('propagates size to both children, defaulting to medium', () => {
    const fallback = render(<InfoLabel info="i">L</InfoLabel>);

    expect(parts(fallback.container).label).toHaveAttribute('data-size', 'medium');
    expect(parts(fallback.container).button).toHaveAttribute('data-size', 'medium');
    fallback.unmount();

    for (const size of ['small', 'medium', 'large'] as const) {
      const widths = { small: '12', medium: '16', large: '20' };
      const scoped = render(
        <InfoLabel info="i" size={size}>
          L
        </InfoLabel>,
      );
      const { label, button, glyphs } = parts(scoped.container);

      expect(label).toHaveAttribute('data-size', size);
      expect(button).toHaveAttribute('data-size', size);
      expect(glyphs.map(glyph => glyph.getAttribute('width'))).toEqual([widths[size], widths[size]]);
      scoped.unmount();
    }
  });

  it("lets a consumer's own slot value win over the injected size", () => {
    const { container } = render(
      <InfoLabel info="i" size="large" infoButton={{ size: 'small' }}>
        L
      </InfoLabel>,
    );

    expect(parts(container).button).toHaveAttribute('data-size', 'small');
  });

  it('passes weight through to the label', () => {
    const { container } = render(
      <InfoLabel info="i" weight="semibold">
        L
      </InfoLabel>,
    );

    expect(parts(container).label.className).toContain('semibold');
  });

  it('renders the required asterisk between the text and the button', () => {
    const { container } = render(
      <InfoLabel info="i" required>
        L
      </InfoLabel>,
    );
    const { root, label, button } = parts(container);
    const asterisk = label.querySelector('span')!;

    expect(asterisk.textContent).toBe('*');
    // The asterisk closes the label, and the button follows the label inside the root.
    expect(label.lastElementChild).toBe(asterisk);
    expect(Array.from(root.children)).toEqual([label, button]);
    expect(label).toHaveAttribute('data-required', '');
  });

  it('reaches the label with disabled', () => {
    const { container } = render(
      <InfoLabel info="i" disabled>
        L
      </InfoLabel>,
    );

    expect(parts(container).label).toHaveAttribute('data-disabled', '');
  });

  it('renders no info button when info is unset', () => {
    const { container } = render(<InfoLabel>L</InfoLabel>);

    expect(parts(container).button).toBeNull();
  });

  // A Field label render function replaces the whole slot, so Field's own label swap is bypassed
  // and the InfoLabel must carry the Fluent label contract itself — and the size the Field hands
  // down has to reach the glyph.
  it('composes into a Field, carrying the Field size down to the glyph', () => {
    const { container } = render(
      <Field
        size="large"
        required
        label={{
          children: (_: unknown, props: LabelProps) => (
            <InfoLabel {...props} info="Example info">
              Field with info label
            </InfoLabel>
          ),
        }}
      >
        <Input />
      </Field>,
    );
    const { label, button, glyphs } = parts(container);
    const control = container.querySelector('input')!;

    expect(label.id).toMatch(/^field-.*__label$/);
    expect(label.getAttribute('for')).toBe(control.id);
    expect(button!.getAttribute('aria-labelledby')).toContain(label.id);
    expect(label).toHaveAttribute('data-size', 'large');
    expect(button).toHaveAttribute('data-size', 'large');
    expect(glyphs.map(glyph => glyph.getAttribute('width'))).toEqual(['20', '20']);
  });

  it('does not mutate the state it is given', () => {
    const state = {
      components: { root: 'span', label: 'label', infoButton: 'button' },
      root: { as: 'span', className: 'consumer-root' },
      label: { as: 'label', className: 'consumer-label' },
      infoButton: { className: 'consumer-button' },
      size: 'medium',
    } as unknown as InfoLabelState;

    const styled = useInfoLabelStyles(state);

    expect(styled).not.toBe(state);
    expect(state.root.className).toBe('consumer-root');
    expect(state.label.className).toBe('consumer-label');
    expect(state.infoButton!.className).toBe('consumer-button');
    expect(styled.root.className).toContain('consumer-root');
    expect(styled.label.className).toContain('consumer-label');
    expect(styled.infoButton!.className).toContain('consumer-button');
  });
});
