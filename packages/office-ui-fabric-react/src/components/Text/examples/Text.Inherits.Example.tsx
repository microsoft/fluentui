// @codepen
import * as React from 'react';
import { Text } from 'office-ui-fabric-react/lib/Text';

export const TextInheritsExample = () => (
  <>
    <Text variant={'large'}>
      The following text inherits its font styling from its parent: <Text>text</Text>.
    </Text>
  </>
);
