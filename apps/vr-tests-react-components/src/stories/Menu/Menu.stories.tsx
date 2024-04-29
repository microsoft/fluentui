import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { Steps, StoryWright } from 'storywright';
import {
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
  MenuSplitGroup,
  MenuItemLink,
  MenuItemSwitch,
} from '@fluentui/react-menu';
import { CutRegular, EditRegular, ClipboardPasteRegular } from '@fluentui/react-icons';

storiesOf('Menu Converged - basic', module)
  .addDecorator(story => (
    <StoryWright steps={new Steps().hover('[role="menuitem"]').snapshot('hover menuitem').end()}>{story()}</StoryWright>
  ))
  .addStory(
    'default',
    () => (
      <Menu open>
        <MenuTrigger>
          <button>Toggle menu</button>
        </MenuTrigger>

        <MenuPopover>
          <MenuList>
            <MenuItem icon={<CutRegular />}>Cut</MenuItem>
            <MenuItem icon={<EditRegular />}>Edit</MenuItem>
            <MenuItem icon={<ClipboardPasteRegular />}>Paste</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
    ),
    { includeRtl: true },
  );

storiesOf('Menu Converged - MenuItemLinks', module)
  .addDecorator(story => (
    <StoryWright steps={new Steps().hover('[role="menuitem"]').snapshot('hover menuitemlink').end()}>
      {story()}
    </StoryWright>
  ))
  .addStory('default', () => (
    <Menu open>
      <MenuTrigger>
        <button>Toggle menu</button>
      </MenuTrigger>

      <MenuPopover>
        <MenuList>
          <MenuItemLink href="#" icon={<CutRegular />}>
            Cut
          </MenuItemLink>
          <MenuItemLink href="#" icon={<EditRegular />}>
            Edit
          </MenuItemLink>
          <MenuItemLink href="#" icon={<ClipboardPasteRegular />}>
            Paste
          </MenuItemLink>
        </MenuList>
      </MenuPopover>
    </Menu>
  ));

storiesOf('Menu Converged - secondary content', module)
  .addDecorator(story => (
    <StoryWright steps={new Steps().hover('[role="menuitem"]').snapshot('hover menuitem').end()}>{story()}</StoryWright>
  ))
  .addStory(
    'default',
    () => (
      <Menu open>
        <MenuTrigger>
          <button>Toggle menu</button>
        </MenuTrigger>

        <MenuPopover>
          <MenuList>
            <MenuItem icon={<CutRegular />} secondaryContent="Ctrl+X">
              Cut
            </MenuItem>
            <MenuItem icon={<EditRegular />}>Edit</MenuItem>
            <MenuItem icon={<ClipboardPasteRegular />} secondaryContent="Ctrl+P">
              Paste
            </MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
    ),
    { includeRtl: true },
  );

storiesOf('Menu Converged - long content', module)
  .addDecorator(story => <StoryWright>{story()}</StoryWright>)
  .addStory(
    'default',
    () => (
      <Menu open>
        <MenuTrigger>
          <button>Toggle menu</button>
        </MenuTrigger>

        <MenuPopover>
          <MenuList>
            <MenuItem icon={<CutRegular />}>Cut</MenuItem>
            <MenuDivider />
            <MenuItem icon={<ClipboardPasteRegular />} secondaryContent="Ctrl+P">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Nisl pretium fusce id velit ut tortor.
            </MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
    ),
    { includeRtl: true },
  );

storiesOf('Menu Converged - groups', module)
  .addDecorator(story => <StoryWright>{story()}</StoryWright>)
  .addStory(
    'default',
    () => (
      <Menu open>
        <MenuTrigger>
          <button>Toggle menu</button>
        </MenuTrigger>

        <MenuPopover>
          <MenuList>
            <MenuGroup>
              <MenuGroupHeader>Section header</MenuGroupHeader>
              <MenuItem icon={<CutRegular />}>Cut</MenuItem>
              <MenuItem icon={<ClipboardPasteRegular />}>Paste</MenuItem>
              <MenuItem icon={<EditRegular />}>Edit</MenuItem>
            </MenuGroup>
            <MenuDivider />
            <MenuGroup>
              <MenuGroupHeader>Section header</MenuGroupHeader>
              <MenuItem icon={<CutRegular />}>Cut</MenuItem>
              <MenuItem icon={<ClipboardPasteRegular />}>Paste</MenuItem>
              <MenuItem icon={<EditRegular />}>Edit</MenuItem>
            </MenuGroup>
          </MenuList>
        </MenuPopover>
      </Menu>
    ),
    { includeRtl: true, includeHighContrast: true, includeDarkMode: true },
  );

