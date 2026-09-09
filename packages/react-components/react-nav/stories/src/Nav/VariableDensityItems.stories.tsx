import * as React from 'react';
import type { JSXElement, NavDrawerProps, NavDensity } from '@fluentui/react-components';
import {
  Hamburger,
  NavCategory,
  NavCategoryItem,
  NavDrawer,
  NavDrawerBody,
  NavDrawerHeader,
  NavItem,
  NavSectionHeader,
  NavSubItem,
  NavSubItemGroup,
  NavDivider,
  AppItem,
  AppItemStatic,
} from '@fluentui/react-components';
import { Label, Switch, Tooltip, makeStyles, tokens, useId, Radio, RadioGroup } from '@fluentui/react-components';
import {
  BoardFilled,
  BoardRegular,
  BoxMultipleFilled,
  BoxMultipleRegular,
  DataAreaFilled,
  DataAreaRegular,
  DocumentBulletListMultipleFilled,
  DocumentBulletListMultipleRegular,
  HeartPulseFilled,
  HeartPulseRegular,
  MegaphoneLoudFilled,
  MegaphoneLoudRegular,
  NotePinFilled,
  NotePinRegular,
  PeopleFilled,
  PeopleRegular,
  PeopleStarFilled,
  PeopleStarRegular,
  PersonFilled,
  PersonLightbulbFilled,
  PersonLightbulbRegular,
  PersonRegular,
  PersonSearchFilled,
  PersonSearchRegular,
  PreviewLinkFilled,
  PreviewLinkRegular,
  bundleIcon,
  PersonCircleRegular,
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

const Person = bundleIcon(PersonFilled, PersonRegular);
const Dashboard = bundleIcon(BoardFilled, BoardRegular);
const Announcements = bundleIcon(MegaphoneLoudFilled, MegaphoneLoudRegular);
const EmployeeSpotlight = bundleIcon(PersonLightbulbFilled, PersonLightbulbRegular);
const Search = bundleIcon(PersonSearchFilled, PersonSearchRegular);
const PerformanceReviews = bundleIcon(PreviewLinkFilled, PreviewLinkRegular);
const JobPostings = bundleIcon(NotePinFilled, NotePinRegular);
const Interviews = bundleIcon(PeopleFilled, PeopleRegular);
const HealthPlans = bundleIcon(HeartPulseFilled, HeartPulseRegular);
const TrainingPrograms = bundleIcon(BoxMultipleFilled, BoxMultipleRegular);
const CareerDevelopment = bundleIcon(PeopleStarFilled, PeopleStarRegular);
const Analytics = bundleIcon(DataAreaFilled, DataAreaRegular);
const Reports = bundleIcon(DocumentBulletListMultipleFilled, DocumentBulletListMultipleRegular);

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
      <PersonCircleRegular fontSize={24} />
    ) : (
      <PersonCircleRegular fontSize={32} />
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
