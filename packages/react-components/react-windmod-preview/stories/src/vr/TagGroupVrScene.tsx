// eslint-disable-next-line import/no-extraneous-dependencies -- story-only helper outside the *.stories.tsx devDependencies exemption
import * as React from 'react';

const appearances = ['filled', 'outline', 'brand'] as const;
const sizes = ['medium', 'small', 'extra-small'] as const;

type Appearance = (typeof appearances)[number];
type Size = (typeof sizes)[number];

type TagGroupLike = React.ComponentType<{
  appearance?: Appearance;
  size?: Size;
  disabled?: boolean;
  dismissible?: boolean;
  children?: React.ReactNode;
}>;

type TagLike = React.ComponentType<{
  appearance?: Appearance;
  size?: Size;
  children?: React.ReactNode;
}>;

const row: React.CSSProperties = { display: 'flex', gap: 24, alignItems: 'flex-start' };

// The group contributes no per-Tag structure, so every Tag carries the same plain text: varying it
// would re-prove the `tag` scene rather than this one.
const tags = (Tag: TagLike, count: number, key: string) =>
  Array.from({ length: count }, (_, i) => <Tag key={`${key}-${i}`}>Primary</Tag>);

/** One scene, two implementations — the VR runner diffs the renders pixel for pixel. */
export const TagGroupVrScene = ({ TagGroup, Tag }: { TagGroup: TagGroupLike; Tag: TagLike }): React.ReactNode => (
  <div style={{ display: 'inline-flex', flexDirection: 'column', gap: 16, padding: 24, background: '#fff' }}>
    {/* Band 1 — the whole CSS contract: every gap value at one, two and three children. */}
    {sizes.map(size => (
      <div key={`size-${size}`} style={row}>
        {[1, 2, 3].map(count => (
          <TagGroup key={count} size={size}>
            {tags(Tag, count, `${size}-${count}`)}
          </TagGroup>
        ))}
      </div>
    ))}
    {/* Band 2 — the appearance channel, crossed with size so the two channels are proved independent. */}
    {appearances.map(appearance => (
      <div key={`appearance-${appearance}`} style={row}>
        {sizes.map(size => (
          <TagGroup key={size} appearance={appearance} size={size}>
            {tags(Tag, 3, `${appearance}-${size}`)}
          </TagGroup>
        ))}
      </div>
    ))}
    {/* Band 3 — a local Tag prop beats the group, on both channels. */}
    <div style={row}>
      <TagGroup size="extra-small">
        <Tag>Primary</Tag>
        <Tag size="medium">Primary</Tag>
      </TagGroup>
      <TagGroup appearance="brand">
        <Tag>Primary</Tag>
        <Tag appearance="outline">Primary</Tag>
      </TagGroup>
    </div>
    {/* Bands 4-6 — the two behaviour channels survive the look-prop split, separately and together. */}
    <div style={row}>
      {sizes.map(size => (
        <TagGroup key={size} size={size} dismissible>
          {tags(Tag, 3, `dismissible-${size}`)}
        </TagGroup>
      ))}
    </div>
    <div style={row}>
      {sizes.map(size => (
        <TagGroup key={size} size={size} disabled>
          {tags(Tag, 3, `disabled-${size}`)}
        </TagGroup>
      ))}
    </div>
    <div style={row}>
      {sizes.map(size => (
        <TagGroup key={size} size={size} dismissible disabled>
          {tags(Tag, 3, `both-${size}`)}
        </TagGroup>
      ))}
    </div>
    {/* Band 7 — neither implementation wraps: `focusgroup="toolbar inline wrap"` is a focus
        instruction, not a layout one. The clipped box turns a stray flex-wrap into captured height. */}
    <div style={{ width: 180, overflow: 'hidden' }}>
      <TagGroup>{tags(Tag, 8, 'overflow')}</TagGroup>
    </div>
  </div>
);
