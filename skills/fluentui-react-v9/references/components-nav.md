# Components/Nav

A component that provides up to two levels of nesting for navigation.

## Accessibility

### Do

- Use `href` on all NavItems that alter the URL, even if using JS routing
- Ensure all `Hamburger` icon buttons have an accessible name
- Add `aria-expanded` to buttons that toggle the expanded/collapsed state of inline Navs (this is not needed for overlay navs)

### Don't

- Combine expand/collapse items with linking behavior. Voice control and screen reader users cannot perform different actions through the same semantic button, even if a nested item has a separate click event attached.

## Props

| Name                           | Type                                | Required | Default                                                                 | Description                                                                                                                                                                                  |
| ------------------------------ | ----------------------------------- | -------- | ----------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `as`                           | `"div"`                             | No       |                                                                         |                                                                                                                                                                                              |
| `defaultSelectedValue`         | `string`                            | No       |                                                                         | The value of the navItem to be selected by default. Typically useful when the selectedValue is uncontrolled. Mutually exclusive with selectedValue. Empty string indicates no selection.     |
| `defaultSelectedCategoryValue` | `string`                            | No       |                                                                         | The value of the navCategory to be selected by default. Typically useful when the selectedValue is uncontrolled. Mutually exclusive with selectedValue. Empty string indicates no selection. |
| `defaultOpenCategories`        | `string[]`                          | No       |                                                                         | Set of categories that are opened by default. Typically useful when the openCategories is uncontrolled.                                                                                      |
| `openCategories`               | `string[]`                          | No       |                                                                         | Controls the open categories. For use in controlled scenarios.                                                                                                                               |
| `onNavItemSelect`              | `EventHandler<OnNavItemSelectData>` | No       |                                                                         | Raised when a navItem is selected. If the navItem is child of a category, the categoryValue will be provided                                                                                 |
| `selectedValue`                | `string`                            | No       | undefined                                                               | The value of the currently selected navItem. Mutually exclusive with defaultSelectedValue.                                                                                                   |
| `selectedCategoryValue`        | `string`                            | No       | undefined                                                               | Indicates a category that has a selected child Will show the category as selected if it is closed.                                                                                           |
| `multiple`                     | `boolean`                           | No       | true, indicating that multiple categories can be open at the same time. | Indicates if Nav supports multiple open Categories at the same time.                                                                                                                         |
| `onNavCategoryItemToggle`      | `EventHandler<OnNavItemSelectData>` | No       |                                                                         | Callback raised when a NavCategoryItem is toggled.                                                                                                                                           |
| `density`                      | `"small" "medium"`                  | No       | 'medium'                                                                | The vertical density of the Nav and it's children                                                                                                                                            |
| `ref`                          | `Ref<HTMLDivElement>`               | No       |                                                                         |                                                                                                                                                                                              |

## Examples

### Basic

