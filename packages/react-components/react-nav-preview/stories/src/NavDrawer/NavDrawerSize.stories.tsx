import * as React from 'react';
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
  NavSize,
  NavDivider,
  AppItem,
  AppItemStatic,
} from '@fluentui/react-nav-preview';
import { Label, Radio, RadioGroup, Switch, Tooltip, makeStyles, tokens, useId } from '@fluentui/react-components';
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
  PersonCircle24Regular,
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

export const NavDrawerSize = (props: Partial<NavDrawerProps>) => {
  const styles = useStyles();

  const labelId = useId('type-label');
  const linkLabelId = useId('link-label');
  const appItemIconLabelId = useId('app-item-icon-label');
  const appItemStaticLabelId = useId('app-item-static-label');

  const [size, setNavSize] = React.useState<NavSize>('small');
  const [enabledLinks, setEnabledLinks] = React.useState(true);
  const [isAppItemIconPresent, setIsAppItemIconPresent] = React.useState(true);
  const [isAppItemStatic, setIsAppItemStatic] = React.useState(true);

  const linkDestination = enabledLinks ? 'https://www.bing.com' : '';

  const appItemIcon = isAppItemIconPresent ? (
    size === 'small' ? (
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
      <NavDrawer defaultSelectedValue="7" defaultSelectedCategoryValue="6" open={true} type={'inline'} size={size}>
        <NavDrawerHeader>
          <Tooltip content="Navigation" relationship="label">
            <Hamburger />
          </Tooltip>
        </NavDrawerHeader>
        <NavDrawerBody>
          {appItem}
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

          <NavDivider />
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
          <NavItem target="_blank" icon={<Analytics />} value="19">
            Workforce Data
          </NavItem>
          <NavItem href="https://www.bing.com" icon={<Reports />} value="20">
            Reports
          </NavItem>
        </NavDrawerBody>
      </NavDrawer>
      <div className={styles.content}>
        <div className={styles.field}>
          <Label id={labelId}>Size</Label>
          <RadioGroup value={size} onChange={(_, data) => setNavSize(data.value as NavSize)} aria-labelledby={labelId}>
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
