import * as React from 'react';
import { Button } from '@fluentui/react-button';
import { Headline, Text } from '@fluentui/react-text';
import { action } from '@storybook/addon-actions';

export const Demos = () => {
  return (
    <div>
      <Headline>This story is for testing purposes of this addon</Headline>
      <section>
        <Button onClick={action('button clicked')}>
          <Text>Click me</Text>
        </Button>
      </section>
    </div>
  );
};

export default {
  title: 'Demos',
  components: Demos,
};
