import { Card, Image } from '@fluentui/react';
import * as React from 'react';

const SimpleCard = () => (
  <Card compact>
    <Card.Preview fitted>
      <Image fluid src="public/images/wireframe/square-image.png" />
    </Card.Preview>
  </Card>
);
export default SimpleCard;
