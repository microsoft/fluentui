import * as React from 'react';
import * as _ from 'lodash';
import { Provider, Text } from '@fluentui/react-northstar';

const TextSizesExampleShorthand = () => (
  <Provider.Consumer
    render={({ siteVariables }) => {
      return _.map(siteVariables.fontSizes, (value, key) => (
        <div key={key}>
          <Text size={key as any} content={`This is size="${key}" size font.`} />
        </div>
      ));
    }}
  />
);
export default TextSizesExampleShorthand;
