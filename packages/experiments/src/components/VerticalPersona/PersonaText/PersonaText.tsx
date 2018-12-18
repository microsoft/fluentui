import * as React from 'react';
import { Text } from '@uifabric/experiments/lib/Text';

export const PersonaText = (props: { children: string | undefined; className: string }) => {
  return props.children ? (
    <Text wrap className={props.className}>
      {props.children}
    </Text>
  ) : null;
};
