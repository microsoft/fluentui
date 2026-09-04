// eslint-disable-next-line import/no-extraneous-dependencies -- story-only helper outside the *.stories.tsx devDependencies exemption
import * as React from 'react';

const appearances = ['filled', 'outline', 'brand'] as const;
const shapes = ['rounded', 'circular'] as const;
const sizes = ['medium', 'small', 'extra-small'] as const;

type TagLike = React.ComponentType<{
  appearance?: (typeof appearances)[number];
  shape?: (typeof shapes)[number];
  size?: (typeof sizes)[number];
  disabled?: boolean;
  dismissible?: boolean;
  selected?: boolean;
  media?: React.ReactElement;
  icon?: React.ReactElement;
  // The slot types reject `false`, so this shim cannot widen the text slot to ReactNode.
  secondaryText?: string;
  dismissIcon?: React.ReactElement | null;
  children?: React.ReactNode;
}>;

type AvatarLike = React.ComponentType<{ name?: string }>;

const row: React.CSSProperties = { display: 'flex', gap: 12, alignItems: 'center' };

// A plain box rather than an Avatar for every band except the last: it isolates Tag's own media
// geometry from the avatar-context values either side supplies. The last band is the deliberate
// opposite — a real Avatar with no size or shape of its own, so the context is the only thing that
// can size it.
const mediaBox = <i style={{ display: 'block', width: 20, height: 20, background: '#8a8886' }} />;
const customGlyph = <i style={{ display: 'block', width: 20, height: 20, background: '#107c10' }} />;

/** One scene, two implementations — the VR runner diffs the renders pixel for pixel. */
export const TagVrScene = ({
  Tag,
  Avatar,
  Icon,
}: {
  Tag: TagLike;
  Avatar: AvatarLike;
  Icon: React.ComponentType;
}): React.ReactNode => (
  <div style={{ display: 'inline-flex', flexDirection: 'column', gap: 16, padding: 24, background: '#fff' }}>
    {shapes.map(shape =>
      appearances.map(appearance => (
        <div key={`rest-${shape}-${appearance}`} style={row}>
          {sizes.map(size => (
            <Tag key={size} appearance={appearance} shape={shape} size={size}>
              Primary
            </Tag>
          ))}
        </div>
      )),
    )}
    {appearances.map(appearance => (
      <div key={`disabled-${appearance}`} style={row}>
        {sizes.map(size => (
          <Tag key={size} appearance={appearance} size={size} disabled>
            Primary
          </Tag>
        ))}
      </div>
    ))}
    {appearances.map(appearance => (
      <div key={`selected-${appearance}`} style={row}>
        {sizes.map(size => (
          <Tag key={size} appearance={appearance} size={size} selected>
            Primary
          </Tag>
        ))}
      </div>
    ))}
    {/* The selected look is gated on `!disabled`, so this row must show the disabled look. */}
    <div style={row}>
      {sizes.map(size => (
        <Tag key={size} size={size} selected disabled>
          Primary
        </Tag>
      ))}
    </div>
    {shapes.map(shape =>
      appearances.map(appearance => (
        <div key={`dismiss-${shape}-${appearance}`} style={row}>
          {sizes.map(size => (
            <Tag key={size} appearance={appearance} shape={shape} size={size} dismissible>
              Primary
            </Tag>
          ))}
        </div>
      )),
    )}
    {shapes.map(shape => (
      <div key={`icon-${shape}`} style={row}>
        {sizes.map(size => (
          <Tag key={size} shape={shape} size={size} icon={<Icon />}>
            Primary
          </Tag>
        ))}
      </div>
    ))}
    <div style={row}>
      {sizes.map(size => (
        <Tag key={size} size={size} media={mediaBox}>
          Primary
        </Tag>
      ))}
    </div>
    <div style={row}>
      {sizes.map(size => (
        <Tag key={size} size={size} secondaryText="Secondary">
          Primary
        </Tag>
      ))}
    </div>
    {appearances.map(appearance => (
      <div key={`full-${appearance}`} style={row}>
        {sizes.map(size => (
          <Tag key={size} appearance={appearance} size={size} icon={<Icon />} secondaryText="Secondary" dismissible>
            Primary
          </Tag>
        ))}
      </div>
    ))}
    <div style={row}>
      {sizes.map(size => (
        <Tag key={size} size={size} media={mediaBox} dismissible>
          Primary
        </Tag>
      ))}
    </div>
    <div style={row}>
      {sizes.map(size => (
        <Tag
          key={size}
          appearance="brand"
          shape="circular"
          size={size}
          media={mediaBox}
          secondaryText="Secondary"
          dismissible
        >
          Primary
        </Tag>
      ))}
    </div>
    <div style={row}>
      <Tag>A considerably longer primary text than the others</Tag>
      <Tag secondaryText="A considerably longer secondary text than the others">Primary</Tag>
      <Tag secondaryText="A considerably longer secondary text than the others">
        A considerably longer primary text than the others
      </Tag>
    </div>
    {/* The two halves of the glyph seam: a consumer element replaces the default, `null` removes
        the slot and restores the trailing padding with it. */}
    <div style={row}>
      <Tag dismissible dismissIcon={customGlyph}>
        Primary
      </Tag>
      <Tag dismissible dismissIcon={null}>
        Primary
      </Tag>
    </div>
    {/* media and icon share one grid area upstream; both sides must stack them the same way. */}
    <div style={row}>
      {sizes.map(size => (
        <Tag key={size} size={size} media={mediaBox} icon={<Icon />}>
          Primary
        </Tag>
      ))}
    </div>
    {/* AvatarContext: the Tag maps its own size/shape onto the media Avatar (medium→28, small→20,
        extra-small→16; rounded→square, circular→circular) and publishes them. The Avatars below
        carry no size or shape of their own, exactly as Griffel's TagMedia/TagSize/TagShape stories
        write them, so every avatar box here is drawn by the context alone. */}
    {shapes.map(shape => (
      <div key={`avatar-${shape}`} style={row}>
        {sizes.map(size => (
          <Tag key={size} shape={shape} size={size} media={<Avatar name="Katri Athokas" />}>
            Primary
          </Tag>
        ))}
      </div>
    ))}
  </div>
);
