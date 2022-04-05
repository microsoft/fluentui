import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const NormalWeightIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1536 1313q0 115-44 204t-118 149-173 92-205 32H512V128h473q88 0 172 22t150 68 106 118 40 172q0 69-19 132t-57 114-91 90-121 58v5q84 9 152 41t117 85 75 124 27 156zM707 304v536h198q72 0 134-16t109-52 73-91 27-134q0-72-26-119t-70-74-101-39-120-11H707zm625 1006q0-90-34-147t-91-89-129-45-149-12H707v597h263q73 0 138-17t115-54 79-94 30-139z" />
    </svg>
  ),
  displayName: 'NormalWeightIcon',
});

export default NormalWeightIcon;
