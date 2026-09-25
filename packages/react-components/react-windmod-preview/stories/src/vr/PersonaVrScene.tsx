// eslint-disable-next-line import/no-extraneous-dependencies -- story-only helper outside the *.stories.tsx devDependencies exemption
import * as React from 'react';

const sizes = ['extra-small', 'small', 'medium', 'large', 'extra-large', 'huge'] as const;
const textPositions = ['after', 'before', 'below'] as const;

// The text slots are typed as narrowly as the scene actually uses them. A ComponentType is
// contravariant in its props, so a wider spelling (React.ReactNode admits `false`, which no slot
// type accepts) makes neither implementation assignable to this alias.
type PersonaLike = React.ComponentType<{
  avatar?: null;
  name?: string;
  primaryText?: string | null;
  quaternaryText?: string | null;
  secondaryText?: string | null;
  size?: (typeof sizes)[number];
  style?: React.CSSProperties;
  tertiaryText?: string | null;
  textAlignment?: 'center' | 'start';
  textPosition?: (typeof textPositions)[number];
}>;

const row = { display: 'flex', gap: 16, alignItems: 'flex-start' } as const;

const name = 'Kevin Sturgis';
const lines = {
  secondaryText: 'Available',
  tertiaryText: 'Software Engineer',
  quaternaryText: 'Microsoft',
} as const;

// Text ladders by line count: each is a prefix of primary → secondary → tertiary → quaternary.
const ladders = [
  {},
  { secondaryText: lines.secondaryText },
  { secondaryText: lines.secondaryText, tertiaryText: lines.tertiaryText },
] as const;

// Sparse ladders — a line rendering without its predecessors. A named row start is load-bearing
// only for the FIRST rendered text line: the root flows columns, so an unpinned first line takes
// the text column's first free cell, which is the leading 1fr slack track rather than any
// max-content row. Every later line is pinned to a row it would otherwise reach by auto-placement,
// and the rows skipped in between are empty and therefore zero-height — same pixels either way.
// So each of the four names needs one cell in which its own line comes first, or its rule is
// unproven: (a) tertiary, (b) secondary, (d) quaternary; primary comes first in every prefix
// ladder above. (c) keeps a mid-ladder gap in the set as the counter-case.
const sparse = [
  { primaryText: null, tertiaryText: lines.tertiaryText },
  { primaryText: null, secondaryText: lines.secondaryText, quaternaryText: lines.quaternaryText },
  { quaternaryText: lines.quaternaryText },
  { primaryText: null, quaternaryText: lines.quaternaryText },
] as const;

/** One scene, two implementations — the VR runner diffs the renders pixel for pixel. */
export const PersonaVrScene = ({
  Persona,
  Rtl,
}: {
  Persona: PersonaLike;
  Rtl: React.ComponentType<{ children: React.ReactNode }>;
}): React.ReactNode => (
  <div style={{ display: 'inline-flex', flexDirection: 'column', gap: 20, padding: 24, background: '#fff' }}>
    {/* Bands 1-2: the whole resting contract — both grid templates, every justify-items value,
        the grid-auto-flow reset, both coin spans, both align-self values, all four spacing
        tokens, both margin sides and both typography ladders. */}
    {(['start', 'center'] as const).map(textAlignment =>
      sizes.map(size => (
        <div key={`look-${textAlignment}-${size}`} style={row}>
          {textPositions.map(textPosition => (
            <Persona
              key={textPosition}
              name={name}
              size={size}
              textAlignment={textAlignment}
              textPosition={textPosition}
              {...lines}
            />
          ))}
        </div>
      )),
    )}

    {/* Bands 3-4: the two 1fr outer tracks absorb the slack at one, two and three lines, so the
        named row starts decide which centred rows stay empty. */}
    {(['start', 'center'] as const).map(textAlignment =>
      ladders.map((ladder, index) => (
        <div key={`lines-${textAlignment}-${index}`} style={row}>
          {textPositions.map(textPosition => (
            <Persona
              key={textPosition}
              name={name}
              textAlignment={textAlignment}
              textPosition={textPosition}
              {...ladder}
            />
          ))}
        </div>
      )),
    )}

    {/* Band 5: the only crossing with no first-column item — the root's column template and
        justify-items stand on their own and no coin-only rule leaks onto a text slot. */}
    <div style={row}>
      {textPositions.map(textPosition => (
        <Persona
          key={`no-coin-${textPosition}`}
          avatar={null}
          name={name}
          secondaryText={lines.secondaryText}
          textPosition={textPosition}
        />
      ))}
    </div>

    {/* Band 6: the only place the second line is the first rendered line, which isolates
        secondaryText's unconditional -2px margin from the gap between lines one and two. */}
    <div style={row}>
      {(['after', 'below'] as const).map(textPosition => (
        <Persona
          key={`no-primary-${textPosition}`}
          name={name}
          primaryText={null}
          secondaryText={lines.secondaryText}
          tertiaryText={lines.tertiaryText}
          textPosition={textPosition}
        />
      ))}
    </div>

    {/* Band 7: the only place the max-content [middle] auto asymmetry is load-bearing — the text
        column takes the slack while the coin column stays at its intrinsic width, mirrored. */}
    <div style={row}>
      {textPositions.map(textPosition => (
        <Persona
          key={`narrow-${textPosition}`}
          name="Kevin Sturgis with a considerably longer display name"
          secondaryText="Available for a much longer secondary line than the column can hold"
          size="extra-large"
          style={{ width: 220 }}
          tertiaryText="Software Engineer"
          textPosition={textPosition}
        />
      ))}
    </div>

    {/* Band 8: the direction axis. Griffel picks the coin's margin from an [ltr, rtl] class tuple
        by provider direction; windmod uses one logical me-/ms- declaration. */}
    <Rtl>
      <div style={{ display: 'inline-flex', flexDirection: 'column', gap: 16 }}>
        {(['small', 'huge'] as const).map(size => (
          <div key={`rtl-${size}`} style={row}>
            {textPositions.map(textPosition => (
              <Persona
                key={textPosition}
                name={name}
                secondaryText={lines.secondaryText}
                size={size}
                textPosition={textPosition}
              />
            ))}
          </div>
        ))}
      </div>
    </Rtl>

    {/* Band 9: sparse ladders under textAlignment="center" and textPosition="after" — the only
        cells that prove the named row starts on secondary, tertiary and quaternary. Do not
        substitute a start-aligned equivalent: the rules are gated on text-alignment-center. */}
    {(['medium', 'huge'] as const).map(size => (
      <div key={`sparse-${size}`} style={row}>
        {sparse.map((ladder, index) => (
          <Persona key={index} name={name} size={size} textAlignment="center" textPosition="after" {...ladder} />
        ))}
      </div>
    ))}
  </div>
);
