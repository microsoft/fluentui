import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const PythonLogoYellowIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2037 1037q0 117-38 229-16 47-34 92t-47 79-67 56-97 21h-732v62h488v187q0 56-24 98t-65 75-91 53-106 35-108 18-96 6q-43 0-95-6t-107-19-105-35-91-53-64-74-24-98v-466q0-50 19-95t53-79 77-54 95-20h488q62 0 117-25t97-68 66-99 25-118V522h183q57 0 97 20t69 55 48 80 31 93q17 66 27 132t11 135zm-740 663q-19 0-36 7t-29 20-20 30-7 36q0 19 7 36t19 30 29 20 37 8q19 0 35-7t29-21 20-30 7-36q0-19-7-35t-19-30-29-20-36-8z" />
    </svg>
  ),
  displayName: 'PythonLogoYellowIcon',
});

export default PythonLogoYellowIcon;
