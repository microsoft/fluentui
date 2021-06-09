import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const LearningToolsIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M384 1536h128v128H256V384H128v1408h384v128H0V256h256V128h384q88 0 169 27t151 81q69-54 150-81t170-27h384v128h256v819l-128-58V384h-128v575l-128-59V256h-256q-71 0-136 24t-120 71v608l-128 58V351q-54-46-119-70t-137-25H384v1280zm1408 255l-448 225-448-225q0-36 1-76t8-81 20-77 36-67l-193-88v582H640v-640l704-320 704 320-321 146 8 11q21 31 32 67t17 73 7 76 1 74zm-448-627l-395 180 395 180 395-180-395-180zm0 709l320-161q-1-26-4-47t-11-41-16-39-23-42l-266 121-266-121q-15 24-24 43t-16 38-9 40-4 49l319 160z" />
    </svg>
  ),
  displayName: 'LearningToolsIcon',
});

export default LearningToolsIcon;
