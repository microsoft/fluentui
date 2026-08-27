'use client';

// eslint-disable-next-line import/no-extraneous-dependencies -- story-only helper outside the *.stories.tsx devDependencies exemption
import * as React from 'react';

import type {
  ButtonLike,
  LinkItemLike,
  MenuListLike,
  MenuLike,
  MenuPopoverLike,
  MenuTriggerLike,
  SelectableItemLike,
} from './menuSurfaceHarness';
import {
  Cell,
  Label,
  Shortcut,
  useAssertFocusReleased,
  useBlurAfterMount,
  usePageDirection,
} from './menuSurfaceHarness';

export type MenuSequelVrSceneProps = {
  Menu: MenuLike;
  MenuTrigger: MenuTriggerLike;
  MenuPopover: MenuPopoverLike;
  MenuList: MenuListLike;
  MenuItemCheckbox: SelectableItemLike;
  MenuItemLink: LinkItemLike;
  MenuItemSwitch: SelectableItemLike;
  MenuDivider: React.ComponentType<Record<string, never>>;
  Button: ButtonLike;
  Icon: React.ComponentType;
  /** Applied to the DOCUMENT element — see menuSurfaceHarness/usePageDirection. */
  dir?: 'ltr' | 'rtl';
  popoverProps: { popover?: string };
};

const HREF = 'https://example.com/';

/**
 * The three headless `menu` exports the windmod package never reskinned, on the same 4 × 2 grid at
 * 1280 × 720 as MenuVrScene. Cells 1-2 adjudicate MenuItemLink, cells 3-5 MenuItemSwitch, and the
 * mixed cell pins the three roots coexisting.
 *
 * Grid slots 6 and 7 are RESERVED for MenuSplitGroup's two cells (split basic, split multiline),
 * which are held out of this cycle. The mixed cell is positioned explicitly at slot 8 so those two
 * can be dropped in without moving a single surface in this scene.
 *
 * No surface mounts late here, so the scene needs neither useOpenAfterMount nor useCommitLateMotion:
 * every cell is a single top-level menu with no nested trigger, and there is no settle race to fix.
 */
