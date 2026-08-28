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

type SurfaceLike = React.ComponentType<{
  popover?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}>;

type HeaderLike = React.ComponentType<{ children?: React.ReactNode }>;

type TitleLike = React.ComponentType<{ children?: React.ReactNode }>;

type BodyLike = React.ComponentType<{ children?: React.ReactNode }>;

type CarouselLike = React.ComponentType<{ value?: string; children: React.ReactNode }>;

type CardLike = React.ComponentType<{ value: string; children?: React.ReactNode }>;

type CarouselFooterLike = React.ComponentType<Record<string, unknown>>;

type NavLike = React.ComponentType<{ children: (value: string) => React.ReactNode }>;

type NavButtonLike = React.ComponentType<{ 'aria-label'?: string }>;

type PageCountLike = React.ComponentType<{ children: (current: number, total: number) => React.ReactNode }>;

/** See TeachingPopoverVrScene: the surface floors at 320px and the trigger is pinned wider than it,
 *  so every surface stays centred rather than being classified as aligned. */
const TRIGGER_WIDTH = 360;

/**
 * The surface width is pinned for the same reason the trigger width is, one level down. This
 * family's footer sizes the surface from its own text, which lands on a fractional width; the two
 * libraries then place that surface by different mechanisms — a fixed top-layer box keeps the
 * fraction, an absolutely positioned box carries an integer transform — and the surfaces come to
 * rest a third of a pixel apart. An integer width removes the fraction for both sides at once.
 * It stays well inside the trigger so the placement is still classified as centred.
 *
 * The trigger label is the cell index for the same reason: the surface's top shadow falls across
 * the trigger, so a label whose glyph run differs in length between two scenes lands that gradient
 * on a different subpixel phase. A single centred digit is identical in every cell of every scene.
 */
const SURFACE_WIDTH = 336;

/**
 * The trigger is a bare element rather than either library's Button. The surface's top shadow falls
 * across it, so any rasterisation difference between the two Buttons would be composited under that
 * gradient and counted against this family; Button has its own scenes for that. An identical bare
 * trigger on both sides leaves the carousel as the only thing the diff can be reading.
 */
const TRIGGER_STYLE: React.CSSProperties = {
  width: TRIGGER_WIDTH,
  height: 32,
  boxSizing: 'border-box',
  margin: 0,
  padding: 0,
  border: '1px solid #d1d1d1',
  borderRadius: 4,
  background: '#fff',
  font: '600 14px/20px "Segoe UI", sans-serif',
  color: '#242424',
};

const PAGES = ['1', '2', '3'];

export type CarouselCell = {
  label: string;
  value: string;
  layout?: string;
};

export const neutralCells: CarouselCell[] = [
  { label: 'page 1', value: '1' },
  { label: 'page 2', value: '2' },
  { label: 'page 3', value: '3' },
  { label: 'page 2 offset', value: '2', layout: 'offset' },
];

export const rtlCells: CarouselCell[] = [
  { label: 'page 1', value: '1' },
  { label: 'page 1 offset', value: '1', layout: 'offset' },
  { label: 'page 2', value: '2' },
  { label: 'page 2 offset', value: '2', layout: 'offset' },
];

export const TeachingPopoverCarouselVrScene = ({
  TeachingPopover,
  TeachingPopoverTrigger,
  TeachingPopoverSurface,
  TeachingPopoverHeader,
  TeachingPopoverTitle,
  TeachingPopoverBody,
  TeachingPopoverCarousel,
  TeachingPopoverCarouselCard,
  TeachingPopoverCarouselFooter,
  TeachingPopoverCarouselNav,
  TeachingPopoverCarouselNavButton,
  TeachingPopoverCarouselPageCount,
  surfaceProps,
  footerProps,
  cells = neutralCells,
  appearance,
}: {
  TeachingPopover: TeachingPopoverLike;
  TeachingPopoverTrigger: TriggerLike;
  TeachingPopoverSurface: SurfaceLike;
  TeachingPopoverHeader: HeaderLike;
  TeachingPopoverTitle: TitleLike;
  TeachingPopoverBody: BodyLike;
  TeachingPopoverCarousel: CarouselLike;
  TeachingPopoverCarouselCard: CardLike;
  TeachingPopoverCarouselFooter: CarouselFooterLike;
  TeachingPopoverCarouselNav: NavLike;
  TeachingPopoverCarouselNavButton: NavButtonLike;
  TeachingPopoverCarouselPageCount: PageCountLike;
  surfaceProps: { popover?: string };
  // The reference's footer requires two text props the headless surface dropped, and takes its two
  // buttons as string shorthands where windmod takes the text on each slot. One bag per side.
  footerProps: Record<string, unknown>;
  cells?: CarouselCell[];
  appearance?: string;
}): React.ReactNode => (
  <>
    {/* See TeachingPopoverVrScene: a rest-appearance scene suppresses the focus ring on BOTH sides,
        with an unqualified selector rather than a windmod-only one. The width pin below is applied
        the same way and for the reason SURFACE_WIDTH documents; it names both libraries' surfaces so
        neither side is treated differently. */}
    <style>{`
      :focus-visible { outline: none; }
      [data-popover-surface], .fui-TeachingPopoverSurface { width: ${SURFACE_WIDTH}px !important; }
    `}</style>
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
      {cells.map(({ label, value, layout }, index) => (
        <TeachingPopover key={label} open trapFocus={false} positioning="below" {...(appearance ? { appearance } : {})}>
          <TeachingPopoverTrigger>
            <button style={TRIGGER_STYLE}>{index + 1}</button>
          </TeachingPopoverTrigger>
          <TeachingPopoverSurface {...surfaceProps}>
            <TeachingPopoverHeader>Getting started</TeachingPopoverHeader>
            <TeachingPopoverCarousel value={value}>
              {PAGES.map(page => (
                <TeachingPopoverCarouselCard key={page} value={page}>
                  <TeachingPopoverBody>
                    <TeachingPopoverTitle>Tip {page}</TeachingPopoverTitle>
                    <span>Body copy for page {page}.</span>
                  </TeachingPopoverBody>
                </TeachingPopoverCarouselCard>
              ))}
              <TeachingPopoverCarouselFooter {...footerProps} {...(layout ? { layout } : {})}>
                <TeachingPopoverCarouselNav>
                  {page => <TeachingPopoverCarouselNavButton aria-label={`Tip ${page}`} />}
                </TeachingPopoverCarouselNav>
                <TeachingPopoverCarouselPageCount>
                  {(current, total) => `${current} of ${total}`}
                </TeachingPopoverCarouselPageCount>
              </TeachingPopoverCarouselFooter>
            </TeachingPopoverCarousel>
          </TeachingPopoverSurface>
        </TeachingPopover>
      ))}
    </div>
  </>
);
