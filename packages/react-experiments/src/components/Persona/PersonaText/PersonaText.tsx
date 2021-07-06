import * as React from 'react';
import { Text } from '@fluentui/react';

export const PersonaText = <T extends { children?: React.ReactChild; className?: string }>(
  props: T,
): React.ReactElement<T> | null => {
  return props.children ? <Text className={props.className}>{props.children}</Text> : null;
};
