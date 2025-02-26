import * as React from 'react';
import { customStyleHooks } from '../../../library/src/components/CustomHooks';
import {
  Card,
  CardFooter,
  CardHeader,
  CardPreview,
  Body1,
  Caption1,
  Button,
  FluentProvider,
} from '@fluentui/react-components';
import { ArrowReplyRegular, ShareRegular } from '@fluentui/react-icons';

const resolveAsset = (asset: string) => {
  const ASSET_URL =
    'https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-card/stories/src/assets/';

  return `${ASSET_URL}${asset}`;
};

export const CardCustomStyles = () => {
  return (
    <FluentProvider customStyleHooks_unstable={customStyleHooks}>
      <Card>
        <CardHeader
          image={<img src={resolveAsset('avatar_elvia.svg')} alt="Elvia Atkins avatar picture" />}
          header={
            <Body1>
              <b>Elvia Atkins</b> mentioned you
            </Body1>
          }
          description={<Caption1>5h ago · About us - Overview</Caption1>}
        />

        <CardPreview logo={<img src={resolveAsset('docx.png')} alt="Microsoft Word document" />}>
          <img src={resolveAsset('doc_template.png')} alt="Preview of a Word document: About Us - Overview" />
        </CardPreview>

        <CardFooter>
          <Button icon={<ArrowReplyRegular fontSize={16} />}>Reply</Button>
          <Button icon={<ShareRegular fontSize={16} />}>Share</Button>
        </CardFooter>
      </Card>
    </FluentProvider>
  );
};

// This line is necessary to ensure full source code view in storybook.
CardCustomStyles.parameters = { docs: { source: {} } };
