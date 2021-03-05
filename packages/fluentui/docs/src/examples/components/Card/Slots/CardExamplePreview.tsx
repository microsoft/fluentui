import { Card, Image } from '@fluentui/react-northstar';
import * as React from 'react';

const CardExamplePreview = () => (
  <Card compact aria-roledescription="image card">
    <Card.Preview fitted>
      <Image fluid src="https://fabricweb.azureedge.net/fabric-website/assets/images/wireframe/square-image.png" />
    </Card.Preview>
  </Card>
);

export default CardExamplePreview;
