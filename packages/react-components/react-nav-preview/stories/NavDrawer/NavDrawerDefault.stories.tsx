import * as React from 'react';
import {
  NavCategory,
  NavCategoryItem,
  NavDrawer,
  NavDrawerProps,
  NavItem,
  NavSubItem,
  NavSubItemGroup,
} from '@fluentui/react-nav-preview';
import { DrawerBody, DrawerFooter, DrawerHeader, DrawerHeaderNavigation, DrawerProps } from '@fluentui/react-drawer';
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

const useStyles = makeStyles({
  root: {
    ...shorthands.border('2px', 'solid', '#ccc'),
    ...shorthands.overflow('hidden'),
    display: 'flex',
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
  drawerFooterOverrides: {
    display: 'unset',
    ...shorthands.padding(0, tokens.spacingVerticalMNudge),
  },
  drawerHeaderOverrides: {
    ...shorthands.margin('unset'),
    paddingInlineStart: '12px',
    paddingBlockStart: '0px',
    paddingBlockEnd: '0px',
  },
  drawerHeaderNavOverrides: {
    ...shorthands.margin('unset'),
    paddingInlineStart: '0px',
    paddingBlockStart: '0px',
  },
  drawerBodyOverrides: {
    ...shorthands.padding(0, tokens.spacingVerticalMNudge),
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
        <DrawerHeader className={styles.drawerHeaderOverrides}>
          <DrawerHeaderNavigation className={styles.drawerHeaderNavOverrides}>
            <Button appearance="transparent" icon={<NavigationFilled />} className={styles.hamburger} />
          </DrawerHeaderNavigation>
        </DrawerHeader>
        <DrawerBody className={styles.drawerBodyOverrides}>
          <Caption1Strong className={styles.headingContent}>Home</Caption1Strong>
          <NavItem target="_blank" icon={<Dashboard />} onClick={someClickHandler} value="1">
            Dashboard
          </NavItem>
          <NavItem target="_blank" icon={<Announcements />} onClick={someClickHandler} value="2">
            Announcements
          </NavItem>
          <NavItem target="_blank" icon={<EmployeeSpotlight />} onClick={someClickHandler} value="3">
            Employee Spotlight
          </NavItem>
          <Caption1Strong className={styles.headingContent}>Employee Management</Caption1Strong>
          <NavItem target="_blank" icon={<Search />} onClick={someClickHandler} value="4">
            Profile Search
          </NavItem>
          <NavItem target="_blank" icon={<PerformanceReviews />} onClick={someClickHandler} value="5">
            Performance Reviews
          </NavItem>
          <NavCategory value="6">
            <NavCategoryItem icon={<JobPostings />}>Job Postings</NavCategoryItem>
            <NavSubItemGroup>
              <NavSubItem target="_blank" onClick={someClickHandler} value="7">
                Openings
              </NavSubItem>
              <NavSubItem target="_blank" onClick={someClickHandler} value="8">
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
              <NavSubItem target="_blank" onClick={someClickHandler} value="13">
                Plan Information
              </NavSubItem>
              <NavSubItem target="_blank" onClick={someClickHandler} value="14">
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
              <NavSubItem target="_blank" onClick={someClickHandler} value="17">
                Career Paths
              </NavSubItem>
              <NavSubItem target="_blank" onClick={someClickHandler} value="18">
                Planning
              </NavSubItem>
            </NavSubItemGroup>
          </NavCategory>

          <Caption1Strong className={styles.headingContent}>Analytics</Caption1Strong>
          <NavItem target="_blank" onClick={someClickHandler} icon={<Analytics />} value="19">
            Workforce Data
          </NavItem>
          <NavItem target="_blank" onClick={someClickHandler} icon={<Reports />} value="20">
            Reports
          </NavItem>
        </DrawerBody>
        <DrawerFooter className={styles.drawerFooterOverrides}>
          <NavItem value="21" target="_blank" onClick={someClickHandler} icon={<Person />}>
            Profile
          </NavItem>
          <NavItem icon={<Settings />} target="_blank" onClick={someClickHandler} value="24">
            App Settings
          </NavItem>
        </DrawerFooter>
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
