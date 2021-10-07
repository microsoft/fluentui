import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const Uneditable2MirroredIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 2048l-633-158-583-583-723 722-90-90L1939 19l90 90-722 723 583 583 158 633zm-505-258l329 82-82-329q-47 10-87 32t-73 55-55 73-32 87zm-327-867l-293 293 505 506q16-52 44-98t67-85 84-66 99-45l-506-505zM0 336q0-70 26-131T98 99t107-72T335 0q67 0 128 25t110 73l530 531-90 90-373-372-293 293 372 373-90 90L98 573q-48-48-73-109T0 336zm128 0q0 38 10 66t29 53 41 47 48 47l293-293q-25-25-47-48t-46-41-54-28-67-11q-43 0-80 16t-66 45-44 66-17 81z" />
    </svg>
  ),
  displayName: 'Uneditable2MirroredIcon',
});

export default Uneditable2MirroredIcon;