storiesOf('Menu Converged - selection', module)
  .addDecorator(story => (
    <StoryWright steps={new Steps().click('[role="menuitemcheckbox"]').snapshot('selected').end()}>
      {story()}
    </StoryWright>
  ))
  .addStory(
    'checkbox',
    () => (
      <Menu open>
        <MenuTrigger>
          <button>Toggle menu</button>
        </MenuTrigger>

        <MenuPopover>
          <MenuList>
            <MenuItemCheckbox icon={<CutRegular />} name="edit" value="cut">
              Cut
            </MenuItemCheckbox>
            <MenuItemCheckbox icon={<ClipboardPasteRegular />} name="edit" value="paste">
              Paste
            </MenuItemCheckbox>
            <MenuItemCheckbox icon={<EditRegular />} name="edit" value="edit">
              Edit
            </MenuItemCheckbox>
          </MenuList>
        </MenuPopover>
      </Menu>
    ),
    { includeRtl: true, includeHighContrast: true, includeDarkMode: true },
  )
  .addStory(
    'switch',
    () => (
      <Menu open checkedValues={{ demo: ['checked'] }}>
        <MenuTrigger>
          <button>Toggle menu</button>
        </MenuTrigger>

        <MenuPopover>
          <MenuList>
            <MenuItemSwitch icon={<CutRegular />} name="demo" value="unchecked">
              Unchecked
            </MenuItemSwitch>
            <MenuItemSwitch icon={<ClipboardPasteRegular />} name="demo" value="checked">
              Checked
            </MenuItemSwitch>
          </MenuList>
        </MenuPopover>
      </Menu>
    ),
    { includeRtl: true, includeHighContrast: true, includeDarkMode: true },
  );

storiesOf('Menu Converged - selection groups', module)
  .addDecorator(story => (
    <StoryWright steps={new Steps().click('[role="menuitemcheckbox"]').snapshot('selected').end()}>
      {story()}
    </StoryWright>
  ))
  .addStory(
    'default',
    () => (
      <Menu open>
        <MenuTrigger>
          <button>Toggle menu</button>
        </MenuTrigger>

        <MenuPopover>
          <MenuList>
            <MenuGroup>
              <MenuGroupHeader>Checkbox group</MenuGroupHeader>
              <MenuItemCheckbox icon={<CutRegular />} name="edit" value="cut">
                Cut
              </MenuItemCheckbox>
              <MenuItemCheckbox icon={<ClipboardPasteRegular />} name="edit" value="paste">
                Paste
              </MenuItemCheckbox>
              <MenuItemCheckbox icon={<EditRegular />} name="edit" value="edit">
                Edit
              </MenuItemCheckbox>
            </MenuGroup>
            <MenuDivider />
            <MenuGroup>
              <MenuGroupHeader>Radio group</MenuGroupHeader>
              <MenuItemRadio icon={<CutRegular />} name="font" value="segoe">
                Segoe
              </MenuItemRadio>
              <MenuItemRadio icon={<ClipboardPasteRegular />} name="font" value="calibri">
                Caliri
              </MenuItemRadio>
              <MenuItemRadio icon={<EditRegular />} name="font" value="arial">
                Arial
              </MenuItemRadio>
            </MenuGroup>
          </MenuList>
        </MenuPopover>
      </Menu>
    ),
    { includeRtl: true },
  );

storiesOf('Menu Converged - nested submenus', module)
  .addDecorator(story => (
    // https://github.com/microsoft/fluentui/issues/19782
    <StoryWright steps={new Steps().click('#nestedTrigger').snapshot('all open').end()}>{story()}</StoryWright>
  ))
  .addStory(
    'default',
    () => (
      <Menu open>
        <MenuTrigger>
          <button>Toggle menu</button>
        </MenuTrigger>

        <MenuPopover>
          <MenuList>
            <MenuItem>New </MenuItem>
            <MenuItem>New Window</MenuItem>
            <MenuItem>Open Folder</MenuItem>
            <Menu>
              <MenuTrigger>
                <MenuItem id="nestedTrigger">Preferences</MenuItem>
              </MenuTrigger>

              <MenuPopover>
                <MenuList>
                  <MenuItem>New </MenuItem>
                  <MenuItem>New Window</MenuItem>
                  <MenuItem>Open Folder</MenuItem>
                </MenuList>
              </MenuPopover>
            </Menu>
          </MenuList>
        </MenuPopover>
      </Menu>
    ),
    { includeRtl: true },
  );

