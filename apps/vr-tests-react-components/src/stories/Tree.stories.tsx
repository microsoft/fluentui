import * as React from 'react';
import {
  FlatTree,
  HeadlessFlatTreeItemProps,
  Tree,
  TreeItem,
  TreeItemLayout,
  TreeItemPersonaLayout,
  TreeItemValue,
  TreeOpenChangeData,
  TreeOpenChangeEvent,
  useHeadlessFlatTree_unstable,
} from '@fluentui/react-tree';
import { tokens } from '@fluentui/react-theme';
import { Button } from '@fluentui/react-button';
import { Menu, MenuItem, MenuList, MenuPopover, MenuTrigger } from '@fluentui/react-menu';
import { ComponentMeta } from '@storybook/react';
import { DARK_MODE, HIGH_CONTRAST, RTL, getStoryVariant } from '../utilities/getStoryVariant';
import { Steps, StoryWright } from 'storywright';
import {
  CaretDownRegular,
  CaretRightRegular,
  Edit20Regular,
  Image20Regular,
  Important16Regular,
  LockClosed20Regular,
  MoreHorizontal20Regular,
  SquareMultiple20Regular,
} from '@fluentui/react-icons';
import { CounterBadge } from '@fluentui/react-badge';
import { makeStyles, shorthands } from '@griffel/react';
import { Avatar } from '@fluentui/react-avatar';

export default {
  title: 'Tree',
} as ComponentMeta<typeof Tree>;

export const Default = () => (
  <Tree aria-label="Tree">
    <TreeItem itemType="branch">
      <TreeItemLayout>level 1, item 1</TreeItemLayout>
      <Tree>
        <TreeItem itemType="leaf">
          <TreeItemLayout>level 2, item 1</TreeItemLayout>
        </TreeItem>
        <TreeItem itemType="leaf">
          <TreeItemLayout>level 2, item 2</TreeItemLayout>
        </TreeItem>
        <TreeItem itemType="leaf">
          <TreeItemLayout>level 2, item 3</TreeItemLayout>
        </TreeItem>
      </Tree>
    </TreeItem>
    <TreeItem itemType="branch">
      <TreeItemLayout>level 1, item 2</TreeItemLayout>
      <Tree>
        <TreeItem itemType="branch">
          <TreeItemLayout>level 2, item 1</TreeItemLayout>
          <Tree>
            <TreeItem itemType="leaf">
              <TreeItemLayout>level 3, item 1</TreeItemLayout>
            </TreeItem>
          </Tree>
        </TreeItem>
      </Tree>
    </TreeItem>
    <TreeItem itemType="leaf">
      <TreeItemLayout>level 1, item 3</TreeItemLayout>
    </TreeItem>
  </Tree>
);

Default.storyName = 'default';
export const DefaultDarkMode = getStoryVariant(Default, DARK_MODE);
export const DefaultHighContrast = getStoryVariant(Default, HIGH_CONTRAST);
export const DefaultRTL = getStoryVariant(Default, RTL);

export const DefaultOpenTree = () => {
  const defaultOpenTrees = ['default-subtree-1', 'default-subtree-2', 'default-subtree-2-1'];

  return (
    <Tree aria-label="Tree" defaultOpenItems={defaultOpenTrees}>
      <TreeItem itemType="branch" value="default-subtree-1">
        <TreeItemLayout>level 1, item 1</TreeItemLayout>
        <Tree>
          <TreeItem itemType="leaf">
            <TreeItemLayout>level 2, item 1</TreeItemLayout>
          </TreeItem>
          <TreeItem itemType="leaf">
            <TreeItemLayout>level 2, item 2</TreeItemLayout>
          </TreeItem>
          <TreeItem itemType="leaf">
            <TreeItemLayout>level 2, item 3</TreeItemLayout>
          </TreeItem>
        </Tree>
      </TreeItem>
      <TreeItem itemType="branch" value="default-subtree-2">
        <TreeItemLayout>level 1, item 2</TreeItemLayout>
        <Tree>
          <TreeItem itemType="branch" value="default-subtree-2-1">
            <TreeItemLayout>level 2, item 1</TreeItemLayout>
            <Tree>
              <TreeItem itemType="leaf">
                <TreeItemLayout>level 3, item 1</TreeItemLayout>
              </TreeItem>
              <TreeItem itemType="leaf">
                <TreeItemLayout>level 3, item 2</TreeItemLayout>
              </TreeItem>
              <TreeItem itemType="leaf">
                <TreeItemLayout>level 3, item 3</TreeItemLayout>
              </TreeItem>
            </Tree>
          </TreeItem>
        </Tree>
      </TreeItem>
    </Tree>
  );
};

