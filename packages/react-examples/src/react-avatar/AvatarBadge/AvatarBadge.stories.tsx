import * as React from 'react';
import { AvatarBadge } from '@fluentui/react-avatar';
import { SkypeCheckIcon, SkypeArrowIcon, SkypeMinusIcon, SkypeClockIcon } from '@fluentui/react-icons-mdl2';
import { StoryExample } from '../utils/StoryExample';

export const AvatarBadgeExamples = () => (
  <div style={{ background: 'rgb(232, 232, 232)' }}>
    <StoryExample title="AvatarBadge">
      <AvatarBadge size="smallest" state="error" />
      <AvatarBadge size="smaller" state="warning" />
      <AvatarBadge size="small" state="success" />
      <AvatarBadge size="medium" />
      <AvatarBadge size="large" state="error" />
      <AvatarBadge size="larger" state="warning" />
      <AvatarBadge size="largest" state="success" />
    </StoryExample>
    <StoryExample title="AvatarBadge with icon">
      <AvatarBadge size="smallest" state="error" icon={{ as: SkypeMinusIcon }} />
      <AvatarBadge size="smaller" state="warning" icon={{ as: SkypeClockIcon }} />
      <AvatarBadge size="small" state="success" icon={{ as: SkypeCheckIcon }} />
      <AvatarBadge size="medium" state="info" icon={{ as: SkypeArrowIcon }} />
      <AvatarBadge size="large" state="error" icon={{ as: SkypeMinusIcon }} />
      <AvatarBadge size="larger" state="warning" icon={{ as: SkypeClockIcon }} />
      <AvatarBadge size="largest" state="success" icon={{ as: SkypeCheckIcon }} />
    </StoryExample>
    <StoryExample title="AvatarBadge styled with tokens">
      <AvatarBadge
        tokens={{
          size: '13px',
        }}
      />
      <AvatarBadge
        size="medium"
        icon={{ as: SkypeArrowIcon }}
        tokens={{
          color: 'mistyrose',
          iconColor: 'hotpink',
          borderColor: 'hotpink',
          borderWidth: '2px',
          borderStyle: 'solid',
        }}
      />
      <AvatarBadge
        size="large"
        state="success"
        tokens={{
          borderRadius: '2px',
        }}
      />
    </StoryExample>
  </div>
);