storiesOf('Menu Converged - split item', module)
  .addDecorator(story => (
    // https://github.com/microsoft/fluentui/issues/19782
    <StoryWright steps={new Steps().click('#nestedTrigger').snapshot('submenu open').end()}>{story()}</StoryWright>
  ))
  .addStory(
    'default',
    () => (
      <Menu open>
        <MenuTrigger>
          <button>Toggle menu</button>
        </MenuTrigger>

        <MenuPopover>
          <MenuList>
            <MenuItem>New </MenuItem>
            <MenuItem>New Window</MenuItem>
            <MenuItem>Open Folder</MenuItem>
            <Menu>
              <MenuSplitGroup>
                <MenuItem>Open</MenuItem>
                <MenuTrigger>
                  <MenuItem id="nestedTrigger" />
                </MenuTrigger>
              </MenuSplitGroup>

              <MenuPopover>
                <MenuList>
                  <MenuItem>In browser</MenuItem>
                  <MenuItem>In desktop app</MenuItem>
                  <MenuItem>In mobile</MenuItem>
                </MenuList>
              </MenuPopover>
            </Menu>
          </MenuList>
        </MenuPopover>
      </Menu>
    ),
    { includeRtl: true },
  );

const ContextMenuArea = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div
      ref={ref}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid red ',
        width: 300,
        height: 300,
      }}
      {...props}
    >
      <Menu open>
        <MenuTrigger>
          <button>Toggle menu</button>
        </MenuTrigger>

        <MenuPopover>
          <MenuList>
            <MenuItem>New </MenuItem>
            <MenuItem>New Window</MenuItem>
            <MenuItem disabled>Open File</MenuItem>
            <Menu>
              <MenuTrigger>
                <MenuItem id="nestedTrigger">Open Folder</MenuItem>
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
          </MenuList>
        </MenuPopover>
      </Menu>
    </div>
  );
});

storiesOf('Menu nested within a MenuTrigger', module)
  .addDecorator(story => (
    // https://github.com/microsoft/fluentui/issues/19782
    <StoryWright steps={new Steps().click('#nestedTrigger').snapshot('submenu open').end()}>{story()}</StoryWright>
  ))
  .addStory('default', () => (
    <Menu openOnContext>
      <MenuTrigger>
        <ContextMenuArea />
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
  ));

// this places text in the icon slot to verify alignment when not using v9 icons
storiesOf('Menu Converged - icon slotted content', module)
  .addDecorator(story => (
    <StoryWright steps={new Steps().hover('[role="menuitem"]').snapshot('hover menuitem').end()}>{story()}</StoryWright>
  ))
  .addStory(
    'default',
    () => (
      <Menu open>
        <MenuTrigger>
          <button>Toggle menu</button>
        </MenuTrigger>

        <MenuPopover>
          <MenuList>
            <MenuItem icon={<span>X</span>} secondaryContent="Ctrl+X">
              Cut
            </MenuItem>
            <MenuItem icon={<span>C</span>} secondaryContent="Ctrl+C">
              Copy
            </MenuItem>
            <MenuItem icon={<span>V</span>} secondaryContent="Ctrl+V">
              Paste
            </MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
    ),
    { includeRtl: true },
  );

// this places text in the submenuIndicator slot to verify alignment when not using v9 icons
storiesOf('Menu Converged - submenuIndicator slotted content', module)
  .addDecorator(story => (
    <StoryWright steps={new Steps().click('#nestedTrigger1').click('#nestedTrigger2').snapshot('submenus open').end()}>
      {story()}
    </StoryWright>
  ))
  .addStory(
    'default',
    () => (
      <Menu open>
        <MenuTrigger>
          <button>Toggle menu</button>
        </MenuTrigger>

        <MenuPopover>
          <MenuList>
            <Menu>
              <MenuTrigger>
                <MenuItem id="nestedTrigger1" submenuIndicator={<span>N</span>}>
                  New
                </MenuItem>
              </MenuTrigger>

              <MenuPopover>
                <MenuList>
                  <MenuItem>File </MenuItem>
                  <MenuItem>Folder</MenuItem>
                  <Menu>
                    <MenuTrigger>
                      <MenuItem id="nestedTrigger2" submenuIndicator={<span>P</span>}>
                        Project
                      </MenuItem>
                    </MenuTrigger>

                    <MenuPopover>
                      <MenuList>
                        <MenuItem>Financial</MenuItem>
                        <MenuItem>Planning</MenuItem>
                        <MenuItem>Status</MenuItem>
                      </MenuList>
                    </MenuPopover>
                  </Menu>
                </MenuList>
              </MenuPopover>
            </Menu>
          </MenuList>
        </MenuPopover>
      </Menu>
    ),
    { includeRtl: true },
  );
