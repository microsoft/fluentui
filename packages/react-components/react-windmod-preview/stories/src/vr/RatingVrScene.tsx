// eslint-disable-next-line import/no-extraneous-dependencies -- story-only helper outside the *.stories.tsx devDependencies exemption
import * as React from 'react';

const colors = ['neutral', 'brand', 'marigold'] as const;
const sizes = ['small', 'medium', 'large', 'extra-large'] as const;

/* The fill rounds to the nearest half, so the interesting boundaries are the quarter points. */
const values = [0, 0.2, 0.25, 0.5, 0.7, 1, 1.5, 2.4, 2.5, 2.6, 3.7, 3.9, 4, 5] as const;
const maxes = [1, 2, 3, 7, 10] as const;

type RatingLike = React.ComponentType<{
  color?: (typeof colors)[number];
  defaultValue?: number;
  iconFilled?: React.ElementType;
  iconOutline?: React.ElementType;
  max?: number;
  size?: (typeof sizes)[number];
  step?: 0.5 | 1;
  value?: number;
}>;

/* Both providers apply body1 typography, a colour and a text alignment to their whole subtree;
   pinning all three identically on the scene keeps the inherited values out of the diff. */
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
export const RatingVrScene = ({
  Rating,
  IconFilled,
  IconOutline,
}: {
  Rating: RatingLike;
  IconFilled: React.ElementType;
  IconOutline: React.ElementType;
}): React.ReactNode => (
  <div style={frame}>
    {sizes.map(size => (
      <div style={row} key={`half-${size}`}>
        {colors.map(color => (
          <Rating key={color} color={color} size={size} value={3.5} step={0.5} max={5} />
        ))}
      </div>
    ))}

    {sizes.map(size => (
      <div style={row} key={`empty-${size}`}>
        {colors.map(color => (
          <Rating key={color} color={color} size={size} value={0} />
        ))}
      </div>
    ))}

    {sizes.map(size => (
      <div style={row} key={`full-${size}`}>
        {colors.map(color => (
          <Rating key={color} color={color} size={size} value={5} max={5} />
        ))}
      </div>
    ))}

    <div style={column}>
      {values.map(value => (
        <Rating key={`half-step-${value}`} value={value} step={0.5} />
      ))}
    </div>

    <div style={column}>
      {values.map(value => (
        <Rating key={`whole-step-${value}`} value={value} step={1} />
      ))}
    </div>

    <div style={column}>
      {maxes.map(max => (
        <Rating key={max} max={max} value={3.5} />
      ))}
    </div>

    <div style={row}>
      {colors.map(color => (
        <Rating key={color} color={color} iconFilled={IconFilled} iconOutline={IconOutline} value={2.5} />
      ))}
    </div>

    <div style={{ width: 120 }}>
      <Rating max={10} value={7} />
    </div>

    <div style={row}>
      {colors.map(color => (
        <Rating key={`uncontrolled-${color}`} color={color} defaultValue={2} size="extra-large" />
      ))}
    </div>
  </div>
);
