import * as React from 'react';
import { Text, ITextProps } from '../../../../packages/office-ui-fabric-react/lib/Text';
import './SamplesCardHeader.scss';

export interface ISamplesCardHeaderProps {
  label?: string;
  size?: ITextProps['variant'];
}

export const SamplesCardHeader = (props: ISamplesCardHeaderProps) => {
  return (
    <Text variant={props.size} className="samplescardheader">
      {props.label}
    </Text>
  );
};
