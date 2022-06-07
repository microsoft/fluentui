import * as React from 'react';
import { action } from '@storybook/addon-actions';
import { makeStyles } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import { MoreHorizontal16Filled } from '@fluentui/react-icons';
import { Button } from '@fluentui/react-button';
import { Text, Caption1 } from '@fluentui/react-text';
import { Card, CardHeader } from '../';

export const ASSET_URL =
  'https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-card';

const powerpointLogoURL = ASSET_URL + '/assets/powerpoint_logo.svg';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
  example1: {
    width: '280px',
  },
  example1Caption: {
    color: tokens.colorNeutralForeground3,
  },
});

export const Templates = () => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <Card className={styles.example1}>
        <CardHeader
          image={<img src={powerpointLogoURL} />}
          header={<Text weight="semibold">Team offsite 2020</Text>}
          description={<Caption1 className={styles.example1Caption}>Onedrive &gt; Files</Caption1>}
          action={
            <Button
              appearance="transparent"
              icon={<MoreHorizontal16Filled />}
              onClick={action('Example 1 button pressed')}
            />
          }
        />
      </Card>
    </div>
  );
};
