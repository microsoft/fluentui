import * as React from 'react';
import { Card, CardHeader } from '@fluentui/react-components';

export const DefinitionHeader = () => (
  <Card>
    <CardHeader header="A CardHeader organizes the top of the card." />
    This is the body.
  </Card>
);
DefinitionHeader.parameters = { docs: { description: { story: 'Cards can contain a CardHeader.' } } };
