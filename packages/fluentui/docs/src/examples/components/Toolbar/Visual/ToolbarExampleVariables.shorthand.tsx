import { Toolbar, toolbarMenuBehavior, Accessibility, ToolbarMenuBehaviorProps } from '@fluentui/react-northstar';
import * as React from 'react';
import { CallVideoIcon, MoreIcon, SkypeLogoIcon } from '@fluentui/react-icons-northstar';

// behavior is overridden, as focus was causing inconsistency in displaying focus outline for storywright tests
const notAutoFocusToolbarMenuBehavior: Accessibility<ToolbarMenuBehaviorProps> = () => {
  const behavior = toolbarMenuBehavior();
  behavior.focusZone.props.shouldFocusOnMount = false;
  return behavior;
};

const stateReducer: React.Reducer<'item-menu' | 'item-menu-variables' | '', 'item-menu' | 'item-menu-variables'> = (
  prevState,
  action,
) => action;

const ToolbarExampleVariables = () => {
  const [menu, dispatch] = React.useReducer(stateReducer, '');

  return (
    <>
      <Toolbar
        aria-label="visual test only with expanded state"
        variables={{
          background: 'lightblue',
          dividerBorder: 'red',
          foregroundActive: 'red',
          menuBackground: 'lightblue',
          menuDividerBorder: 'yellow',
          menuItemForeground: 'grey',
        }}
        items={[
          // ToolbarDivider
          { kind: 'divider', key: 'divider' },
          { kind: 'divider', key: 'divider-variables', variables: { dividerBorder: 'green' } },

          // ToolbarGroup - no variables :(
          {
            kind: 'group',
            key: 'group',
            items: [
              // ToolbarDivider
              { kind: 'divider', key: 'divider' },
              { kind: 'divider', key: 'divider-variables', variables: { dividerBorder: 'orange' } },

              // ToolbarItem
              { key: 'item', active: true, icon: <SkypeLogoIcon />, title: 'skype' },
              {
                key: 'item-variables',
                title: 'skype',
                active: true,
                icon: <SkypeLogoIcon />,
                variables: { foregroundActive: 'orange' },
              },
            ],
          },

          // kind="toggle" is just ToolbarItem
          // ---

          // ToolbarCustomItem
          { kind: 'custom', key: 'custom', content: 'Custom' },
          { kind: 'custom', key: 'custom-variables', content: 'Custom', variables: { background: 'pink' } },

          // ToolbarItem
          {
            // switched to svg icon
            icon: <CallVideoIcon />,
            key: 'item',
            active: true,
            title: 'Call Video',
          },
          {
            icon: <CallVideoIcon />,
            key: 'item-variables',
            active: true,
            title: 'Call Video',
            variables: { foregroundActive: 'green' },
          },

          // ToolbarItem with menu
          {
            icon: <MoreIcon />,
            key: 'item-menu',
            title: 'Menu',
            menu: {
              accessibility: notAutoFocusToolbarMenuBehavior,
              popper: {
                align: 'end',
                position: 'after',
              },
              items: [
                // ToolbarMenuDivider
                { kind: 'divider', key: 'divider' },
                { kind: 'divider', key: 'divider-variables', variables: { menuDividerBorder: 'orange' } },

                // ToolbarMenuItem
                { key: 'item', content: 'Item' },
                { key: 'item-variables', content: 'Item', variables: { menuItemForeground: 'orange' } },

                // ToolbarMenuItem with menu
                {
                  key: 'item-menu',
                  content: 'Item',
                  menu: {
                    accessibility: notAutoFocusToolbarMenuBehavior,
                    items: [
                      { key: 'item', content: 'Item' },
                      { key: 'item-variables', content: 'Item', variables: { menuItemForeground: 'gold' } },
                    ],
                    styles: { width: '100px' /* decrease width to fit other menus */ },
                  },
                  menuOpen: true,
                },
                {
                  key: 'item-menu-variables',
                  content: 'Item',
                  menu: {
                    accessibility: notAutoFocusToolbarMenuBehavior,
                    items: [
                      { key: 'item', content: 'Item' },
                      { key: 'item-variables', content: 'Item', variables: { menuItemForeground: 'gold' } },
                    ],
                    styles: { width: '100px' /* decrease width to fit other menus */ },
                  },
                  menuOpen: true,
                  variables: { menuItemForeground: 'orange', menuBackground: 'grey' },
                  styles: {
                    marginTop: '100px' /* avoid collision with other opened menu */,
                  },
                },
              ],
              styles: { width: '100px' /* decrease width to fit other menus */ },
            },
            menuOpen: menu === 'item-menu',
          },
          {
            icon: <MoreIcon />,
            key: 'item-menu-variables',
            title: 'Menu',
            menu: {
              accessibility: notAutoFocusToolbarMenuBehavior,
              popper: {
                align: 'end',
                position: 'after',
              },
              items: [
                { kind: 'divider', key: 'divider' },
                { kind: 'divider', key: 'divider-variables', variables: { menuDividerBorder: 'orange' } },

                // ToolbarMenuItem
                { key: 'item', content: 'Item' },
                { key: 'item-variables', content: 'Item', variables: { menuItemForeground: 'orange' } },
                // ToolbarMenuItem with menu
                {
                  key: 'item-menu',
                  content: 'Item',
                  menu: {
                    accessibility: notAutoFocusToolbarMenuBehavior,
                    items: [
                      { key: 'item', content: 'Item' },
                      { key: 'item-variables', content: 'Item', variables: { menuItemForeground: 'gold' } },
                    ],
                    styles: { width: '100px' /* decrease width to fit other menus */ },
                  },
                  menuOpen: true,
                },
                {
                  key: 'item-menu-variables',
                  content: 'Item',
                  menu: {
                    accessibility: notAutoFocusToolbarMenuBehavior,
                    items: [
                      { key: 'item', content: 'Item' },
                      { key: 'item-variables', content: 'Item', variables: { menuItemForeground: 'gold' } },
                    ],
                    styles: { width: '100px' /* decrease width to fit other menus */ },
                  },
                  menuOpen: true,
                  variables: { menuItemForeground: 'orange', menuBackground: 'grey' },
                  styles: { marginTop: '100px' /* avoid collision with other opened menu */ },
                },
              ],
              styles: { width: '100px' /* decrease width to fit other menus */ },
            },
            menuOpen: menu === 'item-menu-variables',
            variables: { menuBackground: 'pink', menuDividerBorder: 'white', menuItemForeground: 'olive' },
          },
        ]}
      />
      <button id="open-menu" onClick={() => dispatch('item-menu')}>
        Open usual menu
      </button>
      <button id="open-menu-variables" onClick={() => dispatch('item-menu-variables')}>
        Open styled menu
      </button>
    </>
  );
};

export default ToolbarExampleVariables;
