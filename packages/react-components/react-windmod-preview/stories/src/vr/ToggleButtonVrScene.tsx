// eslint-disable-next-line import/no-extraneous-dependencies -- story-only helper outside the *.stories.tsx devDependencies exemption
import * as React from 'react';

const appearances = ['secondary', 'primary', 'outline', 'subtle', 'transparent'] as const;
const sizes = ['small', 'medium', 'large'] as const;
const shapes = ['rounded', 'circular', 'square'] as const;

type ToggleButtonLike = React.ComponentType<{
  appearance?: (typeof appearances)[number];
  size?: (typeof sizes)[number];
  shape?: (typeof shapes)[number];
  checked?: boolean;
  isAccessible?: boolean;
  disabled?: boolean;
  disabledFocusable?: boolean;
  icon?: React.ReactElement;
  iconPosition?: 'before' | 'after';
  'aria-label'?: string;
  children?: React.ReactNode;
}>;

/** One scene, two implementations — the VR runner diffs the renders pixel for pixel. */
export const ToggleButtonVrScene = ({
  ToggleButton,
  Icon,
}: {
  ToggleButton: ToggleButtonLike;
  Icon: React.ComponentType;
}): React.ReactNode => (
  <div style={{ display: 'inline-flex', flexDirection: 'column', gap: 12, padding: 24, background: '#fff' }}>
    {appearances.map(appearance =>
      [false, true].map(checked => (
        <div key={`${appearance}-${checked}`} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {sizes.map(size => (
            <ToggleButton key={size} appearance={appearance} size={size} checked={checked}>
              Toggle
            </ToggleButton>
          ))}
          <ToggleButton appearance={appearance} checked={checked} icon={<Icon />}>
            Icon
          </ToggleButton>
          <ToggleButton appearance={appearance} checked={checked} icon={<Icon />} iconPosition="after">
            Icon
          </ToggleButton>
          <ToggleButton appearance={appearance} checked={checked} icon={<Icon />} aria-label="icon" />
          <ToggleButton appearance={appearance} checked={checked} disabled>
            Disabled
          </ToggleButton>
          <ToggleButton appearance={appearance} checked={checked} disabledFocusable>
            Disabled
          </ToggleButton>
        </div>
      )),
    )}
    {appearances.map(appearance => (
      <div key={`${appearance}-accessible`} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        {sizes.map(size => (
          <ToggleButton key={size} appearance={appearance} size={size} checked isAccessible>
            Toggle
          </ToggleButton>
        ))}
        <ToggleButton appearance={appearance} checked isAccessible icon={<Icon />} aria-label="icon" />
        <ToggleButton appearance={appearance} checked isAccessible disabled>
          Disabled
        </ToggleButton>
        <ToggleButton appearance={appearance} checked isAccessible disabledFocusable>
          Disabled
        </ToggleButton>
      </div>
    ))}
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      {shapes.map(shape => (
        <ToggleButton key={shape} shape={shape} checked>
          Shape
        </ToggleButton>
      ))}
      {shapes.map(shape => (
        <ToggleButton key={shape} shape={shape} checked icon={<Icon />} aria-label="icon" />
      ))}
    </div>
  </div>
);
