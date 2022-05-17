import * as React from 'react';
import { makeStyles, shorthands } from '@griffel/react';
import { Card, CardHeader, CardFooter, CardPreview } from '../index';
import { SampleCard, Title } from './SampleCard.stories';
import { Body, Button, Caption } from '@fluentui/react-components';
import { Open16Regular, Share16Regular } from '@fluentui/react-icons';

export const ASSET_URL =
  'https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-card';

const powerpointLogoURL = ASSET_URL + '/assets/powerpoint_logo.svg';
const salesPresentationTemplateURL = ASSET_URL + '/assets/sales_template.png';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('30px'),

    ['> *']: {
      width: '500px',
    },
  },
  horizontalPreview: {
    height: '64px',
  },
});

export const Orientation = () => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <div>
        <Title title="'horizontal'" />
        <Card orientation="horizontal">
          <CardPreview className={styles.horizontalPreview}>
            <img src={salesPresentationTemplateURL} alt="sales presentation preview" />
          </CardPreview>
          <CardHeader
            image={<img src={powerpointLogoURL} alt="Microsoft PowerPoint logo" />}
            header={
              <Body>
                <b>App Name</b>
              </Body>
            }
            description={<Caption>Developer</Caption>}
          />
          <div>
            <div>Donut chocolate bar oat cake.</div>
            <div> Dragée tiramisu lollipop bear claw.</div>
          </div>
        </Card>
      </div>
      <div>
        <Title title="'vertical' (Default)" />
        <SampleCard />
      </div>
    </div>
  );
};
