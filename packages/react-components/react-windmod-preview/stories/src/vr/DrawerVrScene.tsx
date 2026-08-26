'use client';

// eslint-disable-next-line import/no-extraneous-dependencies -- story-only helper outside the *.stories.tsx devDependencies exemption
import * as React from 'react';

type ProviderLike = React.ComponentType<{ dir?: 'ltr' | 'rtl'; children?: React.ReactNode }>;

type DrawerParts = {
  OverlayDrawer: React.ComponentType<Record<string, unknown>>;
  InlineDrawer: React.ComponentType<Record<string, unknown>>;
  DrawerHeader: React.ComponentType<Record<string, unknown>>;
  DrawerHeaderTitle: React.ComponentType<Record<string, unknown>>;
  DrawerHeaderNavigation: React.ComponentType<Record<string, unknown>>;
  DrawerBody: React.ComponentType<Record<string, unknown>>;
  DrawerFooter: React.ComponentType<Record<string, unknown>>;
  Button: React.ComponentType<Record<string, unknown>>;
};

export type DrawerSize = 'small' | 'medium' | 'large' | 'full';
export type DrawerPosition = 'start' | 'end' | 'bottom';

/* Griffel animates the overlay surface's box-shadow, opacity and transform in, and react-drawer
   authors no box-shadow RULE anywhere — the rest value exists only in that motion end keyframe. The
   VR runner settles immediately after mount, so an uncommitted capture freezes Griffel at t=0 and
   shows a shadowless drawer, which is not what the component looks like. Finishing each animation
   here leaves it `finished` with its declared fill, which is the state the runner's restore branch
   pins inline — measured byte-identical to a 1200 ms rest.
   The sweep is document-wide — Document.getAnimations() already covers every descendant — because
   Griffel portals the surface and the backdrop out of this subtree, so a ref-scoped pass cannot
   reach them. finish() writes no inline style of its own, so the
   ProgressBar hazard (React reconciling a commitStyles() write away) does not apply. It is a no-op
   on the windmod side, which carries no animations.

   A body left at scrollTop 0 reports scroll state `top`, which shows the FOOTER separator and
   leaves the header's hidden. Parking it mid-scroll reports `middle`, the one state where both
   hairlines paint, so a single band covers each rule's pseudo-element, edge and visibility pair. */
const SCROLL_BODY_ID = 'vr-drawer-scroll-body';

const useSceneSettle = (scrollBody = false): void => {
  // eslint-disable-next-line no-restricted-properties -- capture-browser-only fixture; SSR never renders it
  React.useLayoutEffect(() => {
    const settle = () => {
      if (scrollBody) {
        // eslint-disable-next-line @nx/workspace-no-restricted-globals -- capture-browser-only fixture; no provider in scope
        const body = document.getElementById(SCROLL_BODY_ID);
        if (body) {
          body.scrollTop = Math.floor((body.scrollHeight - body.clientHeight) / 2);
        }
      }

      // eslint-disable-next-line @nx/workspace-no-restricted-globals, compat/compat -- capture-browser-only fixture; no provider in scope, and the capture browser is the only engine that runs it
      document.getAnimations().forEach(animation => {
        try {
          animation.finish();
        } catch {
          // A zero-duration or already-finished effect throws; nothing to settle either way.
        }
      });
    };

    settle();
    // The presence components create their effects after the first commit, and the scroll state
    // both libraries publish is rAF-throttled, so the pass runs again on the next frame.
    // eslint-disable-next-line @nx/workspace-no-restricted-globals -- capture-browser-only fixture; no provider in scope
    const handle = requestAnimationFrame(settle);

    // eslint-disable-next-line @nx/workspace-no-restricted-globals -- capture-browser-only fixture; no provider in scope
    return () => cancelAnimationFrame(handle);
  }, [scrollBody]);
};

/* The page must not scroll on either side. The headless scroll lock is unconditional while
   Griffel's is gated on the page actually overflowing, so a scrollable page would put the two
   implementations on different gutters; removing the overflow suppresses both.

   showModal() moves focus into the surface, and measured, both sides land on the SAME element —
   the header navigation's first button — and both match :focus-visible. What differs is only the
   ring MECHANISM: windmod's Button draws on native :focus-visible, Griffel's only on keyborg's
   Tab-only attribute, which programmatic focus never sets. That is a native
   focus-modality delta and it belongs to Button's own scene, not the drawer's, so this rule takes
   it off both sides symmetrically. It reaches only whatever is focused, which is the same element
   in both renders. */
const pageReset = `
  html { overflow: hidden; }
  body { margin: 0; }
  #storybook-root { padding: 0; margin: 0; }

  :focus-visible {
    border-color: transparent !important;
    box-shadow: none !important;
    outline: none !important;
  }
  :focus-visible::after { display: none !important; }
`;

const PageReset = (): React.ReactNode => <style>{pageReset}</style>;

const bodyText = (lines: number): React.ReactNode =>
  Array.from({ length: lines }, (_, index) => <p key={index}>Drawer body paragraph {index + 1}</p>);

