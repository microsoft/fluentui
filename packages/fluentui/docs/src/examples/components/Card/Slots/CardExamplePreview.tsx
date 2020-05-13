import { Card, Image } from '@fluentui/react-northstar';
import * as React from 'react';

const CardExamplePreview = () => (
  <Card compact aria-roledescription="image card">
    <Card.Preview fitted>
      <Image fluid src="public/images/wireframe/square-image.png" />
    </Card.Preview>
  </Card>
);

export default CardExamplePreview;
