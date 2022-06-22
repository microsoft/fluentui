import * as React from 'react';
import { makeStyles } from '@griffel/react';
import { Button } from '@fluentui/react-button';
import { Open16Regular, Share16Regular } from '@fluentui/react-icons';
import { Body1, Caption1, Subtitle1 } from '@fluentui/react-text';
import { Card, CardHeader, CardFooter, CardPreview } from '@fluentui/react-card';
import type { CardProps } from '@fluentui/react-card';

export const ASSET_URL =
  'https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-card';

const powerpointLogoURL = ASSET_URL + '/assets/powerpoint_logo.svg';
const salesPresentationTemplateURL = ASSET_URL + '/assets/sales_template.png';

export const SampleCard = (props: CardProps) => (
  <Card {...props}>
    <CardPreview>
      <img src={salesPresentationTemplateURL} alt="sales presentation preview" />
    </CardPreview>
    <CardHeader
      image={<img src={powerpointLogoURL} alt="Microsoft PowerPoint logo" />}
      header={
        <Body1>
          <b>App Name</b>
        </Body1>
      }
      description={<Caption1>Developer</Caption1>}
    />
    <div>
      Donut chocolate bar oat cake. Dragée tiramisu lollipop bear claw. Marshmallow pastry jujubes toffee sugar plum.
    </div>
    <CardFooter>
      <Button appearance="primary" icon={<Open16Regular />}>
        Open
      </Button>
      <Button icon={<Share16Regular />}>Share</Button>
    </CardFooter>
  </Card>
);

const useStyles = makeStyles({
  container: {
    marginBottom: '16px',
  },
});

export const Title = (props: { title: string; description?: string }) => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <Subtitle1 block>{props.title}</Subtitle1>
      {props.description && <Body1 block>{props.description}</Body1>}
    </div>
  );
};
