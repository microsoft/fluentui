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
  RadioGroup,
  Checkbox,
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
    gridTemplateColumns: '1fr 1fr 1fr',
    gridTemplateRows: 'auto',
    gridColumnGap: '5%',
  },
  col2: {
    display: 'grid',
    gridTemplateRows: '1fr 1fr 1fr',
    gridRowGap: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  col3: {
    display: 'grid',
    gridTemplateColumns: 'auto auto',
    gridTemplateRows: '1fr 1fr 1fr 1fr',
    gridRowGap: '5%',
    gridColumnGap: '5%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  slider: {
    gridColumnStart: 1,
    gridColumnEnd: 3,
    width: '100%',
  },
  icons: {
    display: 'grid',
    gridTemplateColumns: 'auto auto',
    gridTemplateRows: 'auto auto',
    gridRowGap: '20%',
    gridColumnGap: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  twoRow: {
    display: 'grid',
    gridTemplateRows: '1fr 1fr',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const Column1 = () => {
  return (
    <div>
      <Title3 block>Make an impression</Title3>
      <br />
      <Body1 block>
        Make a big impression with this clean, modern, and mobile-friendly site. Use it to communicate information to
        people inside or outside your team. Share your ideas, results, and more in this visually compelling format.
      </Body1>
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
      <div>
        <Button appearance="primary">Sign Up</Button>
      </div>
      <div>
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
      <div>
        <Checkbox defaultChecked={true} label="Option 1" />
        <Checkbox label="Option 2" />
      </div>
      <div>
        <RadioGroup>
          <Radio defaultChecked={true} label="Option 1" />
          <Radio label="Option 2" />
        </RadioGroup>
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
