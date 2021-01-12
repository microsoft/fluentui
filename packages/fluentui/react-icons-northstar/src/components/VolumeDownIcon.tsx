import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const VolumeDownIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" className={classes.svg} viewBox="2 2 16 16">
      <path
        className={cx(iconClassNames.outline, classes.outlinePart)}
        d="M11.9961 3.00613C11.9961 2.13311 10.9558 1.67928 10.3159 2.27313L6.44369 5.86651C6.35122 5.95232 6.22973 6.00001 6.10358 6.00001H3.49609C2.66767 6.00001 1.99609 6.67158 1.99609 7.50001V12.5C1.99609 13.3284 2.66767 14 3.49609 14H6.10358C6.22973 14 6.35122 14.0477 6.44369 14.1335L10.3159 17.7269C10.9558 18.3207 11.9961 17.8669 11.9961 16.9939V3.00613ZM7.12392 6.59951L10.9961 3.00613V16.9939L7.12392 13.4005C6.84651 13.1431 6.48204 13 6.10358 13H3.49609C3.21995 13 2.99609 12.7761 2.99609 12.5V7.50001C2.99609 7.22386 3.21995 7.00001 3.49609 7.00001H6.10358C6.48204 7.00001 6.84651 6.85695 7.12392 6.59951Z"
      />
      <path
        className={cx(iconClassNames.filled, classes.filledPart)}
        d="M12 3.00613C12 2.13311 10.9597 1.67928 10.3198 2.27313L6.4476 5.86651C6.35513 5.95232 6.23364 6.00001 6.10749 6.00001H3.5C2.67157 6.00001 2 6.67158 2 7.50001V12.5C2 13.3284 2.67157 14 3.5 14H6.10749C6.23364 14 6.35513 14.0477 6.4476 14.1335L10.3198 17.7269C10.9597 18.3207 12 17.8669 12 16.9939V3.00613Z"
      />
    </svg>
  ),
  displayName: 'VolumeDownIcon',
});
