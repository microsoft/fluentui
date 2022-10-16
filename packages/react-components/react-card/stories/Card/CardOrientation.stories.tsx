import * as React from 'react';
import { makeStyles, shorthands, Avatar, Body1, Button, Caption1 } from '@fluentui/react-components';
import { MoreHorizontal24Regular } from '@fluentui/react-icons';
import { Card, CardHeader, CardPreview } from '@fluentui/react-card';
import { SampleCard, Title } from './SampleCard.stories';
import Logo from '../assets/logo.svg';

const ASSET_URL = 'https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-card';
const avatarElviaURL = ASSET_URL + '/stories/assets/avatar_elvia.svg';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('30px'),

    ['> *']: {
      width: 'fit-content',
    },
  },
  horizontalPreview: {
    height: '60px',
  },
});

export const Orientation = () => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <div>
        <Title title="'horizontal'" />
        <Card size="small" orientation="horizontal">
          <CardPreview className={styles.horizontalPreview}>
            <img src={Logo} alt="company logo template" />
          </CardPreview>
          <CardHeader
            image={<Avatar badge={{ status: 'available' }} image={{ src: avatarElviaURL }} />}
            header={
              <Body1>
                <b>Strategy 2021</b>
              </Body1>
            }
            description={<Caption1>https://aka.ms/fluentui</Caption1>}
            action={<Button appearance="transparent" icon={<MoreHorizontal24Regular />} />}
          />
        </Card>
      </div>
      <div>
        <Title title="'vertical' (Default)" />
        <SampleCard />
      </div>
    </div>
  );
};
