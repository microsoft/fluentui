import { createGuideExample } from '../../components/GuideExample';
import descriptionMd from './createCSSRuleFromThemeDescription.md';
import bestPracticesMd from './createCSSRuleFromThemeBestPractices.md';
import { Default } from './createCSSRuleFromThemeDefault.example';
import { Switching } from './createCSSRuleFromThemeSwitching.example';

export const description = [descriptionMd, bestPracticesMd].join('\n');
export const examples = [
  { name: 'Default', Preview: createGuideExample(Default, 'CSS rule from a theme') },
  { name: 'Switching', Preview: createGuideExample(Switching, 'Switching themes') },
];
