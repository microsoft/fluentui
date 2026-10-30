// eslint-disable-next-line import/no-extraneous-dependencies -- story-only helper outside the *.stories.tsx devDependencies exemption
import * as React from 'react';

const sizes = ['extra-tiny', 'tiny', 'extra-small', 'small', 'medium', 'large', 'extra-large', 'huge'] as const;
const labelPositions = ['above', 'below', 'before', 'after'] as const;

type SpinnerLike = React.ComponentType<{
  appearance?: 'primary' | 'inverted';
  size?: (typeof sizes)[number];
  label?: string;
  labelPosition?: (typeof labelPositions)[number];
}>;

const row: React.CSSProperties = { display: 'flex', gap: 8, alignItems: 'center' };

/** The runner freezes animation before every capture, so both sides render the same rest
    state: a full ring with the tail's 30deg arc. `delay` would gate the whole subtree behind
    a timer and race the capture — it stays at its default. */
const SpinnerRows = ({ Spinner, appearance }: { Spinner: SpinnerLike; appearance: 'primary' | 'inverted' }) => (
  <>
    <div style={row}>
      {sizes.map(size => (
        <Spinner key={size} appearance={appearance} size={size} />
      ))}
    </div>
    {labelPositions.map(labelPosition => (
      <div key={labelPosition} style={row}>
        {sizes.map(size => (
          <Spinner key={size} appearance={appearance} size={size} label="Loading" labelPosition={labelPosition} />
        ))}
      </div>
    ))}
  </>
);

/** One scene, two implementations — the VR runner diffs the renders pixel for pixel. */
export const SpinnerVrScene = ({ Spinner }: { Spinner: SpinnerLike }): React.ReactNode => (
  <div style={{ display: 'inline-flex', flexDirection: 'column', gap: 16, padding: 24, background: '#fff' }}>
    <SpinnerRows Spinner={Spinner} appearance="primary" />
    {/* Every inverted value is white or near-white; a wrong token there is only observable
        against a dark ground. */}
    <div style={{ background: '#333333', padding: 12, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <SpinnerRows Spinner={Spinner} appearance="inverted" />
    </div>
    {/* The only place min-width: min-content and overflow: hidden are observable. */}
    <div style={{ width: 120 }}>
      <Spinner label="Loadinginprogress" labelPosition="after" />
      <Spinner label="Loadinginprogress" labelPosition="before" />
    </div>
  </div>
);
