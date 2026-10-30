// eslint-disable-next-line import/no-extraneous-dependencies -- story-only helper outside the *.stories.tsx devDependencies exemption
import * as React from 'react';

const appearances = ['filled', 'outline', 'brand'] as const;
const shapes = ['rounded', 'circular'] as const;
const sizes = ['medium', 'small', 'extra-small'] as const;

type InteractionTagLike = React.ComponentType<{
  appearance?: (typeof appearances)[number];
  shape?: (typeof shapes)[number];
  size?: (typeof sizes)[number];
  disabled?: boolean;
  selected?: boolean;
  value?: string;
  children?: React.ReactNode;
}>;

type PrimaryLike = React.ComponentType<{
  hasSecondaryAction?: boolean;
  media?: React.ReactElement;
  icon?: React.ReactElement;
  // The slot types reject `false`, so this shim cannot widen the text slot to ReactNode.
  secondaryText?: string;
  children?: React.ReactNode;
}>;

type SecondaryLike = React.ComponentType<{ 'aria-label'?: string }>;

type TagGroupLike = React.ComponentType<{
  appearance?: (typeof appearances)[number];
  size?: (typeof sizes)[number];
  children?: React.ReactNode;
}>;

const row: React.CSSProperties = { display: 'flex', gap: 12, alignItems: 'center' };

// A plain box rather than an Avatar: it isolates the primary's own media geometry from the avatar
// context values either side supplies. The avatar chain is the `tag` scene's job.
const mediaBox = <i style={{ display: 'block', width: 20, height: 20, background: '#8a8886' }} />;

