import descriptionMd from './LegendsDescription.md';
import bestPracticesMd from './LegendsBestPractices.md';
import { Legends } from '@fluentui/react-charts';

export { LegendsBasic } from './LegendsDefault.stories';
export { LegendsOverflow } from './Legends.Overflow.stories';
export { LegendsStyled } from './Legends.Styled.stories';
export { LegendsWrapLines } from './Legends.WrapLines.stories';
export { LegendsControlled } from './Legends.Controlled.stories';

export default {
  title: 'Charts/Legends',
  component: Legends,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
