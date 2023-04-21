import * as React from 'react';
import { Card, CardHeader } from '@fluentui/react-components';

export const DefinitionHeader = () => (
  <Card>
    <CardHeader header="This is a header" />
    This is the body.
  </Card>
);
DefinitionHeader.parameters = { docs: { description: { story: 'Cards can have a header.' } } };
