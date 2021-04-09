import addons from '@storybook/addons';
import { STORY_RENDERED } from '@storybook/core-events';
import NumberFieldTemplate from './fixtures/number-field.html';
import './index';

addons.getChannel().addListener(STORY_RENDERED, (name: string) => {
  if (name.toLowerCase().startsWith('number-field')) {
    document.querySelectorAll('.form').forEach(el => {
      if (el instanceof HTMLFormElement) {
        el.onsubmit = event => {
          event.preventDefault();
          const form: HTMLFormElement = document.forms['myForm'];
          console.log(form.elements['fname'].value, 'value of input');
        };
      }
    });
  }
});

export default {
  title: 'Number Field',
};

export const NumberField = () => NumberFieldTemplate;
