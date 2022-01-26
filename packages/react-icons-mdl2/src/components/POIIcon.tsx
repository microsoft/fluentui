import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const POIIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1024 0q88 0 170 23t153 64 129 100 100 130 65 153 23 170q0 69-16 131t-48 125l-576 1152L448 896q-31-62-47-124t-17-132q0-88 23-170t64-153 100-129T701 88t153-65 170-23zm476 846v-1l1-1q25-47 38-99t13-105q0-109-41-205t-114-168-168-113-205-42q-109 0-205 41T651 267 538 435t-42 205q0 53 13 105t38 99v1l1 1 476 952 476-952zm-476-582q78 0 146 29t120 81 80 119 30 147q0 78-29 146t-81 120-119 80-147 30q-78 0-146-29t-120-81-80-119-30-147q0-78 29-146t81-120 119-80 147-30zm0 640q55 0 103-20t84-57 56-84 21-103q0-55-20-103t-57-84-84-56-103-21q-55 0-103 20t-84 57-56 84-21 103q0 55 20 103t57 84 84 56 103 21z" />
    </svg>
  ),
  displayName: 'POIIcon',
});

export default POIIcon;
