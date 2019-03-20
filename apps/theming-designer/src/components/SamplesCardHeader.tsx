import * as React from 'react';
import { Text } from '../../../../packages/office-ui-fabric-react/lib/Text';
import './SamplesCardHeader.scss';

interface ISamplesCardHeaderProps {
  label?: string;
}

export const SamplesCardHeader = (props: ISamplesCardHeaderProps) => {
  return <Text className="samplescardheader">{props.label}</Text>;
};
