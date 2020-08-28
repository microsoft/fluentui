import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const MessageSeenIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="0 0 16 16" className={classes.svg}>
      <g>
        <path
          className={cx(iconClassNames.filled, classes.filledPart)}
          d="M8.399925,6.9497 C8.399925,8.2733 7.3236,9.349625 6,9.349625 C4.6764,9.349625 3.600075,8.2733 3.600075,6.9497 C3.600075,5.6261 4.6764,4.54985 6,4.54985 C7.3236,4.54985 8.399925,5.626175 8.399925,6.9497 Z M11.9412,5.919125 C10.8309,3.5942 8.554575,2.149925 6,2.149925 C3.445425,2.149925 1.1691,3.5942 0.0588,5.919125 C-0.08415,6.217925 0.042375,6.5759 0.341775,6.718925 C0.639975,6.86015 0.99855,6.73475 1.141575,6.43595 C2.05095,4.5323 3.912375,3.349925 6,3.349925 C8.087625,3.349925 9.94905,4.5323 10.858425,6.43595 C10.96155,6.651575 11.175975,6.777575 11.400375,6.777575 C11.487075,6.777575 11.574975,6.758825 11.65815,6.719 C11.95755,6.5759 12.08415,6.217925 11.9412,5.919125 Z"
        />
      </g>
    </svg>
  ),
  displayName: 'MessageSeenIcon',
});
