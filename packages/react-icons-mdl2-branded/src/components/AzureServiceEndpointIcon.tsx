import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const AzureServiceEndpointIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M1920 1024v128H791q-11 36-32 65t-49 51-63 32-71 12q-47 0-87-17t-71-48-48-71-18-88q0-46 17-87t48-71 71-48 88-18q37 0 71 11t62 33 50 50 32 66h1129zM576 1472q77 0 147-29t124-84l91 91q-73 73-166 111t-196 39q-106 0-199-40t-163-109-110-163-40-200q0-106 40-199t109-163 163-110 200-40q103 0 196 38t166 112l-91 91q-54-55-124-84t-147-29q-79 0-149 30t-122 83-82 122-31 149q0 79 30 149t83 122 122 82 149 31z" />
    </svg>
  ),
  displayName: 'AzureServiceEndpointIcon',
});

export default AzureServiceEndpointIcon;
