import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const EmailIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="2 2 16 16" className={classes.svg}>
      <path
        className={cx(iconClassNames.outline, classes.outlinePart)}
        d="M15.5 4C16.8807 4 18 5.11929 18 6.5V14.5C18 15.8807 16.8807 17 15.5 17H4.5C3.11929 17 2 15.8807 2 14.5V6.5C2 5.11929 3.11929 4 4.5 4H15.5ZM17 7.961L10.2535 11.931C10.1231 12.0077 9.96661 12.0205 9.82751 11.9693L9.74649 11.931L3 7.963V14.5C3 15.3284 3.67157 16 4.5 16H15.5C16.3284 16 17 15.3284 17 14.5V7.961ZM15.5 5H4.5C3.67157 5 3 5.67157 3 6.5V6.802L10 10.9199L17 6.801V6.5C17 5.67157 16.3284 5 15.5 5Z"
      />
      <path
        className={cx(iconClassNames.filled, classes.filledPart)}
        d="M18.0001 7.373V14.5C18.0001 15.8807 16.8808 17 15.5001 17H4.50008C3.11937 17 2 15.8807 2 14.5V7.373L9.74657 11.931C9.90304 12.023 10.0971 12.023 10.2536 11.931L18.0001 7.373ZM15.5001 4C16.7871 4 17.847 4.9726 17.9849 6.22293L10.0001 10.9199L2.01526 6.22293C2.15312 4.9726 3.21302 4 4.50008 4H15.5001Z"
      />
    </svg>
  ),
  displayName: 'EmailIcon',
});