DefaultOpenTree.storyName = 'default open tree';
export const DefaultOpenTreeDarkMode = getStoryVariant(DefaultOpenTree, DARK_MODE);
export const DefaultOpenTreeHighContrast = getStoryVariant(DefaultOpenTree, HIGH_CONTRAST);
export const DefaultOpenTreeRTL = getStoryVariant(DefaultOpenTree, RTL);

export const Appearance = () => {
  return (
    <StoryWright
      steps={new Steps()
        .hover('#subtle-tree')
        .snapshot('Subtle tree hover')
        .mouseDown('#subtle-tree')
        .snapshot('Subtle tree mousedown')
        .hover('#subtle-alpha-tree')
        .snapshot('Subtle alpha tree hover')
        .mouseDown('#subtle-alpha-tree')
        .snapshot('Subtle alpha tree mousedown')
        .hover('#transparent-tree')
        .snapshot('Transparent tree hover')
        .mouseDown('#transparent-tree')
        .snapshot('Transparent tree mousedown')
        .end()}
    >
      <Tree id="subtle-tree" aria-label="Tree">
        <TreeItem itemType="leaf">
          <TreeItemLayout>Subtle tree item</TreeItemLayout>
        </TreeItem>
      </Tree>
      <Tree id="subtle-alpha-tree" appearance="subtle-alpha" aria-label="Tree">
        <TreeItem itemType="leaf">
          <TreeItemLayout>Subtle-alpha tree item</TreeItemLayout>
        </TreeItem>
      </Tree>
      <Tree id="transparent-tree" appearance="transparent" aria-label="Tree">
        <TreeItem itemType="leaf">
          <TreeItemLayout>Transparent tree item</TreeItemLayout>
        </TreeItem>
      </Tree>
    </StoryWright>
  );
};

Appearance.storyName = 'appearance';
export const AppearanceDarkMode = getStoryVariant(Appearance, DARK_MODE);
export const AppearanceHighContrast = getStoryVariant(Appearance, HIGH_CONTRAST);
export const AppearanceRTL = getStoryVariant(Appearance, RTL);

export const Size = () => {
  return (
    <>
      <Tree defaultOpenItems={'1'} size="medium" aria-label="Tree">
        <TreeItem value="1" itemType="branch">
          <TreeItemLayout>Medium size tree item</TreeItemLayout>
          <Tree>
            <TreeItem itemType="leaf">
              <TreeItemLayout>level 2, item 1</TreeItemLayout>
            </TreeItem>
            <TreeItem itemType="leaf">
              <TreeItemLayout>level 2, item 2</TreeItemLayout>
            </TreeItem>
            <TreeItem itemType="leaf">
              <TreeItemLayout>level 2, item 3</TreeItemLayout>
            </TreeItem>
          </Tree>
        </TreeItem>
      </Tree>

      <Tree defaultOpenItems="1" size="small" aria-label="Tree">
        <TreeItem value="1" itemType="branch">
          <TreeItemLayout>Small size tree item</TreeItemLayout>
          <Tree>
            <TreeItem itemType="leaf">
              <TreeItemLayout>level 2, item 1</TreeItemLayout>
            </TreeItem>
            <TreeItem itemType="leaf">
              <TreeItemLayout>level 2, item 2</TreeItemLayout>
            </TreeItem>
            <TreeItem itemType="leaf">
              <TreeItemLayout>level 2, item 3</TreeItemLayout>
            </TreeItem>
          </Tree>
        </TreeItem>
      </Tree>
    </>
  );
};

Size.storyName = 'size';
export const SizeDarkMode = getStoryVariant(Size, DARK_MODE);
export const SizeHighContrast = getStoryVariant(Size, HIGH_CONTRAST);
export const SizeRTL = getStoryVariant(Size, RTL);

