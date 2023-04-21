import * as React from 'react';
import { Card, CardHeader } from '@fluentui/react-components';

export const DefinitionHeaderDescription = () => (
  <Card>
    <CardHeader header="Header" description="A description of the card." />
    The body of card.
  </Card>
);
DefinitionHeaderDescription.parameters = {
  docs: { description: { story: 'Cards can have a description in the header.' } },
};
