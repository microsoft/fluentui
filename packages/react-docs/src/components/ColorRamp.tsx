import * as React from 'react';
import Color from 'color';

export type ColorRampProps = {
  /** The theme shape for this color ramp */
  ramp: { [key: string]: string };
};

export type ColorRampItemProps = {
  /** Name of the color */
  name: string;

  /** A CSS color value */
  value: string;
};

const ColorRampItem = (props: ColorRampItemProps) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      padding: '1em',
      background: props.value,
      color: Color(props.value).isDark() ? '#fff' : '#000',
      width: 250,
    }}
  >
    <span>{props.name}</span>
    <span>{props.value}</span>
  </div>
);

/**
 * Renders a color ramp for documentation purposes.
 */
export const ColorRamp = (props: ColorRampProps) => (
  <div>
    {Object.entries(props.ramp).map(([name, value]) => {
      return <ColorRampItem key={name + ':' + value} name={name} value={value} />;
    })}
  </div>
);
