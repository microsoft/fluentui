import * as React from 'react';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import {
  FluentProvider,
  teamsLightTheme,
  Body1,
  Title3,
  TabList,
  Tab,
  Input,
  Button,
  Label,
  Menu,
  MenuTrigger,
  MenuList,
  MenuItemCheckbox,
  MenuPopover,
} from '@fluentui/react-components';
import {
  SearchRegular,
  bundleIcon,
  CutRegular,
  CutFilled,
  ClipboardPasteRegular,
  ClipboardPasteFilled,
  EditRegular,
  EditFilled,
} from '@fluentui/react-icons';

export interface ContentProps {
  className?: string;
}

const useStyles = makeStyles({
  root: {
    display: 'grid',
    justifyContent: 'center',
    gridTemplateColumns: '30% 30% 30%',
    gridTemplateRows: 'auto',
    gridColumnGap: '5%',
  },
  col: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    rowGap: '20px',
  },
});

export const Demo: React.FC<ContentProps> = props => {
  const styles = useStyles();
  const CutIcon = bundleIcon(CutFilled, CutRegular);
  const PasteIcon = bundleIcon(ClipboardPasteFilled, ClipboardPasteRegular);
  const EditIcon = bundleIcon(EditFilled, EditRegular);
  return (
    <FluentProvider theme={teamsLightTheme}>
      <Label>Examples</Label>
      <div className={mergeClasses(styles.root, props.className)}>
        <div>
          <Title3 block>Make an impression</Title3>
          <br />
          <Body1 block>
            Make a big impression with this clean, modern, and mobile-friendly site. Use it to communicate information
            to people inside or outside your team. Share your ideas, results, and more in this visually compelling
            format.
          </Body1>
        </div>
        <div className={styles.col}>
          <TabList defaultSelectedValue="tab1">
            <Tab value="tab1">Home</Tab>
            <Tab value="tab2">Pages</Tab>
            <Tab value="tab3">Documents</Tab>
          </TabList>
          <Input
            placeholder="Find"
            contentAfter={<Button aria-label="Find" appearance="transparent" icon={<SearchRegular />} size="small" />}
          />
          <Menu>
            <MenuTrigger>
              <Button>Select</Button>
            </MenuTrigger>
            <MenuPopover>
              <MenuList>
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
            </MenuPopover>
          </Menu>
        </div>
        <div>col3</div>
      </div>
    </FluentProvider>
  );
};
