import * as React from 'react';
import { useDelayedState } from './hooks/useDelayedState';
import { RosterVisuals } from './interface/roster.interface';
import { Avatar } from '@fluentui/react-northstar';
import { rosterAvatarStyles } from './styles/styles';

export const RosterAvatar: React.FunctionComponent<{ visuals: RosterVisuals; isActive: boolean }> = ({
  visuals,
  isActive,
}) => {
  const shouldRenderAvatar = useDelayedState({ delayMs: 500 + Math.floor(Math.random() * 2000) });
  const shouldRenderPresence = useDelayedState({ delayMs: 500 + Math.floor(Math.random() * 2000) });

  return (
    <Avatar
      image={shouldRenderAvatar ? getAvatar(visuals) : undefined}
      status={shouldRenderPresence ? { state: 'success' } : { state: 'unknown' }}
      styles={rosterAvatarStyles(isActive)}
    />
  );
};

const getAvatar = (v: RosterVisuals) => `public/images/avatar/small/${v}`;
