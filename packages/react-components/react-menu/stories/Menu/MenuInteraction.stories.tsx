import * as React from 'react';
import { Button, Menu, MenuTrigger, MenuList, MenuItem, MenuPopover } from '@fluentui/react-components';
import {
  bundleIcon,
  ClipboardPasteRegular,
  ClipboardPasteFilled,
  CutRegular,
  CutFilled,
  CopyRegular,
  CopyFilled,
} from '@fluentui/react-icons';
import type { MenuProps } from '@fluentui/react-components';

const PasteIcon = bundleIcon(ClipboardPasteFilled, ClipboardPasteRegular);
const CopyIcon = bundleIcon(CopyFilled, CopyRegular);
const CutIcon = bundleIcon(CutFilled, CutRegular);

export const Interaction = (props: Partial<MenuProps>) => {
  return (
    <Menu {...props}>
      <MenuTrigger disableButtonEnhancement>
        <Button>Edit content</Button>
      </MenuTrigger>

      <MenuPopover>
        <MenuList>
          <MenuItem icon={<CutIcon />} onClick={() => alert('Cut to clipboard')}>
            Cut
          </MenuItem>
          <MenuItem icon={<CopyIcon />} onClick={() => alert('Copied to clipboard')}>
            Copy
          </MenuItem>
          <MenuItem icon={<PasteIcon />} onClick={() => alert('Pasted from clipboard')}>
            Paste
          </MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};

Interaction.parameters = {
  docs: {
    description: {
      story: [
        'Each sub component of the `Menu` that renders DOM elements can be assigned HTML event listeners.',
        'You can simply add an `onClick` listener to individual `MenuItem` without needing to control the entire',
        'component. Special handling is required for checkboxes and radio items inside a `Menu`, read the further',
        'examples below to see how to handle those variants.',
      ].join('\n'),
    },
  },
};
