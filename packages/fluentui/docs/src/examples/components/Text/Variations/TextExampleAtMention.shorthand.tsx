import * as React from 'react';
import { Text } from '@fluentui/react-northstar';

const TextExampleAtMentionShorthand = () => (
  <div>
    <Text atMention content="@someone" />
    <br />
    <Text atMention="me" content="@me" />
  </div>
);

export default TextExampleAtMentionShorthand;
