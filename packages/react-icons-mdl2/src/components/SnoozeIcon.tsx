import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const SnoozeIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M640 1280h256v128H512V896h128v384zm0-640q88 0 170 23t153 64 129 100 100 130 65 153 23 170q0 88-23 170t-64 153-100 129-130 100-153 65-170 23q-88 0-170-23t-153-64-129-100-100-130-65-153-23-170q0-88 23-170t64-153 100-129 130-100 153-65 170-23zm0 1152q106 0 199-40t162-110 110-163 41-199q0-106-40-199t-110-162-163-110-199-41q-106 0-199 40T279 918t-110 163-41 199q0 106 40 199t110 162 163 110 199 41zm721-1141h239v117h-448v-66l250-329h-225V256h421v78l-237 317zm687-226v87h-320v-49l179-248h-161v-87h301v59l-170 238h171z" />
    </svg>
  ),
  displayName: 'SnoozeIcon',
});

export default SnoozeIcon;
