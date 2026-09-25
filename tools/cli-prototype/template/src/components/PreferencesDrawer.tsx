import * as React from 'react';
import { Button, Divider, Field, Select, mergeClasses } from '@fluentui/react-components';
import { DismissRegular } from '@fluentui/react-icons';
import { Button as HeadlessButton } from '@fluentui/react-headless-components-preview/button';
import {
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerHeaderTitle,
  OverlayDrawer,
} from '@fluentui/react-headless-components-preview/drawer';
import { Radio, RadioGroup } from '@fluentui/react-headless-components-preview/radio-group';
import { Slider } from '@fluentui/react-headless-components-preview/slider';
import { Switch } from '@fluentui/react-headless-components-preview/switch';

import { useAppStyles, useHeadlessStyles } from '../styles';
import type { Preferences } from '../types';

type PreferencesDrawerProps = {
  open: boolean;
  darkMode: boolean;
  preferences: Preferences;
  onOpenChange: (open: boolean) => void;
  onThemeChange: (darkMode: boolean) => void;
  onPreferencesChange: (preferences: Preferences) => void;
};

export function PreferencesDrawer(props: PreferencesDrawerProps): React.ReactElement {
  const styles = useAppStyles();
  const headless = useHeadlessStyles();
  const update = <Key extends keyof Preferences>(key: Key, value: Preferences[Key]) => {
    props.onPreferencesChange({ ...props.preferences, [key]: value });
  };

  return (
    <OverlayDrawer
      className={headless.drawerSurface}
      data-testid="preferences-drawer"
      open={props.open}
      position="end"
      onOpenChange={(_, data) => props.onOpenChange(data.open)}
    >
      <DrawerHeader className={styles.drawerHeader}>
        <DrawerHeaderTitle
          action={
            <HeadlessButton
              aria-label="Close preferences"
              className={mergeClasses(headless.button, headless.iconButton)}
              onClick={() => props.onOpenChange(false)}
            >
              <DismissRegular />
            </HeadlessButton>
          }
        >
          Forum preferences
        </DrawerHeaderTitle>
      </DrawerHeader>

      <DrawerBody className={styles.drawerBody}>
        <section className={styles.preferenceGroup} aria-labelledby="appearance-heading">
          <h2 className={styles.heading} id="appearance-heading">
            Appearance
          </h2>
          <div className={styles.preferenceRow}>
            <div className={styles.preferenceDescription}>
              <strong>Dark theme</strong>
              <span className={styles.subheading}>Use a lower-luminance palette.</span>
            </div>
            <Switch
              aria-label="Dark theme"
              checked={props.darkMode}
              className={headless.switch}
              data-testid="theme-switch"
              indicator={{ className: headless.switchIndicator }}
              input={{ className: headless.switchInput }}
              onChange={(_, data) => props.onThemeChange(data.checked)}
            />
          </div>
          <div className={styles.preferenceRow}>
            <div className={styles.preferenceDescription}>
              <strong>Compact feed</strong>
              <span className={styles.subheading}>Reduce spacing between discussion details.</span>
            </div>
            <Switch
              aria-label="Compact feed"
              checked={props.preferences.compactFeed}
              className={headless.switch}
              data-testid="compact-feed-switch"
              indicator={{ className: headless.switchIndicator }}
              input={{ className: headless.switchInput }}
              onChange={(_, data) => update('compactFeed', data.checked)}
            />
          </div>
          <div className={styles.preferenceRow}>
            <div className={styles.preferenceDescription}>
              <strong>Reduce motion</strong>
              <span className={styles.subheading}>Prefer calmer state transitions.</span>
            </div>
            <Switch
              aria-label="Reduce motion"
              checked={props.preferences.reduceMotion}
              className={headless.switch}
              indicator={{ className: headless.switchIndicator }}
              input={{ className: headless.switchInput }}
              onChange={(_, data) => update('reduceMotion', data.checked)}
            />
          </div>
        </section>

        <Divider />

        <section className={styles.preferenceGroup} aria-labelledby="discussion-heading">
          <h2 className={styles.heading} id="discussion-heading">
            Discussions
          </h2>
          <Field label="Comment spacing">
            <RadioGroup
              className={headless.radioGroup}
              data-testid="comment-density"
              value={props.preferences.commentDensity}
              onChange={(_, data) => update('commentDensity', data.value as Preferences['commentDensity'])}
            >
              <Radio
                className={headless.radio}
                indicator={{ className: headless.radioIndicator }}
                input={{ className: headless.radioInput }}
                label={{ children: 'Cozy', className: headless.controlLabel }}
                value="cozy"
              />
              <Radio
                className={headless.radio}
                indicator={{ className: headless.radioIndicator }}
                input={{ className: headless.radioInput }}
                label={{ children: 'Compact', className: headless.controlLabel }}
                value="compact"
              />
            </RadioGroup>
          </Field>

          <Field
            hint={`${props.preferences.postsPerPage} discussions per page`}
            label={
              <span>
                Feed length <span className={styles.sliderValue}>{props.preferences.postsPerPage}</span>
              </span>
            }
          >
            <Slider
              aria-label="Discussions per page"
              className={headless.slider}
              data-testid="posts-per-page"
              input={{ className: headless.sliderInput }}
              max={24}
              min={6}
              rail={{ className: headless.sliderRail }}
              step={6}
              thumb={{ className: headless.sliderThumb }}
              value={props.preferences.postsPerPage}
              onChange={(_, data) => update('postsPerPage', data.value)}
            />
          </Field>

          <Field label="Content language">
            <Select
              data-testid="language-select"
              value={props.preferences.language}
              onChange={event => update('language', event.currentTarget.value)}
            >
              <option>English</option>
              <option>Deutsch</option>
              <option>Español</option>
              <option>Français</option>
            </Select>
          </Field>
        </section>

        <Divider />

        <section className={styles.preferenceGroup} aria-labelledby="notification-heading">
          <h2 className={styles.heading} id="notification-heading">
            Notifications
          </h2>
          <Switch
            checked={props.preferences.emailDigest}
            className={headless.switch}
            indicator={{ className: headless.switchIndicator }}
            input={{ className: headless.switchInput }}
            label={{ children: 'Weekly email digest', className: headless.controlLabel }}
            onChange={(_, data) => update('emailDigest', data.checked)}
          />
          <Switch
            checked={props.preferences.matureContent}
            className={headless.switch}
            indicator={{ className: headless.switchIndicator }}
            input={{ className: headless.switchInput }}
            label={{ children: 'Show mature-content discussions', className: headless.controlLabel }}
            onChange={(_, data) => update('matureContent', data.checked)}
          />
        </section>
      </DrawerBody>

      <DrawerFooter className={styles.drawerFooter}>
        <Button appearance="primary" data-testid="preferences-done" onClick={() => props.onOpenChange(false)}>
          Done
        </Button>
      </DrawerFooter>
    </OverlayDrawer>
  );
}
