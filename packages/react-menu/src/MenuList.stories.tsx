import * as React from 'react';

import {
  MenuList,
  MenuItem,
  MenuItemCheckbox,
  MenuItemRadio,
  MenuGroup,
  MenuDivider,
  MenuGroupHeader,
  MenuItemCheckboxProps,
  MenuItemRadioProps,
  MenuListProps,
} from './index';
import { makeStyles } from '@fluentui/react-make-styles';

import { CutIcon, PasteIcon, EditIcon } from './tmp-icons.stories';

const useStyles = makeStyles({
  container: theme => ({
    backgroundColor: theme.alias.color.neutral.neutralBackground1,
    minWidth: '128px',
    minHeight: '48px',
    maxWidth: '300px',
    width: 'max-content',
    boxShadow: `${theme.alias.shadow.shadow16}`,
    paddingTop: '4px',
    paddingBottom: '4px',
  }),
});

const Container: React.FC = props => {
  const styles = useStyles();
  return <div className={styles.container}>{props.children}</div>;
};

export const TextOnly = () => (
  <Container>
    <MenuList>
      <MenuItem>Cut</MenuItem>
      <MenuItem>Paste</MenuItem>
      <MenuItem>Edit</MenuItem>
    </MenuList>
  </Container>
);

export const ShortcutText = () => (
  <Container>
    <MenuList>
      <MenuItem secondaryContent="Ctrl+N">New File</MenuItem>
      <MenuItem secondaryContent="Ctrl+Shift+N">New Window</MenuItem>
      <MenuItem secondaryContent="Ctrl+O">Open File</MenuItem>
    </MenuList>
  </Container>
);

export const WithIconsExample = () => (
  <Container>
    <MenuList>
      <MenuItem icon={<CutIcon />}>Cut</MenuItem>
      <MenuItem icon={<PasteIcon />}>Paste</MenuItem>
      <MenuItem icon={<EditIcon />}>Edit</MenuItem>
    </MenuList>
  </Container>
);

export const AligningWithIcons = () => (
  <Container>
    <MenuList hasIcons>
      <MenuItem>Cut</MenuItem>
      <MenuItem icon={<PasteIcon />}>Paste</MenuItem>
      <MenuItem>Edit</MenuItem>
    </MenuList>
  </Container>
);

export const AligningWithSelectableItems = () => (
  <Container>
    <MenuList hasCheckmarks hasIcons>
      <MenuItemCheckbox icon={<CutIcon />} name="edit" value="cut">
        Checkbox item
      </MenuItemCheckbox>
      <MenuItem>Menu item</MenuItem>
      <MenuItem>Menu item</MenuItem>
    </MenuList>
  </Container>
);

export const WithGroups = () => (
  <Container>
    <MenuList>
      <MenuGroup>
        <MenuGroupHeader>Section header</MenuGroupHeader>
        <MenuItem icon={<CutIcon />}>Cut</MenuItem>
        <MenuItem icon={<PasteIcon />}>Paste</MenuItem>
        <MenuItem icon={<EditIcon />}>Edit</MenuItem>
      </MenuGroup>
      <MenuDivider />
      <MenuGroup>
        <MenuGroupHeader>Section header</MenuGroupHeader>
        <MenuItem icon={<CutIcon />}>Cut</MenuItem>
        <MenuItem icon={<PasteIcon />}>Paste</MenuItem>
        <MenuItem icon={<EditIcon />}>Edit</MenuItem>
      </MenuGroup>
    </MenuList>
  </Container>
);

export const WithDivider = () => (
  <Container>
    <MenuList>
      <MenuItem icon={<CutIcon />}>Cut</MenuItem>
      <MenuItem icon={<PasteIcon />}>Paste</MenuItem>
      <MenuItem icon={<EditIcon />}>Edit</MenuItem>
      <MenuDivider />
      <MenuItem icon={<CutIcon />}>Cut</MenuItem>
      <MenuItem icon={<PasteIcon />}>Paste</MenuItem>
      <MenuItem icon={<EditIcon />}>Edit</MenuItem>
    </MenuList>
  </Container>
);

export const CheckboxItems = (props: { defaultCheckedValues?: MenuListProps['defaultCheckedValues'] }) => {
  return (
    <Container>
      <MenuList defaultCheckedValues={props.defaultCheckedValues}>
        <MenuItemCheckbox icon={<CutIcon />} name="edit" value="cut">
          Cut
        </MenuItemCheckbox>
        <MenuItemCheckbox icon={<PasteIcon />} name="edit" value="paste">
          Paste
        </MenuItemCheckbox>
        <MenuItemCheckbox icon={<EditIcon />} name="edit" value="edit">
          Edit
        </MenuItemCheckbox>
      </MenuList>
    </Container>
  );
};

