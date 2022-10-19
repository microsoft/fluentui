import * as React from 'react';

import { Body1, Caption1, Button } from '@fluentui/react-components';
import { ArrowReplyRegular, ShareRegular } from '@fluentui/react-icons';
import { Card, CardFooter, CardHeader, CardPreview } from '@fluentui/react-card';

const ASSET_URL = 'https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-card';
const avatarElviaURL = ASSET_URL + '/stories/assets/avatar_elvia.svg';
const wordLogoURL = ASSET_URL + '/stories/assets/word_logo.svg';
const docTemplateURL = ASSET_URL + '/stories/assets/doc_template.png';

export const Default = () => {
  return (
    <Card>
      <CardHeader
        image={{ as: 'img', src: avatarElviaURL, alt: 'Face of a person' }}
        header={
          <Body1>
            <b>Elvia Atkins</b> mentioned you
          </Body1>
        }
        description={<Caption1>5h ago · About us - Overview</Caption1>}
      />

      <CardPreview logo={<img src={wordLogoURL} alt="Microsoft Word logo" />}>
        <img src={docTemplateURL} alt="Preview of a Word document " />
      </CardPreview>
      <CardFooter>
        <Button icon={<ArrowReplyRegular fontSize={16} />}>Reply</Button>
        <Button icon={<ShareRegular fontSize={16} />}>Share</Button>
      </CardFooter>
    </Card>
  );
};
