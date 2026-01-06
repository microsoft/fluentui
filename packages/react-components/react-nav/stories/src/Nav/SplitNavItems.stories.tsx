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
    splitNavItem: { navItem: { value: '1', icon: <Dashboard />, children: 'Dashboard' } },
  },
  {
    splitNavItem: { navItem: { value: '2', icon: <Announcements />, children: 'Announcements' } },
  },
  {
    splitNavItem: { navItem: { value: '3', icon: <EmployeeSpotlight />, children: 'Employee Spotlight' } },
  },
  {
    splitNavItem: { navItem: { value: '4', icon: <Search />, children: 'Profile Search' } },
  },
  {
    splitNavItem: { navItem: { value: '5', icon: <PerformanceReviews />, children: 'Performance Reviews' } },
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
    splitNavItem: { navItem: { value: '9', icon: <Interviews />, children: 'Interviews' } },
  },
  {
    splitNavItem: { navItem: { value: '10', icon: <HealthPlans />, children: 'Health Plans' } },
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
    splitNavItem: { navItem: { value: '15', icon: <TrainingPrograms />, children: 'Training Programs' } },
  },
  {
    navCategory: { value: '16' },
    navCategoryItem: { icon: <CareerDevelopment />, children: 'Career Development' },
    navSubItems: [
      { navItem: { value: '17', children: 'Career Paths' } },
      { navItem: { value: '18', children: 'Planning' } },
    ],
  },
  {
    splitNavItem: { navItem: { value: '19', icon: <Analytics />, children: 'Workforce Data' } },
  },
  {
    splitNavItem: { navItem: { value: '20', icon: <Reports />, children: 'Reports' } },
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
                menuButtonTooltip={{ content: 'More options', relationship: 'label' }}
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
