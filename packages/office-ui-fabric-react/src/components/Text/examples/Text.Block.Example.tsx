import * as React from 'react';
import { Text } from 'office-ui-fabric-react/lib/Text';

export const TextBlockExample = () => (
  <>
    <Text block variant="medium">
      I am block text.
    </Text>
    <Text block variant="medium">
      Since block is specified,
    </Text>
    <Text block variant="medium">
      every block of text
    </Text>
    <Text block variant="medium">
      gets its own line.
    </Text>
  </>
);
