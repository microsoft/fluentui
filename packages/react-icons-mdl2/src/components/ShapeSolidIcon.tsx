import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ShapeSolidIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M896 128h1152v1152h-234l-517-896-103 177q-55-85-131-152T896 297V128zm205 595l-468 810q-29 3-57 3-119 0-224-45t-183-124-123-183T0 960q0-119 45-224t124-183 183-123 224-46q85 0 164 24t148 68 123 106 90 141zM595 1920l702-1216 702 1216H595z" />
    </svg>
  ),
  displayName: 'ShapeSolidIcon',
});

export default ShapeSolidIcon;
