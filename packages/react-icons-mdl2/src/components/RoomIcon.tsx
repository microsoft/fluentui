import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const RoomIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1920 128v1664h-442l-473 95-237 47V779l640-128v-11H640v1152H128V128h1792zM896 885v893l512-103V782L896 885zm896 779V256H256v1408h256V512h1024v1152h256z" />
    </svg>
  ),
  displayName: 'RoomIcon',
});

export default RoomIcon;
