import * as React from 'react';
import { CardHeader, CardFooter } from '@fluentui/react-card';
import { Body1, Caption1 } from '@fluentui/react-text';
import { Button } from '@fluentui/react-button';
import { OpenRegular, ShareRegular } from '@fluentui/react-icons';

const ASSET_URL =
  'https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-card/stories/src/assets/';

export const powerpointLogoURL = ASSET_URL + 'pptx.png';
export const salesPresentationTemplateURL = ASSET_URL + 'sales_template.png';
export const appLogoUrl = ASSET_URL + 'app_logo.svg';

export const SampleCardContent = ({ controlsDisabled }: { controlsDisabled?: boolean }) => (
  <>
    <CardHeader
      image={{ as: 'img', src: powerpointLogoURL, alt: 'Microsoft PowerPoint logo' }}
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
      <Button disabled={controlsDisabled} appearance="primary" icon={<OpenRegular />}>
        Open
      </Button>
      <Button disabled={controlsDisabled} icon={<ShareRegular />}>
        Share
      </Button>
    </CardFooter>
  </>
);
