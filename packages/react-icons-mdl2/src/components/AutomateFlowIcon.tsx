import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const AutomateFlowIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M821 768h568L313 1792H56l304-640H0L535 128h612L821 768zm-559 896l807-768H613l325-640H613l-402 768h351l-304 640h4zM2048 640h-256v640h256v640h-640v-640h256v-256h-384l128-128h256V640h-256V0h640v640zm-128 768h-384v384h384v-384zm-384-896h384V128h-384v384z" />
    </svg>
  ),
  displayName: 'AutomateFlowIcon',
});

export default AutomateFlowIcon;
