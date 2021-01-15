import * as React from 'react';
import cx from 'classnames';
import { iconClassNames } from '../utils/iconClassNames';
import { createSvgIcon } from '../utils/createSvgIcon';

export const ConferenceRoomDeviceIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="2 2 16 16" className={classes.svg}>
      <g className={cx(iconClassNames.outline, classes.outlinePart)}>
        <path d="M6.09636 3C4.92911 3 3.91721 3.80773 3.65852 4.94595L2.06762 11.9459C1.71207 13.5104 2.90115 15 4.50545 15H15.4944C17.0987 15 18.2877 13.5104 17.9322 11.9459L16.3413 4.94595C16.0826 3.80773 15.0707 3 13.9034 3H6.09636ZM4.63366 5.16757C4.78887 4.48464 5.39601 4 6.09636 4H13.9034C14.6038 4 15.2109 4.48464 15.3661 5.16757L16.9571 12.1676C17.1704 13.1062 16.4569 14 15.4944 14H4.50545C3.54287 14 2.82942 13.1062 3.04275 12.1676L4.63366 5.16757Z" />
        <path d="M5.5 16C5.22386 16 5 16.2239 5 16.5C5 16.7761 5.22386 17 5.5 17H14.5C14.7761 17 15 16.7761 15 16.5C15 16.2239 14.7761 16 14.5 16H5.5Z" />
      </g>
      <g className={cx(iconClassNames.filled, classes.filledPart)}>
        <path d="M3.65852 4.94595C3.91721 3.80773 4.92911 3 6.09636 3H13.9034C15.0707 3 16.0826 3.80773 16.3413 4.94595L17.9322 11.9459C18.2877 13.5104 17.0987 15 15.4944 15H4.50545C2.90115 15 1.71207 13.5104 2.06762 11.9459L3.65852 4.94595Z" />
        <path d="M5.5 16C5.22386 16 5 16.2239 5 16.5C5 16.7761 5.22386 17 5.5 17H14.5C14.7761 17 15 16.7761 15 16.5C15 16.2239 14.7761 16 14.5 16H5.5Z" />
      </g>
    </svg>
  ),
  displayName: 'ConferenceRoomDeviceIcon',
});
