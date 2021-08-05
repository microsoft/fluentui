import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const ExchangeLogoIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M2048 672q0 25-10 49t-27 42l-262 261 262 261q17 17 27 41t10 50v416q0 27-10 50t-27 40-41 28-50 10h-416q-25 0-49-10t-42-27l-261-262-261 262q-17 17-41 27t-50 10H384q-27 0-50-10t-40-27-28-41-10-50v-256H85q-35 0-60-25t-25-60V597q0-35 25-60t60-25h171V256q0-27 10-50t27-40 41-28 50-10h416q25 0 49 10t42 27l261 262 261-262q17-17 41-27t50-10h416q27 0 50 10t40 27 28 41 10 50v416zM384 256v256h555q35 0 60 25t25 60V480L800 256H384zm-96 1104h448v-135H445v-136h260V954H445V824h277V688H288v672zm1632 16l-224-224h-315q-21 0-39 8t-32 21-22 32-8 40v315l224 224h416v-416zm0-704V256h-416l-352 352v187q0 66-34 121t-94 85v450q0 35-25 60t-60 25H384v256h416l352-352v-187q0-48 18-89t49-73 72-49 90-18h187l352-352z" />
    </svg>
  ),
  displayName: 'ExchangeLogoIcon',
});

export default ExchangeLogoIcon;
