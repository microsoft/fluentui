'use client';

// eslint-disable-next-line import/no-extraneous-dependencies -- story-only helper outside the *.stories.tsx devDependencies exemption
import * as React from 'react';

/* Explicit width/height on the svg root are required: without them the element has no intrinsic
   size and object-fit: cover has nothing to cover. encodeURIComponent is required too — the `#`
   of a hex colour is not a literal in a data URI. */
const svg = (body: string) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">${body}</svg>`,
  )}`;

const srcOpaque = svg(
  '<rect width="40" height="40" fill="#e8ecfb"/>' +
    '<rect x="0" y="0" width="10" height="10" fill="#c50f1f"/>' +
    '<rect x="30" y="30" width="10" height="10" fill="#107c10"/>',
);

/* A disc leaves the square's corners transparent, so a coloured slot background shows through
   and band 11 can prove the colour custom properties reach the image slot. */
const srcTransparent = svg('<circle cx="20" cy="20" r="20" fill="#5b5fc7"/>');

export const sources = [srcOpaque, srcTransparent];

/** run.mjs screenshots two frames after mount without waiting for images; rendering nothing
    until every source has decoded makes that wait unnecessary. The probe element shares the
    document's image cache with the rendered ones, so they paint on their first layout. */
export const useAvatarImageDecoded = (): boolean => {
  const [decoded, setDecoded] = React.useState(false);

  React.useEffect(() => {
    let cancelled = false;

    Promise.all(
      sources.map(src => {
        // eslint-disable-next-line @nx/workspace-no-restricted-globals -- capture-browser-only fixture; no provider in scope
        const el = document.createElement('img');

        el.src = src;

        return el.decode
          ? el.decode()
          : new Promise<void>(resolve => {
              el.onload = () => resolve();
              el.onerror = () => resolve();
            });
      }),
    )
      .catch(() => undefined)
      .then(() => {
        if (!cancelled) {
          setDecoded(true);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return decoded;
};

const sizes = [16, 20, 24, 28, 32, 36, 40, 48, 56, 64, 72, 96, 120, 128] as const;

const namedColors = [
  'dark-red',
  'cranberry',
  'red',
  'pumpkin',
  'peach',
  'marigold',
  'gold',
  'brass',
  'brown',
  'forest',
  'seafoam',
  'dark-green',
  'light-teal',
  'teal',
  'steel',
  'blue',
  'royal-blue',
  'cornflower',
  'navy',
  'lavender',
  'purple',
  'grape',
  'lilac',
  'pink',
  'magenta',
  'plum',
  'beige',
  'mink',
  'platinum',
  'anchor',
] as const;

const colors = ['neutral', 'brand', ...namedColors] as const;

const appearances = ['ring', 'shadow', 'ring-shadow'] as const;

const colorfulNames = ['Katri Athokas', 'Elvia Atkins', 'Cameron Evans', 'Wanda Howard', 'Mona Kane', 'Allan Munger'];

type AvatarLike = React.ComponentType<{
  active?: 'active' | 'inactive' | 'unset';
  activeAppearance?: (typeof appearances)[number];
  color?: (typeof colors)[number] | 'colorful';
  idForColor?: string;
  image?: { src: string };
  initials?: string;
  name?: string;
  shape?: 'circular' | 'square';
  size?: (typeof sizes)[number];
}>;

/* Both providers inherit body1 typography onto their subtree, and the Avatar root is an
   inline-block sitting on a line-box baseline whose strut comes from the parent. Flex rows plus
   a zero strut remove the dependence entirely; the Avatar's own font-size is set on its root. */
const frame: React.CSSProperties = {
  display: 'inline-flex',
  flexDirection: 'column',
  gap: 28,
  padding: 24,
  background: '#ffffff',
  fontSize: 0,
  lineHeight: 0,
  textAlign: 'left',
};

const row: React.CSSProperties = { display: 'flex', gap: 28, alignItems: 'center' };
const wrapRow: React.CSSProperties = { ...row, flexWrap: 'wrap', maxWidth: 900 };

/** One scene, two implementations — the VR runner diffs the renders pixel for pixel. */
export const AvatarVrScene = ({ Avatar }: { Avatar: AvatarLike }): React.ReactNode => (
  <div style={frame}>
    <div style={row}>
      {sizes.map(size => (
        <Avatar key={size} name="Katri Athokas" size={size} />
      ))}
    </div>

    <div style={row}>
      {sizes.map(size => (
        <Avatar key={size} name="Katri Athokas" shape="square" size={size} />
      ))}
    </div>

    <div style={row}>
      {sizes.map(size => (
        <Avatar key={size} size={size} />
      ))}
    </div>

    <div style={row}>
      {sizes.map(size => (
        <Avatar key={size} image={{ src: srcOpaque }} size={size} />
      ))}
    </div>

    <div style={wrapRow}>
      {colors.map(color => (
        <Avatar key={color} color={color} name="Katri Athokas" size={48} />
      ))}
    </div>

    <div style={row}>
      {colorfulNames.map(name => (
        <Avatar key={name} color="colorful" name={name} size={48} />
      ))}
    </div>

    {appearances.map(activeAppearance => (
      <div key={activeAppearance} style={row}>
        {([16, 28, 32, 48, 56, 64, 72, 96, 128] as const).map(size => (
          <Avatar key={size} active="active" activeAppearance={activeAppearance} name="Katri Athokas" size={size} />
        ))}
      </div>
    ))}

    {appearances.map(activeAppearance => (
      <div key={activeAppearance} style={row}>
        {([28, 48, 64, 96] as const).map(size => (
          <Avatar key={size} active="inactive" activeAppearance={activeAppearance} name="Katri Athokas" size={size} />
        ))}
      </div>
    ))}

    <div style={row}>
      {([32, 64, 96] as const).map(size =>
        (['ring', 'ring-shadow'] as const).map(activeAppearance => (
          <Avatar
            key={`${size}-${activeAppearance}`}
            active="active"
            activeAppearance={activeAppearance}
            name="Katri Athokas"
            shape="square"
            size={size}
          />
        )),
      )}
    </div>

    <div style={row}>
      <Avatar name="Cameron" />
      <Avatar name="Jean Luc Fontaine" />
      <Avatar name="山田 太郎" />
      <Avatar name="555 123 4567" />
    </div>

    <div style={row}>
      <Avatar color="brand" size={48} />
      <Avatar color="dark-red" image={{ src: srcTransparent }} size={48} />
      <Avatar active="active" color="anchor" name="Katri Athokas" size={48} />
      <Avatar shape="square" size={48} />
    </div>
  </div>
);
