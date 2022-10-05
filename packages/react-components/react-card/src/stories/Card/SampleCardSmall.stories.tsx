import * as React from 'react';

import { makeStyles } from '@fluentui/react-components';
import { Body1, Caption1, Avatar } from '@fluentui/react-components';
import { Card, CardHeader, CardPreview } from '@fluentui/react-card';
import type { CardProps } from '@fluentui/react-card';

const ASSET_URL = 'https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-card';
const previewImage = ASSET_URL + '/assets/interactive-example.png';
const appLogo = ASSET_URL + '/assets/app_logo.svg';

const useStyles = makeStyles({
  root: {
    width: '480px',
    maxWidth: '100%',
  },
});

export const SampleCardSmall = (props: CardProps) => {
  const styles = useStyles();

  return (
    <Card className={styles.root} {...props}>
      <CardHeader
        image={
          <Avatar
            image={{
              src: appLogo,
              alt: 'App Name',
            }}
            size={40}
            shape="square"
          />
        }
        header={
          <Body1>
            <b>Strategy 2022</b>
          </Body1>
        }
        description={<Caption1>Album</Caption1>}
      />

      <CardPreview>
        <img src={previewImage} alt="Strategy 2022" />
      </CardPreview>
    </Card>
  );
};
