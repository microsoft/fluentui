import * as React from 'react';
import { clsx } from 'clsx';
import {
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
import type { JSXElement } from '@fluentui/react-utilities';
import styles from './Demo.module.css';

export interface ContentProps {
  className?: string;
}

/*
	Note the state of the stickersheet is that we need consensus on the following post Build 2023:
		1) Do we have all the correct components displayed and in the correct order?
		2.a) Do we have all the states of each component displayed? i.e. missing deactive states?
		2.b) Do was have all the variants of each component displayed? i.e. different sizes, colors, layouts etc?
		3) Note that the spinner was removed since it was causing confusing with the loading state of the page
*/

export const Column1 = (): JSXElement => {
  const dropdownId = useId('dropdown-default');
  return (
    <div className={styles.column}>
      <div className={styles.avatar}>
        <Persona
          name="Cameron Evans"
          secondaryText="Senior Researcher at Contoso"
          avatar={{ color: 'brand', badge: { status: 'available' } }}
        />
      </div>
      <TabList defaultSelectedValue="tab1">
        <Tab value="tab1">Home</Tab>
        <Tab value="tab2">Pages</Tab>
        <Tab value="tab3">Documents</Tab>
      </TabList>
      <Field>
        <Input
          placeholder="Find"
          contentAfter={<Button aria-label="Find" appearance="transparent" icon={<SearchRegular />} size="small" />}
        />
      </Field>
      <Dropdown aria-labelledby={dropdownId} placeholder="Select" inlinePopup>
        <Option value="Action 1">Action 1</Option>
        <Option value="Action 2">Action 2 </Option>
        <Option value="Action 3">Action 3</Option>
      </Dropdown>
    </div>
  );
};

export const Column2 = (): JSXElement => {
  return (
    <div className={styles.column}>
      <div className={styles['control-row']}>
        <Button appearance="primary">Text</Button>
        <div className={styles['control-column']}>
          <Switch defaultChecked={true} label="On" />
          <Switch label="Off" />
        </div>
      </div>
      <Slider defaultValue={50} />
      <div className={styles['control-row']}>
        <div className={styles['control-column']}>
          <Checkbox defaultChecked={true} label="Option 1" />
          <Checkbox label="Option 2" />
        </div>
        <div className={styles['control-column']}>
          <RadioGroup>
            <Radio defaultChecked={true} label="Option 1" />
            <Radio label="Option 2" />
          </RadioGroup>
        </div>
      </div>
    </div>
  );
};

const MeetNowIcon = bundleIcon(MeetNowFilled, MeetNowRegular);
const CalendarLtrIcon = bundleIcon(CalendarLtrFilled, CalendarLtrRegular);

// We may use these later.
export const DemoIcons = (): JSXElement => {
  return (
    <div className={styles.icons}>
      <Badge size="medium" appearance="filled" icon={<CalendarLtrIcon />} />
      <Badge size="medium" appearance="ghost" icon={<CalendarLtrIcon />} />
      <Badge size="medium" appearance="outline" icon={<MeetNowIcon />} />
      <Badge size="medium" appearance="tint" icon={<MeetNowIcon />} />
    </div>
  );
};

export const Column3 = (): JSXElement => {
  return (
    <div className={styles.column}>
      <div className={styles['input-label']}>
        <Field label="Description" required>
          <Input placeholder="Example Text" appearance="filled-darker" />
        </Field>
      </div>
      <Link href="https://www.microsoft.com">Example link - www.microsoft.com</Link>
    </div>
  );
};

export const Demo: React.FC<ContentProps> = props => {
  return (
    <div>
      <div className={clsx(styles.root, props.className)}>
        <Column1 />
        <Column2 />
        <Column3 />
      </div>
    </div>
  );
};
