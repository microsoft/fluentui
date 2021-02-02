import * as React from 'react';
import { Box, Button, Divider, Header } from '@fluentui/react-northstar';
import InstructionMessage from './instructionMessage';
import CardExampleFocusableGrid from './cardExample';
import ToolbarExampleShorthand from './toolbarExample';

const InstructionMessageDefault: React.FC<any> = props => {
  return (
    <Box styles={{ 'background-color': 'white', height: '400px' }}>
      <Button content="only to set focus" />

      <Header content="Toolbar example" />
      <InstructionMessage message="custom - navigate in toolbar by...">
        <ToolbarExampleShorthand />
      </InstructionMessage>

      <Header content="Region example" />
      <InstructionMessage role="region" aria-label="bar" message="custom - navigate in region by...">
        <Button content="inside 1" />
        <Button content="inside 2" />
        <Button content="inside 3" />
      </InstructionMessage>

      <Button content="only to set focus" />

      <Divider />
      <Header content="Group example" />
      <InstructionMessage message="custom - navigate in group by..." role="group" aria-label="bar">
        <Button content="inside 1" />
        <Button content="inside 2" />
        <Button content="inside 3" />
      </InstructionMessage>

      <Button content="only to set focus" />

      <Divider />

      <Header content="Cards example" />
      <InstructionMessage message="custom - navigate in cards by...">
        <CardExampleFocusableGrid />
      </InstructionMessage>

      <Button content="only to set focus" />
    </Box>
  );
};

export default InstructionMessageDefault;
