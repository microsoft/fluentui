import * as React from 'react';

import { makeStyles } from '@fluentui/react-components';
import { Body1, Caption1, Avatar } from '@fluentui/react-components';
import { Card, CardHeader, CardPreview } from '@fluentui/react-card';
import { ASSET_URL } from './SampleCard.stories';
import type { CardProps } from '@fluentui/react-card';

const previewImage = ASSET_URL + '/assets/interactive-example.png';
const appLogo = ASSET_URL + '/assets/app_logo.svg';

const useStyles = makeStyles({
  root: {
    maxWidth: '280px',
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
