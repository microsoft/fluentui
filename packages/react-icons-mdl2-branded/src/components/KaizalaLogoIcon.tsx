import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const KaizalaLogoIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M1878 498q84 115 127 249t43 277q0 124-32 238t-90 214-140 181-181 140-214 91-239 32q-124 0-238-32t-214-90-181-140-140-181-91-214-32-239V565q0-32-14-57t-35-48-47-44-46-44-36-49-14-59q0-28 10-53t29-43 44-29 53-11h952q167 0 319 58t278 170l116-117q28-28 68-28t68 28 28 68q0 40-28 68l-123 123zm42 526q0-117-34-227t-100-207l-694 694q-28 28-68 28t-68-28L640 968q-28-28-28-68t28-68 68-28q40 0 68 28l248 248 634-634q-107-94-235-142t-271-48H200q-8 0-8 8l2 5 115 115q36 36 55 83t20 98v459q0 106 27 204t78 183 120 156 155 120 184 77 204 28q106 0 204-27t183-78 156-120 120-155 77-184 28-204z" />
    </svg>
  ),
  displayName: 'KaizalaLogoIcon',
});

export default KaizalaLogoIcon;
