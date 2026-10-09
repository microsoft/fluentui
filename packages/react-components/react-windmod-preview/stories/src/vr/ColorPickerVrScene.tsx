// eslint-disable-next-line import/no-extraneous-dependencies -- story-only helper outside the *.stories.tsx devDependencies exemption
import * as React from 'react';

type HsvColor = { h: number; s: number; v: number; a?: number };
type Shape = 'rounded' | 'square';

type ColorSliderLike = React.ComponentType<{
  channel?: 'hue' | 'saturation' | 'value';
  color?: HsvColor;
  shape?: Shape;
  vertical?: boolean;
}>;

type AlphaSliderLike = React.ComponentType<{
  color?: HsvColor;
  shape?: Shape;
  transparency?: boolean;
  vertical?: boolean;
}>;

type ColorAreaLike = React.ComponentType<{ color?: HsvColor; shape?: Shape }>;

type ColorPickerLike = React.ComponentType<{ children?: React.ReactNode; color?: HsvColor; shape?: Shape }>;

type ProviderLike = React.ComponentType<{ dir?: 'ltr' | 'rtl'; children?: React.ReactNode }>;

/**
 * The checkerboard @fluentui/react-color-picker's AlphaSlider rail composites its gradient over.
 * The windmod rail inlines the same bytes as a data URI, so only the Griffel side fetches it —
 * this hidden <img> is what brings the request under the runner's decode settle, and it renders on
 * both sides so the two captures stay structurally identical.
 */
const CHECKERBOARD_URL = 'https://fabricweb.azureedge.net/fabric-website/assets/images/transparent-pattern.png';

const row: React.CSSProperties = { display: 'flex', gap: 8, alignItems: 'flex-start' };

const colors: Array<[string, HsvColor]> = [
  ['red', { h: 0, s: 1, v: 1 }],
  ['yellow', { h: 60, s: 1, v: 1 }],
  ['teal', { h: 180, s: 0.5, v: 0.6 }],
  ['violet', { h: 280, s: 0.8, v: 0.9 }],
  ['near-max', { h: 359, s: 1, v: 1 }],
  ['white', { h: 0, s: 0, v: 1 }],
  ['black', { h: 0, s: 0, v: 0 }],
];

/** One alpha per colour, spanning the closed range so both endpoints are captured. */
const alphas = [0, 0.25, 0.5, 0.75, 0.9, 1, 0.4];

const corners: Array<[string, HsvColor]> = [
  ['0-0', { h: 200, s: 0, v: 0 }],
  ['0-1', { h: 200, s: 0, v: 1 }],
  ['1-0', { h: 200, s: 1, v: 0 }],
  ['1-1', { h: 200, s: 1, v: 1 }],
  ['0-5-0-5', { h: 200, s: 0.5, v: 0.5 }],
];

const shapes: Shape[] = ['rounded', 'square'];
const channels = ['hue', 'saturation', 'value'] as const;

/**
 * Every control is given a controlled `color`, so its thumb position, rail gradient and thumb
 * colour are pure functions of the props: no mount effect, no measurement and no pointer event
 * participates. No cell is hovered or focused, and the family authors no transition or animation.
 */
export const ColorPickerVrScene = ({
  AlphaSlider,
  ColorArea,
  ColorPicker,
  ColorSlider,
  Provider,
}: {
  AlphaSlider: AlphaSliderLike;
  ColorArea: ColorAreaLike;
  ColorPicker: ColorPickerLike;
  ColorSlider: ColorSliderLike;
  Provider: ProviderLike;
}): React.ReactNode => (
  <div style={{ display: 'inline-flex', flexDirection: 'column', gap: 16, padding: 24, background: '#fff' }}>
    <img alt="" src={CHECKERBOARD_URL} style={{ display: 'none' }} />

    <div style={row}>
      {colors.map(([name, color]) => (
        <ColorSlider key={`hue-${name}`} channel="hue" color={color} />
      ))}
    </div>

    <div style={row}>
      {colors.map(([name, color]) => (
        <ColorSlider key={`saturation-${name}`} channel="saturation" color={color} />
      ))}
    </div>

    <div style={row}>
      {colors.map(([name, color]) => (
        <ColorSlider key={`value-${name}`} channel="value" color={color} />
      ))}
    </div>

    <div style={row}>
      {channels.map(channel => (
        <ColorSlider key={`vertical-${channel}`} channel={channel} color={colors[2][1]} vertical />
      ))}
    </div>

    <div style={row}>
      {shapes.map(shape => (
        <ColorSlider key={`slider-shape-${shape}`} color={colors[3][1]} shape={shape} />
      ))}
    </div>

    <div style={row}>
      {colors.map(([name, color], index) => (
        <AlphaSlider key={`alpha-${name}`} color={{ ...color, a: alphas[index] }} />
      ))}
    </div>

    <div style={row}>
      {[false, true].map(transparency => (
        <AlphaSlider
          key={`alpha-transparency-${transparency}`}
          color={{ ...colors[2][1], a: 0.3 }}
          transparency={transparency}
        />
      ))}
      {[false, true].map(transparency => (
        <AlphaSlider
          key={`alpha-vertical-transparency-${transparency}`}
          color={{ ...colors[2][1], a: 0.3 }}
          transparency={transparency}
          vertical
        />
      ))}
    </div>

    <div style={row}>
      {colors.map(([name, color]) => (
        <ColorArea key={`area-${name}`} color={color} />
      ))}
    </div>

    <div style={row}>
      {corners.map(([name, color]) => (
        <ColorArea key={`area-corner-${name}`} color={color} />
      ))}
      {shapes.map(shape => (
        <ColorArea key={`area-shape-${shape}`} color={colors[2][1]} shape={shape} />
      ))}
    </div>

    <div style={row}>
      <ColorPicker color={colors[2][1]}>
        <ColorArea />
        <ColorSlider />
        <AlphaSlider />
      </ColorPicker>
    </div>

    {/*
     * The only band that reaches the direction-dependent rules: the saturation and value rails
     * name a physical gradient axis, the alpha rail and the hue rail read a direction custom
     * property, both thumbs mirror their half-width offset, a vertical input inverts its own
     * `direction`, and ColorArea's white overlay names a physical axis of its own. Griffel picks
     * its rtl atoms from provider context, so the band needs a real provider on each side rather
     * than a bare dir="rtl" element.
     */}
    <div style={row}>
      <Provider dir="rtl">
        <div style={row}>
          {channels.map(channel => (
            <ColorSlider key={`rtl-${channel}`} channel={channel} color={colors[2][1]} />
          ))}
          <ColorSlider channel="saturation" color={colors[2][1]} vertical />
          <AlphaSlider color={{ ...colors[2][1], a: 0.3 }} />
          <ColorArea color={colors[2][1]} />
        </div>
      </Provider>
    </div>
  </div>
);
