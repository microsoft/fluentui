import { Button, Menu, MenuTrigger, MenuList, MenuItem, MenuPopover, type MenuProps } from '@fluentui/react-components';
import * as React from 'react';

type PositioningProp = NonNullable<MenuProps['positioning']>;

const AppearanceSubMenu = ({ positioning }: { positioning: PositioningProp }) => {
  return (
    <Menu open positioning={positioning}>
      <MenuTrigger disableButtonEnhancement>
        <MenuItem>Appearance</MenuItem>
      </MenuTrigger>

      <MenuPopover>
        <MenuList>
          <MenuItem>Centered Layout with items & tabs</MenuItem>
          <MenuItem disabled>Zoom In</MenuItem>
          <MenuItem>Zoom Out</MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};

const PreferencesSubMenu = ({
  positioning,
  appearancePositioning,
}: {
  positioning: PositioningProp;
  appearancePositioning: PositioningProp;
}) => {
  return (
    <Menu positioning={positioning}>
      <MenuTrigger disableButtonEnhancement>
        <MenuItem>Preferences</MenuItem>
      </MenuTrigger>

      <MenuPopover>
        <MenuList>
          <MenuItem>Settings</MenuItem>
          <MenuItem>Online Services Settings</MenuItem>
          <MenuItem>Extensions</MenuItem>
          <AppearanceSubMenu positioning={appearancePositioning} />
          <MenuItem>Keyboard Shortcuts</MenuItem>
          <MenuItem>Editor</MenuItem>
          <MenuItem>Options</MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};

const NestedSubmenu = ({
  positioning,
  preferencesPositioning,
  appearancePositioning,
}: {
  positioning: PositioningProp;
  preferencesPositioning: PositioningProp;
  appearancePositioning: PositioningProp;
}) => {
  return (
    <Menu positioning={positioning}>
      <MenuTrigger disableButtonEnhancement>
        <Button>Toggle menu</Button>
      </MenuTrigger>

      <MenuPopover>
        <MenuList>
          <MenuItem>New</MenuItem>
          <MenuItem>New Window</MenuItem>
          <MenuItem disabled>Open File</MenuItem>
          <MenuItem>Open Folder</MenuItem>
          <PreferencesSubMenu positioning={preferencesPositioning} appearancePositioning={appearancePositioning} />
          <PreferencesSubMenu positioning={preferencesPositioning} appearancePositioning={appearancePositioning} />
          <MenuItem>Save file</MenuItem>
          <MenuItem>Save all files</MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};

export const NestedSubmenus = () => {
  return (
    <div
      style={{
        display: 'grid',
        margin: '0 50px',
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: '300px 300px',
        gap: '50px',
      }}
    >
      <>
        <div>
          <NestedSubmenu
            positioning={{ align: 'start', position: 'below' }}
            preferencesPositioning={{ align: 'center', position: 'after' }}
            appearancePositioning={{ align: 'center', position: 'after' }}
          />
        </div>
        <div style={{ justifySelf: 'end' }}>
          {/*<NestedSubmenu*/}
          {/*  positioning={{ align: 'end', position: 'below' }}*/}
          {/*  preferencesPositioning={{ align: 'top', position: 'before' }}*/}
          {/*  appearancePositioning={{ align: 'start', position: 'below' }}*/}
          {/*/>*/}
        </div>

        <div style={{ alignSelf: 'end' }}>
          {/*<NestedSubmenu*/}
          {/*  positioning={{ align: 'start', position: 'above' }}*/}
          {/*  preferencesPositioning={{ align: 'bottom', position: 'after' }}*/}
          {/*  appearancePositioning={{ align: 'center', position: 'above' }}*/}
          {/*/>*/}
        </div>
        {/*<div style={{ alignSelf: 'end', justifySelf: 'end' }}>*/}
        {/*  <NestedSubmenu*/}
        {/*    positioning={{ align: 'end', position: 'above' }}*/}
        {/*    preferencesPositioning={{ align: 'bottom', position: 'before' }}*/}
        {/*    appearancePositioning={{ align: 'end', position: 'above' }}*/}
        {/*  />*/}
        {/*</div>*/}
      </>
    </div>
  );
};

NestedSubmenus.parameters = {
  layout: 'padded',
  docs: {
    description: {
      story: [
        'Menus can be nested within each other to render application submenus.',
        'Submenus are a complex control for any app, make sure you need them.',
        '',
        '- Try and limit nesting to 2 levels.',
        '- Creating submenus as separate components will result in more maintainable code.',
      ].join('\n'),
    },
  },
};
