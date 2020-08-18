import * as React from 'react';
import { Accordion, Button, Flex } from '@fluentui/react-northstar';

const AccordionPanelCustomContentExample = () => {
  const panels = [
    {
      title: 'Pets',
      content: (
        <Flex gap="gap.smaller" key="animals">
          <Button primary>Add pet</Button>
          <Button>Remove pet</Button>
        </Flex>
      ),
    },
  ];

  return <Accordion defaultActiveIndex={[0]} panels={panels} />;
};

export default AccordionPanelCustomContentExample;