export const ExpandIcon = () => {
  const [openItems, setOpenItems] = React.useState<Set<TreeItemValue>>(new Set(['tree-item-1', 'tree-item-2']));
  const handleOpenChange = (event: TreeOpenChangeEvent, data: TreeOpenChangeData) => setOpenItems(data.openItems);
  return (
    <Tree aria-label="Tree" openItems={openItems} onOpenChange={handleOpenChange}>
      <TreeItem itemType="branch" value="tree-item-1">
        <TreeItemLayout expandIcon={openItems.has('tree-item-1') ? <CaretDownRegular /> : <CaretRightRegular />}>
          level 1, item 1
        </TreeItemLayout>
        <Tree>
          <TreeItem itemType="leaf">
            <TreeItemLayout>level 2, item 1</TreeItemLayout>
          </TreeItem>
          <TreeItem itemType="leaf">
            <TreeItemLayout>level 2, item 2</TreeItemLayout>
          </TreeItem>
          <TreeItem itemType="leaf">
            <TreeItemLayout>level 2, item 3</TreeItemLayout>
          </TreeItem>
        </Tree>
      </TreeItem>
      <TreeItem itemType="branch" value="tree-item-2">
        <TreeItemLayout expandIcon={openItems.has('tree-item-2') ? <CaretDownRegular /> : <CaretRightRegular />}>
          level 1, item 2
        </TreeItemLayout>
        <Tree>
          <TreeItem itemType="branch" value="tree-item-3">
            <TreeItemLayout expandIcon={openItems.has('tree-item-3') ? <CaretDownRegular /> : <CaretRightRegular />}>
              level 2, item 1
            </TreeItemLayout>
            <Tree>
              <TreeItem itemType="leaf">
                <TreeItemLayout>level 3, item 1</TreeItemLayout>
              </TreeItem>
            </Tree>
          </TreeItem>
        </Tree>
      </TreeItem>
    </Tree>
  );
};

ExpandIcon.storyName = 'expand icon';
export const ExpandIconDarkMode = getStoryVariant(ExpandIcon, DARK_MODE);
export const ExpandIconHighContrast = getStoryVariant(ExpandIcon, HIGH_CONTRAST);
export const ExpandIconRTL = getStoryVariant(ExpandIcon, RTL);

const ActionsExample = () => {
  return (
    <>
      <Button aria-label="Edit" appearance="subtle" icon={<Edit20Regular />} />
      <Menu>
        <MenuTrigger disableButtonEnhancement>
          <Button aria-label="More options" appearance="subtle" icon={<MoreHorizontal20Regular />} />
        </MenuTrigger>

        <MenuPopover>
          <MenuList>
            <MenuItem>New </MenuItem>
            <MenuItem>New Window</MenuItem>
            <MenuItem disabled>Open File</MenuItem>
            <MenuItem>Open Folder</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
    </>
  );
};

export const Actions = () => (
  <Tree aria-label="Tree">
    <TreeItem itemType="branch">
      <TreeItemLayout actions={{ visible: true, children: <ActionsExample /> }}>level 1, item 1</TreeItemLayout>
      <Tree>
        <TreeItem itemType="leaf">
          <TreeItemLayout actions={{ visible: true, children: <ActionsExample /> }}>level 2, item 1</TreeItemLayout>
        </TreeItem>
        <TreeItem itemType="leaf">
          <TreeItemLayout actions={{ visible: true, children: <ActionsExample /> }}>level 2, item 2</TreeItemLayout>
        </TreeItem>
        <TreeItem itemType="leaf">
          <TreeItemLayout actions={{ visible: true, children: <ActionsExample /> }}>level 2, item 3</TreeItemLayout>
        </TreeItem>
      </Tree>
    </TreeItem>
    <TreeItem itemType="branch">
      <TreeItemLayout actions={{ visible: true, children: <ActionsExample /> }}>level 1, item 2</TreeItemLayout>
      <Tree>
        <TreeItem itemType="branch">
          <TreeItemLayout actions={{ visible: true, children: <ActionsExample /> }}>level 2, item 1</TreeItemLayout>
          <Tree>
            <TreeItem itemType="leaf">
              <TreeItemLayout actions={{ visible: true, children: <ActionsExample /> }}>level 3, item 1</TreeItemLayout>
            </TreeItem>
          </Tree>
        </TreeItem>
      </Tree>
    </TreeItem>
  </Tree>
);

Actions.storyName = 'actions';
export const ActionsDarkMode = getStoryVariant(Actions, DARK_MODE);
export const ActionsHighContrast = getStoryVariant(Actions, HIGH_CONTRAST);
export const ActionsRTL = getStoryVariant(Actions, RTL);

