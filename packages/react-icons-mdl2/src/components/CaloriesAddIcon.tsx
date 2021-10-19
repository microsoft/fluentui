import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const CaloriesAddIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M384 1280q0 88 23 170t64 153 100 129 130 100 153 65 170 23q66 0 131-13t125-41v137q-123 45-256 45-106 0-204-27t-183-78-156-120-120-155-77-184-28-204q0-84 18-165t52-155 84-140 113-122q6 37 18 78t29 81 38 77 46 65q22 25 52 25 27 0 45-19t19-46q0-11-3-20t-10-18q-56-82-86-163t-31-182q0-119 45-224t124-183T992 46t224-46h64v64q0 177 66 330t190 278 190 278 66 330h-128q0-152-56-281t-162-236q-130-132-204-288t-88-343q-83 11-153 50t-123 99-81 135-29 160q0 79 23 141t68 126q19 28 29 54t11 62q0 40-15 75t-42 61-61 42-75 15q-46 0-81-17t-62-46-49-65-39-72q-45 75-68 158t-23 170zm1664 384v128h-256v256h-128v-256h-256v-128h256v-256h128v256h256z" />
    </svg>
  ),
  displayName: 'CaloriesAddIcon',
});

export default CaloriesAddIcon;
