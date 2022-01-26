import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const LightWeightIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1457 1317q0 111-37 199t-104 149-157 94-199 33H512V128h438q89 0 167 24t136 73 91 121 34 166q0 72-19 136t-57 116-92 90-124 61v4q84 9 152 40t117 82 75 120 27 156zM627 234v644h232q81 0 153-21t127-63 87-108 33-153q0-84-26-141t-74-93-113-50-142-15H627zm713 1092q0-104-40-171t-105-105-150-53-173-15H627v706h309q88 0 162-21t128-65 84-113 30-163z" />
    </svg>
  ),
  displayName: 'LightWeightIcon',
});

export default LightWeightIcon;
