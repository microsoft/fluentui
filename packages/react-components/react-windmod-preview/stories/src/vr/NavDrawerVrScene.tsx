'use client';

// eslint-disable-next-line import/no-extraneous-dependencies -- story-only helper outside the *.stories.tsx devDependencies exemption
import * as React from 'react';

type ProviderLike = React.ComponentType<{ dir?: 'ltr' | 'rtl'; children?: React.ReactNode }>;

type NavDrawerParts = {
  NavDrawer: React.ComponentType<Record<string, unknown>>;
  NavDrawerHeader: React.ComponentType<Record<string, unknown>>;
  NavDrawerBody: React.ComponentType<Record<string, unknown>>;
  NavDrawerFooter: React.ComponentType<Record<string, unknown>>;
  NavItem: React.ComponentType<Record<string, unknown>>;
  Button: React.ComponentType<Record<string, unknown>>;
};

export type NavDrawerSize = 'small' | 'medium' | 'large' | 'full';

/* Settle and page-reset mechanics are DrawerVrScene.tsx's — see that file for why each step
   exists. They are reproduced rather than imported so this cycle leaves every shipped drawer
   scene byte-untouched. */
const SCROLL_BODY_ID = 'vr-nav-drawer-scroll-body';

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
    // eslint-disable-next-line @nx/workspace-no-restricted-globals -- capture-browser-only fixture; no provider in scope
    const handle = requestAnimationFrame(settle);

    // eslint-disable-next-line @nx/workspace-no-restricted-globals -- capture-browser-only fixture; no provider in scope
    return () => cancelAnimationFrame(handle);
  }, [scrollBody]);
};

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

const destinations = ['Home', 'Documents', 'Settings'];

type CellSpec = {
  id: string;
  header?: boolean;
  footer?: boolean;
  footerRows?: number;
  size?: NavDrawerSize;
  density?: 'small' | 'medium';
  bare?: boolean;
};

/* Every Drawer part stretches itself (`self-stretch` / `w-full`), so the drawer's own
   `align-items` never reaches one. A classless child takes the container's value instead, which is
   the only arrangement in which the root's alignment is observable at all. */
const bareChild: React.CSSProperties = { background: '#c8c8c8', padding: 8 };

/* (b) is the flagged cell: a body that is BOTH first and last child is the only shape in which
   DrawerBody's edge rules own the block padding, and the only detector of an l2 module that
   authors one. */
const inlineCells: CellSpec[] = [
  { id: 'a-full', header: true, footer: true },
  { id: 'b-body-only' },
  { id: 'c-header-body', header: true },
  { id: 'd-body-footer', footer: true },
  { id: 'e-size-medium', header: true, footer: true, size: 'medium' },
  { id: 'f-density-small', header: true, footer: true, density: 'small' },
  { id: 'g-footer-rows', header: true, footer: true, footerRows: 2 },
  { id: 'h-bare-child', header: true, bare: true },
];

const rtlCells: CellSpec[] = [
  { id: 'a-full', header: true, footer: true },
  { id: 'b-body-only' },
  { id: 'e-size-medium', header: true, footer: true, size: 'medium' },
];

const inlineFrame: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'flex-start',
  gap: 16,
  padding: 16,
  background: '#ffffff',
};

/* Taller than any cell's content so a cell never overflows into the next row: the drawer parts
   carry z-index, so an overlap would decide the capture instead of the styles under test. */
const cellFrame: React.CSSProperties = { height: 360, display: 'flex' };

const NavDrawerContent = ({
  NavDrawerHeader,
  NavDrawerBody,
  NavDrawerFooter,
  NavItem,
  Button,
  spec,
  lines,
  bodyId,
}: Omit<NavDrawerParts, 'NavDrawer'> & { spec: CellSpec; lines?: number; bodyId?: string }): React.ReactNode => (
  <>
    {spec.header && (
      <NavDrawerHeader>
        <Button appearance="subtle">Menu</Button>
      </NavDrawerHeader>
    )}
    {spec.bare && <div style={bareChild}>Bare child</div>}
    <NavDrawerBody id={bodyId}>
      {Array.from({ length: lines ?? destinations.length }, (_, index) => (
        <NavItem key={index} value={String(index + 1)}>
          {destinations[index % destinations.length]}
        </NavItem>
      ))}
    </NavDrawerBody>
    {spec.footer && (
      <NavDrawerFooter>
        {Array.from({ length: spec.footerRows ?? 1 }, (_, index) => (
          <Button key={index}>Action {index + 1}</Button>
        ))}
      </NavDrawerFooter>
    )}
  </>
);

/** Every inline cell shares one root capture — an inline drawer is never promoted and paints no
 *  backdrop. The RTL block below repeats the direction-sensitive cells. */
export const NavDrawerInlineVrScene = ({
  Provider,
  NavDrawer,
  ...parts
}: NavDrawerParts & { Provider: ProviderLike }): React.ReactNode => {
  useSceneSettle();

  const cell = (spec: CellSpec) => (
    <div key={spec.id} style={cellFrame}>
      <NavDrawer type="inline" open size={spec.size} density={spec.density}>
        <NavDrawerContent {...parts} spec={spec} />
      </NavDrawer>
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

/** One overlay nav drawer, captured against the whole viewport — a promoted surface paints a
 *  full-viewport backdrop. The body is parked mid-scroll, the one state in which both separator
 *  hairlines paint. */
export const NavDrawerOverlayVrBand = ({ NavDrawer, ...parts }: NavDrawerParts): React.ReactNode => {
  useSceneSettle(true);

  return (
    <>
      <PageReset />
      <NavDrawer open position="start">
        <NavDrawerContent
          {...parts}
          spec={{ id: 'overlay', header: true, footer: true }}
          lines={40}
          bodyId={SCROLL_BODY_ID}
        />
      </NavDrawer>
    </>
  );
};
