import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const ChevronStartIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="2 2 16 16" className={classes.svgFlippingInRtl}>
      <g>
        <path
          className={cx(iconClassNames.outline, classes.outlinePart)}
          d="M12.3544 15.8529C12.1594 16.0485 11.8429 16.0491 11.6472 15.8542L6.16276 10.3892C5.94705 10.1743 5.94705 9.82495 6.16276 9.61L11.6472 4.14502C11.8429 3.95011 12.1594 3.95067 12.3544 4.14628C12.5493 4.34189 12.5487 4.65848 12.3531 4.85339L7.18851 9.99961L12.3531 15.1458C12.5487 15.3407 12.5493 15.6573 12.3544 15.8529Z"
        />
        <path
          className={cx(iconClassNames.filled, classes.filledPart)}
          d="M12.2676 15.793C11.9677 16.0787 11.493 16.0672 11.2073 15.7673L6.20597 10.5168C5.93004 10.2271 5.93004 9.7719 6.20597 9.48223L11.2073 4.23177C11.493 3.93184 11.9677 3.92031 12.2676 4.206C12.5676 4.49169 12.5791 4.96642 12.2934 5.26634L7.78483 9.99952L12.2934 14.7327C12.5791 15.0326 12.5676 15.5074 12.2676 15.793Z"
        />
      </g>
    </svg>
  ),
  displayName: 'ChevronStartIcon',
});
