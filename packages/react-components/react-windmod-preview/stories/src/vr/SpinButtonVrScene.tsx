'use client';

// eslint-disable-next-line import/no-extraneous-dependencies -- story-only helper outside the *.stories.tsx devDependencies exemption
import * as React from 'react';

const appearances = ['outline', 'underline', 'filled-darker', 'filled-lighter'] as const;
const sizes = ['small', 'medium'] as const;

type SpinButtonLike = React.ComponentType<{
  appearance?: (typeof appearances)[number];
  size?: (typeof sizes)[number];
  disabled?: boolean;
  readOnly?: boolean;
  defaultValue?: number | null;
  value?: number | null;
  displayValue?: string;
  placeholder?: string;
  min?: number;
  max?: number;
  onChange?: () => void;
  'aria-invalid'?: boolean;
  root?: { style?: React.CSSProperties };
  input?: { autoFocus?: boolean };
}>;

const row: React.CSSProperties = { display: 'flex', gap: 8, alignItems: 'center' };

const noop = () => undefined;

/**
 * The last band autofocuses its single cell, so it must stay last: with two autofocused inputs the
 * later one wins and the earlier band would capture unfocused.
 */
export const SpinButtonVrScene = ({ SpinButton }: { SpinButton: SpinButtonLike }): React.ReactNode => {
  const band = (key: string, props: React.ComponentProps<SpinButtonLike>) =>
    sizes.map(size => (
      <div key={`${key}-${size}`} style={row}>
        {appearances.map(appearance => (
          <SpinButton key={appearance} appearance={appearance} size={size} {...props} />
        ))}
      </div>
    ));

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', gap: 16, padding: 24, background: '#fff' }}>
      {band('resting', { defaultValue: 5 })}
      {band('disabled', { disabled: true, defaultValue: 5 })}
      {band('invalid', { 'aria-invalid': true, defaultValue: 5 })}
      {band('disabled-invalid', { disabled: true, 'aria-invalid': true, defaultValue: 5 })}
      {band('read-only', { readOnly: true, defaultValue: 5 })}
      {sizes.map(size => (
        <div key={`bound-${size}`} style={row}>
          <SpinButton size={size} value={0} min={0} max={10} onChange={noop} />
          <SpinButton size={size} value={10} min={0} max={10} onChange={noop} />
          <SpinButton size={size} value={3} min={3} max={3} onChange={noop} />
        </div>
      ))}
      <div style={row}>
        {sizes.map(size => (
          <SpinButton key={`placeholder-${size}`} size={size} defaultValue={null} placeholder="Placeholder" />
        ))}
      </div>
      <div style={row}>
        {sizes.map(size => (
          <SpinButton key={`display-${size}`} size={size} value={1} displayValue="$1,234.00" onChange={noop} />
        ))}
      </div>
      <div style={row}>
        {sizes.map(size => (
          <SpinButton
            key={`wide-${size}`}
            size={size}
            value={1234}
            displayValue="$1,234,567.00 and then some"
            onChange={noop}
            root={{ style: { width: 320 } }}
          />
        ))}
      </div>
      <div style={row}>
        <SpinButton defaultValue={5} input={{ autoFocus: true }} />
      </div>
    </div>
  );
};