export const Layout = () => (
  <Tree aria-label="Tree">
    <TreeItem itemType="branch" aria-description="Private, 1 message">
      <TreeItemLayout
        aside={
          <>
            <Important16Regular primaryFill="red" />
            <CounterBadge count={1} color="danger" size="small" />
          </>
        }
        iconBefore={<Image20Regular />}
        iconAfter={
          <>
            <LockClosed20Regular />
            <SquareMultiple20Regular />
          </>
        }
      >
        Content
      </TreeItemLayout>
      <Tree>
        <TreeItem itemType="branch">
          <TreeItemLayout>Tree Item</TreeItemLayout>
          <Tree>
            <TreeItem itemType="leaf">
              <TreeItemLayout>level 2, item 1</TreeItemLayout>
            </TreeItem>
            <TreeItem itemType="leaf">
              <TreeItemLayout>level 2, item 2</TreeItemLayout>
            </TreeItem>
            <TreeItem itemType="leaf">
              <TreeItemLayout>level 2, item 3</TreeItemLayout>
            </TreeItem>
          </Tree>
        </TreeItem>
        <TreeItem itemType="leaf">
          <TreeItemLayout>level 2, item 2</TreeItemLayout>
        </TreeItem>
        <TreeItem itemType="leaf">
          <TreeItemLayout>level 2, item 3</TreeItemLayout>
        </TreeItem>
      </Tree>
    </TreeItem>
    <TreeItem itemType="branch" aria-description="Private">
      <TreeItemLayout
        aside={<Important16Regular primaryFill="red" />}
        iconBefore={<Image20Regular />}
        iconAfter={
          <>
            <LockClosed20Regular />
            <SquareMultiple20Regular />
          </>
        }
      >
        Content
      </TreeItemLayout>
      <Tree>
        <TreeItem itemType="branch">
          <TreeItemLayout>level 2, item 1</TreeItemLayout>
          <Tree>
            <TreeItem itemType="leaf">
              <TreeItemLayout>level 3, item 1</TreeItemLayout>
            </TreeItem>
          </Tree>
        </TreeItem>
      </Tree>
    </TreeItem>
  </Tree>
);

Layout.storyName = 'layout';
export const LayoutDarkMode = getStoryVariant(Layout, DARK_MODE);
export const LayoutHighContrast = getStoryVariant(Layout, HIGH_CONTRAST);
export const LayoutRTL = getStoryVariant(Layout, RTL);

const useBadgeStyles = makeStyles({
  base: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 'auto',
    ...shorthands.padding(0, tokens.spacingHorizontalXS),
    ...shorthands.gap(tokens.spacingHorizontalXS),
  },
});

const Badges = () => {
  const badgeStyles = useBadgeStyles();
  return (
    <div className={badgeStyles.base}>
      <Important16Regular primaryFill="red" />
      <CounterBadge count={1} color="danger" size="small" />
    </div>
  );
};

export const Persona = () => {
  return (
    <Tree defaultOpenItems={['1', '1-1', '2']} aria-label="Tree">
      <TreeItem value="1" itemType="branch" aria-description="1 new message, important">
        <TreeItemPersonaLayout
          aside={
            <>
              <span>00:00 AM</span>
              <Badges />
            </>
          }
          description="description"
          media={<Avatar />}
        >
          Item 1, level 1
        </TreeItemPersonaLayout>
        <Tree>
          <TreeItem value="1-1" itemType="branch">
            <TreeItemPersonaLayout description="description" media={<Avatar />}>
              Item 1, level 2
            </TreeItemPersonaLayout>
            <Tree>
              <TreeItem value="1-1-1" itemType="leaf">
                <TreeItemPersonaLayout description="description" media={<Avatar />}>
                  Item 1, level 3
                </TreeItemPersonaLayout>
              </TreeItem>
            </Tree>
          </TreeItem>
        </Tree>
      </TreeItem>
      <TreeItem value="2" itemType="branch" aria-description="1 message, important">
        <TreeItemPersonaLayout
          aside={
            <>
              <span>00:00 AM</span>
              <Badges />
            </>
          }
          description="Secondary text slot"
          media={<Avatar shape="square" />}
        >
          Item 2, level 1
        </TreeItemPersonaLayout>
        <Tree>
          <TreeItem value="2-1" itemType="leaf">
            <TreeItemPersonaLayout media={<Avatar shape="square" />}>Item 1, level 2</TreeItemPersonaLayout>
          </TreeItem>
          <TreeItem value="2-2" itemType="leaf">
            <TreeItemPersonaLayout description="description" media={<Avatar shape="square" />}>
              Item 2, level 2
            </TreeItemPersonaLayout>
          </TreeItem>
          <TreeItem value="2-3" itemType="leaf">
            <TreeItemPersonaLayout description="description" media={<Avatar shape="square" />}>
              Item 3, level 2
            </TreeItemPersonaLayout>
          </TreeItem>
        </Tree>
      </TreeItem>
    </Tree>
  );
};

