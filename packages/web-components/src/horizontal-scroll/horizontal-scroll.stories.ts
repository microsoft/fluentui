import HorizontalScrollTemplate from './fixtures/horizontal-scroll.html';
import './index';

export default {
  title: 'Components/Horizontal Scroll',
};

export const HorizontalScroll = () => HorizontalScrollTemplate;

const example = `
<fluent-horizontal-scroll>
  <fluent-card>
    Card number 1
    <fluent-button>A button</fluent-button>
  </fluent-card>
  <fluent-card>
    Card number 2
    <fluent-button>A button</fluent-button>
  </fluent-card>
  <fluent-card>
    Card number 3
    <fluent-button>A button</fluent-button>
  </fluent-card>
  <fluent-card>
    Card number 4
    <fluent-button>A button</fluent-button>
  </fluent-card>
  <fluent-card>
    Card number 5
    <fluent-button>A button</fluent-button>
  </fluent-card>
  <fluent-card>
    Card number 6
    <fluent-button>A button</fluent-button>
  </fluent-card>
  <fluent-card>
    Card number 7
    <fluent-button>A button</fluent-button>
  </fluent-card>
  <fluent-card>
    Card number 8
    <fluent-button>A button</fluent-button>
  </fluent-card>
  <fluent-card>
    Card number 9
    <fluent-button>A button</fluent-button>
  </fluent-card>
  <fluent-card>
    Card number 10
    <fluent-button>A button</fluent-button>
  </fluent-card>
  <fluent-card>
    Card number 11
    <fluent-button>A button</fluent-button>
  </fluent-card>
  <fluent-card>
    Card number 12
    <fluent-button>A button</fluent-button>
  </fluent-card>
  <fluent-card>
    Card number 13
    <fluent-button>A button</fluent-button>
  </fluent-card>
  <fluent-card>
    Card number 14
    <fluent-button>A button</fluent-button>
  </fluent-card>
  <fluent-card>
    Card number 15
    <fluent-button>A button</fluent-button>
  </fluent-card>
  <fluent-card>
    Card number 16
    <fluent-button>A button</fluent-button>
  </fluent-card>
</fluent-horizontal-scroll>
`;

HorizontalScroll.parameters = {
  docs: {
    source: {
      code: example,
    },
  },
};
