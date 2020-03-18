import { Card, Flex, Image, Text } from '@fluentui/react';
import * as React from 'react';

const SimpleCardOnlyBody = () => (
  <div style={{ width: '300px', border: '1px solid grey' }}>
    <Card>
      <Card.Body>
        <Flex column gap="gap.small">
          <Image src="public/images/wireframe/square-image.png" />
          <Text content="Citizens of distant epochs muse about at the edge of forever hearts of the..." />
        </Flex>
      </Card.Body>
    </Card>
  </div>
);
export default SimpleCardOnlyBody;