```tsx
import { DrawerProps } from '@fluentui/react-components';
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  AppItem,
  Hamburger,
  NavCategory,
  NavCategoryItem,
  NavDivider,
  NavDrawer,
  NavDrawerBody,
  NavDrawerHeader,
  NavItem,
  NavSectionHeader,
  NavSubItem,
  NavSubItemGroup,
} from '@fluentui/react-components';

import {
  Label,
  Radio,
  RadioGroup,
  Switch,
  Tooltip,
  makeStyles,
  tokens,
  useId,
  useRestoreFocusTarget,
} from '@fluentui/react-components';
import {
  Board20Filled,
  Board20Regular,
  BoxMultiple20Filled,
  BoxMultiple20Regular,
  DataArea20Filled,
  DataArea20Regular,
  DocumentBulletListMultiple20Filled,
  DocumentBulletListMultiple20Regular,
  HeartPulse20Filled,
  HeartPulse20Regular,
  MegaphoneLoud20Filled,
  MegaphoneLoud20Regular,
  NotePin20Filled,
  NotePin20Regular,
  People20Filled,
  People20Regular,
  PeopleStar20Filled,
  PeopleStar20Regular,
  Person20Filled,
  PersonLightbulb20Filled,
  PersonLightbulb20Regular,
  Person20Regular,
  PersonSearch20Filled,
  PersonSearch20Regular,
  PreviewLink20Filled,
  PreviewLink20Regular,
  bundleIcon,
  PersonCircle32Regular,
} from '@fluentui/react-icons';

const useStyles = makeStyles({
  root: {
    overflow: 'hidden',
    display: 'flex',
    height: '600px',
  },
  nav: {
    minWidth: '260px',
  },
  content: {
    flex: '1',
    padding: '16px',
    display: 'grid',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  field: {
    display: 'flex',
    marginTop: '4px',
    marginLeft: '8px',
    flexDirection: 'column',
    gridRowGap: tokens.spacingVerticalS,
  },
});

const Person = bundleIcon(Person20Filled, Person20Regular);
const Dashboard = bundleIcon(Board20Filled, Board20Regular);
const Announcements = bundleIcon(MegaphoneLoud20Filled, MegaphoneLoud20Regular);
const EmployeeSpotlight = bundleIcon(PersonLightbulb20Filled, PersonLightbulb20Regular);
const Search = bundleIcon(PersonSearch20Filled, PersonSearch20Regular);
const PerformanceReviews = bundleIcon(PreviewLink20Filled, PreviewLink20Regular);
const JobPostings = bundleIcon(NotePin20Filled, NotePin20Regular);
const Interviews = bundleIcon(People20Filled, People20Regular);
const HealthPlans = bundleIcon(HeartPulse20Filled, HeartPulse20Regular);
const TrainingPrograms = bundleIcon(BoxMultiple20Filled, BoxMultiple20Regular);
const CareerDevelopment = bundleIcon(PeopleStar20Filled, PeopleStar20Regular);
const Analytics = bundleIcon(DataArea20Filled, DataArea20Regular);
const Reports = bundleIcon(DocumentBulletListMultiple20Filled, DocumentBulletListMultiple20Regular);

type DrawerType = Required<DrawerProps>['type'];

export const Basic = (): JSXElement => {
  const styles = useStyles();

  const typeLableId = useId('type-label');
  const linkLabelId = useId('link-label');
  const multipleLabelId = useId('multiple-label');

  const [isOpen, setIsOpen] = React.useState(true);
  const [enabledLinks, setEnabledLinks] = React.useState(true);
  const [type, setType] = React.useState<DrawerType>('inline');
  const [isMultiple, setIsMultiple] = React.useState(true);

  // Tabster prop used to restore focus to the navigation trigger for overlay nav drawers
  const restoreFocusTargetAttributes = useRestoreFocusTarget();

  const linkDestination = enabledLinks ? 'https://www.bing.com' : '';

  return (
    <div className={styles.root}>
      <NavDrawer
        defaultSelectedValue="2"
        defaultSelectedCategoryValue=""
        open={isOpen}
        type={type}
        multiple={isMultiple}
        className={styles.nav}
      >
        <NavDrawerHeader>
          <Tooltip content="Close Navigation" relationship="label">
            <Hamburger onClick={() => setIsOpen(!isOpen)} />
          </Tooltip>
        </NavDrawerHeader>

        <NavDrawerBody>
          <AppItem icon={<PersonCircle32Regular />} as="a" href={linkDestination}>
            Contoso HR
          </AppItem>
          <NavItem href={linkDestination} icon={<Dashboard />} value="1">
            Dashboard
          </NavItem>
          <NavItem href={linkDestination} icon={<Announcements />} value="2">
            Announcements
          </NavItem>
          <NavItem href={linkDestination} icon={<EmployeeSpotlight />} value="3">
            Employee Spotlight
          </NavItem>
          <NavItem icon={<Search />} href={linkDestination} value="4">
            Profile Search
          </NavItem>
          <NavItem icon={<PerformanceReviews />} href={linkDestination} value="5">
            Performance Reviews
          </NavItem>
          <NavSectionHeader>Employee Management</NavSectionHeader>
          <NavCategory value="6">
            <NavCategoryItem icon={<JobPostings />}>Job Postings</NavCategoryItem>
            <NavSubItemGroup>
              <NavSubItem href={linkDestination} value="7">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit
              </NavSubItem>
              <NavSubItem href={linkDestination} value="8">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit
              </NavSubItem>
            </NavSubItemGroup>
          </NavCategory>
          <NavItem icon={<Interviews />} value="9">
            Interviews
          </NavItem>

          <NavSectionHeader>Benefits</NavSectionHeader>
          <NavItem icon={<HealthPlans />} value="10">
            Health Plans
          </NavItem>
          <NavCategory value="11">
            <NavCategoryItem icon={<Person />} value="12">
              Retirement
            </NavCategoryItem>
            <NavSubItemGroup>
              <NavSubItem href={linkDestination} value="13">
                Plan Information
              </NavSubItem>
              <NavSubItem href={linkDestination} value="14">
                Fund Performance
              </NavSubItem>
            </NavSubItemGroup>
          </NavCategory>

          <NavSectionHeader>Learning</NavSectionHeader>
          <NavItem icon={<TrainingPrograms />} value="15">
            Training Programs
          </NavItem>
          <NavCategory value="16">
            <NavCategoryItem icon={<CareerDevelopment />}>Career Development</NavCategoryItem>
            <NavSubItemGroup>
              <NavSubItem href={linkDestination} value="17">
                Career Paths
              </NavSubItem>
              <NavSubItem href={linkDestination} value="18">
                Planning
              </NavSubItem>
            </NavSubItemGroup>
          </NavCategory>
          <NavDivider />
          <NavItem target="_blank" icon={<Analytics />} value="19">
            Workforce Data
          </NavItem>
          <NavItem href={linkDestination} icon={<Reports />} value="20">
            Reports
          </NavItem>
        </NavDrawerBody>
      </NavDrawer>
      <div className={styles.content}>
        <Tooltip content="Toggle navigation pane" relationship="label">
          <Hamburger onClick={() => setIsOpen(!isOpen)} {...restoreFocusTargetAttributes} aria-expanded={isOpen} />
        </Tooltip>
        <div className={styles.field}>
          <Label id={typeLableId}>Type</Label>
          <RadioGroup
            value={type}
            onChange={(_, data) => setType(data.value as DrawerType)}
            aria-labelledby={typeLableId}
          >
            <Radio value="overlay" label="Overlay (Default)" />
            <Radio value="inline" label="Inline" />
          </RadioGroup>
          <Label id={linkLabelId}>Links</Label>
          <Switch
            checked={enabledLinks}
            onChange={(_, data) => setEnabledLinks(!!data.checked)}
            label={enabledLinks ? 'Enabled' : 'Disabled'}
            aria-labelledby={linkLabelId}
          />

          <Label id={multipleLabelId}>Allow multiple expanded categories</Label>
          <Switch
            checked={isMultiple}
            onChange={(_, data) => setIsMultiple(!!data.checked)}
            label={isMultiple ? 'Multiple' : 'Single'}
            aria-labelledby={multipleLabelId}
          />
        </div>
      </div>
    </div>
  );
};
```

### Controlled

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  AppItem,
  Hamburger,
  NavCategory,
  NavCategoryItem,
  NavDivider,
  NavDrawer,
  NavDrawerBody,
  NavDrawerHeader,
  NavItem,
  NavItemValue,
  NavSectionHeader,
  NavSubItem,
  NavSubItemGroup,
  OnNavItemSelectData,
} from '@fluentui/react-components';
import { Button, Label, Switch, Tooltip, makeStyles, tokens, useId } from '@fluentui/react-components';
import {
  Board20Filled,
  Board20Regular,
  BoxMultiple20Filled,
  BoxMultiple20Regular,
  DataArea20Filled,
  DataArea20Regular,
  DocumentBulletListMultiple20Filled,
  DocumentBulletListMultiple20Regular,
  HeartPulse20Filled,
  HeartPulse20Regular,
  MegaphoneLoud20Filled,
  MegaphoneLoud20Regular,
  NotePin20Filled,
  NotePin20Regular,
  People20Filled,
  People20Regular,
  PeopleStar20Filled,
  PeopleStar20Regular,
  Person20Filled,
  PersonLightbulb20Filled,
  PersonLightbulb20Regular,
  Person20Regular,
  PersonSearch20Filled,
  PersonSearch20Regular,
  PreviewLink20Filled,
  PreviewLink20Regular,
  bundleIcon,
  PersonCircle32Regular,
} from '@fluentui/react-icons';