type ContentProps = DrawerParts & { lines: number; withAction: boolean; sparse?: boolean; bodyId?: string };

/* One content tree for every band: header (navigation + title + action), body, footer.
   The sparse shape is a title and nothing else — it is the only shape that renders the heading's
   without-action grid placement, which react-dialog's DialogTitle applies whenever the title has
   no action sibling. */
const DrawerContent = ({
  DrawerHeader,
  DrawerHeaderTitle,
  DrawerHeaderNavigation,
  DrawerBody,
  DrawerFooter,
  Button,
  lines,
  withAction,
  sparse,
  bodyId,
}: ContentProps): React.ReactNode => {
  if (sparse) {
    return (
      <DrawerHeader>
        <DrawerHeaderTitle>Drawer title</DrawerHeaderTitle>
      </DrawerHeader>
    );
  }

  return (
    <>
      <DrawerHeader>
        <DrawerHeaderNavigation aria-label="Drawer navigation">
          <Button appearance="subtle">Back</Button>
        </DrawerHeaderNavigation>
        <DrawerHeaderTitle action={withAction ? <Button appearance="subtle">Close</Button> : undefined}>
          Drawer title
        </DrawerHeaderTitle>
      </DrawerHeader>
      <DrawerBody id={bodyId}>{bodyText(lines)}</DrawerBody>
      <DrawerFooter>
        <Button appearance="primary">Save</Button>
        <Button>Cancel</Button>
      </DrawerFooter>
    </>
  );
};

export type OverlayBandProps = DrawerParts & {
  position?: DrawerPosition;
  size?: DrawerSize;
  lines?: number;
  withAction?: boolean;
  scrollBody?: boolean;
};

/** One overlay drawer, captured against the whole viewport — every promoted surface paints a
 *  full-viewport backdrop, so overlay cells cannot share a capture. */
export const DrawerOverlayVrBand = ({
  position = 'start',
  size = 'small',
  lines = 3,
  withAction = true,
  scrollBody = false,
  ...parts
}: OverlayBandProps): React.ReactNode => {
  const { OverlayDrawer } = parts;

  useSceneSettle(scrollBody);

  return (
    <>
      <PageReset />
      <OverlayDrawer open position={position} size={size}>
        <DrawerContent
          {...parts}
          lines={lines}
          withAction={withAction}
          bodyId={scrollBody ? SCROLL_BODY_ID : undefined}
        />
      </OverlayDrawer>
    </>
  );
};

const inlineFrame: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'flex-start',
  gap: 16,
  padding: 16,
  background: '#ffffff',
};
/* Taller than the largest drawer any cell renders (`bottom` at `small` is 320px): a cell that
   overflowed its frame would overlap the next row, and the drawer parts carry z-index, so which
   implementation painted on top would decide the capture instead of the styles under test. */
const cellFrame: React.CSSProperties = { height: 360, display: 'flex' };

const inlineCells: { position: DrawerPosition; size: DrawerSize; separator: boolean; sparse?: boolean }[] = [
  { position: 'start', size: 'small', separator: false },
  { position: 'start', size: 'small', separator: true },
  { position: 'end', size: 'small', separator: false },
  { position: 'end', size: 'small', separator: true },
  { position: 'bottom', size: 'small', separator: false },
  { position: 'bottom', size: 'small', separator: true },
  { position: 'start', size: 'medium', separator: false },
  { position: 'start', size: 'large', separator: false },
  { position: 'start', size: 'full', separator: false },
  { position: 'bottom', size: 'full', separator: false },
  { position: 'start', size: 'small', separator: false, sparse: true },
];

const rtlCells: typeof inlineCells = [
  { position: 'start', size: 'small', separator: false },
  { position: 'start', size: 'small', separator: true },
  { position: 'end', size: 'small', separator: true },
];

/** The inline drawer is never promoted and paints no backdrop, so its whole matrix grids into one
 *  root capture. The last row repeats the direction-sensitive cells under an RTL provider, which is
 *  where the logical position properties differ from Griffel's build-time-flipped physical ones. */
export const DrawerInlineVrScene = ({
  Provider,
  ...parts
}: DrawerParts & { Provider: ProviderLike }): React.ReactNode => {
  const { InlineDrawer } = parts;

  useSceneSettle();

  const cell = ({ position, size, separator, sparse }: (typeof inlineCells)[number]) => (
    <div key={`${position}-${size}-${separator}-${sparse}`} style={cellFrame}>
      <InlineDrawer open position={position} size={size} separator={separator}>
        <DrawerContent {...parts} lines={1} withAction sparse={sparse} />
      </InlineDrawer>
    </div>
  );

  return (
    <>
      <PageReset />
      <div style={inlineFrame}>{inlineCells.map(cell)}</div>
      <Provider dir="rtl">
        <div style={inlineFrame}>{rtlCells.map(cell)}</div>
      </Provider>
    </>
  );
};
