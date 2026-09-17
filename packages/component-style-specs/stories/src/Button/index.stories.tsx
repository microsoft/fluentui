import * as React from 'react';
import { Button as ShippedButton, Divider as ShippedDivider, type JSXElement } from '@fluentui/react-components';
import { useButtonStyles_unstable } from '../../../../style-spec-compilers/src/__fixtures__/Button/griffel/useButtonStyles.styles';
import styles from './button.module.css';
import { getButtonClassNames } from './button.classes';

export default {
  title: 'Component Style Specs/Button',
};

const rowStyle: React.CSSProperties = {
  display: 'flex',
  gap: 8,
  flexWrap: 'wrap',
  alignItems: 'center',
  marginBottom: 16,
};

const labelStyle: React.CSSProperties = {
  fontWeight: 600,
  minWidth: 140,
};

export const ShippedV9 = (): JSXElement => (
  <div style={rowStyle}>
    <ShippedButton>Secondary</ShippedButton>
    <ShippedButton appearance="primary">Primary</ShippedButton>
    <ShippedButton appearance="outline">Outline</ShippedButton>
    <ShippedButton appearance="subtle" disabled>
      Disabled
    </ShippedButton>
  </div>
);

type GeneratedButtonProps = {
  children?: React.ReactNode;
  appearance?: string;
  size?: string;
  shape?: string;
  disabled?: boolean;
};

const GeneratedGriffelButton = (props: GeneratedButtonProps): JSXElement => {
  const { children, appearance = 'secondary', size = 'medium', shape = 'rounded', disabled } = props;
  const rootRef = React.useRef<HTMLButtonElement>(null);
  const state = useButtonStyles_unstable({
    appearance,
    size,
    shape,
    disabled,
    root: { className: undefined, ref: rootRef },
  });

  return (
    <button type="button" ref={rootRef} className={state.root.className as string | undefined} disabled={disabled}>
      {children}
    </button>
  );
};

export const GeneratedGriffel = (): JSXElement => (
  <div style={rowStyle}>
    <GeneratedGriffelButton>Secondary</GeneratedGriffelButton>
    <GeneratedGriffelButton appearance="primary">Primary</GeneratedGriffelButton>
    <GeneratedGriffelButton appearance="outline">Outline</GeneratedGriffelButton>
    <GeneratedGriffelButton appearance="subtle" disabled>
      Disabled
    </GeneratedGriffelButton>
  </div>
);

/** Headless-style host: behavior via data attributes, visuals via generated CSS Module. */
export const StyledHeadlessWrapper = (): JSXElement => (
  <div style={rowStyle}>
    <button type="button" className={getButtonClassNames(styles, {})}>
      Secondary
    </button>
    <button type="button" className={getButtonClassNames(styles, { appearance: 'primary' })}>
      Primary
    </button>
    <button type="button" className={getButtonClassNames(styles, { appearance: 'outline' })}>
      Outline
    </button>
    <button type="button" className={getButtonClassNames(styles, { appearance: 'subtle' })} data-disabled>
      Disabled
    </button>
  </div>
);

export const SideBySide = (): JSXElement => (
  <div>
    <div style={rowStyle}>
      <span style={labelStyle}>Shipped v9</span>
      <ShippedV9 />
    </div>
    <div style={rowStyle}>
      <span style={labelStyle}>Generated Griffel</span>
      <GeneratedGriffel />
    </div>
    <div style={rowStyle}>
      <span style={labelStyle}>CSS Module</span>
      <StyledHeadlessWrapper />
    </div>
    <ShippedDivider />
  </div>
);
