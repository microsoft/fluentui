// eslint-disable-next-line import/no-extraneous-dependencies -- story-only helper outside the *.stories.tsx devDependencies exemption
import * as React from 'react';

const sizes = ['small', 'medium'] as const;

type SliderLike = React.ComponentType<{
  size?: (typeof sizes)[number];
  disabled?: boolean;
  vertical?: boolean;
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  root?: { style?: React.CSSProperties };
}>;

const row: React.CSSProperties = { display: 'flex', gap: 8, alignItems: 'flex-start' };

const ladder = [0, 1, 25, 50, 75, 99, 100];
const steps = [undefined, 10, 25, 50, 0];
const remaps = [
  { max: 50, min: -50, value: -25 },
  { max: 10, min: 0, step: 2, value: 5 },
  { max: 0, min: 0, value: 0 },
  { max: 20, min: 10, value: 20 },
];

/**
 * Every cell is a static value, so thumb position and rail fill are pure functions of
 * value/min/max. No cell is hovered or focused. The step bands sit next to the step-less ones
 * because the tick gradient's fallback to `none` is what an absent --fui-Slider--steps-percent
 * has to produce on both sides.
 */
export const SliderVrScene = ({ Slider }: { Slider: SliderLike }): React.ReactNode => (
  <div style={{ display: 'inline-flex', flexDirection: 'column', gap: 16, padding: 24, background: '#fff' }}>
    {sizes.map(size => (
      <div key={`ladder-${size}`} style={row}>
        {ladder.map(value => (
          <Slider key={value} size={size} value={value} />
        ))}
      </div>
    ))}

    {sizes.map(size => (
      <div key={`clamp-${size}`} style={row}>
        {[0, 100].map(value => (
          <Slider key={`wide-${value}`} root={{ style: { width: 240 } }} size={size} value={value} />
        ))}
        {[0, 100].map(value => (
          <Slider key={`intrinsic-${value}`} size={size} value={value} />
        ))}
      </div>
    ))}

    {sizes.map(size => (
      <div key={`steps-${size}`} style={row}>
        {steps.map(step => (
          <Slider key={`${step}`} size={size} step={step} value={40} />
        ))}
      </div>
    ))}

    <div style={row}>
      {remaps.map(props => (
        <Slider key={`${props.min}-${props.max}-${props.value}`} {...props} />
      ))}
    </div>

    <div style={row}>
      {sizes.map(size =>
        [0, 50, 100].map(value => <Slider key={`${size}-${value}`} disabled size={size} value={value} />),
      )}
      <Slider disabled step={20} value={40} />
    </div>

    {sizes.map(size => (
      <div key={`fixed-${size}`} style={row}>
        {[0, 50, 100].map(value => (
          <Slider key={value} root={{ style: { width: 240 } }} size={size} value={value} />
        ))}
      </div>
    ))}

    <div style={row}>
      {sizes.map(size =>
        [0, 25, 50, 75, 100].map(value => <Slider key={`${size}-${value}`} size={size} value={value} vertical />),
      )}
    </div>

    <div style={row}>
      {sizes.map(size => (
        <React.Fragment key={size}>
          <Slider size={size} step={20} value={40} vertical />
          <Slider disabled size={size} value={60} vertical />
        </React.Fragment>
      ))}
    </div>

    <div style={row}>
      {sizes.map(size =>
        [25, 75].map(value => (
          <Slider key={`${size}-${value}`} root={{ style: { height: 200 } }} size={size} value={value} vertical />
        )),
      )}
    </div>
  </div>
);