Persona.storyName = 'persona';
export const PersonaDarkMode = getStoryVariant(Persona, DARK_MODE);
export const PersonaHighContrast = getStoryVariant(Persona, HIGH_CONTRAST);
export const PersonaRTL = getStoryVariant(Persona, RTL);

const defaultItems: HeadlessFlatTreeItemProps[] = [
  { id: '1', value: '1' },
  { id: '1-1', value: '1-1', parentValue: '1' },
  { id: '1-2', value: '1-2', parentValue: '1' },
  { id: '1-3', value: '1-3', parentValue: '1' },
  { id: '2', value: '2' },
  { id: '2-1', value: '2-1', parentValue: '2' },
  { id: '2-1-1', value: '2-1-1', parentValue: '2-1' },
  { id: '2-2', value: '2-2', parentValue: '2' },
  { id: '2-2-1', value: '2-2-1', parentValue: '2-2' },
  { id: '2-2-2', value: '2-2-2', parentValue: '2-2' },
  { id: '2-2-3', value: '2-2-3', parentValue: '2-2' },
  { id: '3', value: '3' },
];

export const Flat = () => {
  const headlessFlatTree = useHeadlessFlatTree_unstable(defaultItems, {
    defaultOpenItems: ['1', '2'],
  });
  return (
    <FlatTree {...headlessFlatTree.getTreeProps()} aria-label="Tree">
      {Array.from(headlessFlatTree.items(), item => (
        <TreeItem {...item.getTreeItemProps()} key={item.value}>
          <TreeItemLayout>{item.value}</TreeItemLayout>
        </TreeItem>
      ))}
    </FlatTree>
  );
};

Flat.storyName = 'flat';
export const FlatDarkMode = getStoryVariant(Flat, DARK_MODE);
export const FlatHighContrast = getStoryVariant(Flat, HIGH_CONTRAST);
export const FlatRTL = getStoryVariant(Flat, RTL);

export const FlatTreeSingleSelection = () => {
  const flatTree = useHeadlessFlatTree_unstable(defaultItems, {
    defaultOpenItems: ['1', '2', '2-1'],
    selectionMode: 'single',
  });

  return (
    <StoryWright steps={new Steps().click('#2-1').snapshot('flat tree single selection selected 1').end()}>
      <FlatTree selectionMode="single" {...flatTree.getTreeProps()} aria-label="Tree">
        {Array.from(flatTree.items(), item => {
          return (
            <TreeItem {...item.getTreeItemProps()} key={item.value}>
              <TreeItemLayout>{item.value}</TreeItemLayout>
            </TreeItem>
          );
        })}
      </FlatTree>
    </StoryWright>
  );
};

FlatTreeSingleSelection.storyName = 'flat tree single selection';
export const FlatTreeSingleSelectionDarkMode = getStoryVariant(FlatTreeSingleSelection, DARK_MODE);
export const FlatTreeSingleSelectionHighContrast = getStoryVariant(FlatTreeSingleSelection, HIGH_CONTRAST);
export const FlatTreeSingleSelectionRTL = getStoryVariant(FlatTreeSingleSelection, RTL);

export const FlatTreeMultiSelection = () => {
  const flatTree = useHeadlessFlatTree_unstable(defaultItems, {
    defaultOpenItems: ['1', '2', '2-1'],
    selectionMode: 'multiselect',
  });

  return (
    <StoryWright steps={new Steps().click('#1-1').snapshot('flat tree multi selection selected 1-1').end()}>
      <FlatTree {...flatTree.getTreeProps()} aria-label="Tree">
        {Array.from(flatTree.items(), item => {
          return (
            <TreeItem {...item.getTreeItemProps()} key={item.value}>
              <TreeItemLayout>{item.value}</TreeItemLayout>
            </TreeItem>
          );
        })}
      </FlatTree>
    </StoryWright>
  );
};

FlatTreeMultiSelection.storyName = 'flat tree multi selection';
export const FlatTreeMultiSelectionDarkMode = getStoryVariant(FlatTreeMultiSelection, DARK_MODE);
export const FlatTreeMultiSelectionHighContrast = getStoryVariant(FlatTreeMultiSelection, HIGH_CONTRAST);
export const FlatTreeMultiSelectionRTL = getStoryVariant(FlatTreeSingleSelection, RTL);
