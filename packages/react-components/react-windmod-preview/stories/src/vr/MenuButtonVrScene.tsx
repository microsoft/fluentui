// eslint-disable-next-line import/no-extraneous-dependencies -- story-only helper outside the *.stories.tsx devDependencies exemption
import * as React from 'react';

const appearances = ['secondary', 'primary', 'outline', 'subtle', 'transparent'] as const;
const sizes = ['small', 'medium', 'large'] as const;
const shapes = ['rounded', 'circular', 'square'] as const;

type MenuButtonLike = React.ComponentType<{
  appearance?: (typeof appearances)[number];
  size?: (typeof sizes)[number];
  shape?: (typeof shapes)[number];
  disabled?: boolean;
  disabledFocusable?: boolean;
  icon?: React.ReactElement;
  'aria-expanded'?: boolean;
  'aria-label'?: string;
  children?: React.ReactNode;
}>;

/** One scene, two implementations — the VR runner diffs the renders pixel for pixel. */
export const MenuButtonVrScene = ({
  MenuButton,
  Icon,
}: {
  MenuButton: MenuButtonLike;
  Icon: React.ComponentType;
}): React.ReactNode => (
  <div style={{ display: 'inline-flex', flexDirection: 'column', gap: 12, padding: 24, background: '#fff' }}>
    {appearances.map(appearance =>
      [false, true].map(expanded => (
        <div key={`${appearance}-${expanded}`} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {sizes.map(size => (
            <MenuButton key={size} appearance={appearance} size={size} aria-expanded={expanded}>
              Menu
            </MenuButton>
          ))}
          <MenuButton appearance={appearance} size="small" aria-expanded={expanded} icon={<Icon />}>
            Icon
          </MenuButton>
          <MenuButton appearance={appearance} size="large" aria-expanded={expanded} icon={<Icon />}>
            Icon
          </MenuButton>
          <MenuButton appearance={appearance} aria-expanded={expanded} icon={<Icon />}>
            Icon
          </MenuButton>
          <MenuButton appearance={appearance} aria-expanded={expanded} icon={<Icon />} aria-label="icon" />
          <MenuButton appearance={appearance} aria-expanded={expanded} aria-label="menu" />
          <MenuButton appearance={appearance} aria-expanded={expanded} disabled>
            Disabled
          </MenuButton>
          <MenuButton appearance={appearance} aria-expanded={expanded} disabledFocusable>
            Disabled
          </MenuButton>
        </div>
      )),
    )}
    {[false, true].map(expanded => (
      <div key={`chevron-only-${expanded}`} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        {sizes.map(size => (
          <MenuButton key={size} size={size} aria-expanded={expanded} aria-label="menu" />
        ))}
      </div>
    ))}
    {[false, true].map(expanded => (
      <div key={`shape-${expanded}`} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        {shapes.map(shape => (
          <MenuButton key={shape} shape={shape} aria-expanded={expanded}>
            Shape
          </MenuButton>
        ))}
      </div>
    ))}
  </div>
);
