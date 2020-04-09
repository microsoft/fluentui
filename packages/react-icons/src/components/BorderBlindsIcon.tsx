import * as React from 'react';
import createSvgIconWithRoot from '../utils/createSvgIconWithRoot';
import { mergeStyles } from 'office-ui-fabric-react/src/Styling';

const BorderBlindsIcon = createSvgIconWithRoot<{ color1?: string; color2?: string; color3?: string }>({
  // TODO: convert classNames.svg to selector to selector

  children: ({ classNames, props, processedRootProps }) => {
    const { className, ...restRootProps } = processedRootProps;
    const { color1 = 'red', color2 = 'green', color3 = 'blue' } = props;

    const classesOverrides = mergeStyles(className, {
      width: 50,
      height: 50,
      selectors: {
        '.borderblinds-part1': {
          fill: color1,
        },
        '.borderblinds-part2': {
          fill: color2,
        },
        '.borderblinds-part3': {
          fill: color3,
        },
      },
    });

    return (
      <span {...restRootProps} className={classesOverrides}>
        <svg viewBox="0 0 40 40">
          <g transform="scale(0.03125 0.03125)">
            <path className="borderblinds-part1" d="M0 192l320-128v768l-320 128z" />
            <path className="borderblinds-part2" d="M384 32l320 192v736l-320-160z" />
            <path className="borderblinds-part3" d="M768 224l256-192v768l-256 192z" />
          </g>
        </svg>
      </span>
    );
  },
  displayName: 'BorderBlindsIcon',
});

export default BorderBlindsIcon;
