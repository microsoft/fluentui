import CardTemplate from './fixtures/card.html';
import './index';

export default {
  title: 'Components/Card',
};

export const Card = (): string => CardTemplate;

const example = `
<fluent-card>Card content in default slot</fluent-card>
`;

Card.parameters = {
  docs: {
    source: {
      code: example,
    },
  },
};
