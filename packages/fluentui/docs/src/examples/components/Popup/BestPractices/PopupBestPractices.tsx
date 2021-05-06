import * as React from 'react';

import ComponentBestPractices from '../../../../components/ComponentBestPractices';
import { code, link } from '../../../../utils/helpers';
import { Text } from '@fluentui/react-northstar';

const doList = [
  <Text>
    Do set {link('trapFocus', '/focus-trap-zone#usage')} if the focus needs to be trapped inside of the Popup.
  </Text>,
  <Text>
    Beware of using {link('autoFocus', '/auto-focus-zone#usage')} as it just grabs focus and does not trap it. User is
    able to tab out from popup, so consider to use `inline` prop to save a correct tab order.
  </Text>,
  <Text>
    To set aria-label, aria-labelledby and aria-describedby attributes on the popup slot you need to set it inside of
    the content prop shorthand. See {link('close button example', '#usage-close-button')} for details.
  </Text>,
  <Text>When setting `trapFocus` in the `Popup` pass `ariaLabelledBy` to content rather than `"aria-labelledby"`</Text>,
  "If Popup's content is lazy loaded and focus needs to be trapped inside - make sure to use state change to trigger `componentDidUpdate`, so the focus can be set correctly to the first tabbable element inside Popup or manually set focus to the element inside once content is loaded.",
];

const dontList = [
  <Text>
    Don't use {code('trapFocus')} for {code('inline')} popup, as it leads to broken behavior for screen reader users.
  </Text>,
];

const PopupBestPractices = () => {
  return <ComponentBestPractices doList={doList} dontList={dontList} />;
};

export default PopupBestPractices;
