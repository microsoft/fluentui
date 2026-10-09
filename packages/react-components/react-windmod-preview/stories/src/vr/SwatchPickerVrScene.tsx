// eslint-disable-next-line import/no-extraneous-dependencies -- story-only helper outside the *.stories.tsx devDependencies exemption
import * as React from 'react';

const sizes = ['extra-small', 'small', 'medium', 'large'] as const;
const shapes = ['rounded', 'square', 'circular'] as const;
const spacings = ['small', 'medium'] as const;

type Size = (typeof sizes)[number];
type Shape = (typeof shapes)[number];
type Spacing = (typeof spacings)[number];

type SwatchPickerLike = React.ComponentType<{
  size?: Size;
  shape?: Shape;
  spacing?: Spacing;
  layout?: 'row' | 'grid';
  defaultSelectedValue?: string;
  children?: React.ReactNode;
}>;

type SwatchPickerRowLike = React.ComponentType<{ children?: React.ReactNode }>;

type ColorSwatchLike = React.ComponentType<{
  color: string;
  value: string;
  borderColor?: string;
  disabled?: boolean;
  icon?: React.ReactElement;
  size?: Size;
  shape?: Shape;
}>;

type ImageSwatchLike = React.ComponentType<{ src: string; value: string }>;

type EmptySwatchLike = React.ComponentType<{ size?: Size; shape?: Shape }>;

type Props = {
  SwatchPicker: SwatchPickerLike;
  SwatchPickerRow: SwatchPickerRowLike;
  ColorSwatch: ColorSwatchLike;
  ImageSwatch: ImageSwatchLike;
  EmptySwatch: EmptySwatchLike;
};

// Solid-colour data URIs: no network, and available synchronously at first paint on both sides,
// so background-size: cover is exercised without depending on decode timing.
const teal =
  'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%228%22%20height%3D%228%22%3E%3Crect%20width%3D%228%22%20height%3D%228%22%20fill%3D%22%23038387%22%2F%3E%3C%2Fsvg%3E';
const plum =
  'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%228%22%20height%3D%228%22%3E%3Crect%20width%3D%228%22%20height%3D%228%22%20fill%3D%22%2377004D%22%2F%3E%3C%2Fsvg%3E';

const red = '#D13438';
const green = '#0F7B0F';
const blue = '#0078D4';
// The var()-fallback chain is load-bearing only on a light swatch carrying its own borderColor.
const white = '#FFFFFF';
const whiteBorder = '#D1D1D1';

const band: React.CSSProperties = { display: 'flex', gap: 24, alignItems: 'flex-start', flexWrap: 'wrap' };

/**
 * One scene, two implementations — the VR runner diffs the renders pixel for pixel.
 *
 * Every cell is a resting state: the family authors no transition and no animation, and its
 * hover, active and focus rings are not capturable here (they are measured at the computed level
 * instead). The disabledIcon={{children: null}} input is deliberately absent — windmod restores
 * the glyph there where Griffel blanks it, so the cell would compare a known divergence.
 */
