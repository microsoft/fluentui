import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const PaperclipIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <path
        className={cx(iconClassNames.outline, classes.outlinePart)}
        d="M20.793 16.836l-4.772 4.718c-.61.61-1.422.946-2.288.946s-1.677-.336-2.287-.946a3.242 3.242 0 0 1 .01-4.585l6.702-6.96c.656-.656 1.806-.657 2.462 0a1.749 1.749 0 0 1-.015 2.478l-5.773 6.03a.5.5 0 0 0 .7.715l5.795-6.054a2.744 2.744 0 0 0 0-3.876c-.517-.517-1.205-.802-1.938-.802s-1.421.285-1.938.802l-6.712 6.97a4.24 4.24 0 0 0 0 5.99 4.223 4.223 0 0 0 2.995 1.238 4.218 4.218 0 0 0 2.992-1.237l4.77-4.716a.5.5 0 1 0-.703-.71z"
      />
      <path
        className={cx(iconClassNames.filled, classes.filledPart)}
        d="M20.441 16.48l-4.774 4.72c-1.066 1.067-2.801 1.067-3.868 0s-1.066-2.801.02-3.888l6.692-6.95c.468-.468 1.288-.468 1.755 0 .484.484.484 1.271-.03 1.787l-5.753 6.01a1 1 0 1 0 1.398 1.43l2.445-2.392 3.354-3.665a3.245 3.245 0 0 0 0-4.584C21.07 8.337 20.256 8 19.39 8s-1.68.337-2.292.948l-6.712 6.97a4.74 4.74 0 0 0 0 6.697A4.722 4.722 0 0 0 13.735 24c1.211 0 2.422-.46 3.343-1.381l4.77-4.716a1 1 0 0 0-1.407-1.422z"
      />
    </svg>
  ),
  displayName: 'PaperclipIcon',
});
