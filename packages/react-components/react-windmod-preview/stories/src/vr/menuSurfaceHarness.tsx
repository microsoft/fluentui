'use client';

// eslint-disable-next-line import/no-extraneous-dependencies -- story-only helper outside the *.stories.tsx devDependencies exemption
import * as React from 'react';

export type MenuLike = React.ComponentType<{ open?: boolean; children: React.ReactNode }>;
export type MenuTriggerLike = React.ComponentType<{ children: React.ReactElement }>;
export type MenuPopoverLike = React.ComponentType<{ popover?: string; children: React.ReactNode }>;
export type MenuListLike = React.ComponentType<{
  hasIcons?: boolean;
  hasCheckmarks?: boolean;
  checkedValues?: Record<string, string[]>;
  children: React.ReactNode;
}>;
export type MenuItemLike = React.ComponentType<{
  icon?: React.ReactNode;
  secondaryContent?: React.ReactNode;
  subText?: React.ReactNode;
  disabled?: boolean;
  hasSubmenu?: boolean;
  children?: React.ReactNode;
}>;
export type SelectableItemLike = React.ComponentType<{
  name: string;
  value: string;
  icon?: React.ReactNode;
  secondaryContent?: React.ReactNode;
  subText?: React.ReactNode;
  disabled?: boolean;
  children?: React.ReactNode;
}>;
export type LinkItemLike = React.ComponentType<{
  href: string;
  icon?: React.ReactNode;
  secondaryContent?: React.ReactNode;
  disabled?: boolean;
  children?: React.ReactNode;
}>;
export type PlainLike = React.ComponentType<{ children?: React.ReactNode }>;
export type ButtonLike = React.ComponentType<{ style?: React.CSSProperties; children?: React.ReactNode }>;

/**
 * Triggers are pinned to an EVEN integer width, wider than every surface, and the grid's columns
 * are integral: a half-pixel shift moves every pixel of the 16px shadow, which a strict-zero gate
 * counts in full.
 */
export const TRIGGER_WIDTH = 200;

/**
 * Frame budget for the focus handoff. The blur has to follow any autofocus and the assertion has
 * to follow the blur; each step gets its own slot so the ordering is explicit rather than emergent.
 */
const FRAME_BLUR = 5;
const FRAME_ASSERT = 8;

/**
 * Scene rule 3 applies to a SUBMENU's anchor too, not just to the outer triggers: a submenu is
 * anchored to a MenuItem, and a content-sized item resolves to a fractional width (135.19px
 * measured), so CSS anchor positioning lands the submenu on the true fractional edge while
 * floating-ui rounds to the integer — a 0.19px offset that re-rasterises every glyph inside.
 * Pinning the label to an integer width makes both engines agree. The widths are also chosen so
 * the widest surface (icon + label + shortcut + gaps + padding = 190px) stays NARROWER than the
 * 200px trigger, which is scene rule 3 proper.
 */
export const LABEL_WIDTH = 100;

export const Label = ({ children }: { children: React.ReactNode }): React.ReactNode => (
  <span style={{ display: 'inline-block', width: LABEL_WIDTH }}>{children}</span>
);

/**
 * The shortcut column is pinned for the same reason as the label, and the reason generalises past
 * one scene: under RTL a surface's own width lands in the mirroring arithmetic, so a surface that
 * is a fraction of a pixel wide puts EVERY glyph inside it on a fractional x. Content-sized cells
 * measured 143.48 / 180.27 / 201.31 and rasterised differently on the two engines; the cells that
 * already happened to be integral (138 / 300) were clean throughout. Any scene with an RTL half
 * wants integral widths on everything that sizes to content, not just on its anchors.
 */
export const SECONDARY_WIDTH = 40;

export const Shortcut = ({ children }: { children: React.ReactNode }): React.ReactNode => (
  <span style={{ display: 'inline-block', width: SECONDARY_WIDTH }}>{children}</span>
);

/** Runs `fn` after `count` animation frames, returning a canceller. */
export const afterFrames = (count: number, fn: () => void): (() => void) => {
  // eslint-disable-next-line @nx/workspace-no-restricted-globals -- capture-browser-only fixture; no provider in scope
  let frame = requestAnimationFrame(function step() {
    if (--count <= 0) {
      fn();
      return;
    }

    // eslint-disable-next-line @nx/workspace-no-restricted-globals -- capture-browser-only fixture; no provider in scope
    frame = requestAnimationFrame(step);
  });

  // eslint-disable-next-line @nx/workspace-no-restricted-globals -- capture-browser-only fixture; no provider in scope
  return () => cancelAnimationFrame(frame);
};