export const RadioItems = () => {
  return (
    <Container>
      <MenuList>
        <MenuItemRadio icon={<CutIcon />} name="font" value="segoe">
          Segoe
        </MenuItemRadio>
        <MenuItemRadio icon={<PasteIcon />} name="font" value="calibri">
          Calibri
        </MenuItemRadio>
        <MenuItemRadio icon={<EditIcon />} name="font" value="arial">
          Arial
        </MenuItemRadio>
      </MenuList>
    </Container>
  );
};

export const DefaultCheckedValues = () => <CheckboxItems defaultCheckedValues={{ edit: ['cut'] }} />;

export const SelectionGroups = () => {
  return (
    <Container>
      <MenuList>
        <MenuGroup>
          <MenuGroupHeader>Checkbox group</MenuGroupHeader>
          <MenuItemCheckbox icon={<CutIcon />} name="edit" value="cut">
            Cut
          </MenuItemCheckbox>
          <MenuItemCheckbox icon={<PasteIcon />} name="edit" value="paste">
            Paste
          </MenuItemCheckbox>
          <MenuItemCheckbox icon={<EditIcon />} name="edit" value="edit">
            Edit
          </MenuItemCheckbox>
        </MenuGroup>
        <MenuDivider />
        <MenuGroup>
          <MenuGroupHeader>Radio group</MenuGroupHeader>
          <MenuItemRadio icon={<CutIcon />} name="font" value="segoe">
            Segoe
          </MenuItemRadio>
          <MenuItemRadio icon={<PasteIcon />} name="font" value="calibri">
            Caliri
          </MenuItemRadio>
          <MenuItemRadio icon={<EditIcon />} name="font" value="arial">
            Arial
          </MenuItemRadio>
        </MenuGroup>
      </MenuList>
    </Container>
  );
};

const MemoRadio = React.memo((props: MenuItemRadioProps) => {
  // use icons in the memo because JSX will always create a new object
  // possible to memoize icons but it can be overkill
  return (
    <MenuItemRadio icon={<EditIcon />} name={props.name} value={props.value}>
      {props.children}
    </MenuItemRadio>
  );
});

export const MemoRadioItems = () => {
  return (
    <Container>
      <MenuList>
        <MemoRadio name="font" value="segoe">
          Segoe
        </MemoRadio>
        <MemoRadio name="font" value="calibri">
          Calibri
        </MemoRadio>
        <MemoRadio name="font" value="arial">
          Arial
        </MemoRadio>
      </MenuList>
    </Container>
  );
};

const MemoCheckbox = React.memo((props: MenuItemCheckboxProps) => {
  // use icons in the memo because JSX will always create a new object
  // possible to memoize icons but it can be overkill
  return (
    <MenuItemCheckbox icon={<EditIcon />} name={props.name} value={props.value}>
      {props.children}
    </MenuItemCheckbox>
  );
});

export const MemoCheckboxItems = () => {
  return (
    <Container>
      <MenuList>
        <MemoCheckbox name="font" value="segoe">
          Segoe
        </MemoCheckbox>
        <MemoCheckbox name="font" value="calibri">
          Calibri
        </MemoCheckbox>
        <MemoCheckbox name="font" value="arial">
          Arial
        </MemoCheckbox>
      </MenuList>
    </Container>
  );
};

export const CheckboxItemsControlled = () => {
  const [checkedValues, setCheckedValues] = React.useState<Record<string, string[]>>({});
  const onChange = (e: React.SyntheticEvent, name: string, items: string[]) => {
    setCheckedValues(s => {
      return s ? { ...s, [name]: items } : { [name]: items };
    });
  };

  return (
    <Container>
      <MenuList checkedValues={checkedValues} onCheckedValueChange={onChange}>
        <MenuItemCheckbox icon={<CutIcon />} name="edit" value="cut">
          Cut
        </MenuItemCheckbox>
        <MenuItemCheckbox icon={<PasteIcon />} name="edit" value="paste">
          Paste
        </MenuItemCheckbox>
        <MenuItemCheckbox icon={<EditIcon />} name="edit" value="edit">
          Edit
        </MenuItemCheckbox>
      </MenuList>
    </Container>
  );
};

export const RadioItemsControlled = () => {
  const [checkedValues, setCheckedValues] = React.useState<Record<string, string[]>>({ checkbox: ['2'] });
  const onChange = (e: React.SyntheticEvent, name: string, items: string[]) => {
    setCheckedValues(s => ({ ...s, [name]: items }));
  };

  return (
    <Container>
      <MenuList checkedValues={checkedValues} onCheckedValueChange={onChange}>
        <MenuItemRadio icon={<CutIcon />} name="font" value="segoe">
          Segoe
        </MenuItemRadio>
        <MenuItemRadio icon={<PasteIcon />} name="font" value="calibri">
          Calibri
        </MenuItemRadio>
        <MenuItemRadio icon={<EditIcon />} name="font" value="arial">
          Arial
        </MenuItemRadio>
      </MenuList>
    </Container>
  );
};

export default {
  // use the Components prefix and (react-menu) suffix to have the same naming convention as react-examples
  title: 'Components/MenuList',
  component: MenuList,
};
