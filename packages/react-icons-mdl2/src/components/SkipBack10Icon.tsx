import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const SkipBack10Icon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M462 1148q34-9 70-24t73-35 69-41 60-44h39v916H670v-774q-15 15-41 32t-57 31-59 26-51 17v-104zm904-139q62 0 106 20t76 56 51 81 30 98 14 103 4 101q0 49-5 102t-18 106-34 99-55 83-80 57-108 21q-59 0-102-20t-75-55-52-79-33-94-16-101-5-97q0-50 4-105t17-109 33-101 55-86 81-58 112-22zm-9 839q43 0 74-19t51-49 33-70 18-81 8-80 2-71q0-30-1-70t-8-82-17-84-32-73-51-53-73-20q-45 0-76 20t-53 52-34 74-19 85-8 85-2 73q0 31 2 70t8 80 18 78 33 69 52 48 75 18zM1038 128q173 0 334 54t294 154 233 237 149 304l-122 38q-45-148-131-269t-203-208-258-134-296-48q-130 0-254 36T552 395 356 556 210 768h316v128H14V384h128v243q72-116 169-208t214-157 246-99 267-35z" />
    </svg>
  ),
  displayName: 'SkipBack10Icon',
});

export default SkipBack10Icon;