/** One scene, two implementations — the VR runner diffs the renders pixel for pixel. */
export const InteractionTagVrScene = ({
  InteractionTag,
  InteractionTagPrimary,
  InteractionTagSecondary,
  TagGroup,
  Icon,
}: {
  InteractionTag: InteractionTagLike;
  InteractionTagPrimary: PrimaryLike;
  InteractionTagSecondary: SecondaryLike;
  TagGroup: TagGroupLike;
  Icon: React.ComponentType;
}): React.ReactNode => {
  // Both halves of the structure axis, so every band can cross it without restating the markup.
  const withSecondary = (children: React.ReactNode) => (
    <>
      <InteractionTagPrimary hasSecondaryAction>{children}</InteractionTagPrimary>
      <InteractionTagSecondary aria-label="dismiss" />
    </>
  );
  const primaryOnly = (children: React.ReactNode) => <InteractionTagPrimary>{children}</InteractionTagPrimary>;

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', gap: 16, padding: 24, background: '#fff' }}>
      {/* Band 1 — the height contract. `h-full` propagates the tag's height into both buttons, so
          a size-blind band would be blind to two-thirds of InteractionTag.module.css. */}
      <div style={row}>
        {sizes.map(size => (
          <InteractionTag key={size} size={size}>
            {primaryOnly(size)}
          </InteractionTag>
        ))}
      </div>
      <div style={row}>
        {sizes.map(size => (
          <InteractionTag key={size} size={size}>
            {withSecondary(size)}
          </InteractionTag>
        ))}
      </div>

      {/* Band 2 — the only proof of the shape channel: `rounded` is resting and carries no class. */}
      {shapes.map(shape => (
        <div key={`shape-${shape}`} style={row}>
          {(['medium', 'extra-small'] as const).map(size => (
            <React.Fragment key={size}>
              <InteractionTag shape={shape} size={size}>
                {primaryOnly(shape)}
              </InteractionTag>
              <InteractionTag shape={shape} size={size}>
                {withSecondary(shape)}
              </InteractionTag>
            </React.Fragment>
          ))}
        </div>
      ))}

      {/* Band 3 — the only proof of the appearance channel: `filled` is resting. */}
      <div style={row}>
        {appearances.map(appearance => (
          <InteractionTag key={appearance} appearance={appearance}>
            {primaryOnly(appearance)}
          </InteractionTag>
        ))}
      </div>
      <div style={row}>
        {appearances.map(appearance => (
          <InteractionTag key={appearance} appearance={appearance}>
            {withSecondary(appearance)}
          </InteractionTag>
        ))}
      </div>

      {/* Band 4 — where the two halves join: the divider, the end radii, the border-style cut and
          the restored dismiss glyph all need a secondary present. */}
      {appearances.map(appearance => (
        <div key={`secondary-${appearance}`} style={row}>
          {sizes.map(size => (
            <InteractionTag key={size} appearance={appearance} size={size}>
              {withSecondary(`${appearance} ${size}`)}
            </InteractionTag>
          ))}
        </div>
      ))}

      {/* Band 5 — the only proof of `selected`. */}
      <div style={row}>
        {appearances.map(appearance => (
          <InteractionTag key={appearance} appearance={appearance} selected>
            {primaryOnly(appearance)}
          </InteractionTag>
        ))}
      </div>
      <div style={row}>
        {appearances.map(appearance => (
          <InteractionTag key={appearance} appearance={appearance} selected>
            {withSecondary(appearance)}
          </InteractionTag>
        ))}
      </div>

      {/* Band 6 — the disabled look, and the flagged `disabled + selected` crossing: the only one
          that can catch a primary applying the selected bucket without Griffel's !disabled gate,
          or a secondary whose zero block borders escape their `enabled` gate. */}
      <div style={row}>
        {appearances.map(appearance => (
          <InteractionTag key={appearance} appearance={appearance} disabled>
            {primaryOnly(appearance)}
          </InteractionTag>
        ))}
      </div>
      <div style={row}>
        {appearances.map(appearance => (
          <InteractionTag key={appearance} appearance={appearance} disabled>
            {withSecondary(appearance)}
          </InteractionTag>
        ))}
      </div>
      <div style={row}>
        {appearances.map(appearance => (
          <InteractionTag key={appearance} appearance={appearance} disabled selected>
            {withSecondary(appearance)}
          </InteractionTag>
        ))}
      </div>

      {/* Band 7 — the only proof of the borrowed slot classes, and of `withoutMedia` keying off
          both content slots. media and icon share one grid area upstream. */}
      <div style={row}>
        <InteractionTag>{<InteractionTagPrimary media={mediaBox}>Primary</InteractionTagPrimary>}</InteractionTag>
        <InteractionTag>{<InteractionTagPrimary icon={<Icon />}>Primary</InteractionTagPrimary>}</InteractionTag>
        <InteractionTag>
          {<InteractionTagPrimary secondaryText="Secondary">Primary</InteractionTagPrimary>}
        </InteractionTag>
        <InteractionTag>
          {
            <InteractionTagPrimary media={mediaBox} secondaryText="Secondary">
              Primary
            </InteractionTagPrimary>
          }
        </InteractionTag>
        <InteractionTag>
          {
            <InteractionTagPrimary media={mediaBox} icon={<Icon />}>
              Primary
            </InteractionTagPrimary>
          }
        </InteractionTag>
      </div>
      <div style={row}>
        <InteractionTag>
          <InteractionTagPrimary hasSecondaryAction media={mediaBox}>
            Primary
          </InteractionTagPrimary>
          <InteractionTagSecondary aria-label="dismiss" />
        </InteractionTag>
        <InteractionTag>
          <InteractionTagPrimary hasSecondaryAction icon={<Icon />}>
            Primary
          </InteractionTagPrimary>
          <InteractionTagSecondary aria-label="dismiss" />
        </InteractionTag>
        <InteractionTag>
          <InteractionTagPrimary hasSecondaryAction secondaryText="Secondary">
            Primary
          </InteractionTagPrimary>
          <InteractionTagSecondary aria-label="dismiss" />
        </InteractionTag>
        <InteractionTag>
          <InteractionTagPrimary hasSecondaryAction media={mediaBox} secondaryText="Secondary">
            Primary
          </InteractionTagPrimary>
          <InteractionTagSecondary aria-label="dismiss" />
        </InteractionTag>
        <InteractionTag>
          <InteractionTagPrimary hasSecondaryAction media={mediaBox} icon={<Icon />}>
            Primary
          </InteractionTagPrimary>
          <InteractionTagSecondary aria-label="dismiss" />
        </InteractionTag>
      </div>

      {/* Band 8 — the container look channel: tags with no look props of their own inside a sized,
          appearance'd group. */}
      {sizes.map(size => (
        <TagGroup key={`group-${size}`} size={size} appearance="outline">
          <InteractionTag value="1">{withSecondary('One')}</InteractionTag>
          <InteractionTag value="2">{withSecondary('Two')}</InteractionTag>
          <InteractionTag value="3">{primaryOnly('Three')}</InteractionTag>
        </TagGroup>
      ))}
    </div>
  );
};