const useStyles = makeStyles({
  root: {
    overflow: 'hidden',
    display: 'flex',
    height: '600px',
  },
  nav: {
    minWidth: '200px',
  },
  content: {
    flex: '1',
    padding: '16px',
    display: 'grid',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  field: {
    display: 'flex',
    marginTop: '4px',
    marginLeft: '8px',
    flexDirection: 'column',
    gridRowGap: tokens.spacingVerticalS,
  },
});

const Person = bundleIcon(Person20Filled, Person20Regular);
const Dashboard = bundleIcon(Board20Filled, Board20Regular);
const Announcements = bundleIcon(MegaphoneLoud20Filled, MegaphoneLoud20Regular);
const EmployeeSpotlight = bundleIcon(PersonLightbulb20Filled, PersonLightbulb20Regular);
const Search = bundleIcon(PersonSearch20Filled, PersonSearch20Regular);
const PerformanceReviews = bundleIcon(PreviewLink20Filled, PreviewLink20Regular);
const JobPostings = bundleIcon(NotePin20Filled, NotePin20Regular);
const Interviews = bundleIcon(People20Filled, People20Regular);
const HealthPlans = bundleIcon(HeartPulse20Filled, HeartPulse20Regular);
const TrainingPrograms = bundleIcon(BoxMultiple20Filled, BoxMultiple20Regular);
const CareerDevelopment = bundleIcon(PeopleStar20Filled, PeopleStar20Regular);
const Analytics = bundleIcon(DataArea20Filled, DataArea20Regular);
const Reports = bundleIcon(DocumentBulletListMultiple20Filled, DocumentBulletListMultiple20Regular);

// A type that represents a navItemValue and its potential children.
// An empty children array indicates a Single top level NavItem.
// A hydrated children array indicates a NavCategoryItem with children.
type NavItemValueCombo = { parent: string; children: string[] };

// This is a list of navItemValues and their potential children
// Ite exactly matches the NavDrawer in the story below
// This is how a consumer might store them in their app
const navItemValueList: NavItemValueCombo[] = [
  { parent: '1', children: [] },
  { parent: '2', children: [] },
  { parent: '3', children: [] },
  { parent: '4', children: [] },
  { parent: '5', children: [] },
  { parent: '6', children: ['7', '8'] },
  { parent: '9', children: [] },
  { parent: '10', children: [] },
  { parent: '11', children: ['12', '13'] },
  { parent: '14', children: [] },
  { parent: '15', children: [] },
  { parent: '16', children: ['17', '18'] },
  { parent: '19', children: [] },
  { parent: '20', children: [] },
];

type SelectedPage = {
  newSelectedCategory: string | undefined;
  newSelectedValue: string;
};

const getRandomPage = (): SelectedPage => {
  const randomIndex = Math.floor(Math.random() * navItemValueList.length);
  const randomItem = navItemValueList[randomIndex];

  // there are no children, so we're selecting a top level item
  if (randomItem.children.length === 0) {
    return {
      newSelectedCategory: undefined,
      newSelectedValue: randomItem.parent,
    };
  } else {
    // there are children, so we're including a category and it's child as the selectedValue
    const randomChildIndex = Math.floor(Math.random() * randomItem.children.length);
    return {
      newSelectedCategory: randomItem.parent,
      newSelectedValue: randomItem.children[randomChildIndex],
    };
  }
};

export const Controlled = (): JSXElement => {
  const styles = useStyles();

  const multipleLabelId = useId('multiple-label');

  const [openCategories, setOpenCategories] = React.useState<NavItemValue[]>(['6', '11']);
  const [selectedCategoryValue, setSelectedCategoryValue] = React.useState<string | undefined>('6');
  const [selectedValue, setSelectedValue] = React.useState<string>('7');
  const [isMultiple, setIsMultiple] = React.useState(true);

  const handleCategoryToggle = (_: Event | React.SyntheticEvent<Element, Event>, data: OnNavItemSelectData) => {
    if (data.value === undefined && data.categoryValue) {
      // we're just opening it,
      setOpenCategories([data.categoryValue as string]);
    }

    if (isMultiple) {
      // if it's already open, remove it from the list
      if (openCategories.includes(data.categoryValue as string)) {
        setOpenCategories(openCategories.filter(category => category !== data.categoryValue));
      } else {
        // otherwise add it
        setOpenCategories([...openCategories, data.categoryValue as string]);
      }
    } else {
      // if it's already open, remove it from the list
      if (openCategories.includes(data.categoryValue as string)) {
        setOpenCategories([]);
      } else {
        // otherwise add it
        setOpenCategories([data.categoryValue as string]);
      }
    }
  };

  const handleItemSelect = (event: Event | React.SyntheticEvent<Element, Event>, data: OnNavItemSelectData) => {
    setSelectedCategoryValue(data.categoryValue as string);
    setSelectedValue(data.value as string);
  };

  const renderHamburgerWithToolTip = () => {
    return (
      <Tooltip content="Navigation" relationship="label">
        <Hamburger />
      </Tooltip>
    );
  };

  const handleNavigationClick = () => {
    const { newSelectedCategory, newSelectedValue } = getRandomPage();

    setSelectedCategoryValue(newSelectedCategory);
    setSelectedValue(newSelectedValue);
  };

  const handleMultipleChange = (_: Event | React.SyntheticEvent<Element, Event>, data: { checked: boolean }) => {
    setIsMultiple(data.checked);

    if (data.checked) {
      setOpenCategories(['6', '11']);
    } else {
      setOpenCategories(['6']);
    }
  };

  return (
    <div className={styles.root}>
      <NavDrawer
        // This a controlled example,
        // so don't use these props
        // defaultSelectedValue="7"
        // defaultSelectedCategoryValue="6"
        // defaultOpenCategories={['6']}
        // multiple={isMultiple}
        onNavCategoryItemToggle={handleCategoryToggle}
        onNavItemSelect={handleItemSelect}
        tabbable={true} // enables keyboard tabbing
        openCategories={openCategories}
        selectedValue={selectedValue}
        selectedCategoryValue={selectedCategoryValue}
        type={'inline'}
        open={true}
        className={styles.nav}
      >
        <NavDrawerHeader>{renderHamburgerWithToolTip()}</NavDrawerHeader>

        <NavDrawerBody>
          <AppItem icon={<PersonCircle32Regular />} as="a">
            Contoso HR
          </AppItem>
          <NavItem icon={<Dashboard />} value="1">
            Dashboard
          </NavItem>
          <NavItem icon={<Announcements />} value="2">
            Announcements
          </NavItem>
          <NavItem icon={<EmployeeSpotlight />} value="3">
            Employee Spotlight
          </NavItem>
          <NavItem icon={<Search />} value="4">
            Profile Search
          </NavItem>
          <NavItem icon={<PerformanceReviews />} value="5">
            Performance Reviews
          </NavItem>
          <NavSectionHeader>Employee Management</NavSectionHeader>
          <NavCategory value="6">
            <NavCategoryItem icon={<JobPostings />}>Job Postings</NavCategoryItem>
            <NavSubItemGroup>
              <NavSubItem value="7">Openings</NavSubItem>
              <NavSubItem value="8">Submissions</NavSubItem>
            </NavSubItemGroup>
          </NavCategory>
          <NavItem icon={<Interviews />} value="9">
            Interviews
          </NavItem>

          <NavSectionHeader>Benefits</NavSectionHeader>
          <NavItem icon={<HealthPlans />} value="10">
            Health Plans
          </NavItem>
          <NavCategory value="11">
            <NavCategoryItem icon={<Person />} value="12">
              Retirement
            </NavCategoryItem>
            <NavSubItemGroup>
              <NavSubItem value="13">Plan Information</NavSubItem>
              <NavSubItem value="14">Fund Performance</NavSubItem>
            </NavSubItemGroup>
          </NavCategory>

          <NavSectionHeader>Learning</NavSectionHeader>
          <NavItem icon={<TrainingPrograms />} value="15">
            Training Programs
          </NavItem>
          <NavCategory value="16">
            <NavCategoryItem icon={<CareerDevelopment />}>Career Development</NavCategoryItem>
            <NavSubItemGroup>
              <NavSubItem value="17">Career Paths</NavSubItem>
              <NavSubItem value="18">Planning</NavSubItem>
            </NavSubItemGroup>
          </NavCategory>
          <NavDivider />
          <NavItem target="_blank" icon={<Analytics />} value="19">
            Workforce Data
          </NavItem>
          <NavItem icon={<Reports />} value="20">
            Reports
          </NavItem>
        </NavDrawerBody>
      </NavDrawer>
      <div className={styles.content}>
        <div className={styles.field}>
          <Button appearance="primary" onClick={handleNavigationClick}>
            Navigate
          </Button>
          <Label id={multipleLabelId}>Categories</Label>
          <Switch
            checked={isMultiple}
            onChange={(_, data) => handleMultipleChange(_, data)}
            label={isMultiple ? 'Multiple' : 'Single'}
            aria-labelledby={multipleLabelId}
          />
        </div>
      </div>
    </div>
  );
};
```

### Custom Motion

NavDrawer animations can be customized using the [Motion APIs](?path=/docs/motion-apis-createpresencecomponent--docs), together with the `surfaceMotion` prop.

```tsx
import { DrawerProps } from '@fluentui/react-components';
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  AppItem,
  Hamburger,
  NavCategory,
  NavCategoryItem,
  NavDivider,
  NavDrawer,
  NavDrawerBody,
  NavItem,
  NavSectionHeader,
  NavSubItem,
  NavSubItemGroup,
} from '@fluentui/react-components';

