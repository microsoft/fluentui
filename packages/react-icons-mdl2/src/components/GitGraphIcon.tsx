import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const GitGraphIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1600 1024q66 0 124 25t101 69 69 102 26 124q0 66-25 124t-69 102-102 69-124 25q-57 0-109-19t-94-54-71-82-40-103q-99-6-192-36t-177-80-153-118-124-152v394q56 12 103 41t81 70 53 94 19 109q0 66-25 124t-69 102-102 69-124 25q-66 0-124-25t-102-68-69-102-25-125q0-57 19-109t53-93 81-71 103-41V634q-56-12-103-41t-81-70-53-94-19-109q0-66 25-124t68-101 102-69T576 0q66 0 124 25t101 69 69 102 26 124q0 57-19 108t-52 93-81 71-102 41q10 129 64 241t140 199 199 141 242 64q12-55 41-102t70-80 93-53 109-19zm0 512q40 0 75-15t61-41 41-61 15-75q0-40-15-75t-41-61-61-41-75-15q-40 0-75 15t-61 41-41 61-15 75q0 40 15 75t41 61 61 41 75 15z" />
    </svg>
  ),
  displayName: 'GitGraphIcon',
});

export default GitGraphIcon;
