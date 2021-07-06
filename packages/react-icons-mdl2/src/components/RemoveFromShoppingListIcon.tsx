import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const RemoveFromShoppingListIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M640 768v128H512V768h128zm896 0v128H768V768h768zM512 1280v-128h128v128H512zm256 0v-128h768v128H768zM640 384v128H512V384h128zm896 0v128H768V384h768zM384 128v1536h896v128H256V0h1536v1280h-128V128H384zm1645 1389l-211 211 211 211-90 90-211-211-211 211-90-90 211-211-211-211 90-90 211 211 211-211 90 90z" />
    </svg>
  ),
  displayName: 'RemoveFromShoppingListIcon',
});

export default RemoveFromShoppingListIcon;
