import * as React from 'react';
import {
  Button,
  Popover,
  PopoverSurface,
  PopoverTrigger,
  makeStyles,
  shorthands,
  MaterialTypeProvider,
  Tooltip,
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItem,
  MenuDivider,
  Dropdown,
  OptionGroup,
  Option,
  Combobox,
  MaterialType,
} from '@fluentui/react-components';

import {
  bundleIcon,
  CutRegular,
  CutFilled,
  ClipboardPasteRegular,
  ClipboardPasteFilled,
  EditRegular,
  EditFilled,
} from '@fluentui/react-icons';

const CutIcon = bundleIcon(CutFilled, CutRegular);
const PasteIcon = bundleIcon(ClipboardPasteFilled, ClipboardPasteRegular);
const EditIcon = bundleIcon(EditFilled, EditRegular);

const useStyles = makeStyles({
  container: {
    display: 'inline-flex',
    flexWrap: 'wrap',
    rowGap: '10px',
    columnGap: '10px',
    backgroundColor: 'cornflowerblue',
    ...shorthands.borderRadius('8px'),
    ...shorthands.padding('15px', '100px', '15px', '20px'),
  },
  contentHeader: {
    marginTop: '0',
  },
});

const Surfaces = () => {
  const styles = useStyles();
  return (
    <div className={styles.container}>
      <Popover positioning={'after-top'}>
        <PopoverTrigger disableButtonEnhancement>
          <Button>Popover</Button>
        </PopoverTrigger>

        <PopoverSurface tabIndex={-1}>
          <h3 className={styles.contentHeader}>Popover content</h3>
          <p>This is some popover content</p>
          <Button>Here's a button</Button>
        </PopoverSurface>
      </Popover>
      <Tooltip content="tooltip content example" relationship="label">
        <Button>Tooltip</Button>
      </Tooltip>
      <Menu>
        <MenuTrigger disableButtonEnhancement>
          <Button>Menu</Button>
        </MenuTrigger>

        <MenuPopover>
          <MenuList>
            <MenuItem icon={<CutIcon />}>Cut</MenuItem>
            <MenuItem icon={<PasteIcon />}>Paste</MenuItem>
            <MenuItem icon={<EditIcon />}>Edit</MenuItem>
            <MenuDivider />
            <MenuItem icon={<CutIcon />}>Cut</MenuItem>
            <MenuItem icon={<PasteIcon />}>Paste</MenuItem>
            <MenuItem icon={<EditIcon />}>Edit</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
      <Dropdown placeholder="Dropdown">
        <OptionGroup label="Land">
          {['Cat', 'Dog', 'Ferret', 'Hamster'].map(option => (
            <Option key={option} disabled={option === 'Ferret'}>
              {option}
            </Option>
          ))}
        </OptionGroup>
        <OptionGroup label="Sea">
          {['Fish', 'Jellyfish', 'Octopus', 'Seal'].map(option => (
            <Option key={option}>{option}</Option>
          ))}
        </OptionGroup>
      </Dropdown>
      <Combobox placeholder="Select an animal">
        <OptionGroup label="Land">
          {['Cat', 'Dog', 'Ferret', 'Hamster'].map(option => (
            <Option key={option} disabled={option === 'Ferret'}>
              {option}
            </Option>
          ))}
        </OptionGroup>
        <OptionGroup label="Sea">
          {['Fish', 'Jellyfish', 'Octopus', 'Seal'].map(option => (
            <Option key={option}>{option}</Option>
          ))}
        </OptionGroup>
      </Combobox>
    </div>
  );
};

export const Material = () => (
  <>
    <MaterialTypeProvider value={MaterialType.Opaque}>
      <h4>Opaque</h4>
      <Surfaces />
    </MaterialTypeProvider>
    <MaterialTypeProvider value={MaterialType.SemiOpaque}>
      <h4>Semi-Opaque</h4>
      <Surfaces />
    </MaterialTypeProvider>
    <MaterialTypeProvider value={MaterialType.Translucent}>
      <h4>Translucent</h4>
      <Surfaces />
    </MaterialTypeProvider>
    <MaterialTypeProvider value={MaterialType.SemiTransparent}>
      <h4>Semi-Transparent</h4>
      <Surfaces />
    </MaterialTypeProvider>
  </>
);
