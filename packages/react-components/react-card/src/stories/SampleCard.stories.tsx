import * as React from 'react';
import { Button } from '@fluentui/react-button';
import { Open16Regular, Share16Regular } from '@fluentui/react-icons';
import { Body, Caption } from '@fluentui/react-text';
import { Card, CardHeader, CardFooter, CardPreview } from '../index';
import type { CardProps } from '../index';

export const ASSET_URL =
  'https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-card';

const powerpointLogoURL = ASSET_URL + '/assets/powerpoint_logo.svg';

export const SampleCard = (props: CardProps) => (
  <Card {...props}>
    <CardPreview>
      <img
        src="https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE4RbvH?ver=6355"
        alt="preview image"
      />
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
