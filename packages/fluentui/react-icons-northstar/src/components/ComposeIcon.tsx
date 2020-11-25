import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const ComposeIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="2 2 16 16" className={classes.svg}>
      <g className={cx(iconClassNames.outline, classes.outlinePart)}>
        <path d="M17.8536 2.85358C18.0488 2.65832 18.0488 2.34174 17.8536 2.14648C17.6583 1.95121 17.3417 1.95122 17.1465 2.14648L9.14648 10.1465L9 11L9.85359 10.8536L17.8536 2.85358Z" />
        <path d="M5.5 3C4.11929 3 3 4.11929 3 5.5V14.5C3 15.8807 4.11929 17 5.5 17H14.5C15.8807 17 17 15.8807 17 14.5V8.5C17 8.22386 16.7761 8 16.5 8C16.2239 8 16 8.22386 16 8.5V14.5C16 15.3284 15.3284 16 14.5 16H5.5C4.67157 16 4 15.3284 4 14.5V5.5C4 4.67157 4.67157 4 5.5 4H11.5046C11.7807 4 12.0046 3.77614 12.0046 3.5C12.0046 3.22386 11.7807 3 11.5046 3H5.5Z" />
      </g>
      <g className={cx(iconClassNames.filled, classes.filledPart)}>
        <path d="M17.7805 3.28016C18.0733 2.98718 18.0732 2.5123 17.7802 2.2195C17.4872 1.9267 17.0124 1.92685 16.7196 2.21984L9.21956 9.72459L9 11L10.2806 10.7849L17.7805 3.28016Z" />
        <path d="M5.75 3C4.23122 3 3 4.23122 3 5.75V14.25C3 15.7688 4.23122 17 5.75 17H14.25C15.7688 17 17 15.7688 17 14.25V8.74755C17 8.33333 16.6642 7.99755 16.25 7.99755C15.8358 7.99755 15.5 8.33333 15.5 8.74755V14.25C15.5 14.9404 14.9404 15.5 14.25 15.5H5.75C5.05964 15.5 4.5 14.9404 4.5 14.25V5.75C4.5 5.05964 5.05964 4.5 5.75 4.5H11.2408C11.655 4.5 11.9908 4.16421 11.9908 3.75C11.9908 3.33579 11.655 3 11.2408 3H5.75Z" />
      </g>
    </svg>
  ),
  displayName: 'ComposeIcon',
});
