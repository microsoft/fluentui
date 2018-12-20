import * as React from 'react';
import { Text } from '../../Text/Text';

export const PersonaText = <T extends { children?: React.ReactChild; className?: string }>(props: T): React.ReactElement<T> | null => {
  return props.children ? (
    <Text wrap className={props.className}>
      {props.children}
    </Text>
  ) : null;
};
