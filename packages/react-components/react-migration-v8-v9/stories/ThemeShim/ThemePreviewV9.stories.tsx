import * as React from 'react';
import {
  makeStyles,
  mergeClasses,
  tokens,
  Body1,
  Title3,
  TabList,
  Tab,
  Input,
  Button,
  Caption1,
  Dropdown,
  Option,
  Slider,
  Badge,
  Switch,
  Radio,
  RadioGroup,
  Checkbox,
  Avatar,
  useId,
  Caption2,
} from '@fluentui/react-components';
import {
  SearchRegular,
  bundleIcon,
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
    padding: '16px',
  },
  threeCol: {
    display: 'grid',
    alignItems: 'start',
    justifyContent: 'center',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridTemplateRows: 'auto',
    gridColumnGap: tokens.spacingHorizontalXXXL,
  },
  col1: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    gap: tokens.spacingVerticalL,
  },
  col2: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: tokens.spacingVerticalL,
  },
  col3: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: 'repeat(4, auto)',
    gridRowGap: tokens.spacingVerticalS,
    gridColumnGap: tokens.spacingHorizontalS,
    justifyContent: 'center',
    alignItems: 'center',
  },
  twoCol: {
    gridColumnStart: 1,
    gridColumnEnd: 3,
  },
  controls: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icons: {
    display: 'grid',
    gridTemplateColumns: 'auto auto',
    gridTemplateRows: 'auto auto',
    gridRowGap: tokens.spacingVerticalS,
    gridColumnGap: tokens.spacingHorizontalS,
    justifyContent: 'center',
  },
  avatar: {
    display: 'flex',
    gap: tokens.spacingVerticalL,
  },
  avatarText: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'left',
  },
});

const Column1 = () => {
  const styles = useStyles();
  return (
    <div className={styles.col1}>
      <Title3 block>Make an impression</Title3>
      <Body1 block>
        Make a big impression with this clean, modern, and mobile-friendly site. Use it to communicate information to
        people inside or outside your team. Share your ideas, results, and more in this visually compelling format.
      </Body1>
      <div className={styles.avatar}>
        <Avatar
          color="brand"
          initials="CE"
          badge={{
            status: 'available',
            'aria-label': 'available',
          }}
        />
        <div className={styles.avatarText}>
          Cameron Evans
          <Caption2>Senior Researcher at Contoso</Caption2>
        </div>
      </div>
    </div>
  );
};

const Column2 = () => {
  const styles = useStyles();
  const dropdownId = useId('dropdown-default');
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
      <Dropdown aria-labelledby={dropdownId} placeholder="Select" inlinePopup>
        <Option value="Action 1">Action 1</Option>
        <Option value="Action 2">Action 2 </Option>
        <Option value="Action 3">Action 3</Option>
      </Dropdown>
    </div>
  );
};

const DemoIcons = () => {
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

const Column3 = () => {
  const styles = useStyles();
  return (
    <div className={styles.col3}>
      <Button appearance="primary">Sign Up</Button>
      <Button appearance="transparent" icon={<ChevronRightRegular />} iconPosition="after">
        Learn More
      </Button>
      <Slider className={styles.twoCol} defaultValue={50} />
      <DemoIcons />
      <div className={styles.controls}>
        <Switch defaultChecked={true} label="On" />
        <Switch label="Off" />
      </div>
      <div className={styles.controls}>
        <Checkbox defaultChecked={true} label="Option 1" />
        <Checkbox label="Option 2" />
      </div>
      <div className={styles.controls}>
        <RadioGroup>
          <Radio defaultChecked={true} label="Option 1" />
          <Radio label="Option 2" />
        </RadioGroup>
      </div>
    </div>
  );
};

export const ThemePreviewV9: React.FC<ContentProps> = props => {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <Caption1>Examples</Caption1>
      <div className={mergeClasses(styles.threeCol, props.className)}>
        <Column1 />
        <Column2 />
        <Column3 />
      </div>
    </div>
  );
};
