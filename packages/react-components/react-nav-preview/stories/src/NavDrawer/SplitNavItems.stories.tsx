import * as React from 'react';
import {
  Hamburger,
  NavDrawer,
  NavDrawerBody,
  NavDrawerHeader,
  NavDrawerProps,
  NavSize,
  AppItem,
  AppItemStatic,
  SplitNavItem,
  SplitNavItemProps,
  NavItemProps,
} from '@fluentui/react-nav-preview';
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

const splitNavItems: SplitNavItemProps[] = [
  {
    navItem: { value: '1', icon: <Dashboard /> },
    children: 'Dashboard',
  },
  {
    navItem: { value: '2', icon: <Announcements /> },
    children: 'Announcements',
  },
  {
    navItem: { value: '3', icon: <EmployeeSpotlight /> },
    children: 'Employee Spotlight',
  },
  {
    navItem: { value: '4', icon: <Search /> },
    children: 'Profile Search',
  },
  {
    navItem: { value: '5', icon: <PerformanceReviews /> },
    children: 'Performance Reviews',
  },
  {
    navItem: { value: '9', icon: <Interviews /> },
    children: 'Interviews',
  },
  {
    navItem: { value: '10', icon: <HealthPlans /> },
    children: 'Health Plans',
  },
  {
    navItem: { value: '15', icon: <TrainingPrograms /> },
    children: 'Training Programs',
  },
  {
    navItem: { value: '19', icon: <Analytics /> },
    children: 'Workforce Data',
  },
  {
    navItem: { value: '20', icon: <Reports /> },
    children: 'Reports',
  },
];

const SomeMenuPopover = () => {
  return (
    <MenuPopover>
      <MenuList>
        <MenuItem>Item a</MenuItem>
        <MenuItem>Item b</MenuItem>
      </MenuList>
    </MenuPopover>
  );
};

export const SplitNavItems = (props: Partial<NavDrawerProps>) => {
  const styles = useStyles();

  const labelId = useId('type-label');
  const linkLabelId = useId('link-label');
  const appItemIconLabelId = useId('app-item-icon-label');
  const appItemStaticLabelId = useId('app-item-static-label');

  const [size, setNavSize] = React.useState<NavSize>('small');
  const [enabledLinks, setEnabledLinks] = React.useState(true);
  const [isAppItemIconPresent, setIsAppItemIconPresent] = React.useState(true);
  const [isAppItemStatic, setIsAppItemStatic] = React.useState(true);
  const [pinnedValues, setPinnedValues] = React.useState<string[]>([]);

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

  const handlePinClick = (value: string) => {
    if (pinnedValues.includes(value)) {
      setPinnedValues(pinnedValues.filter(v => v !== value));
    } else {
      setPinnedValues([...pinnedValues, value]);
    }
  };

  const generateSplitNavItems = () => {
    return splitNavItems.map((item: SplitNavItemProps, index) => {
      const value: string = (item.navItem as NavItemProps).value;

      return (
        <Menu key={index} positioning="below-end">
          <MenuTrigger>
            {(triggerProps: MenuButtonProps) => (
              <SplitNavItem
                navItem={item.navItem}
                toggleButton={{
                  onClick: () => handlePinClick(value),
                  icon: pinnedValues.includes(value) ? <Pin20Filled /> : <Pin20Regular />,
                }}
                menuButton={triggerProps}
              >
                {item.children}
              </SplitNavItem>
            )}
          </MenuTrigger>
          <SomeMenuPopover />
        </Menu>
      );
    });
  };

  return (
    <div className={styles.root}>
      <NavDrawer defaultSelectedValue="5" open={true} type={'inline'} size={size}>
        <NavDrawerHeader>
          <Tooltip content="Navigation" relationship="label">
            <Hamburger />
          </Tooltip>
        </NavDrawerHeader>
        <NavDrawerBody>
          {appItem}
          {generateSplitNavItems()}
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
