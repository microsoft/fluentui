import * as React from 'react';
import { StoryWright, Steps } from 'storywright';
import { ComponentMeta } from '@storybook/react';
import { TextArea, textAreaClassName } from '@fluentui/react-northstar';
import { getThemeStoryVariant } from '../utilities';
import TextAreaExample from '../../examples/components/TextArea/Types/TextAreaExample.shorthand';

export default {
  component: TextArea,
  title: 'TextArea',
  decorators: [
    story => (
      <StoryWright steps={new Steps().focus(`.${textAreaClassName}`).snapshot('Can be focused').end()}>
        {story()}
      </StoryWright>
    ),
  ],
} as ComponentMeta<typeof TextArea>;

const TextAreaExampleTeams = getThemeStoryVariant(TextAreaExample, 'teamsV2');

const TextAreaExampleTeamsDark = getThemeStoryVariant(TextAreaExample, 'teamsDarkV2');

const TextAreaExampleTeamsHighContrast = getThemeStoryVariant(TextAreaExample, 'teamsHighContrast');

export { TextAreaExample, TextAreaExampleTeams, TextAreaExampleTeamsDark, TextAreaExampleTeamsHighContrast };
