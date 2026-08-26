'use client';

// eslint-disable-next-line import/no-extraneous-dependencies -- story-only helper outside the *.stories.tsx devDependencies exemption
import * as React from 'react';

type MenuLike = React.ComponentType<{ open?: boolean; children: React.ReactNode }>;
type MenuTriggerLike = React.ComponentType<{ children: React.ReactElement }>;
type MenuPopoverLike = React.ComponentType<{ popover?: string; children: React.ReactNode }>;
type MenuListLike = React.ComponentType<{
  hasIcons?: boolean;
  hasCheckmarks?: boolean;
  checkedValues?: Record<string, string[]>;
  children: React.ReactNode;
}>;
type MenuItemLike = React.ComponentType<{
  icon?: React.ReactNode;
  secondaryContent?: React.ReactNode;
  subText?: React.ReactNode;
  disabled?: boolean;
  hasSubmenu?: boolean;
  children?: React.ReactNode;
}>;
type SelectableItemLike = React.ComponentType<{
  name: string;
  value: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}>;
type PlainLike = React.ComponentType<{ children?: React.ReactNode }>;
type ButtonLike = React.ComponentType<{ style?: React.CSSProperties; children?: React.ReactNode }>;

/**
 * Triggers are pinned to an EVEN integer width, wider than every surface, and the grid's columns
 * are integral: a half-pixel shift moves every pixel of the 16px shadow, which a strict-zero gate
 * counts in full.
 */
const TRIGGER_WIDTH = 200;

/**
 * Frame budget. The submenu opens first and autofocuses an item, so the blur has to follow it and
 * the assertion has to follow the blur; each step gets its own slot so the ordering is explicit
 * rather than emergent.
 */
const FRAME_OPEN_SUBMENU = 2;
const FRAME_BLUR = 5;
const FRAME_ASSERT = 8;

/**
 * How many frames the scene keeps committing late motion. The runner cancels animations ONCE, just
 * after the story DOM appears, so anything mounted later escapes that pass entirely; the capture
 * itself lands a couple of frames after the submenu mounts, which is too close to freeze against a
 * single frame number. Committing every frame across the whole budget is idempotent and removes the
 * race instead of betting on it.
 */
const FRAME_FREEZE_BUDGET = 12;

/**
 * Scene rule 3 applies to the SUBMENU's anchor too, not just the outer triggers: a submenu is
 * anchored to a MenuItem, and a content-sized item resolves to a fractional width (135.19px
 * measured), so CSS anchor positioning lands the submenu on the true fractional edge while
 * floating-ui rounds to the integer — a 0.19px offset that re-rasterises every glyph inside.
 * Pinning the label to an integer width makes both engines agree. The widths are also chosen so
 * the widest surface (icon + label + shortcut + gaps + padding = 190px) stays NARROWER than the
 * 200px trigger, which is scene rule 3 proper.
 */
const LABEL_WIDTH = 100;

const Label = ({ children }: { children: React.ReactNode }) => (
  <span style={{ display: 'inline-block', width: LABEL_WIDTH }}>{children}</span>
);

/**
 * The shortcut column is pinned for the same reason as the label, and the reason generalises past
 * this scene: under RTL a surface's own width lands in the mirroring arithmetic, so a surface that
 * is a fraction of a pixel wide puts EVERY glyph inside it on a fractional x. Content-sized cells
 * measured 143.48 / 180.27 / 201.31 and rasterised differently on the two engines; the cells that
 * already happened to be integral (138 / 300) were clean throughout. Any scene with an RTL half
 * wants integral widths on everything that sizes to content, not just on its anchors.
 */
const SECONDARY_WIDTH = 40;

const Shortcut = ({ children }: { children: React.ReactNode }) => (
  <span style={{ display: 'inline-block', width: SECONDARY_WIDTH }}>{children}</span>
);

