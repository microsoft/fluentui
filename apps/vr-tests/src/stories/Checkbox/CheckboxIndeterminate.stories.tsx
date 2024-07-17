import * as React from 'react';
import { Steps } from 'storywright';
import { Checkbox } from '@fluentui/react';
import { StoryWrightDecorator, TestWrapperDecorator } from '../../utilities';

export default {
  title: 'Checkbox Indeterminate',

  decorators: [
    TestWrapperDecorator,
    StoryWrightDecorator(
      new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('.ms-Checkbox')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .click('.ms-Checkbox')
        .snapshot('clicked', { cropTo: '.testWrapper' })
        .end(),
    ),
  ],
};

export const UncontrolledIndeterminateCheckbox = () => (
  <Checkbox label="Uncontrolled Indeterminate checkbox" defaultIndeterminate />
);
UncontrolledIndeterminateCheckbox.storyName = 'Uncontrolled Indeterminate checkbox';

export const UncontrolledIndeterminateDefaultCheckedCheckbox = () => (
  <Checkbox
    label="Uncontrolled Indeterminate defaultChecked checkbox"
    defaultIndeterminate
    defaultChecked
  />
);
UncontrolledIndeterminateDefaultCheckedCheckbox.storyName =
  'Uncontrolled Indeterminate defaultChecked checkbox';

export const ControlledIndeterminateCheckboxWithoutOnChangeCallback = () => (
  <Checkbox
    label="Controlled Indeterminate checkbox without onChange callback"
    indeterminate={true}
  />
);
ControlledIndeterminateCheckboxWithoutOnChangeCallback.storyName =
  'Controlled Indeterminate checkbox without onChange callback';

export const UncontrolledAndControlledIndeterminateCheckbox = () => (
  <Checkbox
    label="Uncontrolled and Controlled Indeterminate checkbox"
    defaultIndeterminate
    indeterminate={true}
  />
);
UncontrolledAndControlledIndeterminateCheckbox.storyName =
  'Uncontrolled and Controlled Indeterminate checkbox';
