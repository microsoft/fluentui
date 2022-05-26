import * as React from 'react';
import { makeStyles, mergeClasses } from '@griffel/react';
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
  MenuButton,
  MenuItemCheckbox,
  MenuPopover,
  Slider,
  Badge,
  Switch,
  Radio,
  Checkbox,
  Avatar,
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
  ChevronRightRegular,
  MeetNowRegular,
  MeetNowFilled,
  CalendarLtrFilled,
  CalendarLtrRegular,
} from '@fluentui/react-icons';

export interface ContentProps {
  className?: string;
}

const useStyles = makeStyles({
  root: {
    display: 'grid',
    alignItems: 'start',
    justifyContent: 'center',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridColumnGap: '5%',
  },
  col1: {
    display: 'grid',
    gridTemplateRows: 'repeat(3, auto)',
    gridRowGap: '10%',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  col2: {
    display: 'grid',
    gridTemplateRows: 'repeat(3, 1fr)',
    gridRowGap: '10%',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  col3: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: 'repeat(4, auto)',
    gridRowGap: '5%',
    gridColumnGap: '5%',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  slider: {
    gridColumnStart: 1,
    gridColumnEnd: 3,
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
  },
  icons: {
    display: 'grid',
    gridTemplateColumns: 'auto auto',
    gridTemplateRows: 'auto auto',
    gridRowGap: '20%',
    gridColumnGap: '20%',
    justifyContent: 'center',
  },
  twoRow: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const Column1 = () => {
  const styles = useStyles();
  return (
    <div className={styles.col1}>
      <Title3 block>Make an impression</Title3>
      <Body1 block>
        Make a big impression with this clean, modern, and mobile-friendly site. Use it to communicate information to
        people inside or outside your team. Share your ideas, results, and more in this visually compelling format.
      </Body1>
      <Avatar
        color="brand"
        initials="DF"
        badge={{
          status: 'available',
          'aria-label': 'available',
        }}
      />
    </div>
  );
};

export const DemoMenu = () => {
  const CutIcon = bundleIcon(CutFilled, CutRegular);
  const PasteIcon = bundleIcon(ClipboardPasteFilled, ClipboardPasteRegular);
  const EditIcon = bundleIcon(EditFilled, EditRegular);
  return (
    <Menu>
      <MenuTrigger>
        <MenuButton>Select </MenuButton>
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
  );
};

export const Column2 = () => {
  const styles = useStyles();
  return (
    <div className={styles.col2}>
      <TabList defaultSelectedValue="tab1">
        <Tab value="tab1">Home</Tab>
        <Tab value="tab2">Pages</Tab>
        <Tab value="tab3">Documents</Tab>
      </TabList>
      <Input
        placeholder="Find"
        contentAfter={<Button aria-label="Find" appearance="transparent" icon={<SearchRegular />} size="small" />}
      />
      <DemoMenu />
    </div>
  );
};

export const DemoIcons = () => {
  const styles = useStyles();
  const MeetNowIcon = bundleIcon(MeetNowFilled, MeetNowRegular);
  const CalendarLtrIcon = bundleIcon(CalendarLtrFilled, CalendarLtrRegular);
  return (
    <div className={styles.icons}>
      <Badge size="medium" appearance="filled" icon={<CalendarLtrIcon />} />
      <Badge size="medium" appearance="ghost" icon={<CalendarLtrIcon />} />
      <Badge size="medium" appearance="outline" icon={<MeetNowIcon />} />
      <Badge size="medium" appearance="tint" icon={<MeetNowIcon />} />
    </div>
  );
};

export const Column3 = () => {
  const styles = useStyles();
  return (
    <div className={styles.col3}>
      <div className={styles.button}>
        <Button appearance="primary">Sign Up</Button>
      </div>
      <div className={styles.button}>
        <Button appearance="transparent" icon={<ChevronRightRegular />} iconPosition="after">
          Learn More
        </Button>
      </div>
      <Slider className={styles.slider} defaultValue={20} />
      <DemoIcons />
      <div className={styles.twoRow}>
        <Switch defaultChecked={true} label="On" />
        <Switch label="Off" />
      </div>
      <div className={styles.twoRow}>
        <Checkbox defaultChecked={true} label="Option 1" />
        <Checkbox label="Option 2" />
      </div>
      <div className={styles.twoRow}>
        <Radio defaultChecked={true} label="Option 1" />
        <Radio label="Option 2" />
      </div>
    </div>
  );
};

export const Demo: React.FC<ContentProps> = props => {
  const styles = useStyles();
  return (
    <FluentProvider theme={teamsLightTheme}>
      <Label>Examples</Label>
      <div className={mergeClasses(styles.root, props.className)}>
        <Column1 />
        <Column2 />
        <Column3 />
      </div>
    </FluentProvider>
  );
};
