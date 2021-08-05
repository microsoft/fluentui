import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const TrashCanIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="2 2 16 16" className={classes.svg}>
      <path
        className={cx(iconClassNames.outline, classes.outlinePart)}
        d="M11.5 4a1.5 1.5 0 00-3 0h-1a2.5 2.5 0 015 0H17a.5.5 0 010 1h-.554L15.15 16.23A2 2 0 0113.163 18H6.837a2 2 0 01-1.987-1.77L3.553 5H3a.5.5 0 01-.492-.41L2.5 4.5A.5.5 0 013 4h8.5zm3.938 1H4.561l1.282 11.115a1 1 0 00.994.885h6.326a1 1 0 00.993-.885L15.438 5zM8.5 7.5c.245 0 .45.155.492.359L9 7.938v6.125c0 .241-.224.437-.5.437-.245 0-.45-.155-.492-.359L8 14.062V7.939c0-.242.224-.438.5-.438zm3 0c.245 0 .45.155.492.359l.008.079v6.125c0 .241-.224.437-.5.437-.245 0-.45-.155-.492-.359L11 14.062V7.939c0-.242.224-.438.5-.438z"
      />
      <path
        className={cx(iconClassNames.filled, classes.filledPart)}
        d="M10 1.25a2.75 2.75 0 012.739 2.5H17a.75.75 0 01.102 1.493L17 5.25h-.583L15.15 16.23A2 2 0 0113.163 18H6.837a2 2 0 01-1.987-1.77L3.582 5.25H3a.75.75 0 01-.743-.648L2.25 4.5a.75.75 0 01.648-.743L3 3.75h4.261A2.75 2.75 0 0110 1.25zM8.5 7.5c-.245 0-.45.155-.492.359L8 7.938v6.125l.008.078c.042.204.247.359.492.359s.45-.155.492-.359L9 14.062V7.939l-.008-.08C8.95 7.656 8.745 7.5 8.5 7.5zm3 0c-.245 0-.45.155-.492.359L11 7.938v6.125l.008.078c.042.204.247.359.492.359s.45-.155.492-.359l.008-.079V7.939l-.008-.08c-.042-.203-.247-.358-.492-.358zM10 2.75c-.605 0-1.11.43-1.225 1h2.45c-.116-.57-.62-1-1.225-1z"
      />
    </svg>
  ),
  displayName: 'TrashCanIcon',
});