import {
  Label,
  Radio,
  RadioGroup,
  Switch,
  Tooltip,
  createPresenceComponent,
  makeStyles,
  motionTokens,
  tokens,
  useId,
  useRestoreFocusTarget,
} from '@fluentui/react-components';
import {
  Board20Filled,
  Board20Regular,
  BoxMultiple20Filled,
  BoxMultiple20Regular,
  DataArea20Filled,
  DataArea20Regular,
  DocumentBulletListMultiple20Filled,
  DocumentBulletListMultiple20Regular,
  HeartPulse20Filled,
  HeartPulse20Regular,
  MegaphoneLoud20Filled,
  MegaphoneLoud20Regular,
  NotePin20Filled,
  NotePin20Regular,
  People20Filled,
  People20Regular,
  PeopleStar20Filled,
  PeopleStar20Regular,
  Person20Filled,
  PersonLightbulb20Filled,
  PersonLightbulb20Regular,
  Person20Regular,
  PersonSearch20Filled,
  PersonSearch20Regular,
  PreviewLink20Filled,
  PreviewLink20Regular,
  bundleIcon,
  PersonCircle32Regular,
} from '@fluentui/react-icons';

const drawerWidth = '260px';
const drawerMargin = tokens.spacingVerticalM;

const useStyles = makeStyles({
  root: {
    overflow: 'hidden',
    height: '600px',
    position: 'relative',
    display: 'flex',
    backgroundColor: tokens.colorNeutralBackground1,
  },
  nav: {
    minWidth: '200px',
    width: drawerWidth,
  },
  content: {
    flex: '1',
    padding: '16px',
    display: 'grid',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',

    margin: 0,
    gap: tokens.spacingVerticalM,
    gridAutoRows: 'max-content',
    boxSizing: 'border-box',
    position: 'absolute',
    inset: 0,
  },
  field: {
    display: 'flex',
    marginTop: '4px',
    marginLeft: '8px',
    flexDirection: 'column',
    gridRowGap: tokens.spacingVerticalS,
  },
});

/*
 * Create a custom DrawerMotion component that animates the drawer surface.
 */
const DrawerMotion = createPresenceComponent(() => {
  const keyframes = [
    {
      opacity: 0,
      transform: 'translate3D(-100%, 0, 0)',
      margin: 0,
      backgroundColor: tokens.colorNeutralBackground1,
      borderColor: tokens.colorNeutralBackground1,
      borderRadius: 0,
    },
    {
      opacity: 1,
      transform: 'translate3D(0, 0, 0)',
      margin: drawerMargin,
      borderColor: tokens.colorNeutralBackground4,
      borderRadius: tokens.borderRadiusXLarge,
    },
  ];

  return {
    enter: {
      keyframes,
      duration: motionTokens.durationNormal,
      easing: motionTokens.curveDecelerateMin,
    },
    exit: {
      keyframes: [...keyframes].reverse(),
      duration: motionTokens.durationSlow,
      easing: motionTokens.curveAccelerateMin,
    },
  };
});

/*
 * Create a custom ContentMotion component that animates the content element.
 */
const ContentMotion = createPresenceComponent(() => {
  const keyframes = [
    {
      transform: 'translate3D(0, 0, 0)',
      width: '100%',
      margin: 0,
      backgroundColor: tokens.colorNeutralBackground1,
      borderColor: tokens.colorNeutralBackground1,
      borderRadius: 0,
    },
    {
      transform: `translate3D(calc(${drawerWidth} + ${drawerMargin}), 0, 0)`,
      width: `calc(100% - ${drawerWidth} - ${drawerMargin} * 3)`,
      margin: drawerMargin,
      backgroundColor: tokens.colorNeutralBackground3,
      borderColor: tokens.colorNeutralBackground4,
      borderRadius: tokens.borderRadiusXLarge,
    },
  ];

  return {
    enter: {
      keyframes,
      duration: motionTokens.durationGentle,
      easing: motionTokens.curveDecelerateMin,
    },
    exit: {
      keyframes: [...keyframes].reverse(),
      duration: motionTokens.durationGentle,
      easing: motionTokens.curveAccelerateMin,
    },
  };
});

