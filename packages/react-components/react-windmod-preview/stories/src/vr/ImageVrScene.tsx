// eslint-disable-next-line import/no-extraneous-dependencies -- story-only helper outside the *.stories.tsx devDependencies exemption
import * as React from 'react';

/* Explicit width/height on the svg root are required: without them the element has no intrinsic
   size and an img falls back to 300x150, which silently defeats every object-fit: none cell.
   encodeURIComponent is required too — the `#` of a hex colour is not a literal in a data URI. */
const svg = (w: number, h: number) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">` +
      `<rect width="${w}" height="${h}" fill="#e8ecfb"/>` +
      `<rect x="0" y="0" width="${w / 4}" height="${h / 4}" fill="#c50f1f"/>` +
      `<rect x="${(w * 3) / 4}" y="${(h * 3) / 4}" width="${w / 4}" height="${h / 4}" fill="#107c10"/>` +
      `</svg>`,
  )}`;

const srcWide = svg(100, 20);
const srcTall = svg(20, 100);
const srcSmall = svg(32, 20);

export const sources = [srcWide, srcTall, srcSmall];

/** run.mjs screenshots two frames after mount without waiting for images; rendering nothing
    until every source has decoded makes that wait unnecessary. The probe element shares the
    document's image cache with the rendered ones, so they paint on their first layout. */
export const useImageSourcesDecoded = (): boolean => {
  const [decoded, setDecoded] = React.useState(false);

  React.useEffect(() => {
    let cancelled = false;

    Promise.all(
      sources.map(src => {
        // `Image` is the component under test in both story files — never `new Image()`.
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

const fits = ['default', 'none', 'center', 'contain', 'cover'] as const;
const shapes = ['square', 'circular', 'rounded'] as const;

type ImageLike = React.ComponentType<{
  src: string;
  alt: string;
  block?: boolean;
  bordered?: boolean;
  fit?: (typeof fits)[number];
  shadow?: boolean;
  shape?: (typeof shapes)[number];
  width?: number;
  height?: number;
}>;

/* FluentProvider inherits body1 typography onto its subtree while ThemeProvider inherits
   nothing; an inline-block img sits on a line-box baseline, so the strut would shift the
   Griffel side. Pinning font-size and line-height to 0 removes the strut and collapses the
   whitespace the inline-block adjacency row depends on. */
const frame: React.CSSProperties = {
  display: 'inline-flex',
  flexDirection: 'column',
  gap: 24,
  padding: 24,
  background: '#ffffff',
  fontSize: 0,
  lineHeight: 0,
  textAlign: 'left',
};

const cell: React.CSSProperties = { width: 120, height: 80, overflow: 'hidden' };
const row: React.CSSProperties = { display: 'flex', gap: 24 };
const looseRow: React.CSSProperties = { display: 'flex', gap: 32, alignItems: 'flex-start' };

/** One scene, two implementations — the VR runner diffs the renders pixel for pixel. */
export const ImageVrScene = ({ Image }: { Image: ImageLike }): React.ReactNode => (
  <div style={frame}>
    {sources.map(src => (
      <div key={src} style={row}>
        {fits.map(fit => (
          <div key={fit} style={cell}>
            <Image alt="" src={src} fit={fit} />
          </div>
        ))}
      </div>
    ))}

    <div style={row}>
      <div style={cell}>
        <Image alt="" src={srcWide} fit="cover" />
      </div>
      <div style={cell}>
        <Image alt="" src={srcWide} fit="cover" width={60} />
      </div>
      <div style={cell}>
        <Image alt="" src={srcWide} fit="cover" height={40} />
      </div>
      <div style={cell}>
        <Image alt="" src={srcWide} fit="cover" width={60} height={40} />
      </div>
    </div>

    <div style={looseRow}>
      {shapes.map(shape => (
        <React.Fragment key={shape}>
          <Image alt="" src={srcSmall} shape={shape} width={64} height={64} />
          <Image alt="" src={srcSmall} shape={shape} bordered width={64} height={64} />
        </React.Fragment>
      ))}
    </div>

    <div style={looseRow}>
      <Image alt="" src={srcSmall} shadow width={64} height={64} />
      <Image alt="" src={srcSmall} shadow bordered width={64} height={64} />
      <Image alt="" src={srcSmall} shadow shape="circular" width={64} height={64} />
    </div>

    <div style={looseRow}>
      <div style={{ width: 200 }}>
        <Image alt="" src={srcWide} block />
      </div>
      <div style={{ width: 200, height: 80 }}>
        <Image alt="" src={srcWide} block fit="cover" />
      </div>
    </div>

    {/* The only place display: inline-block is observable; the two images must be adjacent
        with no whitespace text node between them. */}
    <div>
      <Image alt="" src={srcSmall} width={48} height={48} />
      <Image alt="" src={srcSmall} width={48} height={48} />
    </div>

    <div style={cell}>
      <Image alt="" src={srcTall} bordered shadow shape="circular" fit="cover" />
    </div>
  </div>
);
