import * as React from 'react';

import { Text, Divider, Checkbox } from '@fluentui/react-components';
import { Scenario } from './utils';

export const NoFocusableTextExample = () => {
  return (
    <Scenario pageTitle="Avoid making text focusable">
      <h1>Avoid making text focusable</h1>
      <h2>Bad example</h2>

      <Text tabIndex={0} block>
        With this option, notifications won't be displayed anymore . You can miss information about latest news.{' '}
      </Text>
      <Checkbox label="Display notification" />

      <h3>Screen reader narration</h3>
      <Text block>
        <Text weight="semibold">JAWS narration when the notification text is focused:</Text> "With this option,
        notifications won’t be displayed anymore. You can miss information about latest news." <br />
        <Text weight="semibold">JAWS narration when the checkbox is focused:</Text> "Display notification check box not
        checked To check press Spacebar."
      </Text>

      <h3>Implementation details</h3>
      <ul>
        <li>
          The text is made focusable by adding the tabindex="0" attribute on the text element. When the user uses the
          TAB key, the text receives focus.
        </li>
      </ul>
      <Divider appearance="strong" />

      <h2>Good example</h2>
      <Text id="notificationText" block>
        With this option, notifications won't be displayed anymore. You can miss information about latest news.
      </Text>
      <Checkbox label="Display notification" aria-describedby="notificationText" />

      <h3>Screen reader narration</h3>
      <Text block>
        <Text weight="semibold">JAWS narration when the checkbox is focused:</Text> "Display notification check box not
        checked <br />
        With this option, notifications won’t be displayed anymore. You can miss information about latest news.
        <br />
        To check press Spacebar"
      </Text>

      <h3>Implementation details</h3>
      <ul>
        <li>The text is not focusable anymore, because the "tabindex" attribute does not exist on the text element.</li>
        <li>The text element has a unique id, like "notificationText".</li>
        <li>The checkbox has the aria-describedby="notificationText" attribute.</li>
      </ul>
      <Divider appearance="strong" />
      <h2>Problem explanation</h2>
      <ul>
        <li>
          In general, elements (like text) that are not actionable should not receive focus, because it adds an
          additional TAB stop in the TAB order.
        </li>
        <li>
          {' '}
          Recommendation would be to refer to the text element via the "aria-describedby" attribute, which ensures the
          text would be read by the screen reader whenever the actionable element which has the "aria-describedby"
          attribute is focused.
        </li>
      </ul>
    </Scenario>
  );
};
