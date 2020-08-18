import * as React from 'react';
import { Badge } from '../Badge/Badge';
import { StoryExample } from '../utils/StoryExample';

export const BadgeExamples = () => (
  <>
    <StoryExample title="Badge">
      <Badge size="smallest" state="error" />
      <Badge size="smaller" state="info" />
      <Badge size="small" state="success" />
      <Badge />
      <Badge size="large" state="warning" />
      <Badge size="larger" />
      <Badge size="largest" />
    </StoryExample>
    <StoryExample title="Custom tokens">
      <Badge tokens={{ borderColor: 'chartreuse', backgroundColor: 'green' }} />
      <Badge tokens={{ size: '20px' }} />
    </StoryExample>
  </>
);
