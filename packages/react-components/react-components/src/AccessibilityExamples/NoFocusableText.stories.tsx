import * as React from 'react';

import { Text, Divider, Checkbox } from '@fluentui/react-components';
import { Scenario } from './utils';

export const NoFocusableTextExample = () => {
  return (
    <Scenario pageTitle="Text should not be focuable">
      <h1>Avoid text to focus</h1>
      <h2>Bad example</h2>

      <Text tabIndex={0} block>
        With this option notification won't be displayed any time. You can miss information about latest news.{' '}
      </Text>
      <Checkbox label="Display notification" />

      <h3>Screen reader narration</h3>
      <Text block>
        <Text weight="semibold">JAWS narration when text is focused:</Text> "With this option notification won’t be
        displayed any time. You can miss information about latest news." <br />
        <Text weight="semibold">JAWS narration when checkbox is focused:</Text> "Display notification check box not
        checked To check press Spacebar."
      </Text>

      <h3>Implementation details</h3>
      <ul>
        <li>Text is focuable by adding tabindex="0" on text element. When user use TAB key text receive focus.</li>
      </ul>
      <Divider appearance="strong" />

      <h2>Good example</h2>
      <Text id="helpText" block>
        With this option notification won't be displayed any time. You can miss information about latest news.
      </Text>
      <Checkbox label="Display notification" aria-describedby="helpText" />

      <h3>Screen reader narration</h3>
      <Text block>
        <Text weight="semibold">JAWS narration when checkbox is focused:</Text> "Display notification check box not
        checked <br />
        With this option notification won’t be displayed any time. You can miss information about latest news.
        <br />
        To check press Spacebar"
      </Text>

      <h3>Implementation details</h3>
      <ul>
        <li>Text is not focuable anymore, not tabindex attribute exists on text.</li>
        <li>Text element has unique id like "helpText".</li>
        <li>Checkbox has following attribute aria-describedby="helpText"</li>
      </ul>
      <Divider appearance="strong" />
      <h2>Problem explanation</h2>
      <ul>
        <li>In generall not actionable element should not receive focus. It add additonal TAB stop in TAB order. </li>
        <li> Recommendation would be to refer into text via "aria-describedby" attribute.</li>
      </ul>
    </Scenario>
  );
};
