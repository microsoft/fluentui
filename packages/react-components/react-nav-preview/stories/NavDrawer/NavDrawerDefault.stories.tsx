import * as React from 'react';
import {
  Hamburger,
  HamburgerInNav,
  NavCategory,
  NavCategoryItem,
  NavDrawer,
  NavDrawerBody,
  NavDrawerFooter,
  NavDrawerHeader,
  NavDrawerHeaderNav,
  NavDrawerProps,
  NavItem,
  NavSectionHeader,
  NavSubItem,
  NavSubItemGroup,
} from '@fluentui/react-nav-preview';
import { DrawerProps } from '@fluentui/react-drawer';
import { Label, Radio, RadioGroup, makeStyles, tokens, useId } from '@fluentui/react-components';
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

const useStyles = makeStyles({
  root: {
    overflow: 'hidden',
    display: 'flex',
    height: '600px',
  },
  content: {
    flex: '1',
    padding: '16px',
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

  return (
    <div className={styles.root}>
      <NavDrawer defaultSelectedValue="2" defaultSelectedCategoryValue="1" open={isOpen} type={type} size="small">
        <NavDrawerHeader>
          <NavDrawerHeaderNav>
            <HamburgerInNav onClick={() => setIsOpen(false)} />
          </NavDrawerHeaderNav>
        </NavDrawerHeader>
        <NavDrawerBody>
          <NavSectionHeader>Home</NavSectionHeader>
          <NavItem href="https://www.bing.com" icon={<Dashboard />} value="1">
            Dashboard
          </NavItem>
          <NavItem href="https://www.bing.com" icon={<Announcements />} value="2">
            Announcements
          </NavItem>
          <NavItem href="https://www.bing.com" icon={<EmployeeSpotlight />} value="3">
            Employee Spotlight
          </NavItem>
          <NavItem icon={<Search />} href="https://www.bing.com" value="4">
            Profile Search
          </NavItem>
          <NavItem icon={<PerformanceReviews />} href="https://www.bing.com" value="5">
            Performance Reviews
          </NavItem>

          <NavSectionHeader>Employee Management</NavSectionHeader>
          <NavCategory value="6">
            <NavCategoryItem icon={<JobPostings />}>Job Postings</NavCategoryItem>
            <NavSubItemGroup>
              <NavSubItem href="https://www.bing.com" value="7">
                Openings
              </NavSubItem>
              <NavSubItem href="https://www.bing.com" value="8">
                Submissions
              </NavSubItem>
            </NavSubItemGroup>
          </NavCategory>
          <NavItem icon={<Interviews />} value="9">
            Interviews
          </NavItem>
          <NavItem href="https://www.bing.com" icon={<HealthPlans />} value="10">
            Health Plans
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
              <NavSubItem href="https://www.bing.com" value="13">
                Plan Information
              </NavSubItem>
              <NavSubItem href="https://www.bing.com" value="14">
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
              <NavSubItem href="https://www.bing.com" value="17">
                Career Paths
              </NavSubItem>
              <NavSubItem href="https://www.bing.com" value="18">
                Planning
              </NavSubItem>
            </NavSubItemGroup>
          </NavCategory>

          <NavSectionHeader>Analytics</NavSectionHeader>
          <NavItem target="_blank" icon={<Analytics />} value="19">
            Workforce Data
          </NavItem>
          <NavItem href="https://www.bing.com" icon={<Reports />} value="20">
            Reports
          </NavItem>
        </NavDrawerBody>
        <NavDrawerFooter>
          <NavItem value="21" href="https://www.bing.com" icon={<Person />}>
            Profile
          </NavItem>
          <NavItem icon={<Settings />} href="https://www.bing.com" value="24">
            App Settings
          </NavItem>
        </NavDrawerFooter>
      </NavDrawer>
      <div className={styles.content}>
        {!isOpen && <Hamburger onClick={() => setIsOpen(true)} />}
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
