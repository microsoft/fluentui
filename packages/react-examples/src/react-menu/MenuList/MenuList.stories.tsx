import * as React from 'react';

import {
  MenuList,
  MenuItem,
  MenuItemCheckbox,
  MenuItemRadio,
  MenuGroup,
  MenuDivider,
  MenuGroupHeader,
} from '@fluentui/react-menu';
import { CutIcon as Cut, PasteIcon as Paste, EditIcon as Edit, AcceptIcon as Accept } from '@fluentui/react-icons-mdl2';
import { makeStyles } from '@fluentui/react-make-styles';

const useContainerStyles = makeStyles([
  // This should eventually be the popup container styles
  [
    null,
    theme => ({
      backgroundColor: theme.alias.color.neutral.neutralBackground1,
      width: 'fit-content',
      minWidth: '128px',
      minHeight: '48px',
      maxWidth: '300px',
      boxShadow: `${theme.alias.shadow.shadow16}`,
      paddingTop: '4px',
      paddingBottom: '4px',
    }),
  ],
]);
const Container: React.FC = props => {
  const classNames = useContainerStyles({});
  return <div className={classNames}>{props.children}</div>;
};

const AcceptIcon = React.memo(() => <Accept />);
const CutIcon = React.memo(() => <Cut />);
const PasteIcon = React.memo(() => <Paste />);
const EditIcon = React.memo(() => <Edit />);

export const MenuListExample = () => (
  <Container>
    <MenuList>
      <MenuItem>Cut</MenuItem>
      <MenuItem>Paste</MenuItem>
      <MenuItem>Edit</MenuItem>
    </MenuList>
  </Container>
);

export const MenuListWithIconsExample = () => (
  <Container>
    <MenuList>
      <MenuItem icon={<CutIcon />}>Cut</MenuItem>
      <MenuItem icon={<PasteIcon />}>Paste</MenuItem>
      <MenuItem icon={<EditIcon />}>Edit</MenuItem>
    </MenuList>
  </Container>
);

export const MenuListWithGroups = () => (
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

export const MenuListWithDivider = () => (
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

export const MenuListWithCheckboxes = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const [state, dispatch] = React.useReducer((prevState, payload) => {
    return {
      ...prevState,
      [payload.name]: payload.items,
    };
  }, {});

  const onChange = React.useCallback(
    (e: React.SyntheticEvent, name: string, items: string[]) => {
      dispatch({ name, items });
    },
    [dispatch],
  );

  return (
    <Container>
      <MenuList checkedValues={state} onCheckedValueChange={onChange}>
        <MenuItemCheckbox icon={<CutIcon />} name="edit" value="cut" checkmark={<AcceptIcon />}>
          Cut
        </MenuItemCheckbox>
        <MenuItemCheckbox icon={<PasteIcon />} name="edit" value="paste" checkmark={<AcceptIcon />}>
          Paste
        </MenuItemCheckbox>
        <MenuItemCheckbox icon={<EditIcon />} name="edit" value="edit" checkmark={<AcceptIcon />}>
          Edit
        </MenuItemCheckbox>
      </MenuList>
    </Container>
  );
};

const MemoRadio = React.memo(
  (props: any) => {
    return (
      <MenuItemRadio icon={props.icon} name={props.name} value={props.value} checkmark={props.checkmark}>
        {props.children}
      </MenuItemRadio>
    );
  },
  (prev, next) => {
    console.log(prev.icon === next.icon);
    return true;
  },
);

export const MenuListWithRadios = () => {
  const [checkedValues, setCheckedValues] = React.useState<Record<string, string[]>>({ checkbox: ['2'] });
  const onChange = React.useCallback(
    (e: React.SyntheticEvent, name: string, items: string[]) => {
      setCheckedValues(s => ({ ...s, [name]: items }));
    },
    [setCheckedValues],
  );

  return (
    <Container>
      <MenuList checkedValues={checkedValues} onCheckedValueChange={onChange}>
        <MemoRadio icon={<CutIcon />} name="font" value="segoe" checkmark={<AcceptIcon />}>
          Segoe
        </MemoRadio>
        <MemoRadio icon={<PasteIcon />} name="font" value="calibri" checkmark={<AcceptIcon />}>
          Calibri
        </MemoRadio>
        <MemoRadio icon={<EditIcon />} name="font" value="arial" checkmark={<AcceptIcon />}>
          Arial
        </MemoRadio>
      </MenuList>
    </Container>
  );
};

export const MenuListWithSelectionGroups = () => {
  const checkmark = <AcceptIcon />;
  const [checkedValues, setCheckedValues] = React.useState<Record<string, string[]>>({ checkbox: ['2'] });
  const onChange = (e: React.SyntheticEvent, name: string, items: string[]) => {
    setCheckedValues(s => ({ ...s, [name]: items }));
  };

  return (
    <Container>
      <MenuList checkedValues={checkedValues} onCheckedValueChange={onChange}>
        <MenuGroup>
          <MenuGroupHeader>Checkbox group</MenuGroupHeader>
          <MenuItemCheckbox icon={<CutIcon />} name="edit" value="cut" checkmark={checkmark}>
            Cut
          </MenuItemCheckbox>
          <MenuItemCheckbox icon={<PasteIcon />} name="edit" value="paste" checkmark={checkmark}>
            Paste
          </MenuItemCheckbox>
          <MenuItemCheckbox icon={<EditIcon />} name="edit" value="edit" checkmark={checkmark}>
            Edit
          </MenuItemCheckbox>
        </MenuGroup>
        <MenuDivider />
        <MenuGroup>
          <MenuGroupHeader>Radio group</MenuGroupHeader>
          <MenuItemRadio icon={<CutIcon />} name="font" value="segoe" checkmark={checkmark}>
            Segoe
          </MenuItemRadio>
          <MenuItemRadio icon={<PasteIcon />} name="font" value="calibri" checkmark={checkmark}>
            Caliri
          </MenuItemRadio>
          <MenuItemRadio icon={<EditIcon />} name="font" value="arial" checkmark={checkmark}>
            Arial
          </MenuItemRadio>
        </MenuGroup>
      </MenuList>
    </Container>
  );
};

export const MemoExample = () => {
  const [count, setCount] = React.useState(0);
  const TestComponent = React.memo((props: { value: string }) => <span>{props.value}</span>);
  const Button = () => <button onClick={() => setCount(c => c + 1)}>Counter: {count}</button>;
  return (
    <div>
      <TestComponent value="test" />
      <Button />
    </div>
  );
};
