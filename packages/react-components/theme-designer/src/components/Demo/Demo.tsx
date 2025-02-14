import * as React from 'react';
import { makeStyles, mergeClasses } from '@griffel/react';
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
  Field,
  Persona,
  useId,
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
    gap: tokens.spacingVerticalL,
  },
  controlRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'start',
    justifyContent: 'center',
    gap: tokens.spacingHorizontalL,
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
    gap: tokens.spacingVerticalS,
  },
  icons: {
    display: 'grid',
    gridTemplateColumns: 'auto auto',
    gridTemplateRows: 'auto auto',
    rowGap: tokens.spacingVerticalS,
    columnGap: tokens.spacingHorizontalS,
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

/*
	Note the state of the stickersheet is that we need consensus on the following post Build 2023:
		1) Do we have all the correct components displayed and in the correct order?
		2.a) Do we have all the states of each component displayed? i.e. missing deactive states?
		2.b) Do was have all the variants of each component displayed? i.e. different sizes, colors, layouts etc?
		3) Note that the spinner was removed since it was causing confusing with the loading state of the page
*/

const AvatarSection = () => {
  const styles = useStyles();
  return (
    <div className={styles.avatar}>
      <Persona
        name="Cameron Evans"
        secondaryText="Senior Researcher at Contoso"
        avatar={{ color: 'brand', badge: { status: 'available' } }}
      />
    </div>
  );
};

const TabSection = () => {
  const tabValues = ['Home', 'Pages', 'Documents'];
    return (
      <TabList defaultSelectedValue="tab1">
      {tabValues.map((tab, index) => (
        <Tab key={index} value={`tab${index + 1}`}>{tab}</Tab>
      ))}
      </TabList>
    );
};

const InputSection = () => {
  const dropdownId = useId('dropdown-default');
  const optionValues = ['Option 1', 'Option 2', 'Option 3'];
  return (
    <>
    <Field>
      <Input
        placeholder="Find"
        contentAfter={<Button aria-label="Find" appearance="transparent" icon={<SearchRegular />} size="small" />}
      />
    </Field>
    <Dropdown aria-labelledby={dropdownId} placeholder="Select" inlinePopup>
        {optionValues.map((option, index) => (
          <Option key={index} value={option}>
            {option}
          </Option>
        ))}
    </Dropdown>
    </>
  )
};

const ControlRow = () => {
  const styles = useStyles();
  return (
    <div className={styles.controlRow}>
      <Button appearance="primary">Text</Button>
      <div className={styles.controlColumn}>
        <Switch defaultChecked={true} label="On" />
        <Switch label="Off" />
      </div>
    </div>
  );
};

const CheckboxSection = () => {
  const styles = useStyles();
  return (
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
  );
};

const DescriptionSection = () => {
  const styles = useStyles();
  return (
    <div className={styles.inputLabel}>
      <Field label="Description" required>
        <Input placeholder="Example Text" appearance="filled-darker" />
      </Field>
    </div>
  );
};

export const Column1 = () => {
  const styles = useStyles();
  return (
    <div className={styles.column}>
      <AvatarSection />
      <TabSection />
      <InputSection />
    </div>
  );
};

export const Column2 = () => {
  const styles = useStyles();
  return (
    <div className={styles.column}>
      <ControlRow />
      <Slider defaultValue={50} />
      <CheckboxSection />
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
  const styles = useStyles();

  return (
    <div className={styles.column}>
     <DescriptionSection />
     <Link href="https://www.microsoft.com">Example link - www.microsoft.com</Link>
    </div>
  );
};

export const Demo: React.FC<ContentProps> = props => {
  const styles = useStyles();
  return (
    <div>
      <div className={mergeClasses(styles.root, props.className)}>
        <Column1 />
        <Column2 />
        <Column3 />
      </div>
    </div>
  );
};
