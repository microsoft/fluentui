import * as React from 'react';
import {
  NavCategory,
  NavCategoryItem,
  NavDrawer,
  NavDrawerBody,
  NavDrawerFooter,
  NavDrawerHeader,
  NavDrawerHeaderNav,
  NavDrawerProps,
  NavItem,
  NavSubItem,
  NavSubItemGroup,
} from '@fluentui/react-nav-preview';
import {
  Button,
  Caption1Strong,
  Label,
  Radio,
  RadioGroup,
  makeStyles,
  shorthands,
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
  NavigationFilled,
  NotePin20Filled,
  NotePin20Regular,
  People20Filled,
  People20Regular,
  PeopleStar20Filled,
  PeopleStar20Regular,
  PersonFilled,
  PersonLightbulb20Filled,
  PersonLightbulb20Regular,
  PersonRegular,
  PersonSearch20Filled,
  PersonSearch20Regular,
  PreviewLink20Filled,
  PreviewLink20Regular,
  Settings20Filled,
  Settings20Regular,
  bundleIcon,
} from '@fluentui/react-icons';
import { navItemTokens } from '../../src/components/sharedNavStyles.styles';
import type { DrawerProps } from '@fluentui/react-drawer';

const useStyles = makeStyles({
  root: {
    ...shorthands.border('2px', 'solid', '#ccc'),
    ...shorthands.overflow('hidden'),
    display: 'flex',
    height: '600px',
    backgroundColor: '#fff',
  },
  content: {
    ...shorthands.flex(1),
    ...shorthands.padding('16px'),

    display: 'grid',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gridRowGap: tokens.spacingVerticalXXL,
    gridAutoRows: 'max-content',
  },
  field: {
    display: 'grid',
    gridRowGap: tokens.spacingVerticalS,
  },

  headingContent: {
    marginInlineStart: `10px`,
  },
  hamburger: {
    backgroundColor: navItemTokens.backgroundColor,
    color: tokens.colorNeutralForeground2,
    textDecorationLine: 'none',
    ':hover': {
      backgroundColor: navItemTokens.backgroundColorHover,
    },
    ':active': {
      backgroundColor: navItemTokens.backgroundColorPressed,
    },
  },
});

const Person = bundleIcon(PersonFilled, PersonRegular);
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
const Settings = bundleIcon(Settings20Filled, Settings20Regular);

type DrawerType = Required<DrawerProps>['type'];

export const NavDrawerDefault = (props: Partial<NavDrawerProps>) => {
  const styles = useStyles();

  const labelId = useId('type-label');

  const [isOpen, setIsOpen] = React.useState(true);
  const [type, setType] = React.useState<DrawerType>('inline');

  const someClickHandler = () => {
    console.log('someClickHandler');
  };

  return (
    <div className={styles.root}>
      <NavDrawer
        defaultSelectedValue="2"
        defaultSelectedCategoryValue="1"
        open={isOpen}
        type={type}
        onOpenChange={(_, { open }) => setIsOpen(open)}
        size="small"
      >
        <NavDrawerHeader>
          <NavDrawerHeaderNav>
            <Button appearance="transparent" icon={<NavigationFilled />} className={styles.hamburger} />
          </NavDrawerHeaderNav>
        </NavDrawerHeader>
        <NavDrawerBody>
          <Caption1Strong className={styles.headingContent}>Home</Caption1Strong>
          <NavItem as="a" href="https://www.bing.com" icon={<Dashboard />} value="1">
            Dashboard
          </NavItem>
          <NavItem as="button" icon={<Announcements />} onClick={someClickHandler} value="2">
            Announcements
          </NavItem>
          <NavItem as="button" icon={<EmployeeSpotlight />} onClick={someClickHandler} value="3">
            Employee Spotlight
          </NavItem>
          <Caption1Strong className={styles.headingContent}>Employee Management</Caption1Strong>
          <NavItem as="button" icon={<Search />} onClick={someClickHandler} value="4">
            Profile Search
          </NavItem>
          <NavItem as="button" icon={<PerformanceReviews />} onClick={someClickHandler} value="5">
            Performance Reviews
          </NavItem>
          <NavCategory value="6">
            <NavCategoryItem icon={<JobPostings />}>Job Postings</NavCategoryItem>
            <NavSubItemGroup>
              <NavSubItem as="button" onClick={someClickHandler} value="7">
                Openings
              </NavSubItem>
              <NavSubItem as="button" onClick={someClickHandler} value="8">
                Submissions
              </NavSubItem>
            </NavSubItemGroup>
          </NavCategory>
          <NavItem icon={<Interviews />} value="9">
            Interviews
          </NavItem>
          <Caption1Strong className={styles.headingContent}>Benefits</Caption1Strong>
          <NavItem icon={<HealthPlans />} value="10">
            Health Plans
          </NavItem>
          <NavCategory value="11">
            <NavCategoryItem icon={<Person />} value="12">
              Retirement
            </NavCategoryItem>
            <NavSubItemGroup>
              <NavSubItem as="button" onClick={someClickHandler} value="13">
                Plan Information
              </NavSubItem>
              <NavSubItem as="button" onClick={someClickHandler} value="14">
                Fund Performance
              </NavSubItem>
            </NavSubItemGroup>
          </NavCategory>

          <Caption1Strong className={styles.headingContent}>Learning</Caption1Strong>
          <NavItem icon={<TrainingPrograms />} value="15">
            Training Programs
          </NavItem>
          <NavCategory value="16">
            <NavCategoryItem icon={<CareerDevelopment />}>Career Development</NavCategoryItem>
            <NavSubItemGroup>
              <NavSubItem as="button" onClick={someClickHandler} value="17">
                Career Paths
              </NavSubItem>
              <NavSubItem as="button" onClick={someClickHandler} value="18">
                Planning
              </NavSubItem>
            </NavSubItemGroup>
          </NavCategory>

          <Caption1Strong className={styles.headingContent}>Analytics</Caption1Strong>
          <NavItem as="button" onClick={someClickHandler} icon={<Analytics />} value="19">
            Workforce Data
          </NavItem>
          <NavItem as="button" onClick={someClickHandler} icon={<Reports />} value="20">
            Reports
          </NavItem>
        </NavDrawerBody>
        <NavDrawerFooter>
          <NavItem value="21" as="button" onClick={someClickHandler} icon={<Person />}>
            Profile
          </NavItem>
          <NavItem icon={<Settings />} as="button" onClick={someClickHandler} value="24">
            App Settings
          </NavItem>
        </NavDrawerFooter>
      </NavDrawer>
      <div className={styles.content}>
        <Button appearance="primary" onClick={() => setIsOpen(!isOpen)}>
          {type === 'inline' ? 'Toggle' : 'Open'}
        </Button>

        <div className={styles.field}>
          <Label id={labelId}>Type</Label>
          <RadioGroup value={type} onChange={(_, data) => setType(data.value as DrawerType)} aria-labelledby={labelId}>
            <Radio value="overlay" label="Overlay (Default)" />
            <Radio value="inline" label="Inline" />
          </RadioGroup>
        </div>
      </div>
    </div>
  );
};
