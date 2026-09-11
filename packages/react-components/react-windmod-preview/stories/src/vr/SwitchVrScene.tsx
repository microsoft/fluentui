'use client';

// eslint-disable-next-line import/no-extraneous-dependencies -- story-only helper outside the *.stories.tsx devDependencies exemption
import * as React from 'react';

const sizes = ['medium', 'small'] as const;
const positions = ['after', 'before', 'above'] as const;
const checkedValues = [false, true] as const;

type SwitchLike = React.ComponentType<{
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  disabledFocusable?: boolean;
  label?: string;
  labelPosition?: (typeof positions)[number];
  onChange?: () => void;
  size?: (typeof sizes)[number];
  root?: { style?: React.CSSProperties };
}>;

const row: React.CSSProperties = { display: 'flex', gap: 8, alignItems: 'flex-start' };

const LABEL = 'Hello';

// A width narrow enough to force the label onto a second line — the only case where the label's
// block margin moves the whole block rather than being absorbed by the track height.
const WRAPPING = 'A label long enough to wrap onto a second line';

const noop = () => undefined;

/**
 * `required` is deliberately absent: the headless label slot renders no asterisk, a known
 * divergence from Griffel that a zero-tolerance pixel gate must not be asked to arbitrate.
 * `defaultChecked` drives the checked cells because an uncontrolled Switch carries no
 * `data-checked` on its root — the crossing that proves the checked look reads the input.
 */
export const SwitchVrScene = ({ Switch }: { Switch: SwitchLike }): React.ReactNode => {
  const labelled = (key: string, state: { disabled?: boolean; disabledFocusable?: boolean }) =>
    positions.map(labelPosition =>
      sizes.map(size => (
        <div key={`${key}-${labelPosition}-${size}`} style={row}>
          {checkedValues.map(checked => (
            <Switch
              key={String(checked)}
              defaultChecked={checked}
              label={LABEL}
              labelPosition={labelPosition}
              size={size}
              {...state}
            />
          ))}
        </div>
      )),
    );

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', gap: 16, padding: 24, background: '#fff' }}>
      {labelled('enabled', {})}
      {labelled('disabled', { disabled: true })}
      {labelled('disabled-focusable', { disabledFocusable: true })}

      {(['after', 'above'] as const).map(labelPosition =>
        sizes.map(size => (
          <div key={`no-label-${labelPosition}-${size}`} style={row}>
            {checkedValues.map(checked =>
              [false, true].map(disabled => (
                <Switch
                  key={`${String(checked)}-${String(disabled)}`}
                  defaultChecked={checked}
                  disabled={disabled}
                  labelPosition={labelPosition}
                  size={size}
                />
              )),
            )}
          </div>
        )),
      )}

      <div style={row}>
        {checkedValues.map(checked => (
          <Switch key={`controlled-${String(checked)}`} checked={checked} label={LABEL} onChange={noop} />
        ))}
      </div>

      {sizes.map(size =>
        (['after', 'above'] as const).map(labelPosition => (
          <div key={`wrap-${size}-${labelPosition}`} style={row}>
            <Switch
              defaultChecked
              label={WRAPPING}
              labelPosition={labelPosition}
              root={{ style: { width: 160 } }}
              size={size}
            />
          </div>
        )),
      )}
    </div>
  );
};