const Person = bundleIcon(Person20Filled, Person20Regular);
const Dashboard = bundleIcon(Board20Filled, Board20Regular);
const Announcements = bundleIcon(MegaphoneLoud20Filled, MegaphoneLoud20Regular);
const EmployeeSpotlight = bundleIcon(PersonLightbulb20Filled, PersonLightbulb20Regular);
const Search = bundleIcon(PersonSearch20Filled, PersonSearch20Regular);
const PerformanceReviews = bundleIcon(PreviewLink20Filled, PreviewLink20Regular);
const JobPostings = bundleIcon(NotePin20Filled, NotePin20Regular);
const Interviews = bundleIcon(People20Filled, People20Regular);
const HealthPlans = bundleIcon(HeartPulse20Filled, HeartPulse20Regular);
const TrainingPrograms = bundleIcon(BoxMultiple20Filled, BoxMultiple20Regular);
const CareerDevelopment = bundleIcon(PeopleStar20Filled, PeopleStar20Regular);
const Analytics = bundleIcon(DataArea20Filled, DataArea20Regular);
const Reports = bundleIcon(DocumentBulletListMultiple20Filled, DocumentBulletListMultiple20Regular);

type DrawerType = Required<DrawerProps>['type'];

export const CustomMotion = (): JSXElement => {
  const styles = useStyles();

  const typeLableId = useId('type-label');
  const linkLabelId = useId('link-label');
  const multipleLabelId = useId('multiple-label');

  const [isOpen, setIsOpen] = React.useState(true);
  const [enabledLinks, setEnabledLinks] = React.useState(true);
  const [type, setType] = React.useState<DrawerType>('inline');
  const [isMultiple, setIsMultiple] = React.useState(true);

  // Tabster prop used to restore focus to the navigation trigger for overlay nav drawers
  const restoreFocusTargetAttributes = useRestoreFocusTarget();

  const linkDestination = enabledLinks ? 'https://www.bing.com' : '';

  return (
    <div className={styles.root}>
      <NavDrawer
        defaultSelectedValue="2"
        defaultSelectedCategoryValue=""
        open={isOpen}
        type={type}
        multiple={isMultiple}
        onOpenChange={(_, data) => setIsOpen(data.open)}
        surfaceMotion={{ children: (_, props) => <DrawerMotion {...props} /> }}
        className={styles.nav}
      >
        <NavDrawerBody>
          <AppItem icon={<PersonCircle32Regular />} as="a" href={linkDestination}>
            Contoso HR
          </AppItem>
          <NavItem href={linkDestination} icon={<Dashboard />} value="1">
            Dashboard
          </NavItem>
          <NavItem href={linkDestination} icon={<Announcements />} value="2">
            Announcements
          </NavItem>
          <NavItem href={linkDestination} icon={<EmployeeSpotlight />} value="3">
            Employee Spotlight
          </NavItem>
          <NavItem icon={<Search />} href={linkDestination} value="4">
            Profile Search
          </NavItem>
          <NavItem icon={<PerformanceReviews />} href={linkDestination} value="5">
            Performance Reviews
          </NavItem>
          <NavSectionHeader>Employee Management</NavSectionHeader>
          <NavCategory value="6">
            <NavCategoryItem icon={<JobPostings />}>Job Postings</NavCategoryItem>
            <NavSubItemGroup>
              <NavSubItem href={linkDestination} value="7">
                Openings
              </NavSubItem>
              <NavSubItem href={linkDestination} value="8">
                Submissions
              </NavSubItem>
            </NavSubItemGroup>
          </NavCategory>
          <NavItem icon={<Interviews />} value="9">
            Interviews
          </NavItem>

          <NavSectionHeader>Benefits</NavSectionHeader>
          <NavItem icon={<HealthPlans />} value="10">
            Health Plans
          </NavItem>
          <NavCategory value="11">
            <NavCategoryItem icon={<Person />} value="12">
              Retirement
            </NavCategoryItem>
            <NavSubItemGroup>
              <NavSubItem href={linkDestination} value="13">
                Plan Information
              </NavSubItem>
              <NavSubItem href={linkDestination} value="14">
                Fund Performance
              </NavSubItem>
            </NavSubItemGroup>
          </NavCategory>

          <NavSectionHeader>Learning</NavSectionHeader>
          <NavItem icon={<TrainingPrograms />} value="15">
            Training Programs
          </NavItem>
          <NavCategory value="16">
            <NavCategoryItem icon={<CareerDevelopment />}>Career Development</NavCategoryItem>
            <NavSubItemGroup>
              <NavSubItem href={linkDestination} value="17">
                Career Paths
              </NavSubItem>
              <NavSubItem href={linkDestination} value="18">
                Planning
              </NavSubItem>
            </NavSubItemGroup>
          </NavCategory>
          <NavDivider />
          <NavItem target="_blank" icon={<Analytics />} value="19">
            Workforce Data
          </NavItem>
          <NavItem href={linkDestination} icon={<Reports />} value="20">
            Reports
          </NavItem>
        </NavDrawerBody>
      </NavDrawer>

      <ContentMotion visible={isOpen}>
        <div className={styles.content}>
          <Tooltip content="Toggle navigation pane" relationship="label">
            <Hamburger onClick={() => setIsOpen(!isOpen)} {...restoreFocusTargetAttributes} aria-expanded={isOpen} />
          </Tooltip>

          <div className={styles.field}>
            <Label id={typeLableId}>Type</Label>
            <RadioGroup
              value={type}
              onChange={(_, data) => setType(data.value as DrawerType)}
              aria-labelledby={typeLableId}
            >
              <Radio value="overlay" label="Overlay (Default)" />
              <Radio value="inline" label="Inline" />
            </RadioGroup>
            <Label id={linkLabelId}>Links</Label>
            <Switch
              checked={enabledLinks}
              onChange={(_, data) => setEnabledLinks(!!data.checked)}
              label={enabledLinks ? 'Enabled' : 'Disabled'}
              aria-labelledby={linkLabelId}
            />

            <Label id={multipleLabelId}>Allow multiple expanded categories</Label>
            <Switch
              checked={isMultiple}
              onChange={(_, data) => setIsMultiple(!!data.checked)}
              label={isMultiple ? 'Multiple' : 'Single'}
              aria-labelledby={multipleLabelId}
            />
          </div>
        </div>
      </ContentMotion>
    </div>
  );
};
```

### Split Nav Items

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  NavCategory,
  NavCategoryItem,
  Hamburger,
  NavDrawer,
  NavDrawerBody,
  NavDrawerHeader,
  NavDensity,
  AppItem,
  AppItemStatic,
  SplitNavItem,
  SplitNavItemProps,
  NavItemProps,
  NavCategoryItemProps,
  NavCategoryProps,
  NavSubItemGroup,
  NavDivider,
} from '@fluentui/react-components';
import {
  Label,
  Menu,
  MenuButtonProps,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  Radio,
  RadioGroup,
  Switch,
  Tooltip,
  TooltipProps,
  makeStyles,
  tokens,
  useId,
} from '@fluentui/react-components';
import {
  Board20Filled,
  Board20Regular,
  BoxMultiple20Filled,
  BoxMultiple20Regular,
  DataArea20Filled,
  DataArea20Regular,
  DocumentBulletListMultiple20Filled,
  DocumentBulletListMultiple20Regular,
  HeartPulse20Filled,
  HeartPulse20Regular,
  MegaphoneLoud20Filled,
  MegaphoneLoud20Regular,
  People20Filled,
  People20Regular,
  PersonLightbulb20Filled,
  PersonLightbulb20Regular,
  PersonSearch20Filled,
  PersonSearch20Regular,
  PreviewLink20Filled,
  PreviewLink20Regular,
  bundleIcon,
  PersonCircle32Regular,
  PersonCircle24Regular,
  Pin20Filled,
  Pin20Regular,
  NotePin20Filled,
  NotePin20Regular,
  PeopleStar20Filled,
  PeopleStar20Regular,
  Person20Filled,
  Person20Regular,
} from '@fluentui/react-icons';

const useStyles = makeStyles({
  root: {
    overflow: 'hidden',
    display: 'flex',
    height: '600px',
  },
  nav: {
    minWidth: '200px',
  },
  content: {
    flex: '1',
    padding: '16px',
    display: 'grid',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  field: {
    display: 'flex',
    marginTop: '4px',
    marginLeft: '8px',
    flexDirection: 'column',
    gridRowGap: tokens.spacingVerticalS,
  },
  pinned: {
    opacity: 1,
    transform: 'translate3D(0, 0, 0)',
  },
});

const Dashboard = bundleIcon(Board20Filled, Board20Regular);
const Announcements = bundleIcon(MegaphoneLoud20Filled, MegaphoneLoud20Regular);
const EmployeeSpotlight = bundleIcon(PersonLightbulb20Filled, PersonLightbulb20Regular);
const Search = bundleIcon(PersonSearch20Filled, PersonSearch20Regular);
const PerformanceReviews = bundleIcon(PreviewLink20Filled, PreviewLink20Regular);
const Interviews = bundleIcon(People20Filled, People20Regular);
const HealthPlans = bundleIcon(HeartPulse20Filled, HeartPulse20Regular);
const TrainingPrograms = bundleIcon(BoxMultiple20Filled, BoxMultiple20Regular);
const Analytics = bundleIcon(DataArea20Filled, DataArea20Regular);
const Reports = bundleIcon(DocumentBulletListMultiple20Filled, DocumentBulletListMultiple20Regular);
const JobPostings = bundleIcon(NotePin20Filled, NotePin20Regular);
const Person = bundleIcon(Person20Filled, Person20Regular);
const CareerDevelopment = bundleIcon(PeopleStar20Filled, PeopleStar20Regular);
const Pin = bundleIcon(Pin20Filled, Pin20Regular);

type SplitNavItemNestedProps = {
  splitNavItem?: SplitNavItemProps;
  navCategory?: NavCategoryProps;
  navCategoryItem?: NavCategoryItemProps;
  navSubItems?: SplitNavItemProps[];
};

const splitNavItemNestedProps: SplitNavItemNestedProps[] = [
  {
    splitNavItem: {
      navItem: { value: '1', icon: <Dashboard />, children: 'Dashboard' },
    },
  },
  {
    splitNavItem: {
      navItem: {
        value: '2',
        icon: <Announcements />,
        children: 'Announcements',
      },
    },
  },
  {
    splitNavItem: {
      navItem: {
        value: '3',
        icon: <EmployeeSpotlight />,
        children: 'Employee Spotlight',
      },
    },
  },
  {
    splitNavItem: {
      navItem: { value: '4', icon: <Search />, children: 'Profile Search' },
    },
  },
  {
    splitNavItem: {
      navItem: {
        value: '5',
        icon: <PerformanceReviews />,
        children: 'Performance Reviews',
      },
    },
  },
  {
    navCategory: { value: '6' },
    navCategoryItem: { icon: <JobPostings />, children: 'Job Postings' },
    navSubItems: [
      { navItem: { value: '7', children: 'Openings' } },
      { navItem: { value: '8', children: 'Submissions' } },
    ],
  },
  {
    splitNavItem: {
      navItem: { value: '9', icon: <Interviews />, children: 'Interviews' },
    },
  },
  {
    splitNavItem: {
      navItem: { value: '10', icon: <HealthPlans />, children: 'Health Plans' },
    },
  },
  {
    navCategory: { value: '11' },
    navCategoryItem: { icon: <Person />, children: 'Retirement' },
    navSubItems: [
      { navItem: { value: '13', children: 'Plan Information' } },
      { navItem: { value: '14', children: 'Fund Performance' } },
    ],
  },
  {
    splitNavItem: {
      navItem: {
        value: '15',
        icon: <TrainingPrograms />,
        children: 'Training Programs',
      },
    },
  },
  {
    navCategory: { value: '16' },
    navCategoryItem: {
      icon: <CareerDevelopment />,
      children: 'Career Development',
    },
    navSubItems: [
      { navItem: { value: '17', children: 'Career Paths' } },
      { navItem: { value: '18', children: 'Planning' } },
    ],
  },
  {
    splitNavItem: {
      navItem: { value: '19', icon: <Analytics />, children: 'Workforce Data' },
    },
  },
  {
    splitNavItem: {
      navItem: { value: '20', icon: <Reports />, children: 'Reports' },
    },
  },
];

const DemoMenuPopover = () => {
  return (
    <MenuPopover>
      <MenuList>
        <MenuItem>New </MenuItem>
        <MenuItem>New Window</MenuItem>
      </MenuList>
    </MenuPopover>
  );
};

export const SplitNavItems = (): JSXElement => {
  const styles = useStyles();

  const labelId = useId('type-label');
  const linkLabelId = useId('link-label');
  const appItemIconLabelId = useId('app-item-icon-label');
  const appItemStaticLabelId = useId('app-item-static-label');

  const [density, setNavDensity] = React.useState<NavDensity>('small');
  const [enabledLinks, setEnabledLinks] = React.useState(true);
  const [isAppItemIconPresent, setIsAppItemIconPresent] = React.useState(true);
  const [isAppItemStatic, setIsAppItemStatic] = React.useState(true);
  const [pinnedValues, setPinnedValues] = React.useState<string[]>([]);

  const linkDestination = enabledLinks ? 'https://www.bing.com' : '';

  const appItemIcon = isAppItemIconPresent ? (
    density === 'small' ? (
      <PersonCircle24Regular />
    ) : (
      <PersonCircle32Regular />
    )
  ) : undefined;

  const appItem = isAppItemStatic ? (
    <AppItemStatic icon={appItemIcon}>Contoso HR</AppItemStatic>
  ) : (
    <AppItem icon={appItemIcon} href={linkDestination}>
      Contoso HR
    </AppItem>
  );

  const handlePinClick = (value: string) => {
    if (pinnedValues.includes(value)) {
      setPinnedValues(pinnedValues.filter(v => v !== value));
    } else {
      setPinnedValues([value, ...pinnedValues]);
    }
  };

  const getToggleButtonProps = (value?: string) => {
    const isPinned = pinnedValues.includes(value || '');

    if (value) {
      return {
        checked: isPinned,
        onClick: () => handlePinClick(value),
        icon: isPinned ? <Pin /> : <Pin20Regular />,
        className: isPinned ? styles.pinned : '',
      };
    }
  };

  const getToggleButtonTooltipProps = (value?: string): TooltipProps => {
    if (value) {
      return {
        content: pinnedValues.includes(value) ? 'Unpin' : 'Pin',
        relationship: 'label',
      };
    }
    return { content: 'Pin', relationship: 'label' };
  };

  const getSubItems = (subItems: SplitNavItemProps[]) => {
    return subItems.map((subItem, subItemIndex) => {
      const subItemValue = (subItem.navItem as NavItemProps).value;
      return (
        <Menu key={subItemIndex}>
          <MenuTrigger key={`${subItemIndex}-sit`}>
            {(triggerProps: MenuButtonProps) => (
              <SplitNavItem
                key={`${subItemIndex}-sni`}
                navItem={subItem.navItem}
                menuButton={triggerProps}
                menuButtonTooltip={{
                  content: 'More options',
                  relationship: 'label',
                }}
                toggleButtonTooltip={getToggleButtonTooltipProps(subItemValue)}
                toggleButton={getToggleButtonProps(subItemValue)}
              />
            )}
          </MenuTrigger>
          <DemoMenuPopover />
        </Menu>
      );
    });
  };

  const getNavItems = (isPinnable: boolean) => {
    // We don't want the top four items to be pinnable.
    const startIndex = isPinnable ? 4 : 0;
    const endIndex = isPinnable ? splitNavItemNestedProps.length : 4;

    return splitNavItemNestedProps.slice(startIndex, endIndex).map((item, index) => {
      const itemValue = (item.splitNavItem?.navItem as NavItemProps)?.value;

      if (itemValue) {
        return (
          <SplitNavItem
            key={index}
            navItem={item?.splitNavItem?.navItem}
            toggleButtonTooltip={isPinnable ? getToggleButtonTooltipProps(itemValue) : null}
            toggleButton={isPinnable ? getToggleButtonProps(itemValue) : undefined}
          />
        );
      } else if (item.navCategoryItem) {
        return (
          <NavCategory key={index} value={item.navCategory?.value || ''}>
            <NavCategoryItem key={`${index}-cat`} {...item.navCategoryItem} />
            <NavSubItemGroup key={`${index}-sig`}>{getSubItems(item.navSubItems || [])}</NavSubItemGroup>
          </NavCategory>
        );
      }
      return null;
    });
  };

  return (
    <div className={styles.root}>
      <NavDrawer defaultSelectedValue="5" open={true} density={density} type={'inline'} className={styles.nav}>
        <NavDrawerHeader>
          <Tooltip content="Navigation" relationship="label">
            <Hamburger />
          </Tooltip>
        </NavDrawerHeader>
        <NavDrawerBody>
          {appItem}
          {getNavItems(false)}
          <NavDivider />
          {getNavItems(true)}
        </NavDrawerBody>
      </NavDrawer>
      <div className={styles.content}>
        <div className={styles.field}>
          <Label id={labelId}>Density</Label>
          <RadioGroup
            value={density}
            aria-labelledby={labelId}
            onChange={(_, data) => setNavDensity(data.value as NavDensity)}
          >
            <Radio value="medium" label="Medium" />
            <Radio value="small" label="Small" />
          </RadioGroup>
          <Label id={linkLabelId}>Links</Label>
          <Switch
            checked={enabledLinks}
            onChange={(_, data) => setEnabledLinks(!!data.checked)}
            label={enabledLinks ? 'Enabled' : 'Disabled'}
            aria-labelledby={linkLabelId}
          />

          <Label id={appItemStaticLabelId}>App Item</Label>
          <Switch
            checked={isAppItemStatic}
            onChange={(_, data) => setIsAppItemStatic(!!data.checked)}
            label={isAppItemStatic ? 'Static' : 'Href'}
            aria-labelledby={appItemStaticLabelId}
          />

          <Label id={appItemIconLabelId}>App Item Icon</Label>
          <Switch
            checked={isAppItemIconPresent}
            onChange={(_, data) => setIsAppItemIconPresent(!!data.checked)}
            label={isAppItemIconPresent ? 'Present' : 'Absent'}
            aria-labelledby={appItemIconLabelId}
          />
        </div>
      </div>
    </div>
  );
};
```

