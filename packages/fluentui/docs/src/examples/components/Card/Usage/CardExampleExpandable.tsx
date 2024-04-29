import { Avatar, Card, cardFocusableBehavior, Flex, Image, Text } from '@fluentui/react-northstar';
import * as React from 'react';

const CardExampleExpandable = () => {
  return (
    <Card aria-roledescription="user card" accessibility={cardFocusableBehavior} expandable>
      <Card.Header>
        <Flex gap="gap.small">
          <Avatar
            image="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/RobertTolbert.jpg"
            label="Copy bandwidth"
            name="Robert Tolbert"
            status="unknown"
          />
          <Flex column>
            <Text content="Using compose and custom styles" weight="bold" />
            <Text content="Secondary line" size="small" />
          </Flex>
        </Flex>
      </Card.Header>
      <Card.Body>
        <Flex column gap="gap.small">
          <Image src="https://fabricweb.azureedge.net/fabric-website/assets/images/wireframe/square-image.png" />
          <Card.ExpandableBox>
            <Text content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum." />
          </Card.ExpandableBox>
        </Flex>
      </Card.Body>
    </Card>
  );
};

export default CardExampleExpandable;