export const SwatchPickerVrScene: React.FC<Props> = ({
  SwatchPicker,
  SwatchPickerRow,
  ColorSwatch,
  ImageSwatch,
  EmptySwatch,
}) => (
  <div style={{ display: 'inline-flex', flexDirection: 'column', gap: 16, padding: 24, background: '#fff' }}>
    {/* 1 — four sizes, unselected and selected, plus the light swatch whose borderColor feeds
        the custom-property fallback chain. */}
    <div style={band}>
      {sizes.map(size => (
        <SwatchPicker key={size} size={size}>
          <ColorSwatch color={red} value="a" />
        </SwatchPicker>
      ))}
      {sizes.map(size => (
        <SwatchPicker key={`sel-${size}`} size={size} defaultSelectedValue="a">
          <ColorSwatch color={red} value="a" />
        </SwatchPicker>
      ))}
      <SwatchPicker>
        <ColorSwatch color={white} borderColor={whiteBorder} value="a" />
      </SwatchPicker>
      <SwatchPicker defaultSelectedValue="a">
        <ColorSwatch color={white} borderColor={whiteBorder} value="a" />
      </SwatchPicker>
    </div>

    {/* 2 — three shapes, unselected and selected. */}
    <div style={band}>
      {shapes.map(shape => (
        <SwatchPicker key={shape} shape={shape}>
          <ColorSwatch color={green} value="a" />
        </SwatchPicker>
      ))}
      {shapes.map(shape => (
        <SwatchPicker key={`sel-${shape}`} shape={shape} defaultSelectedValue="a">
          <ColorSwatch color={green} value="a" />
        </SwatchPicker>
      ))}
    </div>

    {/* 3 — the picker's own gap and flex-direction. */}
    <div style={band}>
      {spacings.map(spacing => (
        <SwatchPicker key={`row-${spacing}`} spacing={spacing}>
          <ColorSwatch color={red} value="a" />
          <ColorSwatch color={green} value="b" />
          <ColorSwatch color={blue} value="c" />
        </SwatchPicker>
      ))}
      {spacings.map(spacing => (
        <SwatchPicker key={`grid-${spacing}`} layout="grid" spacing={spacing}>
          <ColorSwatch color={red} value="a" />
          <ColorSwatch color={green} value="b" />
        </SwatchPicker>
      ))}
    </div>

    {/* 4 — the row's column-gap and the row/column nesting. */}
    <div style={band}>
      {spacings.map(spacing => (
        <SwatchPicker key={`rows-${spacing}`} layout="grid" spacing={spacing}>
          <SwatchPickerRow>
            <ColorSwatch color={red} value="a" />
            <ColorSwatch color={green} value="b" />
          </SwatchPickerRow>
          <SwatchPickerRow>
            <ColorSwatch color={blue} value="c" />
            <ColorSwatch color={white} borderColor={whiteBorder} value="d" />
          </SwatchPickerRow>
        </SwatchPicker>
      ))}
    </div>

    {/* 5 — the restored ProhibitedFilled glyph: its inverted colour, its drop shadow and its size
        scale, plus a disabled swatch keeping its selected ring. */}
    <div style={band}>
      {sizes.map(size => (
        <SwatchPicker key={`dis-${size}`} size={size}>
          <ColorSwatch color={red} value="a" disabled />
        </SwatchPicker>
      ))}
      <SwatchPicker defaultSelectedValue="a">
        <ColorSwatch color={red} value="a" disabled />
      </SwatchPicker>
    </div>

    {/* 6 — the icon slot's absolute centring and its 16/16/20/24px scale. */}
    <div style={band}>
      {sizes.map(size => (
        <SwatchPicker key={`icon-${size}`} size={size}>
          <ColorSwatch color={blue} value="a" icon={<GlyphStandIn />} />
        </SwatchPicker>
      ))}
    </div>

    {/* 7 — a per-swatch size and a per-swatch shape beating the picker. */}
    <div style={band}>
      <SwatchPicker size="large">
        <ColorSwatch color={green} value="a" size="extra-small" />
      </SwatchPicker>
      <SwatchPicker shape="square">
        <ColorSwatch color={green} value="a" shape="circular" />
      </SwatchPicker>
    </div>

    {/* 8 — ImageSwatch: background-size/repeat, the size and shape branches, and a selected ring
        on a component with no small-selected branch. */}
    <div style={band}>
      {sizes.map(size => (
        <SwatchPicker key={`img-${size}`} size={size}>
          <ImageSwatch src={teal} value="a" />
        </SwatchPicker>
      ))}
      {sizes.map(size => (
        <SwatchPicker key={`img-sel-${size}`} size={size} defaultSelectedValue="a">
          <ImageSwatch src={teal} value="a" />
        </SwatchPicker>
      ))}
      {shapes.map(shape => (
        <SwatchPicker key={`img-${shape}`} shape={shape}>
          <ImageSwatch src={plum} value="a" />
        </SwatchPicker>
      ))}
    </div>

    {/* 9 — EmptySwatch: the dashed border and the size and shape branches. */}
    <div style={band}>
      {sizes.map(size => (
        <SwatchPicker key={`empty-${size}`} size={size}>
          <EmptySwatch />
        </SwatchPicker>
      ))}
      {shapes.map(shape => (
        <SwatchPicker key={`empty-${shape}`} shape={shape}>
          <EmptySwatch />
        </SwatchPicker>
      ))}
    </div>

    {/* 10 — all five components in one tree. */}
    <div style={band}>
      <SwatchPicker defaultSelectedValue="b" layout="grid">
        <SwatchPickerRow>
          <ColorSwatch color={red} value="a" />
          <ColorSwatch color={green} value="b" />
          <ColorSwatch color={white} borderColor={whiteBorder} value="c" />
        </SwatchPickerRow>
        <SwatchPickerRow>
          <ImageSwatch src={teal} value="d" />
          <ColorSwatch color={blue} value="e" disabled />
          <EmptySwatch />
        </SwatchPickerRow>
      </SwatchPicker>
    </div>
  </div>
);

// A neutral square, not an icon font: icon-colour divergence has to be pixel-visible, and both
// sides must draw the identical mark so only the slot's box and scale are under test.
const GlyphStandIn = (): React.ReactElement => (
  <span style={{ display: 'block', width: '1em', height: '1em', background: '#FFFFFF' }} />
);
