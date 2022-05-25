import * as React from 'react';
import { Button } from '@fluentui/react-button';
import { Open16Regular, Share16Regular } from '@fluentui/react-icons';
import { Body1, Caption1 } from '@fluentui/react-text';
import { Card, CardHeader, CardFooter, CardPreview } from '../index';
import type { CardProps } from '../index';

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