### Variable Density Items

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  Hamburger,
  NavCategory,
  NavCategoryItem,
  NavDrawer,
  NavDrawerBody,
  NavDrawerHeader,
  NavDrawerProps,
  NavItem,
  NavSectionHeader,
  NavSubItem,
  NavSubItemGroup,
  NavDensity,
  NavDivider,
  AppItem,
  AppItemStatic,
} from '@fluentui/react-components';
import { Label, Switch, Tooltip, makeStyles, tokens, useId, Radio, RadioGroup } from '@fluentui/react-components';
import {
  Board20Filled,
  Board20Regular,
  BoxMultiple20Filled,
  BoxMultiple20Regular,
  DataArea20Filled,
  DataArea20Regular,
  DocumentBulletListMultiple20Filled,
  DocumentBulletListMultiple20Regular,
  HeartPulse20Filled,
  HeartPulse20Regular,
  MegaphoneLoud20Filled,
  MegaphoneLoud20Regular,
  NotePin20Filled,
  NotePin20Regular,
  People20Filled,
  People20Regular,
  PeopleStar20Filled,
  PeopleStar20Regular,
  Person20Filled,
  PersonLightbulb20Filled,
  PersonLightbulb20Regular,
  Person20Regular,
  PersonSearch20Filled,
  PersonSearch20Regular,
  PreviewLink20Filled,
  PreviewLink20Regular,
  bundleIcon,
  PersonCircle24Regular,
  PersonCircle32Regular,
} from '@fluentui/react-icons';

