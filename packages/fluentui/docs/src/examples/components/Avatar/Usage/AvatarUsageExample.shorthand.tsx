import * as React from 'react';
import { makeStyles } from '@material-ui/styles';

import { Avatar } from '@fluentui/react-northstar';
import { AcceptIcon } from '@fluentui/react-icons-northstar';

const status = { color: 'green', icon: <AcceptIcon />, title: 'Available' };

const avatarOverrides = {
  violet: {
    '--avatar-status-border-color': 'violet',
  },
  yellowgreen: {
    '--avatar-status-border-color': 'yellowgreen',
  },
  orangered: {
    '--avatar-status-border-color': 'orangered',
  },
  cornflowerblue: {
    '--avatar-status-border-color': 'cornflowerblue',
  },
};
const useMUIStyles = makeStyles(avatarOverrides);

const AvatarUsageExampleShorthand = () => {
  const avatarOverrideClasses = useMUIStyles();
  return (
    <div>
      Correct:
      <div>
        <div style={{ backgroundColor: 'violet', padding: '1rem', display: 'inline-block' }}>
          <Avatar
            name="John Doe (Software Developer)"
            status={status}
            className={avatarOverrideClasses.violet}
            // variables={{ statusBorderColor: 'violet' }}
          />
        </div>
        <div style={{ backgroundColor: 'yellowgreen', padding: '1rem', display: 'inline-block' }}>
          <Avatar
            name="John Doe (Software Developer)"
            status={status}
            className={avatarOverrideClasses.yellowgreen}
            // variables={{ statusBorderColor: 'yellowgreen' }}
          />
        </div>
        <div style={{ backgroundColor: 'orangered', padding: '1rem', display: 'inline-block' }}>
          <Avatar
            name="John Doe (Software Developer)"
            status={status}
            className={avatarOverrideClasses.orangered}
            // variables={{ statusBorderColor: 'orangered' }}
          />
        </div>
        <div style={{ backgroundColor: 'cornflowerblue', padding: '1rem', display: 'inline-block' }}>
          <Avatar
            name="John Doe (Software Developer)"
            status={status}
            className={avatarOverrideClasses.cornflowerblue}
            // variables={{ statusBorderColor: 'cornflowerblue' }}
          />
        </div>
      </div>
      Incorrect (Border should not be visible, unless in Contrast theme):
      <div>
        <div style={{ backgroundColor: 'violet', padding: '1rem', display: 'inline-block' }}>
          <Avatar name="John Doe (Software Developer)" status={status} />
        </div>
        <div style={{ backgroundColor: 'yellowgreen', padding: '1rem', display: 'inline-block' }}>
          <Avatar name="John Doe (Software Developer)" status={status} />
        </div>
        <div style={{ backgroundColor: 'orangered', padding: '1rem', display: 'inline-block' }}>
          <Avatar name="John Doe (Software Developer)" status={status} />
        </div>
        <div style={{ backgroundColor: 'cornflowerblue', padding: '1rem', display: 'inline-block' }}>
          <Avatar name="John Doe (Software Developer)" status={status} />
        </div>
      </div>
    </div>
  );
};

export default AvatarUsageExampleShorthand;
