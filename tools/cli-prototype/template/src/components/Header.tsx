import * as React from 'react';
import { Avatar, Badge, Button, SearchBox, Tooltip, mergeClasses } from '@fluentui/react-components';
import {
  AlertRegular,
  AddRegular,
  DarkThemeRegular,
  NavigationRegular,
  SettingsRegular,
  WeatherSunnyRegular,
} from '@fluentui/react-icons';
import { Menu, MenuItem, MenuList, MenuPopover, MenuTrigger } from '@fluentui/react-headless-components-preview/menu';

import { useAppStyles, useHeadlessStyles } from '../styles';

type HeaderProps = {
  query: string;
  darkMode: boolean;
  notificationCount: number;
  onQueryChange: (value: string) => void;
  onCreatePost: () => void;
  onToggleTheme: () => void;
  onOpenPreferences: () => void;
  onOpenNavigation: () => void;
  onClearNotifications: () => void;
};

export function Header(props: HeaderProps): React.ReactElement {
  const styles = useAppStyles();
  const headless = useHeadlessStyles();

  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <Button
          appearance="subtle"
          aria-label="Open community navigation"
          className={styles.mobileOnly}
          icon={<NavigationRegular />}
          onClick={props.onOpenNavigation}
        />
        <span className={styles.brandMark} aria-hidden="true">
          FF
        </span>
        <span className={styles.brandText}>Fluent Forum</span>
      </div>

      <SearchBox
        aria-label="Search Fluent Forum"
        className={styles.search}
        data-testid="forum-search"
        placeholder="Search discussions, people, or flair"
        value={props.query}
        onChange={(_, data) => props.onQueryChange(data.value)}
      />

      <div className={styles.headerActions}>
        <Tooltip content="Create a post" relationship="label">
          <Button
            appearance="primary"
            aria-label="Create a post"
            className={styles.desktopOnly}
            data-testid="create-post"
            icon={<AddRegular />}
            onClick={props.onCreatePost}
          >
            New post
          </Button>
        </Tooltip>
        <Button
          appearance="primary"
          aria-label="Create a post"
          className={styles.mobileOnly}
          data-testid="create-post-mobile"
          icon={<AddRegular />}
          onClick={props.onCreatePost}
        />

        <Menu>
          <MenuTrigger disableButtonEnhancement>
            <Button
              appearance="subtle"
              aria-label={`Notifications, ${props.notificationCount} unread`}
              data-testid="notifications-trigger"
              icon={
                <Badge appearance="filled" color="brand" size="small">
                  {props.notificationCount}
                </Badge>
              }
            >
              <AlertRegular />
            </Button>
          </MenuTrigger>
          <MenuPopover className={headless.menuPopover}>
            <MenuList className={headless.menuList}>
              <MenuItem className={headless.menuItem} disabled={props.notificationCount === 0}>
                <span className={styles.notificationItem}>
                  <strong>Accessibility shared a new guide</strong>
                  <span>Keyboard review before handoff</span>
                </span>
              </MenuItem>
              <MenuItem className={headless.menuItem} disabled={props.notificationCount === 0}>
                <span className={styles.notificationItem}>
                  <strong>Your saved discussion has replies</strong>
                  <span>3 people joined the token conversation</span>
                </span>
              </MenuItem>
              <MenuItem
                className={headless.menuItem}
                data-testid="mark-notifications-read"
                disabled={props.notificationCount === 0}
                onClick={props.onClearNotifications}
              >
                Mark all as read
              </MenuItem>
            </MenuList>
          </MenuPopover>
        </Menu>

        <Menu>
          <MenuTrigger disableButtonEnhancement>
            <Button appearance="subtle" aria-label="Open profile menu" data-testid="profile-menu-trigger">
              <Avatar color="colorful" name="Alex Morgan" size={28} />
            </Button>
          </MenuTrigger>
          <MenuPopover className={headless.menuPopover}>
            <MenuList className={headless.menuList}>
              <MenuItem
                className={mergeClasses(headless.menuItem)}
                data-testid="preferences-menu-item"
                onClick={props.onOpenPreferences}
              >
                <SettingsRegular />
                Preferences
              </MenuItem>
              <MenuItem className={headless.menuItem} onClick={props.onToggleTheme}>
                {props.darkMode ? <WeatherSunnyRegular /> : <DarkThemeRegular />}
                {props.darkMode ? 'Use light theme' : 'Use dark theme'}
              </MenuItem>
            </MenuList>
          </MenuPopover>
        </Menu>
      </div>
    </header>
  );
}
