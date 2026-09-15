// eslint-disable-next-line import/no-extraneous-dependencies -- story-only helper outside the *.stories.tsx devDependencies exemption
import * as React from 'react';

type DialogLike = React.ComponentType<{
  open?: boolean;
  modalType?: string;
  children: React.ReactNode;
}>;

type SurfaceLike = React.ComponentType<{ style?: React.CSSProperties; children: React.ReactNode }>;

type TitleLike = React.ComponentType<{ action?: null; children: React.ReactNode }>;

type SlotLike = React.ComponentType<{ children: React.ReactNode }>;

type ActionsLike = React.ComponentType<{ position?: string; children: React.ReactNode }>;

type ButtonLike = React.ComponentType<{
  appearance?: string;
  ref?: React.Ref<HTMLButtonElement>;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}>;

/**
 * Stamps the real `autofocus` ATTRIBUTE, which React's `autoFocus` prop does not render — it calls
 * `focus()` during commit instead, and `showModal()` then re-runs the dialog focusing steps and
 * overrides it. A ref callback attaches before the surface's own layout effect opens the dialog,
 * so the attribute is in the DOM in time for those steps to honour it.
 */
const autofocus = (element: HTMLButtonElement | null) => element?.setAttribute('autofocus', '');

export type DialogVrBand = 'modal' | 'alert' | 'non-modal' | 'scroll';

/**
 * The two anatomies differ, so the scene names roles rather than components. Griffel nests
 * `DialogSurface > DialogBody > (DialogTitle, DialogContent, DialogActions)`, where DialogBody is
 * the grid and DialogContent the scroller. The headless family ships no grid-container member and
 * documents DialogBody as the scroller, so windmod merges the grid onto the surface: `Grid` is a
 * fragment on that side, and `Scroller` is its DialogBody.
 */
type Parts = {
  Dialog: DialogLike;
  DialogSurface: SurfaceLike;
  /** Griffel's DialogBody; a fragment on the windmod side, whose surface carries the grid. */
  Grid: SlotLike;
  DialogTitle: TitleLike;
  /** Griffel's DialogContent; windmod's DialogBody. */
  Scroller: SlotLike;
  DialogActions: ActionsLike;
  Button: ButtonLike;
  /** Only windmod has one; Griffel's anatomy has no header member, so its title renders bare. */
  DialogHeader?: SlotLike;
  /** Griffel renders a default close glyph on non-modal titles; the headless title has no slot
   * for one, so the comparison removes it rather than inventing an API. */
  titleProps: { action?: null };
};

/**
 * Every promoted <dialog> centres itself: showModal() and showPopover() both resolve the
 * user-agent `inset: 0; margin: auto`, and Griffel reproduces the same auto-margin centring on its
 * portaled div. A grid of cells is therefore impossible — N surfaces would stack on one centre —
 * so coverage comes from bands captured as separate scene entries, one dialog per frame.
 *
 * The non-modal band is the exception: it paints no backdrop on either side, so two surfaces can
 * share a frame by anchoring to opposite block edges. Only the BLOCK axis is overridden. The
 * inline axis keeps `inset-inline: 0` and `margin-inline: auto`, because that is the axis the
 * surface's own width resolves against — the sparse cell exists to prove `width: auto` fills and
 * clamps where the user-agent `width: fit-content` would shrink, and pinning the inline axis would
 * hide exactly that.
 */
const TOP_ANCHORED: React.CSSProperties = {
  insetBlockStart: 0,
  insetBlockEnd: 'auto',
  marginBlockStart: 40,
  marginBlockEnd: 0,
};

const BOTTOM_ANCHORED: React.CSSProperties = {
  insetBlockStart: 'auto',
  insetBlockEnd: 0,
  marginBlockStart: 0,
  marginBlockEnd: 40,
};

/** Deterministic wrapping: the same text at the same 550px content width on both sides. */
const BODY_TEXT =
  'A dialog interrupts the page to communicate a message or ask for a decision. This paragraph is ' +
  'fixed so both libraries wrap it at the same 550px content width, over the same number of lines.';

const SCROLL_TEXT = Array.from({ length: 24 }, (_, index) => `Scrolling paragraph ${index + 1}. ${BODY_TEXT}`);

/** Narrow, deliberately unsaturating content — the width axis the sparse cell exists to measure. */
const SPARSE_LINES = Array.from({ length: 7 }, (_, index) => `Line ${index + 1}`);

