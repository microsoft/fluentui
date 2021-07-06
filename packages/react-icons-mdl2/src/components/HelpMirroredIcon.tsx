import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const HelpMirroredIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1024 1920H896v128h128v-128zM960 0q-79 0-152 20T670 78t-117 91-90 117-58 137-21 153q0 84 22 152t58 124 82 105 94 93 94 89 82 95 58 108 22 130v192h128v-192q0-84-22-152t-58-124-82-104-94-93-94-90-82-95-58-108-22-130q0-93 35-174t96-142 142-96 175-36q93 0 174 35t142 96 96 142 36 175h128q0-79-20-152t-58-138-91-117-117-90-137-58T960 0z" />
    </svg>
  ),
  displayName: 'HelpMirroredIcon',
});

export default HelpMirroredIcon;
