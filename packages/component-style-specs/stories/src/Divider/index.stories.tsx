import * as React from 'react';
import { Divider as ShippedDivider, type JSXElement } from '@fluentui/react-components';
import { useDividerStyles_unstable } from '../../../../style-spec-compilers/src/__fixtures__/Divider/griffel/useDividerStyles.styles';
import styles from './divider.module.css';
import { getDividerClassNames } from './divider.classes';

export default {
  title: 'Component Style Specs/Divider',
};

const stackStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
  maxWidth: 480,
};

const labelStyle: React.CSSProperties = {
  fontWeight: 600,
  marginBottom: 8,
};

export const ShippedV9 = (): JSXElement => (
  <div style={stackStyle}>
    <ShippedDivider>Default</ShippedDivider>
    <ShippedDivider appearance="brand">Brand</ShippedDivider>
    <ShippedDivider appearance="strong" alignContent="start">
      Start
    </ShippedDivider>
    <ShippedDivider appearance="subtle" alignContent="end">
      End
    </ShippedDivider>
  </div>
);

type GeneratedDividerProps = {
  children?: React.ReactNode;
  appearance?: string;
  orientation?: string;
  alignContent?: string;
};

const GeneratedGriffelDivider = (props: GeneratedDividerProps): JSXElement => {
  const { children, appearance = 'default', orientation = 'horizontal', alignContent = 'center' } = props;
  const rootRef = React.useRef<HTMLDivElement>(null);
  const wrapperRef = React.useRef<HTMLSpanElement>(null);
  const state = useDividerStyles_unstable({
    appearance,
    orientation,
    alignContent,
    root: { className: undefined, ref: rootRef },
    wrapper: { className: undefined, ref: wrapperRef },
  });

  return (
    <div ref={rootRef} className={state.root.className as string | undefined} role="separator">
      {children ? (
        <span ref={wrapperRef} className={state.wrapper?.className as string | undefined}>
          {children}
        </span>
      ) : null}
    </div>
  );
};

export const GeneratedGriffel = (): JSXElement => (
  <div style={stackStyle}>
    <GeneratedGriffelDivider>Default</GeneratedGriffelDivider>
    <GeneratedGriffelDivider appearance="brand">Brand</GeneratedGriffelDivider>
    <GeneratedGriffelDivider appearance="strong" alignContent="start">
      Start
    </GeneratedGriffelDivider>
    <GeneratedGriffelDivider appearance="subtle" alignContent="end">
      End
    </GeneratedGriffelDivider>
  </div>
);

export const GeneratedCssModule = (): JSXElement => (
  <div style={stackStyle}>
    <div className={getDividerClassNames(styles, { appearance: 'default' })} role="separator">
      <span>Default</span>
    </div>
    <div className={getDividerClassNames(styles, { appearance: 'brand' })} role="separator">
      <span>Brand</span>
    </div>
    <div className={getDividerClassNames(styles, { appearance: 'strong', alignContent: 'start' })} role="separator">
      <span>Start</span>
    </div>
    <div className={getDividerClassNames(styles, { appearance: 'subtle', alignContent: 'end' })} role="separator">
      <span>End</span>
    </div>
  </div>
);

export const SideBySide = (): JSXElement => (
  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24 }}>
    <div>
      <div style={labelStyle}>Shipped v9</div>
      <ShippedV9 />
    </div>
    <div>
      <div style={labelStyle}>Generated Griffel</div>
      <GeneratedGriffel />
    </div>
    <div>
      <div style={labelStyle}>CSS Module</div>
      <GeneratedCssModule />
    </div>
  </div>
);
