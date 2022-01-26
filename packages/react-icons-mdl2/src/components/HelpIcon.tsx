import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const HelpIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M896 1920h128v128H896v-128zM960 0q79 0 152 20t138 58 117 91 90 117 58 137 21 153q0 84-22 152t-58 124-82 105-94 93-94 89-82 95-58 108-22 130v192H896v-192q0-84 22-152t58-124 82-104 94-93 94-90 82-95 58-108 22-130q0-93-35-174t-96-142-142-96-175-36q-93 0-174 35t-142 96-96 142-36 175H384q0-79 20-152t58-138 91-117 117-90 137-58T960 0z" />
    </svg>
  ),
  displayName: 'HelpIcon',
});

export default HelpIcon;
