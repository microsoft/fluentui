import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const HealthIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M347 1024h-39l716 716 588-588h181l-769 769-865-864q-35-35-62-75t-47-86h243l283-282 448 447 320-319 155 154h355q32-51 49-108t17-117q0-87-32-162t-89-130-132-87-163-32q-84 0-149 26t-120 70-105 97-106 111q-54-54-105-109t-106-99-121-72-148-28q-86 0-161 32t-132 89-89 132-33 162q0 47 11 97H9q-5-24-6-48t-2-48q0-113 42-212t116-173 173-116 212-43q83 0 148 19t120 52 106 81 106 103q55-56 105-103t106-80 121-53 148-19q112 0 211 42t172 116 116 172 43 211q0 97-34 188t-97 167h-470l-101-102-320 321-448-449-229 230z" />
    </svg>
  ),
  displayName: 'HealthIcon',
});

export default HealthIcon;
