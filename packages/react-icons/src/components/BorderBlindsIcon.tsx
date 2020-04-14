import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const BorderBlindsIcon = createSvgIcon<{ color1?: string; color2?: string; color3?: string }>({
  svg: ({ classes, props }) => {
    const { color1 = 'red', color2 = 'green', color3 = 'blue' } = props;
    return (
      <svg viewBox="0 0 40 40" className={classes.svg}>
        <g transform="scale(0.03125 0.03125)">
          <path fill={color1} d="M0 192l320-128v768l-320 128z" />
          <path fill={color2} d="M384 32l320 192v736l-320-160z" />
          <path fill={color3} d="M768 224l256-192v768l-256 192z" />
        </g>
      </svg>
    );
  },
  displayName: 'BorderBlindsIcon',
});

export default BorderBlindsIcon;