/** Runs `fn` after `count` animation frames, returning a canceller. */
const afterFrames = (count: number, fn: () => void): (() => void) => {
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
const useBlurAfterMount = (): void => {
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
const useAssertFocusReleased = (): void => {
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
    throw new Error(`MenuVrScene: document.activeElement is not BODY after mount — ${violation}`);
  }
};

/**
 * position-area resolves its logical inline keywords against the INITIAL containing block, not
 * against the popover's own inherited direction, so the direction has to live on the document
 * element: a provider-level dir would mirror the CONTENT of a surface while leaving its
 * PLACEMENT on the LTR side, and Griffel — which reads direction in JS — would not agree.
 * A scene is therefore single-direction. Both halves run this, so it stays symmetric.
 */
const usePageDirection = (dir: 'ltr' | 'rtl'): void => {
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

/**
 * A surface that mounts after the runner's settle keeps its enter motion. The runner cancels WAAPI
 * once, right after the story DOM appears — nine surfaces exist then, the submenu does not — so the
 * submenu's 400ms enter is still RUNNING when the capture happens (measured at 17-33ms of 400,
 * varying per run, which moves the surface a few px sideways and makes the scene's pixel diff
 * bimodal). Finishing a fill-forwards enter leaves the element on its END value, which is the same
 * rest appearance the runner pins inline for every surface it does reach, so this restores symmetry
 * rather than hiding motion. Both halves run it; the windmod side ships no motion and no-ops.
 */
const useCommitLateMotion = (active: boolean): void => {
  React.useEffect(() => {
    if (!active) {
      return undefined;
    }

    let remaining = FRAME_FREEZE_BUDGET;

    // Scoped to the document element rather than the scene root: Griffel portals each surface to
    // the end of body, so a scene-rooted walk would miss the very surface this exists for.
    const commit = () => {
      // eslint-disable-next-line @nx/workspace-no-restricted-globals -- capture-browser-only fixture; no provider in scope
      for (const animation of document.documentElement.getAnimations({ subtree: true })) {
        const fill = animation.effect?.getComputedTiming().fill;

        if (animation.playState === 'running' && (fill === 'forwards' || fill === 'both')) {
          animation.finish();
        }
      }
    };

    // eslint-disable-next-line @nx/workspace-no-restricted-globals -- capture-browser-only fixture; no provider in scope
    let frame = requestAnimationFrame(function step() {
      commit();

      if (--remaining > 0) {
        // eslint-disable-next-line @nx/workspace-no-restricted-globals -- capture-browser-only fixture; no provider in scope
        frame = requestAnimationFrame(step);
      }
    });

    // eslint-disable-next-line @nx/workspace-no-restricted-globals -- capture-browser-only fixture; no provider in scope
    return () => cancelAnimationFrame(frame);
  }, [active]);
};

/**
 * A submenu that is already open when its parent mounts never anchors: React runs child effects
 * before parent effects, so the nested surface calls showPopover() while its anchor is still
 * outside the top layer, and CSS anchor positioning drops it at 0,0 (measured). Opening it a
 * frame later is what a user does anyway, and the flag is passed to BOTH implementations.
 */
const useOpenAfterMount = (): boolean => {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => afterFrames(FRAME_OPEN_SUBMENU, () => setOpen(true)), []);

  return open;
};

type CellProps = {
  label: string;
  Menu: MenuLike;
  MenuTrigger: MenuTriggerLike;
  MenuPopover: MenuPopoverLike;
  Button: ButtonLike;
  popoverProps: { popover?: string };
  children: React.ReactNode;
};

const Cell = ({ label, Menu, MenuTrigger, MenuPopover, Button, popoverProps, children }: CellProps) => (
  <Menu open>
    <MenuTrigger>
      <Button style={{ width: TRIGGER_WIDTH }}>{label}</Button>
    </MenuTrigger>
    <MenuPopover {...popoverProps}>{children}</MenuPopover>
  </Menu>
);

export type MenuVrSceneProps = {
  Menu: MenuLike;
  MenuTrigger: MenuTriggerLike;
  MenuPopover: MenuPopoverLike;
  MenuList: MenuListLike;
  MenuItem: MenuItemLike;
  MenuItemCheckbox: SelectableItemLike;
  MenuItemRadio: SelectableItemLike;
  MenuGroup: PlainLike;
  MenuGroupHeader: PlainLike;
  MenuDivider: React.ComponentType<Record<string, never>>;
  Button: ButtonLike;
  Icon: React.ComponentType;
  /** Applied to the DOCUMENT element. position-area resolves its logical inline-* keywords
   *  against the initial containing block, so a subtree-level dir would place windmod and
   *  Griffel differently; a scene is single-direction for that reason. */
  dir?: 'ltr' | 'rtl';
  popoverProps: { popover?: string };
};

/**
 * Eight cells, 4 columns × 2 rows at 1280 × 720. Every cell keeps a full surface height of
 * clearance on its placement side: row 1 triggers sit at y ≈ 30 and row 2 at y ≈ 390, with every
 * menu under 240px tall inside a 360px row, so no cell needs to flip. A cell that flips is a
 * scene bug, not a parity failure.
 *
 * No modal <dialog> appears anywhere: showModal() closes a sibling `auto` popover and does not
 * reopen it, and its ::backdrop would cover the viewport.
 *
 * Three of MenuItem's four state axes are captured here — disabled, checked and submenu-open —
 * because the headless layer stamps them as attributes. hover, hover:active and focus-visible
 * are the parity pass's; their state bands are designed but not enabled, ready for the harness
 * cycle to switch on with no scene edit.
 */
export const MenuVrScene = ({
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItem,
  MenuItemCheckbox,
  MenuItemRadio,
  MenuGroup,
  MenuGroupHeader,
  MenuDivider,
  Button,
  Icon,
  dir = 'ltr',
  popoverProps,
}: MenuVrSceneProps): React.ReactNode => {
  usePageDirection(dir);
  const submenuOpen = useOpenAfterMount();

  useCommitLateMotion(submenuOpen);
  useBlurAfterMount();
  useAssertFocusReleased();

  const common = { Menu, MenuTrigger, MenuPopover, Button, popoverProps };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 320px)',
        gridTemplateRows: 'repeat(2, 360px)',
        justifyItems: 'center',
        alignItems: 'start',
        paddingTop: 30,
        background: '#fff',
        width: 1280,
        height: 720,
        boxSizing: 'border-box',
      }}
    >
      {/* 1 — the root reset, .icon, .content, .secondary-content, and the disabled resting state. */}
      <Cell label="anatomy" {...common}>
        <MenuList hasIcons>
          <MenuItem>
            <Label>Plain</Label>
          </MenuItem>
          <MenuItem icon={<Icon />}>
            <Label>With icon</Label>
          </MenuItem>
          <MenuItem icon={<Icon />} secondaryContent={<Shortcut>Ctrl+S</Shortcut>}>
            <Label>Shortcut</Label>
          </MenuItem>
          <MenuItem icon={<Icon />} disabled>
            <Label>Disabled</Label>
          </MenuItem>
        </MenuList>
      </Cell>

      {/* 2 — the checkmark visibility flip, the checked state, and the 16px reserved gutter. */}
      <Cell label="selection" {...common}>
        <MenuList hasCheckmarks checkedValues={{ box: ['on'], radio: ['on'] }}>
          <MenuItemCheckbox name="box" value="on">
            Checkbox on
          </MenuItemCheckbox>
          <MenuItemCheckbox name="box" value="off">
            Checkbox off
          </MenuItemCheckbox>
          <MenuItemRadio name="radio" value="on">
            Radio on
          </MenuItemRadio>
          <MenuItemRadio name="radio" value="off">
            Radio off
          </MenuItemRadio>
        </MenuList>
      </Cell>

      {/* 3 — MenuGroupHeader, MenuDivider, and the divider's -5px bleed against the surface's 4px
          padding and 1px border. */}
      <Cell label="grouping" {...common}>
        <MenuList>
          <MenuGroup>
            <MenuGroupHeader>Section</MenuGroupHeader>
            <MenuItem>First</MenuItem>
            <MenuItem>Second</MenuItem>
          </MenuGroup>
          <MenuDivider />
          <MenuItem>After divider</MenuItem>
        </MenuList>
      </Cell>

      {/* 4 — data-multiline and all three group-multiline slot rules. */}
      <Cell label="multiline" {...common}>
        <MenuList>
          <MenuItem subText="Supporting text">
            <Label>Multiline</Label>
          </MenuItem>
          <MenuItem subText="Supporting text" secondaryContent={<Shortcut>Ctrl+M</Shortcut>}>
            <Label>Multiline shortcut</Label>
          </MenuItem>
        </MenuList>
      </Cell>

      {/* 5 — .submenu-indicator, the chevron glyph, the submenu-open state, the submenu's
          after/top positioning defaults, and two simultaneously-open surfaces.
          The NESTED surface deliberately keeps the default popover="auto". Measured: a `manual`
          popover is outside the top-layer nesting chain, which makes its anchor element
          unacceptable, so it loses anchor positioning and lands at 0,0. `auto` restores it — and
          because two `auto` popovers outside one ancestor chain are mutually exclusive, this is
          the scene's ONLY open submenu. */}
      <Cell label="submenu" {...common}>
        <MenuList>
          <MenuItem>
            <Label>Sibling</Label>
          </MenuItem>
          <Menu open={submenuOpen}>
            <MenuTrigger>
              <MenuItem>
                <Label>Open submenu</Label>
              </MenuItem>
            </MenuTrigger>
            <MenuPopover>
              <MenuList>
                <MenuItem>
                  <Label>Nested one</Label>
                </MenuItem>
                <MenuItem>
                  <Label>Nested two</Label>
                </MenuItem>
              </MenuList>
            </MenuPopover>
          </Menu>
        </MenuList>
      </Cell>

      {/* 6 — min-w-[138px], max-w-[300px], w-max and overflow-x-hidden, as two stacked menus:
          one narrower than the floor, one wider than the clamp. */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 120 }}>
        <Cell label="narrow" {...common}>
          <MenuList>
            <MenuItem>Hi</MenuItem>
          </MenuList>
        </Cell>
        <Cell label="wide" {...common}>
          <MenuList>
            <MenuItem>A single menu item whose label runs well past the three hundred pixel clamp</MenuItem>
            {/* An unbreakable token is the only thing that actually overflows the clamp: a normal
                label just wraps, so overflow-x-hidden would never be exercised. */}
            <MenuItem>
              Supercalifragilisticexpialidocious-antidisestablishmentarianism-pneumonoultramicroscopic
            </MenuItem>
          </MenuList>
        </Cell>
      </div>

      {/* 7 — the chevron glyph on a closed submenu row, p-vertical-s-nudge's symmetry and the
          divider's bleed. Under `menu-rtl` this same cell is the mirrored-chevron cell (R4/G7).
          The chevron needs only hasSubmenu, not an open submenu — cell 5 owns the one open
          nested surface the page can hold. */}
      <Cell label="chevron" {...common}>
        <MenuList hasIcons>
          <MenuItem>
            <Label>Plain</Label>
          </MenuItem>
          <MenuItem icon={<Icon />}>
            <Label>With icon</Label>
          </MenuItem>
          <MenuItem icon={<Icon />} secondaryContent={<Shortcut>Ctrl+S</Shortcut>}>
            <Label>Shortcut</Label>
          </MenuItem>
          <MenuDivider />
          <MenuItem hasSubmenu>
            <Label>Submenu</Label>
          </MenuItem>
        </MenuList>
      </Cell>

      {/* 8 — the disabled block on all four classes that have one, plus the slot-level undos.
          secondaryContent is pinned here on purpose: it carries a disabled block of its own and
          would otherwise have no cell reaching it. */}
      <Cell label="all disabled" {...common}>
        <MenuList hasIcons>
          <MenuItem icon={<Icon />} disabled>
            <Label>Disabled</Label>
          </MenuItem>
          <MenuItem icon={<Icon />} secondaryContent={<Shortcut>Ctrl+D</Shortcut>} disabled>
            <Label>Disabled shortcut</Label>
          </MenuItem>
          <MenuItem icon={<Icon />} subText="Supporting text" disabled>
            <Label>Disabled multiline</Label>
          </MenuItem>
          <MenuItem icon={<Icon />} secondaryContent={<Shortcut>Ctrl+X</Shortcut>} subText="Supporting text" disabled>
            <Label>Disabled both</Label>
          </MenuItem>
        </MenuList>
      </Cell>
    </div>
  );
};
