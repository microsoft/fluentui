import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const AttachIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1536 384v1216q0 93-35 174t-96 142-142 96-175 36q-93 0-174-35t-142-96-96-142-36-175V320q0-66 25-124t69-101 102-69T960 0q66 0 124 25t101 69 69 102 26 124v1280q0 40-15 75t-41 61-61 41-75 15q-40 0-75-15t-61-41-41-61-15-75V512h128v1088q0 26 19 45t45 19q26 0 45-19t19-45V320q0-40-15-75t-41-61-61-41-75-15q-40 0-75 15t-61 41-41 61-15 75v1280q0 66 25 124t69 101 102 69 124 26q66 0 124-25t101-69 69-102 26-124V384h128z" />
    </svg>
  ),
  displayName: 'AttachIcon',
});

export default AttachIcon;
