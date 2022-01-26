import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const PassiveAuthenticationIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1344 1510l339-339 90 90-429 429-237-237 90-90 147 147zm704-742v1280H768v-781q-61 13-128 13-133 0-249-50t-204-137T50 890 0 640q0-133 50-249t137-204T390 50 640 0q133 0 249 50t204 137 137 203 50 250q0 67-13 128h781zM128 640q0 106 40 199t110 162 163 110 199 41q106 0 199-40t162-110 110-163 41-199q0-106-40-199t-110-162-163-110-199-41q-106 0-199 40T279 278 169 441t-41 199zm1792 256h-693q-51 113-134 196t-197 135v693h1024V896zm-915-403L576 922 339 685l90-90 147 147 339-339 90 90z" />
    </svg>
  ),
  displayName: 'PassiveAuthenticationIcon',
});

export default PassiveAuthenticationIcon;
