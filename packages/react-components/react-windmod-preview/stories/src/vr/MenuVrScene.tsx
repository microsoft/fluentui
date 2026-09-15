'use client';

// eslint-disable-next-line import/no-extraneous-dependencies -- story-only helper outside the *.stories.tsx devDependencies exemption
import * as React from 'react';

import type {
  ButtonLike,
  MenuItemLike,
  MenuListLike,
  MenuLike,
  MenuPopoverLike,
  MenuTriggerLike,
  PlainLike,
  SelectableItemLike,
} from './menuSurfaceHarness';
import {
  afterFrames,
  Cell,
  Label,
  Shortcut,
  useAssertFocusReleased,
  useBlurAfterMount,
  usePageDirection,
} from './menuSurfaceHarness';

/**
 * Frame budget. The submenu opens first and autofocuses an item, so the blur has to follow it and
 * the assertion has to follow the blur; each step gets its own slot so the ordering is explicit
 * rather than emergent. The blur and assert slots live with their hooks in menuSurfaceHarness.
 */
const FRAME_OPEN_SUBMENU = 2;

/**
 * How many frames the scene keeps committing late motion. The runner cancels animations ONCE, just
 * after the story DOM appears, so anything mounted later escapes that pass entirely; the capture
 * itself lands a couple of frames after the submenu mounts, which is too close to freeze against a
 * single frame number. Committing every frame across the whole budget is idempotent and removes the
 * race instead of betting on it.
 */
const FRAME_FREEZE_BUDGET = 12;

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
