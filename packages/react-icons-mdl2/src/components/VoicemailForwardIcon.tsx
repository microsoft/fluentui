import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const VoicemailForwardIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1725 1283l317 317-317 317-90-90 163-163h-518v-128h518l-163-163 90-90zm-178-3H384q-80 0-149-30t-122-82-83-122T0 896q0-79 30-149t82-122 122-83 150-30q79 0 149 30t122 82 83 123 30 149q0 72-26 137t-74 119h712q-48-53-74-118t-26-138q0-79 30-149t82-122 122-83 150-30q79 0 149 30t122 82 83 123 30 149q0 52-14 101t-39 92-62 79-81 61l-95-95q36-15 66-39t51-55 34-68 12-76q0-53-20-99t-55-82-81-55-100-20q-53 0-99 20t-82 55-55 81-20 100q0 53 20 99t55 82 81 55 100 20h6q3 0 6-1l-129 129zM384 1152q53 0 99-20t82-55 55-81 20-100q0-53-20-99t-55-82-81-55-100-20q-53 0-99 20t-82 55-55 81-20 100q0 53 20 99t55 82 81 55 100 20z" />
    </svg>
  ),
  displayName: 'VoicemailForwardIcon',
});

export default VoicemailForwardIcon;
