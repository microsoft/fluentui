import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const BorderBlindsIcon = createSvgIcon({
  // TODO: convert classNames.svg to selector to selector
  // TODO: add support for custom classNames on root!
  svg: ({ classNames }) => (
    <svg viewBox="0 0 40 40" className={classNames.svg}>
      <g transform="scale(0.03125 0.03125)">
        <path className="borderblinds-part1" d="M0 192l320-128v768l-320 128z" />
        <path className="borderblinds-part2" d="M384 32l320 192v736l-320-160z" />
        <path className="borderblinds-part3" d="M768 224l256-192v768l-256 192z" />
      </g>
    </svg>
  ),
  displayName: 'BorderBlindsIcon',
});

export default BorderBlindsIcon;
