import * as React from 'react';

import { Body1, Button, Caption1, Card, CardFooter, CardHeader, CardPreview } from '@fluentui/react-components';
import { ArrowReplyRegular, MoreHorizontal20Filled, ShareRegular } from '@fluentui/react-icons';

const resolveAsset = (asset: string) => {
  const ASSET_URL =
    'https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-card/stories/assets/';

  return `${ASSET_URL}${asset}`;
};

const Story = ({ title, description, children }) => {
  const style = {
    padding: '0 24px 24px',
    margin: '0 -24px 24px',
    borderTop: title ? '24px solid #fff' : '',
  };
  return (
    <div style={style}>
      <h3 className="sbdocs-h3">{title}</h3>
      <p className="sbdocs-p">{description}</p>
      {children}
    </div>
  );
};

export const Definition = () => {
  return (
    <div>
      <p
        style={{
          padding: '8px 16px',
          margin: '-48px -24px 0',
          background: 'lightgoldenrodyellow',
          borderLeft: '4px solid goldenrod',
          opacity: 0.8,
        }}
      >
        <strong>Heads up!</strong>
        <br />
        This "Definition" story would be split into multiple stories in a final implementation. A single story was used
        only for simplicity of demonstrating the idea of stepping through the API definition.
      </p>

      <Story title="Default" description="A card is a container for displaying content.">
        <Card>Default card</Card>
      </Story>

      <Story title="CardHeader" description="A CardHeader orgaznies the top of the card.">
        <Card>
          <CardHeader
            image={<img src={resolveAsset('avatar_elvia.svg')} alt="Elvia Atkins avatar picture" />}
            header="Header Slot"
            description="The description slot."
            action={<Button appearance="transparent" icon={<MoreHorizontal20Filled />} aria-label="More options" />}
          />
          The CardHeader above shows its image, header, description, and action slots
        </Card>
      </Story>

      <Story description="A CardHeader can show any combination of its slots.">
        <Card>
          <CardHeader header="Header Slot" />
        </Card>
        <br />
        <Card>
          <CardHeader header="Header Slot" description="The description slot." />
        </Card>
        <br />
        <Card>
          <CardHeader
            image={<img src={resolveAsset('avatar_colin.svg')} alt="A image" />}
            action={<Button appearance="transparent" icon={<MoreHorizontal20Filled />} aria-label="More options" />}
          />
        </Card>
        <br />
        <Card>
          <CardHeader
            header="Header Slot"
            description="The description slot."
            action={<Button appearance="transparent" icon={<MoreHorizontal20Filled />} aria-label="More options" />}
          />
        </Card>
      </Story>

      <Story description="A CardHeader's slots can take components.">
        <Card>
          <CardHeader
            image={<img src={resolveAsset('avatar_elvia.svg')} alt="Elvia Atkins avatar picture" />}
            header={
              <Body1>
                <b>Elvia Atkins</b> mentioned you
              </Body1>
            }
            description={<Caption1>5h ago · About us - Overview</Caption1>}
            action={<Button appearance="transparent" icon={<MoreHorizontal20Filled />} aria-label="More options" />}
          />
        </Card>
      </Story>

      <Story title="Footer" description="A CardFooter is for organizing the bottom of a Card.">
        <Card>
          The CardFooter below shows its action slot and text content.
          <CardFooter action={<Button aria-label="Action">Action</Button>}>This is footer text.</CardFooter>
        </Card>
      </Story>

      <Story description="You can place any component in the footer.">
        <Card>
          The CardFooter below contains two custom buttons.
          <CardFooter>
            <Button icon={<ArrowReplyRegular fontSize={16} />}>Reply</Button>
            <Button icon={<ShareRegular fontSize={16} />}>Share</Button>
          </CardFooter>
        </Card>
      </Story>

      <Story title="Preview" description="A CardPreview displays a preview of the content.">
        <Card>
          This is body text.
          <CardPreview logo={<img src={resolveAsset('word_logo.svg')} alt="Microsoft Word document" />}>
            <img src={resolveAsset('doc_template.png')} alt="Preview of a Word document: About Us - Overview" />
          </CardPreview>
        </Card>
      </Story>
    </div>
  );
};
