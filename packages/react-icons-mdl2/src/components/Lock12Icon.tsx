import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const Lock12Icon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1536 853h171v1195H341V853h171V512q0-106 40-199t109-163T824 40t200-40q106 0 199 40t163 109 110 163 40 200v341zM683 512v341h682V512q0-70-27-132t-73-109-108-73-133-27q-71 0-133 27t-108 73-73 108-27 133zm853 1365v-853H512v853h1024z" />
    </svg>
  ),
  displayName: 'Lock12Icon',
});

export default Lock12Icon;
