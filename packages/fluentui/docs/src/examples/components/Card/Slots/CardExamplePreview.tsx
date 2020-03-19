import { Card, Image } from '@fluentui/react';
import * as React from 'react';

const SimpleCard = () => (
  <div style={{ width: '300px', border: '1px solid grey' }}>
    <Card compact>
      <Card.Preview id="cardMedia" fitted>
        <Image fluid src="public/images/wireframe/square-image.png" />
      </Card.Preview>
    </Card>
  </div>
);
export default SimpleCard;
