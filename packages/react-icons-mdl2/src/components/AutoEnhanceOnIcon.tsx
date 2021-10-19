import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const AutoEnhanceOnIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M0 1984q0-26 19-45L1235 723q19-19 45-19t45 19 19 45q0 26-19 45L109 2029q-19 19-45 19t-45-19-19-45zM1408 0h128v256h-128V0zm-207 395l-182-181 91-91 181 182-90 90zm-49 245H896V512h256v128zm256 256h128v256h-128V896zm335-139l182 181-91 91-181-182 90-90zm305-245v128h-256V512h256zm-305-117l-90-90 181-182 91 91-182 181zm-271 117q26 0 45 19t19 45q0 26-19 45t-45 19q-26 0-45-19t-19-45q0-26 19-45t45-19z" />
    </svg>
  ),
  displayName: 'AutoEnhanceOnIcon',
});

export default AutoEnhanceOnIcon;
