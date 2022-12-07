import * as React from 'react';
import { CardHeader } from '@fluentui/react-card';
import { makeStyles, shorthands, Button, Body1, Caption1 } from '@fluentui/react-components';
import { MoreHorizontal20Filled } from '@fluentui/react-icons';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.padding('16px'),
    ...shorthands.gap('16px'),
  },
  header: {
    width: '300px',
  },
});

const resolveAsset = (asset: string) => {
  const ASSET_URL =
    'https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-card/stories/assets/';

  return `${ASSET_URL}${asset}`;
};

export const Default = () => {
  const styles = useStyles();

  const powerpointLogoURL = resolveAsset('powerpoint_logo.svg');

  return (
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
        action={<Button appearance="transparent" icon={<MoreHorizontal20Filled />} aria-label="More options" />}
      />

      <CardHeader
        className={styles.header}
        header={
          <Body1>
            <b>App Name</b>
          </Body1>
        }
        description={<Caption1>Developer</Caption1>}
        action={<Button appearance="transparent" icon={<MoreHorizontal20Filled />} aria-label="More options" />}
      />

      <CardHeader
        className={styles.header}
        image={{ as: 'img', src: powerpointLogoURL, alt: 'Microsoft PowerPoint logo' }}
        header={
          <Body1>
            <b>App Name</b>
          </Body1>
        }
        action={<Button appearance="transparent" icon={<MoreHorizontal20Filled />} aria-label="More options" />}
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
        action={<Button appearance="transparent" icon={<MoreHorizontal20Filled />} aria-label="More options" />}
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
  );
};
