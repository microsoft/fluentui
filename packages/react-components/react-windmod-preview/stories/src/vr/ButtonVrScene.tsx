// eslint-disable-next-line import/no-extraneous-dependencies -- story-only helper outside the *.stories.tsx devDependencies exemption
import * as React from 'react';

const appearances = ['secondary', 'primary', 'outline', 'subtle', 'transparent'] as const;
const sizes = ['small', 'medium', 'large'] as const;
const shapes = ['rounded', 'circular', 'square'] as const;

type ButtonLike = React.ComponentType<{
  appearance?: (typeof appearances)[number];
  size?: (typeof sizes)[number];
  shape?: (typeof shapes)[number];
  disabled?: boolean;
  disabledFocusable?: boolean;
  icon?: React.ReactElement;
  iconPosition?: 'before' | 'after';
  'aria-label'?: string;
  children?: React.ReactNode;
}>;

/** One scene, two implementations — the VR runner diffs the renders pixel for pixel. */
export const ButtonVrScene = ({ Button, Icon }: { Button: ButtonLike; Icon: React.ComponentType }): React.ReactNode => (
  <div style={{ display: 'inline-flex', flexDirection: 'column', gap: 12, padding: 24, background: '#fff' }}>
    {appearances.map(appearance => (
      <div key={appearance} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        {sizes.map(size => (
          <Button key={size} appearance={appearance} size={size}>
            Button
          </Button>
        ))}
        <Button appearance={appearance} icon={<Icon />}>
          Icon
        </Button>
        <Button appearance={appearance} icon={<Icon />} iconPosition="after">
          Icon
        </Button>
        <Button appearance={appearance} icon={<Icon />} aria-label="icon" />
        <Button appearance={appearance} disabled>
          Disabled
        </Button>
        <Button appearance={appearance} disabledFocusable>
          Disabled
        </Button>
      </div>
    ))}
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      {shapes.map(shape => (
        <Button key={shape} shape={shape}>
          Shape
        </Button>
      ))}
      {shapes.map(shape => (
        <Button key={shape} shape={shape} icon={<Icon />} aria-label="icon" />
      ))}
    </div>
    {/* Falsy children beside an icon. Griffel reads these as icon-only, so it drops both the text
        and the gap; the row pins that Button's gap follows plain falsiness rather than a count of
        rendered children. The trailing pair keeps a truthy `0`-like string and an empty array,
        the two values a counting predicate would get wrong in the other direction. */}
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <Button icon={<Icon />}>{0}</Button>
      <Button icon={<Icon />} iconPosition="after">
        {0}
      </Button>
      <Button icon={<Icon />}>{''}</Button>
      <Button icon={<Icon />}>{null}</Button>
      <Button icon={<Icon />} aria-label="icon" />
      <Button icon={<Icon />}>{'0'}</Button>
      <Button icon={<Icon />}>{[]}</Button>
    </div>
  </div>
);
