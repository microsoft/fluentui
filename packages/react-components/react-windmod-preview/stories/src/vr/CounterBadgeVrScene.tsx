// eslint-disable-next-line import/no-extraneous-dependencies -- story-only helper outside the *.stories.tsx devDependencies exemption
import * as React from 'react';

const appearances = ['filled', 'ghost'] as const;
const colors = ['brand', 'danger', 'important', 'informative'] as const;
const shapes = ['circular', 'rounded'] as const;
const sizes = ['tiny', 'extra-small', 'small', 'medium', 'large', 'extra-large'] as const;

type CounterBadgeLike = React.ComponentType<{
  appearance?: (typeof appearances)[number];
  color?: (typeof colors)[number];
  shape?: (typeof shapes)[number];
  size?: (typeof sizes)[number];
  count?: number;
  overflowCount?: number;
  dot?: boolean;
  showZero?: boolean;
}>;

const row: React.CSSProperties = { display: 'flex', gap: 8, alignItems: 'center' };

/** One scene, two implementations — the VR runner diffs the renders pixel for pixel. */
export const CounterBadgeVrScene = ({ CounterBadge }: { CounterBadge: CounterBadgeLike }): React.ReactNode => (
  <div style={{ display: 'inline-flex', flexDirection: 'column', gap: 16, padding: 24, background: '#fff' }}>
    {appearances.map(appearance =>
      colors.map(color => (
        <div key={`${appearance}-${color}`} style={row}>
          {sizes.map(size => (
            <CounterBadge key={size} appearance={appearance} color={color} size={size} count={4} />
          ))}
        </div>
      )),
    )}
    {appearances.map(appearance =>
      shapes.map(shape => (
        <div key={`${appearance}-${shape}`} style={row}>
          {sizes.map(size => (
            <CounterBadge key={size} appearance={appearance} shape={shape} size={size} count={4} />
          ))}
        </div>
      )),
    )}
    {/* dot forces a 6px circle, overriding every size bucket */}
    <div style={row}>
      {sizes.map(size => (
        <CounterBadge key={size} size={size} count={4} dot />
      ))}
    </div>
    {/* overflow formatting */}
    <div style={row}>
      {sizes.map(size => (
        <CounterBadge key={size} size={size} count={150} overflowCount={99} />
      ))}
    </div>
    {/* zero is hidden by default, shown with showZero */}
    <div style={row}>
      {sizes.map(size => (
        <CounterBadge key={`zero-${size}`} size={size} count={0} />
      ))}
      {sizes.map(size => (
        <CounterBadge key={`show-zero-${size}`} size={size} count={0} showZero />
      ))}
    </div>
  </div>
);
