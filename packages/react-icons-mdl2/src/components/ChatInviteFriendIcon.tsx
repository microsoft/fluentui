import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ChatInviteFriendIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1762 1590q66 32 118 80t90 108 58 128 20 142h-128q0-79-30-149t-83-122-122-82-149-31q-79 0-149 30t-122 83-82 122-31 149h-128q0-73 20-141t57-128 90-108 119-81q-75-54-116-135t-42-175q0-79 30-149t82-122 122-83 150-30q79 0 149 30t122 82 83 123 30 149q0 93-41 174t-117 136zm-226-54q53 0 99-20t82-55 55-81 20-100q0-53-20-99t-55-82-81-55-100-20q-53 0-99 20t-82 55-55 81-20 100q0 53 20 99t55 82 81 55 100 20zm512-1408v1024q0-48-9-84t-25-67-40-60-54-63V256H128v1152h256v267l267-267h390q8 34 21 66t31 62H704l-448 448v-448H0V128h2048z" />
    </svg>
  ),
  displayName: 'ChatInviteFriendIcon',
});

export default ChatInviteFriendIcon;
