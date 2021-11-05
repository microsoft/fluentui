import * as React from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Body, Caption } from '@fluentui/react-text';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Button } from '@fluentui/react-button';
import { Open16Regular, MoreVertical20Regular } from '@fluentui/react-icons';
import { Card, CardFooter, CardHeader, CardPreview } from '../index'; // codesandbox-dependency: @fluentui/react-card ^9.0.0-beta

const ASSET_URL = 'https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-card';

const avatarMauricioURL = ASSET_URL + '/assets/avatar_mauricio.svg';
const powerpointLogoURL = ASSET_URL + '/assets/powerpoint_logo.svg';
const aiDeckTemplateURL = ASSET_URL + '/assets/ai_deck_template.png';

export const ActionCard = () => {
  return (
    <>
      <Card tabIndex={0} onClick={() => console.log('Test action')}>
        <CardHeader
          image={<img src={avatarMauricioURL} alt="Face of a person" />}
          header={
            <Body>
              <b>Mauricio August</b> + 7 others edited
            </Body>
          }
          description={<Caption>Artificial Intelligence Deck</Caption>}
          action={<Button appearance="transparent" icon={<MoreVertical20Regular />} />}
        />

        <CardPreview logo={<img src={powerpointLogoURL} alt="Microsoft PowerPoint logo" />}>
          <img src={aiDeckTemplateURL} alt="Preview of an artificial intelligence slide deck" />
        </CardPreview>

        <CardFooter>
          <Button icon={<Open16Regular />}>View changes</Button>
        </CardFooter>
      </Card>
    </>
  );
};

ActionCard.parameters = {
  docs: {
    description: {
      story: 'Cards can include `onClick` events to perform actions.',
    },
  },
};
