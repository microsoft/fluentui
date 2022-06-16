import * as React from 'react';
import { action } from '@storybook/addon-actions';
import { makeStyles, shorthands } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import { MoreHorizontal16Filled } from '@fluentui/react-icons';
import { Button } from '@fluentui/react-button';
import { Text, Caption1 } from '@fluentui/react-text';
import { Card, CardHeader } from '../';
import AppLogo from '../../assets/app_logo.svg';
import Logo1 from '../../assets/logo.svg';
import Logo2 from '../../assets/logo2.svg';

export const ASSET_URL =
  'https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-card';

const powerpointLogoURL = ASSET_URL + '/assets/powerpoint_logo.svg';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('16px'),
  },
  size: {
    width: '280px',
  },
  caption: {
    color: tokens.colorNeutralForeground3,
  },
  headerImage: {
    maxWidth: '44px',
    maxHeight: '44px',

    [`> img`]: {
      ...shorthands.borderRadius('4px'),
    },
  },
  example3Header: {
    display: 'flex',
    flexDirection: 'row',
    ...shorthands.gap('4px'),
    justifyContent: 'flex-start',

    '> *': {
      height: '32px',
      ...shorthands.borderRadius('4px'),
    },
  },
  example3Footer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export const Templates = () => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <Card className={styles.size}>
        <CardHeader
          image={<img src={powerpointLogoURL} />}
          header={<Text weight="semibold">Team offsite 2020</Text>}
          description={<Caption1 className={styles.caption}>Onedrive &gt; Files</Caption1>}
          action={
            <Button
              appearance="transparent"
              icon={<MoreHorizontal16Filled />}
              onClick={action('Example 1 button pressed')}
            />
          }
        />
      </Card>
      <Card className={styles.size}>
        <CardHeader
          image={{ className: styles.headerImage, children: <img src={AppLogo} /> }}
          header={<Text weight="semibold">App Name</Text>}
          description={<Caption1 className={styles.caption}>Developer</Caption1>}
          action={
            <Button
              appearance="transparent"
              icon={<MoreHorizontal16Filled />}
              onClick={action('Example 1 button pressed')}
            />
          }
        />
        <span>
          Donut chocolate bar oat cake. Dragée tiramisu lollipop bear claw. Marshmallow pastry jujubes toffee sugar
          plum.
        </span>
      </Card>
      <Card className={styles.size}>
        <div className={styles.example3Header}>
          <img src={Logo1} />
          <img src={Logo2} />
        </div>
        <CardHeader
          header={<Text weight="semibold">Alert in Teams when a new document is uploaded in channel</Text>}
          description={<Caption1 className={styles.caption}>By Microsoft</Caption1>}
        />
        <div className={styles.example3Footer}>
          <span>Automated</span>
          <span>3290</span>
        </div>
      </Card>
    </div>
  );
};
