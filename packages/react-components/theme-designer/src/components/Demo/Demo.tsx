import * as React from 'react';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import {
  tokens,
  TabList,
  Tab,
  Input,
  Button,
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
  Spinner,
  Label,
  Link,
} from '@fluentui/react-components';
import {
  SearchRegular,
  bundleIcon,
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
    display: 'flex',
    justifyContent: 'space-between',
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start',
    boxSizing: 'border-box',
    ...shorthands.gap(tokens.spacingVerticalL),
  },
  controlRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'start',
    justifyContent: 'center',
    ...shorthands.gap(tokens.spacingHorizontalL),
  },
  controlColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    justifyContent: 'center',
  },
  inputLabel: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    ...shorthands.gap(tokens.spacingVerticalS),
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
    ...shorthands.gap(tokens.spacingVerticalL),
  },
  avatarText: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'left',
  },
});

export const Column1 = () => {
  const styles = useStyles();
  const dropdownId = useId('dropdown-default');
  return (
    <div className={styles.column}>
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

export const Column2 = () => {
  const styles = useStyles();
  return (
    <div className={styles.column}>
      <div className={styles.controlRow}>
        <Button appearance="primary">Text</Button>
        <div className={styles.controlColumn}>
          <Switch defaultChecked={true} label="On" />
          <Switch label="Off" />
        </div>
      </div>
      <Slider defaultValue={50} />
      <div className={styles.controlRow}>
        <div className={styles.controlColumn}>
          <Checkbox defaultChecked={true} label="Option 1" />
          <Checkbox label="Option 2" />
        </div>
        <div className={styles.controlColumn}>
          <RadioGroup>
            <Radio defaultChecked={true} label="Option 1" />
            <Radio label="Option 2" />
          </RadioGroup>
        </div>
      </div>
    </div>
  );
};

// We may use these later.
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
  const inputId = useId('input');
  const styles = useStyles();

  return (
    <div className={styles.column}>
      <div className={styles.inputLabel}>
        <Label htmlFor={inputId} required>
          Description
        </Label>
        <Input id={inputId} placeholder="Example Text" appearance="filled-darker" />
      </div>
      <Link href="https://www.microsoft.com">Example link - www.microsoft.com</Link>
      <Spinner />
    </div>
  );
};

export const Demo: React.FC<ContentProps> = props => {
  const styles = useStyles();
  return (
    <div>
      <div className={mergeClasses(styles.root, props.className)}>
        {/* <Title3 block>Component Examples</Title3> */}
        <Column1 />
        <Column2 />
        <Column3 />
      </div>
    </div>
  );
};
