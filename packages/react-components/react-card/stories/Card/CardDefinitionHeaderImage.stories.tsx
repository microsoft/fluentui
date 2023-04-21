import * as React from 'react';
import { Card, CardHeader } from '@fluentui/react-components';

export const DefinitionHeaderImage = () => (
  <Card>
    <CardHeader
      header="Header"
      description="A description of the card."
      image={
        <img
          src="https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-card/stories/assets/avatar_elvia.svg"
          alt="Elvia Atkins avatar picture"
        />
      }
    />
    The body of card.
  </Card>
);
DefinitionHeaderImage.parameters = {
  docs: { description: { story: 'A Card Header has a dedicated location for an image.' } },
};
