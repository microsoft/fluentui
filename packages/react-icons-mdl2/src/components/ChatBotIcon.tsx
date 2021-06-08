import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ChatBotIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M768 1024H640V896h128v128zm512 0h-128V896h128v128zm512-128v256h-128v320q0 40-15 75t-41 61-61 41-75 15h-264l-440 376v-376H448q-40 0-75-15t-61-41-41-61-15-75v-320H128V896h128V704q0-40 15-75t41-61 61-41 75-15h448V303q-29-17-46-47t-18-64q0-27 10-50t27-40 41-28 50-10q27 0 50 10t40 27 28 41 10 50q0 34-17 64t-47 47v209h448q40 0 75 15t61 41 41 61 15 75v192h128zm-256-192q0-26-19-45t-45-19H448q-26 0-45 19t-19 45v768q0 26 19 45t45 19h448v226l264-226h312q26 0 45-19t19-45V704zm-851 462q55 55 126 84t149 30q78 0 149-29t126-85l90 91q-73 73-167 112t-198 39q-103 0-197-39t-168-112l90-91z" />
    </svg>
  ),
  displayName: 'ChatBotIcon',
});

export default ChatBotIcon;
