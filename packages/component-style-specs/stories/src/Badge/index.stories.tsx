import * as React from 'react';
import { Badge as ShippedBadge, type JSXElement } from '@fluentui/react-components';
import { useBadgeStyles_unstable } from '../../../../style-spec-compilers/src/__fixtures__/Badge/griffel/useBadgeStyles.styles';
import styles from './badge.module.css';
import { getBadgeClassNames } from './badge.classes';

export default {
  title: 'Component Style Specs/Badge',
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

/** Shipped v9 Badge for visual reference. */
export const ShippedV9 = (): JSXElement => (
  <div style={rowStyle}>
    <ShippedBadge appearance="filled" color="brand">
      Brand
    </ShippedBadge>
    <ShippedBadge appearance="outline" color="danger">
      Danger
    </ShippedBadge>
    <ShippedBadge appearance="tint" color="success" size="large">
      Success
    </ShippedBadge>
    <ShippedBadge appearance="ghost" color="informative">
      Info
    </ShippedBadge>
  </div>
);

type GeneratedBadgeProps = {
  children?: React.ReactNode;
  appearance?: string;
  color?: string;
  size?: string;
  shape?: string;
};

/** Thin host that applies the compiler-generated Griffel hook. */
const GeneratedGriffelBadge = (props: GeneratedBadgeProps): JSXElement => {
  const { children, appearance = 'filled', color = 'brand', size = 'medium', shape = 'circular' } = props;
  const rootRef = React.useRef<HTMLSpanElement>(null);
  const state = useBadgeStyles_unstable({
    appearance,
    color,
    size,
    shape,
    root: { className: undefined, ref: rootRef },
  });

  return (
    <span ref={rootRef} className={state.root.className as string | undefined}>
      {children}
    </span>
  );
};

export const GeneratedGriffel = (): JSXElement => (
  <div style={rowStyle}>
    <GeneratedGriffelBadge appearance="filled" color="brand">
      Brand
    </GeneratedGriffelBadge>
    <GeneratedGriffelBadge appearance="outline" color="danger">
      Danger
    </GeneratedGriffelBadge>
    <GeneratedGriffelBadge appearance="tint" color="success" size="large">
      Success
    </GeneratedGriffelBadge>
    <GeneratedGriffelBadge appearance="ghost" color="informative">
      Info
    </GeneratedGriffelBadge>
  </div>
);

/** Styled wrapper using the generated CSS Module + classnames helper. */
export const GeneratedCssModule = (): JSXElement => (
  <div style={rowStyle}>
    <span className={getBadgeClassNames(styles, { appearance: 'filled', color: 'brand' })}>Brand</span>
    <span className={getBadgeClassNames(styles, { appearance: 'outline', color: 'danger' })}>Danger</span>
    <span className={getBadgeClassNames(styles, { appearance: 'tint', color: 'success', size: 'large' })}>Success</span>
    <span className={getBadgeClassNames(styles, { appearance: 'ghost', color: 'informative' })}>Info</span>
  </div>
);

/** Side-by-side comparison of all three surfaces. */
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
      <GeneratedCssModule />
    </div>
  </div>
);