const Title = ({ DialogHeader, DialogTitle, titleProps, children }: Parts & { children: React.ReactNode }) => {
  const title = <DialogTitle {...titleProps}>{children}</DialogTitle>;

  return DialogHeader ? <DialogHeader>{title}</DialogHeader> : title;
};

const Actions = ({ Button, DialogActions, position }: Parts & { position?: string }) => (
  <DialogActions position={position}>
    {/* Both libraries' focus mechanics resolve to this same control: tabster's findFirstFocusable
        picks the first Button, and the dialog focusing steps honour autofocus ahead of the first
        focusable descendant — which, once the body actually scrolls, is the body itself, because
        Chromium makes a scroll container keyboard-focusable. */}
    <Button ref={autofocus} style={{ width: 120 }}>
      Close
    </Button>
    <Button appearance="primary" style={{ width: 120 }}>
      Confirm
    </Button>
  </DialogActions>
);

export const DialogVrScene = (props: Parts & { band: DialogVrBand }): React.ReactNode => {
  const { Dialog, DialogSurface, Grid, Scroller, band } = props;

  return (
    <>
      {/* Two neutralisations, each applied to whichever side it matches.

          The page is made non-overflowing so the two scroll locks cannot disagree. Both reserve a
          gutter, but they gate on different things: Griffel's useDisableBodyScroll returns early
          unless the body's BOX is taller than the viewport, while the headless lock reserves only
          when the scrollbar is actually taking layout WIDTH. Either one engaging on its own slides
          every centred element by half a scrollbar width and dominates the frame, so the scene has
          to put both predicates out of reach rather than just one. A genuinely non-overflowing page
          does that: measured on all four bands, the body's box is 128px against a 720px viewport
          and the scrollbar's layout width is 0, so neither lock reserves anything and neither side
          has a gutter. Griffel's predicate is the harder of the two — it reads the body's own
          height, not scrollbar visibility, so `overflow: hidden` alone would not clear it, which is
          why the white ground is painted by a FIXED element that contributes no height.

          The second block matches only the windmod side, because only its surface is a real
          <dialog>. Griffel's focus ring is keyborg-gated and paints nothing on a programmatic
          dialog focus, while windmod's is the native :focus-visible; both sides focus the SAME
          control, and this restores that control's resting look so the frame compares the surface
          rather than the platform's focus modality. The knobs are the focus utilities' own
          documented override points. */}
      <style>{`
        html, body { margin: 0; padding: 0; overflow: hidden; }
        #storybook-root { padding: 0; margin: 0; }
        .sb-show-main { padding: 0; }
        dialog:focus-visible, dialog :focus-visible {
          outline: none;
          --fui-focus-ring-color: var(--color-neutral-stroke-1);
          --fui-focus-ring-inset-width: 0px;
          --fui-focus-outline-width: 0px;
        }
      `}</style>

      {/* Fixed, so it paints the frame white without adding a single pixel to the body's box. */}
      <div style={{ position: 'fixed', inset: 0, background: '#fff' }} />

      {band === 'non-modal' ? (
        <>
          <Dialog open modalType="non-modal">
            <DialogSurface style={TOP_ANCHORED}>
              <Grid>
                <Title {...props}>Non-modal dialog</Title>
                <Scroller>
                  <p>{BODY_TEXT}</p>
                </Scroller>
                <Actions {...props} />
              </Grid>
            </DialogSurface>
          </Dialog>

          {/* The sparse cell itself — see the band comment above for what it measures. Its content
              saturates neither grid column, so the surface's own width is the only thing deciding
              its box, and an unneutralised `fit-content` would shrink it to ~150px. */}
          <Dialog open modalType="non-modal">
            <DialogSurface style={BOTTOM_ANCHORED}>
              <Grid>
                <Title {...props}>Sparse</Title>
                <Scroller>
                  {SPARSE_LINES.map(line => (
                    <div key={line} style={{ width: 90 }}>
                      {line}
                    </div>
                  ))}
                </Scroller>
              </Grid>
            </DialogSurface>
          </Dialog>
        </>
      ) : (
        <Dialog open modalType={band === 'scroll' ? 'modal' : band}>
          <DialogSurface>
            <Grid>
              <Title {...props}>{band === 'scroll' ? 'Scrolling dialog' : 'Dialog title'}</Title>
              <Scroller>
                {(band === 'scroll' ? SCROLL_TEXT : [BODY_TEXT, BODY_TEXT]).map((text, index) => (
                  <p key={index}>{text}</p>
                ))}
              </Scroller>
              <Actions {...props} position={band === 'alert' ? 'start' : undefined} />
            </Grid>
          </DialogSurface>
        </Dialog>
      )}
    </>
  );
};
