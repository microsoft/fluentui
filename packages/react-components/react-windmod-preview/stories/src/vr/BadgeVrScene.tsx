// eslint-disable-next-line import/no-extraneous-dependencies -- story-only helper outside the *.stories.tsx devDependencies exemption
import * as React from 'react';

const appearances = ['filled', 'ghost', 'outline', 'tint'] as const;
const colors = ['brand', 'danger', 'important', 'informative', 'severe', 'subtle', 'success', 'warning'] as const;
const shapes = ['circular', 'rounded', 'square'] as const;
const sizes = ['tiny', 'extra-small', 'small', 'medium', 'large', 'extra-large'] as const;

type BadgeLike = React.ComponentType<{
  appearance?: (typeof appearances)[number];
  color?: (typeof colors)[number];
  shape?: (typeof shapes)[number];
  size?: (typeof sizes)[number];
  icon?: React.ReactElement;
  iconPosition?: 'before' | 'after';
  children?: React.ReactNode;
}>;

const row: React.CSSProperties = { display: 'flex', gap: 8, alignItems: 'center' };

/** One scene, two implementations — the VR runner diffs the renders pixel for pixel. */
export const BadgeVrScene = ({ Badge, Icon }: { Badge: BadgeLike; Icon: React.ComponentType }): React.ReactNode => (
  <div style={{ display: 'inline-flex', flexDirection: 'column', gap: 16, padding: 24, background: '#fff' }}>
    {appearances.map(appearance =>
      colors.map(color => (
        <div key={`${appearance}-${color}`} style={row}>
          {sizes.map(size => (
            <Badge key={size} appearance={appearance} color={color} size={size}>
              8
            </Badge>
          ))}
        </div>
      )),
    )}
    {appearances.map(appearance =>
      shapes.map(shape => (
        <div key={`${appearance}-${shape}`} style={row}>
          {sizes.map(size => (
            <Badge key={size} appearance={appearance} shape={shape} size={size}>
              8
            </Badge>
          ))}
        </div>
      )),
    )}
    <div style={row}>
      {sizes.map(size => (
        <Badge key={size} size={size} icon={<Icon />}>
          8
        </Badge>
      ))}
    </div>
    <div style={row}>
      {sizes.map(size => (
        <Badge key={size} size={size} icon={<Icon />} iconPosition="after">
          8
        </Badge>
      ))}
    </div>
    <div style={row}>
      {sizes.map(size => (
        <Badge key={size} size={size} icon={<Icon />} />
      ))}
    </div>
    <div style={row}>
      {sizes.map(size => (
        <Badge key={size} size={size} icon={<Icon />} iconPosition="after" />
      ))}
    </div>
    {/* Falsy-but-rendered children: the icon spacing survives 0 and '' — do not fold these
        into && expressions, `false` would render a childless badge instead. */}
    <div style={row}>
      <Badge icon={<Icon />}>{0}</Badge>
      <Badge icon={<Icon />} iconPosition="after">
        {0}
      </Badge>
      <Badge icon={<Icon />}>{''}</Badge>
      <Badge icon={<Icon />} iconPosition="after">
        {''}
      </Badge>
    </div>
    {/* Three of the four subtle looks are white or near-white; a wrong token there is only
        observable against a dark ground. */}
    <div style={{ background: '#333333', padding: 12, display: 'flex', flexDirection: 'column', gap: 16 }}>
      {appearances.map(appearance => (
        <div key={appearance} style={row}>
          {sizes.map(size => (
            <Badge key={size} appearance={appearance} color="subtle" size={size}>
              8
            </Badge>
          ))}
        </div>
      ))}
    </div>
  </div>
);
