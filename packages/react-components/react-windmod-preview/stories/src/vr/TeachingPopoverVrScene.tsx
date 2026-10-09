// eslint-disable-next-line import/no-extraneous-dependencies -- story-only helper outside the *.stories.tsx devDependencies exemption
import * as React from 'react';

type TeachingPopoverLike = React.ComponentType<{
  open?: boolean;
  appearance?: string;
  trapFocus?: boolean;
  positioning?: string;
  children: React.ReactNode;
}>;

type TriggerLike = React.ComponentType<{ children: React.ReactElement }>;

type SurfaceLike = React.ComponentType<{ popover?: string; children: React.ReactNode }>;

type HeaderLike = React.ComponentType<{ children?: React.ReactNode }>;

type TitleLike = React.ComponentType<{ children?: React.ReactNode }>;

type BodyLike = React.ComponentType<{
  mediaLength?: string;
  media?: { style?: React.CSSProperties };
  children?: React.ReactNode;
}>;

type FooterLike = React.ComponentType<{
  footerLayout?: string;
  primary?: { children?: React.ReactNode };
  secondary?: { children?: React.ReactNode };
}>;

type ButtonLike = React.ComponentType<{ style?: React.CSSProperties; children?: React.ReactNode }>;

/**
 * The surface floors at 320px, so the trigger is pinned WIDER than that: the headless placement
 * observer classifies alignment with a 2px tolerance, and a surface whose edge lands within 2px of
 * the trigger's is reported as `-start`/`-end` rather than centred. An even integer width keeps
 * every centred surface on a whole-pixel x on both sides.
 */
const TRIGGER_WIDTH = 360;

/** A flat fill rather than a remote image: the runner awaits `images.decode()` and a network fetch
 *  is not deterministic. */
const MEDIA_FILL: React.CSSProperties = { backgroundColor: '#0f6cbd' };

type Cell = {
  label: string;
  appearance?: string;
  media?: boolean;
  footerLayout?: string;
};

/**
 * Four cells in a 2 × 2 grid. Each trigger sits at the top of its cell and every surface places
 * BELOW it, so a full-anatomy surface has its whole height of clearance inside the row.
 */
const cells: Cell[] = [
  { label: 'neutral' },
  { label: 'media', media: true },
  { label: 'brand', appearance: 'brand' },
  { label: 'vertical footer', footerLayout: 'vertical' },
];

export const TeachingPopoverVrScene = ({
  TeachingPopover,
  TeachingPopoverTrigger,
  TeachingPopoverSurface,
  TeachingPopoverHeader,
  TeachingPopoverTitle,
  TeachingPopoverBody,
  TeachingPopoverFooter,
  Button,
  surfaceProps,
}: {
  TeachingPopover: TeachingPopoverLike;
  TeachingPopoverTrigger: TriggerLike;
  TeachingPopoverSurface: SurfaceLike;
  TeachingPopoverHeader: HeaderLike;
  TeachingPopoverTitle: TitleLike;
  TeachingPopoverBody: BodyLike;
  TeachingPopoverFooter: FooterLike;
  Button: ButtonLike;
  surfaceProps: { popover?: string };
}): React.ReactNode => (
  <>
    {/* The last surface to open holds focus — here on its dismiss button, not the surface itself —
        and with no prior user interaction the browser resolves :focus-visible to true on it. The
        two libraries then paint different rings for the same reason CONTEXT already accepts as a
        native delta: windmod's ring is keyed on :focus-visible and Griffel's on keyborg's Tab-only
        attribute, so Griffel falls back to the user-agent outline. This is a REST-appearance scene,
        so the ring is suppressed on BOTH sides — an unqualified selector, never a windmod-only one,
        which would inject an asymmetry of its own. */}
    <style>{`:focus-visible { outline: none; }`}</style>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gridTemplateRows: 'repeat(2, 360px)',
        alignItems: 'start',
        justifyItems: 'center',
        paddingTop: 10,
        background: '#fff',
        width: 1280,
        height: 720,
        boxSizing: 'border-box',
      }}
    >
      {cells.map(({ label, media, footerLayout, ...look }) => (
        // Only DEFINED look props are spread — Griffel applies its own defaults by object spread,
        // so an explicit `undefined` overwrites the default (see PopoverVrScene).
        // trapFocus is pinned off on BOTH sides: Griffel's TeachingPopover defaults it ON, which
        // paints nothing but would run four focus traps against each other in one page.
        <TeachingPopover key={label} open trapFocus={false} positioning="below" {...look}>
          <TeachingPopoverTrigger>
            <Button style={{ width: TRIGGER_WIDTH }}>{label}</Button>
          </TeachingPopoverTrigger>
          <TeachingPopoverSurface {...surfaceProps}>
            <TeachingPopoverHeader>Getting started</TeachingPopoverHeader>
            <TeachingPopoverTitle>{label}</TeachingPopoverTitle>
            <TeachingPopoverBody {...(media ? { mediaLength: 'short', media: { style: MEDIA_FILL } } : {})}>
              <span>Body copy for the {label} cell.</span>
            </TeachingPopoverBody>
            <TeachingPopoverFooter
              {...(footerLayout ? { footerLayout } : {})}
              primary={{ children: 'Next' }}
              secondary={{ children: 'Back' }}
            />
          </TeachingPopoverSurface>
        </TeachingPopover>
      ))}
    </div>
  </>
);
