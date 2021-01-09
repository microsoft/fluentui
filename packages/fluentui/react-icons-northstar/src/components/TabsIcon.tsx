import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const TabsIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="2 2 16 16" className={classes.svg}>
      <path
        className={cx(iconClassNames.outline, classes.outlinePart)}
        d="M2.99609 5.5C2.99609 4.11929 4.11538 3 5.49609 3H14.4961C15.8768 3 16.9961 4.11929 16.9961 5.5V14.5C16.9961 15.8807 15.8768 17 14.4961 17H5.49609C4.11538 17 2.99609 15.8807 2.99609 14.5V5.5ZM15.9961 6V5.5C15.9961 4.67157 15.3245 4 14.4961 4H8.99609V5.5C8.99609 5.77614 9.21995 6 9.49609 6H15.9961ZM7.99609 4H5.49609C4.66767 4 3.99609 4.67157 3.99609 5.5V14.5C3.99609 15.3284 4.66767 16 5.49609 16H14.4961C15.3245 16 15.9961 15.3284 15.9961 14.5V7H9.49609C8.66767 7 7.99609 6.32843 7.99609 5.5V4Z"
      />
      <g className={cx(iconClassNames.filled, classes.filledPart)}>
        <path d="M5.49609 3C4.11538 3 2.99609 4.11929 2.99609 5.5V14.5C2.99609 15.8807 4.11538 17 5.49609 17H14.4961C15.8768 17 16.9961 15.8807 16.9961 14.5V7H9.49609C8.66767 7 7.99609 6.32843 7.99609 5.5V3H5.49609Z" />
        <path d="M8.99609 3V5.5C8.99609 5.77614 9.21995 6 9.49609 6H16.9961V5.5C16.9961 4.11929 15.8768 3 14.4961 3H8.99609Z" />
      </g>
    </svg>
  ),
  displayName: 'TabsIcon',
});
