import CardTemplate from './fixtures/card.html';
import './index';

export default {
  title: 'Components/Card',
};

export const Card = (): string => CardTemplate;

const example = `
<fluent-card>Card Content</fluent-card>
`;

Card.parameters = {
  docs: {
    source: {
      code: example,
    },
  },
};