export const MenuSequelVrScene = ({
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItemCheckbox,
  MenuItemLink,
  MenuItemSwitch,
  MenuDivider,
  Button,
  Icon,
  dir = 'ltr',
  popoverProps,
}: MenuSequelVrSceneProps): React.ReactNode => {
  usePageDirection(dir);
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
      {/* 1 — the anchor's four text-decoration declarations against the UA underline, MenuItem's
          reset inherited onto an <a>, and the data-disabled ladder on an anchor. */}
      <Cell label="link anatomy" {...common}>
        <MenuList hasIcons>
          <MenuItemLink href={HREF}>
            <Label>Plain</Label>
          </MenuItemLink>
          <MenuItemLink href={HREF} icon={<Icon />}>
            <Label>With icon</Label>
          </MenuItemLink>
          <MenuItemLink href={HREF} icon={<Icon />} secondaryContent={<Shortcut>Ctrl+L</Shortcut>}>
            <Label>Shortcut</Label>
          </MenuItemLink>
          <MenuItemLink href={HREF} icon={<Icon />} disabled>
            <Label>Disabled</Label>
          </MenuItemLink>
        </MenuList>
      </Cell>

      {/* 2 — the 16px reserved-but-hidden gutter on an <a> row, and that it aligns with a sibling
          row that DOES paint. Whether a checkmark glyph is injected is NOT adjudicable here: the
          slot is `invisible` without data-checked, which a MenuItemLink never carries, so both
          options are pixel-identical. MenuItemLink.test.tsx asserts the empty slot instead. */}
      <Cell label="link checkmark" {...common}>
        <MenuList hasCheckmarks checkedValues={{ box: ['on'] }}>
          <MenuItemLink href={HREF}>
            <Label>Link</Label>
          </MenuItemLink>
          <MenuItemLink href={HREF} disabled>
            <Label>Link disabled</Label>
          </MenuItemLink>
          <MenuItemCheckbox name="box" value="on">
            <Label>Checked</Label>
          </MenuItemCheckbox>
          <MenuItemCheckbox name="box" value="off">
            <Label>Unchecked</Label>
          </MenuItemCheckbox>
        </MenuList>
      </Cell>

      {/* 3 — the checked/unchecked colour ladder, the 20px thumb offset, and the ABSENCE of a
          disabled ladder on the indicator: MenuItemSwitch inherits only MenuItem's row-level
          disabled rules, and the track keeps its resting stroke. */}
      <Cell label="switch states" {...common}>
        <MenuList checkedValues={{ on: ['a'], onOff: ['a'] }}>
          <MenuItemSwitch name="on" value="a">
            <Label>Checked</Label>
          </MenuItemSwitch>
          <MenuItemSwitch name="on" value="b">
            <Label>Unchecked</Label>
          </MenuItemSwitch>
          <MenuItemSwitch name="onOff" value="a" disabled>
            <Label>Checked off</Label>
          </MenuItemSwitch>
          <MenuItemSwitch name="onOff" value="b" disabled>
            <Label>Unchecked off</Label>
          </MenuItemSwitch>
        </MenuList>
      </Cell>

      {/* 4 — slot order (the indicator renders LAST, unlike MenuItem's submenu chevron), the
          indicator's inline-end margin, and the reserved icon gutter. */}
      <Cell label="switch anatomy" {...common}>
        <MenuList hasIcons checkedValues={{ anatomy: ['b', 'd'] }}>
          <MenuItemSwitch name="anatomy" value="a">
            <Label>Bare</Label>
          </MenuItemSwitch>
          <MenuItemSwitch name="anatomy" value="b" icon={<Icon />}>
            <Label>With icon</Label>
          </MenuItemSwitch>
          <MenuItemSwitch name="anatomy" value="c" secondaryContent={<Shortcut>Ctrl+K</Shortcut>}>
            <Label>Shortcut</Label>
          </MenuItemSwitch>
          <MenuItemSwitch name="anatomy" value="d" icon={<Icon />} secondaryContent={<Shortcut>Ctrl+J</Shortcut>}>
            <Label>Both</Label>
          </MenuItemSwitch>
        </MenuList>
      </Cell>

      {/* 5 — the indicator's self-center under data-multiline, plus MenuItem's three inherited
          multiline slot rules. */}
      <Cell label="switch multiline" {...common}>
        <MenuList checkedValues={{ multi: ['a', 'c'] }}>
          <MenuItemSwitch name="multi" value="a" subText="Supporting text">
            <Label>Checked</Label>
          </MenuItemSwitch>
          <MenuItemSwitch name="multi" value="b" subText="Supporting text">
            <Label>Unchecked</Label>
          </MenuItemSwitch>
          <MenuItemSwitch
            name="multi"
            value="c"
            subText="Supporting text"
            secondaryContent={<Shortcut>Ctrl+1</Shortcut>}
          >
            <Label>Checked</Label>
          </MenuItemSwitch>
          <MenuItemSwitch
            name="multi"
            value="d"
            subText="Supporting text"
            secondaryContent={<Shortcut>Ctrl+2</Shortcut>}
          >
            <Label>Unchecked</Label>
          </MenuItemSwitch>
        </MenuList>
      </Cell>

      {/* 6 and 7 — RESERVED for MenuSplitGroup (split basic, split multiline). Held out of this
          cycle; the slots stay empty so adding them moves nothing else. */}

      {/* 8 — inter-item rhythm across the two new roots and a shipped one, that the indicator's own
          hover ladder does not leak to the row, and that the new roots coexist with MenuDivider. */}
      <div style={{ gridColumnStart: 4, gridRowStart: 2 }}>
        <Cell label="mixed" {...common}>
          <MenuList hasIcons checkedValues={{ mixed: ['on'] }}>
            <MenuItemLink href={HREF} icon={<Icon />}>
              <Label>Link</Label>
            </MenuItemLink>
            <MenuDivider />
            <MenuItemSwitch name="mixed" value="on" icon={<Icon />}>
              <Label>Switch on</Label>
            </MenuItemSwitch>
            <MenuItemSwitch name="mixed" value="off" icon={<Icon />}>
              <Label>Switch off</Label>
            </MenuItemSwitch>
          </MenuList>
        </Cell>
      </div>
    </div>
  );
};
