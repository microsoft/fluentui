// eslint-disable-next-line import/no-extraneous-dependencies -- story-only helper outside the *.stories.tsx devDependencies exemption
import * as React from 'react';

const checkedValues = [false, true, 'mixed'] as const;
const shapes = ['square', 'circular'] as const;
const sizes = ['medium', 'large'] as const;
const positions = ['before', 'after'] as const;

type CheckboxLike = React.ComponentType<{
  checked?: 'mixed' | boolean;
  disabled?: boolean;
  label?: string;
  labelPosition?: (typeof positions)[number];
  shape?: (typeof shapes)[number];
  size?: (typeof sizes)[number];
  root?: { style?: React.CSSProperties };
}>;

const row: React.CSSProperties = { display: 'flex', gap: 8, alignItems: 'flex-start' };

const LABEL = 'Hello';

// `max-width: fit-content` caps the root, so a narrow explicit width is what forces the label onto
// a second line — the only case where the label's negative block margin is observable.
const WRAPPING = 'A label long enough to wrap onto a second line';

/**
 * `required` is deliberately absent: the headless label slot renders no asterisk, a known
 * divergence from Griffel that a zero-tolerance pixel gate must not be asked to arbitrate.
 */
export const CheckboxVrScene = ({ Checkbox }: { Checkbox: CheckboxLike }): React.ReactNode => {
  const band = (key: string, disabled: boolean) =>
    sizes.map(size =>
      shapes.map(shape => (
        <div key={`${key}-${size}-${shape}`} style={row}>
          {positions.map(labelPosition =>
            checkedValues.map(checked => (
              <Checkbox
                key={`${labelPosition}-${String(checked)}`}
                checked={checked}
                disabled={disabled}
                label={LABEL}
                labelPosition={labelPosition}
                shape={shape}
                size={size}
              />
            )),
          )}
        </div>
      )),
    );

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', gap: 16, padding: 24, background: '#fff' }}>
      {band('enabled', false)}
      {band('disabled', true)}
      {sizes.map(size => (
        <div key={`no-label-${size}`} style={row}>
          {shapes.map(shape =>
            checkedValues.map(checked => (
              <Checkbox key={`${shape}-${String(checked)}`} checked={checked} shape={shape} size={size} />
            )),
          )}
        </div>
      ))}
      <div style={row}>
        {sizes.map(size => (
          <Checkbox key={`wrap-${size}`} checked label={WRAPPING} root={{ style: { width: 160 } }} size={size} />
        ))}
      </div>
    </div>
  );
};
