// eslint-disable-next-line import/no-extraneous-dependencies -- story-only helper outside the *.stories.tsx devDependencies exemption
import * as React from 'react';

const sizes = ['small', 'medium', 'large'] as const;

type InfoLabelLike = React.ComponentType<{
  size?: (typeof sizes)[number];
  weight?: 'regular' | 'semibold';
  disabled?: boolean;
  required?: boolean;
  info?: React.ReactNode;
  infoButton?: { children?: React.ReactNode };
  children?: React.ReactNode;
}>;

type FieldLike = React.ComponentType<{
  size?: (typeof sizes)[number];
  label?: { children: (first: unknown, props: Record<string, unknown>) => React.ReactNode };
  children?: React.ReactNode;
}>;

type InputLike = React.ComponentType<Record<string, never>>;

/**
 * Thirteen cells, no popover open anywhere: `capture: 'root'` is therefore correct and the scene
 * holds no filtered box, no arrow and no top-layer element, so it carries no allowance. Hover,
 * pressed and open looks are owned by the state probe — the forced-pseudo-state harness has not
 * landed, and a stub class would pin a look the component never actually resolves.
 *
 * `reduced` drops to the six direction-sensitive cells for the RTL run: neither Griffel styles
 * file contains a single logical or directional property, so the rest of the grid would only
 * duplicate the LTR scene.
 */
export const InfoLabelVrScene = ({
  InfoLabel,
  Field,
  Input,
  reduced = false,
}: {
  InfoLabel: InfoLabelLike;
  Field: FieldLike;
  Input: InputLike;
  reduced?: boolean;
}): React.ReactNode => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: `repeat(3, 340px)`,
      gap: 24,
      padding: 24,
      background: '#fff',
      justifyItems: 'start',
    }}
  >
    {sizes.map(size => (
      <InfoLabel key={`plain-${size}`} size={size} info="Example info">
        Label {size}
      </InfoLabel>
    ))}
    {sizes.map(size => (
      <InfoLabel key={`required-${size}`} size={size} required info="Example info">
        Required {size}
      </InfoLabel>
    ))}
    {!reduced && (
      <>
        {/* The label text keeps the INHERITED colour, not the disabled grey — the l3 `color:
            inherit` displaces the Label's own disabled bucket — while the asterisk, a separate
            slot, keeps its disabled colour. */}
        <InfoLabel disabled info="Example info">
          Disabled
        </InfoLabel>
        <InfoLabel disabled required info="Example info">
          Disabled required
        </InfoLabel>
        <InfoLabel weight="semibold" info="Example info">
          Semibold
        </InfoLabel>
        <InfoLabel>No info button</InfoLabel>
        <InfoLabel info="Example info" infoButton={{ children: <span>Custom</span> }}>
          Custom glyph
        </InfoLabel>
        {/* Both children are vertical-align: top, so a wrapping label keeps the button on the
            FIRST line rather than centring it against the whole box. */}
        <InfoLabel info="Example info">
          A label long enough that it wraps onto a second line inside its own column
        </InfoLabel>
        {/* A Field label render function replaces the whole slot, so Field's own label swap is
            bypassed and the size it hands down has to reach the glyph through the InfoLabel. */}
        <Field
          size="large"
          label={{
            children: (_first: unknown, props: Record<string, unknown>) => (
              <InfoLabel {...props} info="Example info">
                Field with info label
              </InfoLabel>
            ),
          }}
        >
          <Input />
        </Field>
      </>
    )}
  </div>
);
