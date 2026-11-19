// eslint-disable-next-line import/no-extraneous-dependencies -- story-only helper outside the *.stories.tsx devDependencies exemption
import * as React from 'react';

const appearances = ['outline', 'underline', 'filled-darker', 'filled-lighter'] as const;
const sizes = ['small', 'medium', 'large'] as const;

type SelectLike = React.ComponentType<{
  appearance?: (typeof appearances)[number];
  size?: (typeof sizes)[number];
  disabled?: boolean;
  defaultValue?: string;
  'aria-invalid'?: boolean;
  icon?: React.ReactElement | null;
  root?: { style?: React.CSSProperties };
  children?: React.ReactNode;
}>;

const row: React.CSSProperties = { display: 'flex', gap: 8, alignItems: 'center' };

const LONG = 'A very long option label that cannot fit';

// The intrinsic width of a <select> comes from its longest <option>, so both sides must carry
// byte-identical option text.
const Options = (): React.ReactNode => (
  <>
    <option value="a">Apple</option>
    <option value="b">Banana</option>
  </>
);

/** No cell is focused, so the focus underline sits at scaleX(0) in all 57 of them. */
export const SelectVrScene = ({ Select, Icon }: { Select: SelectLike; Icon: React.ComponentType }): React.ReactNode => {
  const band = (key: string, props: React.ComponentProps<SelectLike>) =>
    sizes.map(size => (
      <div key={`${key}-${size}`} style={row}>
        {appearances.map(appearance => (
          <Select key={appearance} appearance={appearance} size={size} {...props}>
            <Options />
          </Select>
        ))}
      </div>
    ));

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', gap: 16, padding: 24, background: '#fff' }}>
      {band('resting', { defaultValue: 'b' })}
      {band('disabled', { defaultValue: 'b', disabled: true })}
      {band('invalid', { defaultValue: 'b', 'aria-invalid': true })}
      {band('disabled-invalid', { defaultValue: 'b', disabled: true, 'aria-invalid': true })}
      <div style={row}>
        {sizes.map(size => (
          <Select key={size} size={size} defaultValue="b" icon={null}>
            <Options />
          </Select>
        ))}
      </div>
      <div style={row}>
        {sizes.map(size => (
          <Select key={size} size={size} defaultValue="b" icon={<Icon />}>
            <Options />
          </Select>
        ))}
      </div>
      <div style={row}>
        {sizes.map(size => (
          <Select key={size} size={size} defaultValue="long" root={{ style: { width: 120 } }}>
            <option value="long">{LONG}</option>
          </Select>
        ))}
      </div>
    </div>
  );
};
