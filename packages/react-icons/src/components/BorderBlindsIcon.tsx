import * as React from 'react';
import createSvgIconWithRoot from '../utils/createSvgIconWithRoot';
import { mergeStyles } from 'office-ui-fabric-react/src/Styling';

const BorderBlindsIcon = createSvgIconWithRoot<{ color1?: string; color2?: string; color3?: string }>({
  children: ({ classes, props, processedRootProps }) => {
    const { color1 = 'red', color2 = 'green', color3 = 'blue' } = props;

    // custom styles for the border blinds
    const borderBlindsPart1 = mergeStyles({
      fill: color1,
    });
    const borderBlindsPart2 = mergeStyles({
      fill: color2,
    });
    const borderBlindsPart3 = mergeStyles({
      fill: color3,
    });

    return (
      <span {...processedRootProps}>
        <svg viewBox="0 0 40 40" className={classes.svg}>
          <g transform="scale(0.03125 0.03125)">
            <path className={borderBlindsPart1} d="M0 192l320-128v768l-320 128z" />
            <path className={borderBlindsPart2} d="M384 32l320 192v736l-320-160z" />
            <path className={borderBlindsPart3} d="M768 224l256-192v768l-256 192z" />
          </g>
        </svg>
      </span>
    );
  },
  displayName: 'BorderBlindsIcon',
});

export default BorderBlindsIcon;
