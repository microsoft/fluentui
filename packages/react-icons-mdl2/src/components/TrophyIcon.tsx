import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const TrophyIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1664 256v447q0 57-19 109t-54 94-83 71-104 40q-9 75-41 140t-83 117-116 85-140 44v133h384v256h128v128H384v-128h128v-256h384v-133q-75-10-140-43t-115-85-83-117-42-141q-56-11-104-40t-82-70-54-94-20-110V256h256V128h896v128h256zM640 1664v128h640v-128H640zM384 703q0 30 9 58t26 52 40 42 53 29V384H384v319zm576 577q66 0 124-25t101-68 69-102 26-125V256H640v704q0 66 25 124t68 102 102 69 125 25zm576-896h-128v500q28-10 52-28t40-42 26-52 10-59V384z" />
    </svg>
  ),
  displayName: 'TrophyIcon',
});

export default TrophyIcon;
