import { Input } from '@fluentui/react-headless-components-preview/input';

import descriptionMd from './InputDescription.md';
import inputCss from './input.module.css?raw';
import chatInputCss from './chat-input.module.css?raw';
import { withCssModuleSource } from '../_helpers/withCssModuleSource';

export { Default } from './InputDefault.stories';
export { Basic } from './InputBasic.stories';

export default {
  title: 'Headless Components/Input',
  component: Input,
  parameters: {
    docs: {
      description: {
        component: descriptionMd,
      },
    },

    ...withCssModuleSource(
      { name: 'input.module.css', source: inputCss },
      { name: 'chat-input.module.css', source: chatInputCss },
    ),
  },
};
