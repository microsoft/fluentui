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
import type { DrawerProps } from '@fluentui/react-drawer';
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
          <AppItem icon={<PersonCircleRegular />} as="a" href={linkDestination}>
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

CustomMotion.parameters = {
  docs: {
    description: {
      story:
        'NavDrawer animations can be customized using the [Motion APIs](?path=/docs/motion-apis-createpresencecomponent--docs), together with the `surfaceMotion` prop.',
    },
  },
};
