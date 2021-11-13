import * as React from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Body, Caption } from '@fluentui/react-text';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Button } from '@fluentui/react-button';
import { MoreHorizontal16Regular } from '@fluentui/react-icons';
import { Card, CardHeader, CardPreview } from '../index'; // codesandbox-dependency: @fluentui/react-card ^9.0.0-beta

const ASSET_URL = 'https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-card';

const powerpointLogoURL = ASSET_URL + '/assets/powerpoint_logo.svg';
const salesTemplateURL = ASSET_URL + '/assets/sales_template.png';

export const GridCard = () => {
  return (
    <div style={{ display: 'flex', gap: '1em' }}>
      <Card>
        <CardPreview>
          <img src={salesTemplateURL} alt="Preview of a sales slide deck" />
        </CardPreview>
        <CardHeader
          image={<img src={powerpointLogoURL} alt="Microsoft PowerPoint logo" />}
          header={
            <Body>
              <b>Sales Analysis</b>
            </Body>
          }
          description={<Caption>Elvia replied to a comment</Caption>}
          action={<Button appearance="transparent" icon={<MoreHorizontal16Regular />} />}
        />
      </Card>
      <Card>
        <CardPreview>
          <img src={salesTemplateURL} alt="Preview of a sales slide deck" />
        </CardPreview>
        <CardHeader
          image={<img src={powerpointLogoURL} alt="Microsoft PowerPoint logo" />}
          header={
            <Body>
              <b>Sales Analysis</b>
            </Body>
          }
          description={<Caption>Elvia replied to a comment</Caption>}
          action={<Button appearance="transparent" icon={<MoreHorizontal16Regular />} />}
        />
      </Card>
    </div>
  );
};

GridCard.parameters = {
  docs: {
    description: {
      story: 'Cards can be sized to fit into a grid',
    },
  },
};