/**
 * The autofocus hazard. MenuPopover stamps `autofocus` on the first enabled item immediately
 * before showPopover(), and Chromium resolves :focus-visible on it in EVERY modality — including
 * after a real mouse click. Griffel's ring is keyborg-gated and never paints on programmatic
 * focus, so without this one item per page would carry a windmod-only ring.
 *
 * Blurring is symmetric: both halves run the same effect and both land on document.body, so this
 * removes a windmod-only artefact without hiding any windmod look. The ring itself is exercised
 * by the parity pass's keyborg row instead.
 */
export const useBlurAfterMount = (): void => {
  React.useEffect(() => {
    const blur = () => {
      // eslint-disable-next-line @nx/workspace-no-restricted-globals -- capture-browser-only fixture; no provider in scope
      const active = document.activeElement as HTMLElement | null;

      // eslint-disable-next-line @nx/workspace-no-restricted-globals -- capture-browser-only fixture; no provider in scope
      if (active && active !== document.body) {
        active.blur();
      }
    };

    return afterFrames(FRAME_BLUR, blur);
  }, []);
};

/**
 * The assertion that makes the blur trustworthy, and it lives in its OWN effect on purpose:
 * folded into the blur effect, deleting the blur would delete its own check. It runs a frame
 * later than the blur and throws on violation, so a scene whose focus is not neutralised fails
 * the story render instead of quietly capturing a ring on one side only.
 */
export const useAssertFocusReleased = (): void => {
  const [violation, setViolation] = React.useState<string | undefined>(undefined);

  React.useEffect(() => {
    const check = () => {
      // eslint-disable-next-line @nx/workspace-no-restricted-globals -- capture-browser-only fixture; no provider in scope
      const active = document.activeElement;

      // eslint-disable-next-line @nx/workspace-no-restricted-globals -- capture-browser-only fixture; no provider in scope
      if (active && active !== document.body) {
        setViolation((active as HTMLElement).outerHTML.slice(0, 120));
      }
    };

    return afterFrames(FRAME_ASSERT, check);
  }, []);

  if (violation) {
    throw new Error(`menuSurfaceHarness: document.activeElement is not BODY after mount — ${violation}`);
  }
};

/**
 * position-area resolves its logical inline keywords against the INITIAL containing block, not
 * against the popover's own inherited direction, so the direction has to live on the document
 * element: a provider-level dir would mirror the CONTENT of a surface while leaving its
 * PLACEMENT on the LTR side, and Griffel — which reads direction in JS — would not agree.
 * A scene is therefore single-direction. Both halves run this, so it stays symmetric.
 */
export const usePageDirection = (dir: 'ltr' | 'rtl'): void => {
  React.useEffect(() => {
    // eslint-disable-next-line @nx/workspace-no-restricted-globals -- capture-browser-only fixture; no provider in scope
    const previous = document.documentElement.getAttribute('dir');

    // eslint-disable-next-line @nx/workspace-no-restricted-globals -- capture-browser-only fixture; no provider in scope
    document.documentElement.setAttribute('dir', dir);

    return () => {
      // eslint-disable-next-line @nx/workspace-no-restricted-globals -- capture-browser-only fixture; no provider in scope
      document.documentElement.setAttribute('dir', previous ?? 'ltr');
    };
  }, [dir]);
};

export type CellProps = {
  label: string;
  Menu: MenuLike;
  MenuTrigger: MenuTriggerLike;
  MenuPopover: MenuPopoverLike;
  Button: ButtonLike;
  popoverProps: { popover?: string };
  children: React.ReactNode;
};

export const Cell = ({
  label,
  Menu,
  MenuTrigger,
  MenuPopover,
  Button,
  popoverProps,
  children,
}: CellProps): React.ReactNode => (
  <Menu open>
    <MenuTrigger>
      <Button style={{ width: TRIGGER_WIDTH }}>{label}</Button>
    </MenuTrigger>
    <MenuPopover {...popoverProps}>{children}</MenuPopover>
  </Menu>
);
