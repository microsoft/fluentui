// eslint-disable-next-line import/no-extraneous-dependencies -- story-only helper outside the *.stories.tsx devDependencies exemption
import * as React from 'react';

const densities = ['medium', 'small'] as const;

type Density = (typeof densities)[number];

type NavLike = React.ComponentType<{
  density?: Density;
  selectedValue?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}>;

type NavItemLike = React.ComponentType<{
  value: string;
  href?: string;
  icon?: React.ReactElement;
  children?: React.ReactNode;
}>;

type NavSectionHeaderLike = React.ComponentType<{ children?: React.ReactNode }>;
type NavDividerLike = React.ComponentType<Record<string, never>>;

// Every nav is a fixed-width column: the rows are width:100%, so an intrinsic width would let
// the longest label decide the geometry and hide indent differences.
const column: React.CSSProperties = { width: 300 };

/** One scene, two implementations — the VR runner diffs the renders pixel for pixel. */
export const NavVrScene = ({
  Nav,
  NavItem,
  NavSectionHeader,
  NavDivider,
  Icon,
}: {
  Nav: NavLike;
  NavItem: NavItemLike;
  NavSectionHeader: NavSectionHeaderLike;
  NavDivider: NavDividerLike;
  Icon: React.ComponentType;
}): React.ReactNode => (
  <div style={{ display: 'inline-flex', flexDirection: 'column', gap: 16, padding: 24, background: '#fff' }}>
    {/* 1 — the shared reset, both block paddings, the indicator, and the glyph swap. */}
    {densities.map(density =>
      (['text', 'icon'] as const).map(content =>
        ([undefined, '1'] as const).map(selectedValue => (
          <Nav
            key={`row-${density}-${content}-${selectedValue ?? 'rest'}`}
            density={density}
            selectedValue={selectedValue}
            style={column}
          >
            <NavItem value="1" icon={content === 'icon' ? <Icon /> : undefined}>
              Home
            </NavItem>
          </Nav>
        )),
      ),
    )}

    {/* 2 — the anchor root. `border: none` behaves differently on <a> than on <button>. */}
    {densities.map(density => (
      <Nav key={`anchor-${density}`} density={density} style={column}>
        <NavItem value="1" href="#destination">
          Home
        </NavItem>
      </Nav>
    ))}

    {/* 3 — the section header's caption typography and the l2 divider over the shipped l1. */}
    {densities.map(density => (
      <Nav key={`header-${density}`} density={density} style={column}>
        <NavSectionHeader>Section</NavSectionHeader>
      </Nav>
    ))}
    {densities.map(density => (
      <Nav key={`divider-${density}`} density={density} style={column}>
        <NavDivider />
      </Nav>
    ))}

    {/* 6 — bare text directly inside a Nav. Neither library's Nav pins typography or
        colour, so this cell compares what the two providers publish to their subtrees. */}
    <Nav style={column}>Bare text</Nav>
  </div>
);
