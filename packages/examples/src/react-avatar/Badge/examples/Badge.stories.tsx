import * as React from 'react';
import { Badge } from '@fluentui/react-avatar';
import { SkypeCheckIcon, SkypeArrowIcon, SkypeMinusIcon, SkypeClockIcon } from '@fluentui/react-icons';
import { StoryExample } from '../../utils/StoryExample';

export const BadgeExamples = () => (
  <>
    <StoryExample title="Badge">
      <Badge size="smallest" state="error" />
      <Badge size="smaller" state="warning" />
      <Badge size="small" state="success" />
      <Badge size="medium" />
      <Badge size="large" state="error" />
      <Badge size="larger" state="warning" />
      <Badge size="largest" state="success" />
    </StoryExample>
    <StoryExample title="Badge with icon">
      <Badge size="smallest" state="error" icon={{ as: SkypeMinusIcon }} />
      <Badge size="smaller" state="warning" icon={{ as: SkypeClockIcon }} />
      <Badge size="small" state="success" icon={{ as: SkypeCheckIcon }} />
      <Badge size="medium" state="info" icon={{ as: SkypeArrowIcon }} />
      <Badge size="large" state="error" icon={{ as: SkypeMinusIcon }} />
      <Badge size="larger" state="warning" icon={{ as: SkypeClockIcon }} />
      <Badge size="largest" state="success" icon={{ as: SkypeCheckIcon }} />
    </StoryExample>
    <StoryExample title="Badge styled with tokens">
      <Badge
        tokens={{
          size: '13px',
        }}
      />
      <Badge
        size="medium"
        icon={{ as: SkypeArrowIcon }}
        tokens={{
          color: 'mistyrose',
          iconColor: 'hotpink',
          borderColor: 'hotpink',
        }}
      />
      <Badge
        size="large"
        state="success"
        tokens={{
          borderRadius: '2px',
        }}
      />
    </StoryExample>
  </>
);
