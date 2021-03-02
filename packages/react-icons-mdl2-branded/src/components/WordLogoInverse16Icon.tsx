import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const WordLogoInverse16Icon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M1920 0q26 0 49 10t41 27 28 41 10 50v1792q0 26-10 49t-27 41-41 28-50 10H512q-26 0-49-10t-41-27-28-41-10-50v-256H128q-26 0-49-10t-41-27-28-41-10-50V512q0-26 10-49t27-41 41-28 50-10h256V128q0-26 10-49t27-41 41-28 50-10h1408zm0 1920v-384h-640q0 26-10 49t-27 41-41 28-50 10H512v256h1408zm0-512v-384h-640v384h640zm0-512V512h-640v384h640zm0-512V128H512v256h1408zM747 1440h212l184-832H939l-87 475-109-475H541l-104 478-94-478H137l185 832h215l102-478 108 478z" />
    </svg>
  ),
  displayName: 'WordLogoInverse16Icon',
});

export default WordLogoInverse16Icon;
