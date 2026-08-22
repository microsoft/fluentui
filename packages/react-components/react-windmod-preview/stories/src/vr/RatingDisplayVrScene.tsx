// eslint-disable-next-line import/no-extraneous-dependencies -- story-only helper outside the *.stories.tsx devDependencies exemption
import * as React from 'react';

const colors = ['neutral', 'brand', 'marigold'] as const;
const sizes = ['small', 'medium', 'large', 'extra-large'] as const;

/* The fill rounds to the nearest half, so the interesting boundaries are the quarter points. */
const values = [0, 0.2, 0.25, 0.5, 0.7, 1, 1.5, 2.4, 2.5, 2.6, 3.7, 3.9, 4, 5] as const;
const maxes = [1, 2, 3, 7, 10] as const;
const counts = [0, 7, 1160, 1234567] as const;

type RatingDisplayLike = React.ComponentType<{
  color?: (typeof colors)[number];
  compact?: boolean;
  count?: number;
  icon?: React.ElementType;
  max?: number;
  size?: (typeof sizes)[number];
  value?: number;
  valueText?: { children?: React.ReactNode };
  countText?: { children?: React.ReactNode };
}>;

/* FluentProvider applies body1 typography, a colour and a text alignment to its whole subtree
   while the windmod ThemeProvider is display:contents and applies none of it; pinning all three
   identically on both sides keeps the inherited values out of the diff. */
const frame: React.CSSProperties = {
  display: 'inline-flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: 24,
  padding: 24,
  background: '#ffffff',
  fontSize: 0,
  lineHeight: 0,
  textAlign: 'left',
};
const row: React.CSSProperties = { display: 'flex', alignItems: 'flex-start', gap: 16 };
const column: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: 8 };

/** One scene, two implementations — the VR runner diffs the renders pixel for pixel. */
export const RatingDisplayVrScene = ({
  RatingDisplay,
  Icon,
}: {
  RatingDisplay: RatingDisplayLike;
  Icon: React.ElementType;
}): React.ReactNode => (
  <div style={frame}>
    {sizes.map(size => (
      <div style={row} key={size}>
        {colors.map(color => (
          <RatingDisplay key={color} color={color} size={size} value={3.5} />
        ))}
      </div>
    ))}

    <div style={column}>
      {values.map(value => (
        <RatingDisplay key={value} value={value} />
      ))}
    </div>

    <div style={row}>
      {colors.map(color => (
        <RatingDisplay key={color} color={color} />
      ))}
    </div>

    <div style={column}>
      {maxes.map(max => (
        <RatingDisplay key={max} max={max} value={3.5} />
      ))}
    </div>

    <div style={column}>
      {counts.map(count => (
        <RatingDisplay key={count} count={count} />
      ))}
      {counts.map(count => (
        <RatingDisplay key={`value-${count}`} value={4.5} count={count} />
      ))}
    </div>

    {sizes.map(size => (
      <div style={row} key={`compact-${size}`}>
        {colors.map(color => (
          <RatingDisplay key={color} compact color={color} size={size} value={3} />
        ))}
      </div>
    ))}
    <RatingDisplay compact value={3} count={1160} />

    <div style={row}>
      {colors.map(color => (
        <RatingDisplay key={color} color={color} icon={Icon} value={2.5} />
      ))}
    </div>

    <div style={row}>
      <RatingDisplay value={4} count={1160} valueText={{ children: '4.0' }} countText={{ children: 'many' }} />
      <RatingDisplay count={1160} countText={{ children: 'many' }} />
    </div>

    <div style={{ width: 100 }}>
      <RatingDisplay max={10} value={7} count={1160} />
    </div>

    {colors.map(color => (
      <RatingDisplay key={`xl-${color}`} color={color} size="extra-large" value={3.5} count={1160} />
    ))}
  </div>
);
