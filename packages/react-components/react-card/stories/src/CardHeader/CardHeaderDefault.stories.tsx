import * as React from 'react';
import { CardHeader } from '@fluentui/react-components';
import { makeStyles, Button, Body1, Caption1, FluentProvider, mergeClasses } from '@fluentui/react-components';
import { MoreHorizontal20Regular } from '@fluentui/react-icons';
import type { CardState, FluentProviderCustomStyleHooks } from '@fluentui/react-components';

const useCardHeaderStyle = makeStyles({
  root: {
    backgroundColor: 'red',
  },
});

const useCardHeaderStyles = (state: unknown) => {
  const cardStyles = useCardHeaderStyle();
  const componentState = state as CardState;
  componentState.root.className = mergeClasses(componentState.root.className, cardStyles.root);
};

const CUSTOM_STYLE_HOOKS: FluentProviderCustomStyleHooks = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  useCardHeaderStyles_unstable: useCardHeaderStyles,
};

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: '16px',
    gap: '16px',
  },
  header: {
    width: '300px',
  },
});

const resolveAsset = (asset: string) => {
  const ASSET_URL =
    'https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-card/stories/src/assets/';

  return `${ASSET_URL}${asset}`;
};

export const Default = () => {
  const styles = useStyles();

  const powerpointLogoURL = resolveAsset('pptx.png');

  return (
    <FluentProvider customStyleHooks_unstable={CUSTOM_STYLE_HOOKS}>
      <div className={styles.container}>
        <CardHeader
          className={styles.header}
          image={{ as: 'img', src: powerpointLogoURL, alt: 'Microsoft PowerPoint logo' }}
          header={
            <Body1>
              <b>App Name</b>
            </Body1>
          }
          description={<Caption1>Developer</Caption1>}
          action={<Button appearance="transparent" icon={<MoreHorizontal20Regular />} aria-label="More options" />}
        />

        <CardHeader
          className={styles.header}
          header={
            <Body1>
              <b>App Name</b>
            </Body1>
          }
          description={<Caption1>Developer</Caption1>}
          action={<Button appearance="transparent" icon={<MoreHorizontal20Regular />} aria-label="More options" />}
        />

        <CardHeader
          className={styles.header}
          image={{ as: 'img', src: powerpointLogoURL, alt: 'Microsoft PowerPoint logo' }}
          header={
            <Body1>
              <b>App Name</b>
            </Body1>
          }
          action={<Button appearance="transparent" icon={<MoreHorizontal20Regular />} aria-label="More options" />}
        />

        <CardHeader
          className={styles.header}
          image={{ as: 'img', src: powerpointLogoURL, alt: 'Microsoft PowerPoint logo' }}
          header={
            <Body1>
              <b>App Name</b>
            </Body1>
          }
          description={<Caption1>Developer</Caption1>}
        />

        <CardHeader
          className={styles.header}
          header={
            <Body1>
              <b>App Name</b>
            </Body1>
          }
          action={<Button appearance="transparent" icon={<MoreHorizontal20Regular />} aria-label="More options" />}
        />

        <CardHeader
          className={styles.header}
          header={
            <Body1>
              <b>App Name</b>
            </Body1>
          }
          description={<Caption1>Developer</Caption1>}
        />

        <CardHeader
          className={styles.header}
          image={{ as: 'img', src: powerpointLogoURL, alt: 'Microsoft PowerPoint logo' }}
          header={
            <Body1>
              <b>App Name</b>
            </Body1>
          }
        />

        <CardHeader
          className={styles.header}
          header={
            <Body1>
              <b>App Name</b>
            </Body1>
          }
        />
      </div>
    </FluentProvider>
  );
};
