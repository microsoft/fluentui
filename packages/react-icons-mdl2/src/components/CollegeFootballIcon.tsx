import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const CollegeFootballIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1536 0q106 0 199 40t163 109 110 163 40 200q0 212-55 408t-155 367-240 311-311 240-367 155-408 55q-106 0-199-40t-163-109-110-163-40-200q0-212 55-408t155-367 240-311 311-240 367-155 408-55zm384 512q0-79-30-149t-82-122-123-83-149-30q-68 0-135 6t-133 20l626 626q13-66 19-133t7-135zM128 1536q0 80 30 149t82 122 122 83 150 30q68 0 135-6t133-20l-626-626q-13 66-19 133t-7 135zm797 322q167-51 314-140t268-210 210-268 141-315l-735-735q-167 51-314 140T541 540 331 808t-141 315l735 735zm310-1135l90 90-512 512-90-90 512-512z" />
    </svg>
  ),
  displayName: 'CollegeFootballIcon',
});

export default CollegeFootballIcon;
