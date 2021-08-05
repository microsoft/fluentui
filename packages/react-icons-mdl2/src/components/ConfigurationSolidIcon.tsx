import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ConfigurationSolidIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1755 512h-475V37l475 475zm-795 520q38 0 71 14t59 40 39 59 15 71q0 38-14 71t-40 59-59 39-71 15q-38 0-71-14t-59-40-39-59-15-71q0-38 14-71t40-59 59-39 71-15zm832-392v1408H128V0h1024v640h640zm-509 632q2-14 3-28t1-28q0-14-1-28t-3-28l185-76-55-134-185 77q-33-46-79-79l77-185-134-55-76 185q-14-2-28-3t-28-1q-14 0-28 1t-28 3l-76-185-134 55 77 185q-46 33-79 79l-185-77-55 134 185 76q-2 14-3 28t-2 28q0 14 1 28t4 28l-185 76 55 134 185-77q33 46 79 79l-77 185 134 55 76-185q14 2 28 3t28 2q14 0 28-1t28-4l76 185 134-55-77-185q46-33 79-79l185 77 55-134-185-76z" />
    </svg>
  ),
  displayName: 'ConfigurationSolidIcon',
});

export default ConfigurationSolidIcon;
