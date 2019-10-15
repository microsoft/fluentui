import * as React from 'react';
import { Text } from 'office-ui-fabric-react/lib/Text';

export const TextBlockExample = () => (
  <>
    <Text block>I am block text.</Text>
    <Text block>Since block is specified,</Text>
    <Text block>every block of text</Text>
    <Text block>gets its own line.</Text>
  </>
);
