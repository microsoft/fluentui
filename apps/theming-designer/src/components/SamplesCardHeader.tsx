import * as React from 'react';
import { Text, ITextProps } from '../../../../packages/office-ui-fabric-react/lib/Text';
import { mergeStyles } from '@uifabric/merge-styles';

export interface ISamplesCardHeaderProps {
  label?: string;
  size?: ITextProps['variant'];
}

const samplesCardHeaderClassname = mergeStyles({
  borderBottom: '1px black solid'
});

export const SamplesCardHeader = (props: ISamplesCardHeaderProps) => {
  return (
    <Text variant={props.size} className={samplesCardHeaderClassname}>
      {props.label}
    </Text>
  );
};
