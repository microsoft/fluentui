/*
 FIXME: this is a temporary workaround - moving stories from react-examples
 reenable TS and fix errors in a subsequent PR
 */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import { TinyColor } from '@ctrl/tinycolor';

export type ColorRampProps = {
  /** The theme shape for this color ramp */
  ramp: { [key: string]: string };
};

export type ColorRampItemProps = {
  /** Name of the color */
  name?: string;

  /** A CSS color value */
  value?: string;
};

const alphaStyle = {
  backgroundImage:
    'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAJUlEQVQYV2N89erVfwY0ICYmxoguxjgUFKI7GsTH5m4M3w1ChQC1/Ca8i2n1WgAAAABJRU5ErkJggg==)',
};

export const ColorRampItem: React.FunctionComponent<ColorRampItemProps> = props => {
  const divRef = React.useRef();
  const [rawColorValue, setRawColorValue] = React.useState();

  useIsomorphicLayoutEffect(() => {
    const computedStyle = window.getComputedStyle(divRef.current);
    const elementColor = computedStyle.getPropertyValue('background-color');
    const color = new TinyColor(elementColor);
    const isDark = color.isDark();
    const isTransparent = color.getAlpha() < 0.5;
    divRef.current.style.color = isTransparent ? '#000' : isDark ? '#fff' : '#000';

    const cssVar = props.value?.match(/^var\((.+)\)$/);
    if (cssVar) {
      const colorValue = computedStyle.getPropertyValue(cssVar[1]);
      if (colorValue) {
        setRawColorValue(colorValue);
      }
    }
  }, [props.value]);

  return (
    <div style={alphaStyle}>
      <div
        ref={divRef}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '1.5vh',
          background: props.value,
          width: 250,
        }}
      >
        {props.name && <span>{props.name}</span>}
        {props.value && <span>{props.value}</span>}
        {rawColorValue && <span>{rawColorValue}</span>}
      </div>
    </div>
  );
};

/**
 * Renders a color ramp for documentation purposes.
 */
export const ColorRamp: React.FunctionComponent<ColorRampProps> = props => (
  <div>
    {Object.entries(props.ramp).map(([name, value]) => {
      return <ColorRampItem key={name + ':' + value} name={name} value={value} />;
    })}
  </div>
);