const useStyles = makeStyles({
  root: {
    overflow: 'hidden',
    display: 'flex',
    height: '600px',
  },
  nav: {
    minWidth: '200px',
  },
  content: {
    flex: '1',
    padding: '16px',
    display: 'grid',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  field: {
    display: 'flex',
    marginTop: '4px',
    marginLeft: '8px',
    flexDirection: 'column',
    gridRowGap: tokens.spacingVerticalS,
  },
});

const Person = bundleIcon(Person20Filled, Person20Regular);
const Dashboard = bundleIcon(Board20Filled, Board20Regular);
const Announcements = bundleIcon(MegaphoneLoud20Filled, MegaphoneLoud20Regular);
const EmployeeSpotlight = bundleIcon(PersonLightbulb20Filled, PersonLightbulb20Regular);
const Search = bundleIcon(PersonSearch20Filled, PersonSearch20Regular);
const PerformanceReviews = bundleIcon(PreviewLink20Filled, PreviewLink20Regular);
const JobPostings = bundleIcon(NotePin20Filled, NotePin20Regular);
const Interviews = bundleIcon(People20Filled, People20Regular);
const HealthPlans = bundleIcon(HeartPulse20Filled, HeartPulse20Regular);
const TrainingPrograms = bundleIcon(BoxMultiple20Filled, BoxMultiple20Regular);
const CareerDevelopment = bundleIcon(PeopleStar20Filled, PeopleStar20Regular);
const Analytics = bundleIcon(DataArea20Filled, DataArea20Regular);
const Reports = bundleIcon(DocumentBulletListMultiple20Filled, DocumentBulletListMultiple20Regular);

export const VariableDensityItems = (props: Partial<NavDrawerProps>): JSXElement => {
  const styles = useStyles();

  const labelId = useId('type-label');
  const linkLabelId = useId('link-label');
  const appItemIconLabelId = useId('app-item-icon-label');
  const appItemStaticLabelId = useId('app-item-static-label');

  const [density, setNavDesnity] = React.useState<NavDensity>('small');
  const [enabledLinks, setEnabledLinks] = React.useState(true);
  const [isAppItemIconPresent, setIsAppItemIconPresent] = React.useState(true);
  const [isAppItemStatic, setIsAppItemStatic] = React.useState(true);

  const linkDestination = enabledLinks ? 'https://www.bing.com' : '';

  const appItemIcon = isAppItemIconPresent ? (
    density === 'small' ? (
      <PersonCircle24Regular />
    ) : (
      <PersonCircle32Regular />
    )
  ) : undefined;

  const appItem = isAppItemStatic ? (
    <AppItemStatic icon={appItemIcon}>Contoso HR</AppItemStatic>
  ) : (
    <AppItem icon={appItemIcon} href={linkDestination}>
      Contoso HR
    </AppItem>
  );

  return (
    <div className={styles.root}>
      <NavDrawer
        defaultSelectedValue="7"
        defaultSelectedCategoryValue="6"
        open={true}
        type={'inline'}
        density={density}
        className={styles.nav}
      >
        <NavDrawerHeader>
          <Tooltip content="Navigation" relationship="label">
            <Hamburger />
          </Tooltip>
        </NavDrawerHeader>
        <NavDrawerBody>
          {appItem}
          <NavItem href={linkDestination} icon={<Dashboard />} value="1">
            Dashboard
          </NavItem>
          <NavItem href={linkDestination} icon={<Announcements />} value="2">
            Announcements
          </NavItem>
          <NavItem href={linkDestination} icon={<EmployeeSpotlight />} value="3">
            Employee Spotlight
          </NavItem>
          <NavItem icon={<Search />} href={linkDestination} value="4">
            Profile Search
          </NavItem>
          <NavItem icon={<PerformanceReviews />} href={linkDestination} value="5">
            Performance Reviews
          </NavItem>

          <NavSectionHeader>Employee Management</NavSectionHeader>
          <NavCategory value="6">
            <NavCategoryItem icon={<JobPostings />}>Job Postings</NavCategoryItem>
            <NavSubItemGroup>
              <NavSubItem href={linkDestination} value="7">
                Openings
              </NavSubItem>
              <NavSubItem href={linkDestination} value="8">
                Submissions
              </NavSubItem>
            </NavSubItemGroup>
          </NavCategory>
          <NavItem icon={<Interviews />} value="9">
            Interviews
          </NavItem>

          <NavSectionHeader>Benefits</NavSectionHeader>
          <NavItem icon={<HealthPlans />} value="10">
            Health Plans
          </NavItem>
          <NavCategory value="11">
            <NavCategoryItem icon={<Person />}>Retirement</NavCategoryItem>
            <NavSubItemGroup>
              <NavSubItem href={linkDestination} value="13">
                Plan Information
              </NavSubItem>
              <NavSubItem href={linkDestination} value="14">
                Fund Performance
              </NavSubItem>
            </NavSubItemGroup>
          </NavCategory>

          <NavDivider />
          <NavItem icon={<TrainingPrograms />} value="15">
            Training Programs
          </NavItem>
          <NavCategory value="16">
            <NavCategoryItem icon={<CareerDevelopment />}>Career Development</NavCategoryItem>
            <NavSubItemGroup>
              <NavSubItem href={linkDestination} value="17">
                Career Paths
              </NavSubItem>
              <NavSubItem href={linkDestination} value="18">
                Planning
              </NavSubItem>
            </NavSubItemGroup>
          </NavCategory>
          <NavItem target="_blank" icon={<Analytics />} value="19">
            Workforce Data
          </NavItem>
          <NavItem href={linkDestination} icon={<Reports />} value="20">
            Reports
          </NavItem>
        </NavDrawerBody>
      </NavDrawer>
      <div className={styles.content}>
        <div className={styles.field}>
          <Label id={labelId}>Density</Label>
          <RadioGroup
            value={density}
            aria-labelledby={labelId}
            onChange={(_, data) => setNavDesnity(data.value as NavDensity)}
          >
            <Radio value="medium" label="Medium" />
            <Radio value="small" label="Small" />
          </RadioGroup>

          <Label id={linkLabelId}>Links</Label>
          <Switch
            checked={enabledLinks}
            onChange={(_, data) => setEnabledLinks(!!data.checked)}
            label={enabledLinks ? 'Enabled' : 'Disabled'}
            aria-labelledby={linkLabelId}
          />

          <Label id={appItemStaticLabelId}>App Item</Label>
          <Switch
            checked={isAppItemStatic}
            onChange={(_, data) => setIsAppItemStatic(!!data.checked)}
            label={isAppItemStatic ? 'Static' : 'Href'}
            aria-labelledby={appItemStaticLabelId}
          />

          <Label id={appItemIconLabelId}>App Item Icon</Label>
          <Switch
            checked={isAppItemIconPresent}
            onChange={(_, data) => setIsAppItemIconPresent(!!data.checked)}
            label={isAppItemIconPresent ? 'Present' : 'Absent'}
            aria-labelledby={appItemIconLabelId}
          />
        </div>
      </div>
    </div>
  );
};
```
