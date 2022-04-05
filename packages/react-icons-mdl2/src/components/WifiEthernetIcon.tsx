import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const WifiEthernetIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1408 1792q27 0 50 10t40 27 28 41 10 50q0 27-10 50t-27 40-41 28-50 10q-27 0-50-10t-40-27-28-41-10-50q0-27 10-50t27-40 41-28 50-10zm-512 256q0-133 50-249t137-204 203-137 250-50v128q-106 0-199 40t-162 110-110 163-41 199H896zm-384 0q0-141 36-272t103-245 160-207 208-160 244-103 273-37v128q-124 0-238 32t-213 90-182 141-140 181-91 214-32 238H512zM2048 896h-256v1152h-128V896h-256V128h640v768zm-512-640v128h384V256h-384zm384 512V512h-128v128h-128V512h-128v256h384zm-640 26q-149 31-282 93t-248 151-205 201-156 241-98 272-35 296H128q0-169 39-329t111-303 176-267 231-221 278-165 317-99v130z" />
    </svg>
  ),
  displayName: 'WifiEthernetIcon',
});

export default WifiEthernetIcon;
