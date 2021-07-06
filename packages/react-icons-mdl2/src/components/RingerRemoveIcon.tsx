import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const RingerRemoveIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1024 255q-106 0-199 40T662 405 552 568t-41 200v768h708l128 128h-67q0 53-20 99t-55 82-81 55-100 20q-53 0-99-20t-82-55-55-81-20-100H256v-128h129V768q0-88 23-170t64-153 100-129 129-100 153-65 170-23q88 0 170 23t153 64 129 100 100 130 65 153 23 170v579l-127-126V768q0-106-40-199t-110-163-163-110-200-41zM904 1664q0 25 9 46t26 38 38 26 47 10q25 0 46-9t38-26 26-38 10-47H904zm915 64l226 227-90 90-227-226-227 227-90-91 227-227-227-227 90-90 227 227 227-227 90 91-226 226z" />
    </svg>
  ),
  displayName: 'RingerRemoveIcon',
});

export default RingerRemoveIcon;
