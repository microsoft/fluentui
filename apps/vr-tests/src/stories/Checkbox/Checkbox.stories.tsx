import * as React from 'react';
import { Steps } from 'storywright';
import { getStoryVariant, RTL, StoryWrightDecorator, TestWrapperDecorator } from '../../utilities';
import { Checkbox, Persona, PersonaSize } from '@fluentui/react';

export default {
  title: 'Checkbox',

  decorators: [
    TestWrapperDecorator,
    StoryWrightDecorator(new Steps().snapshot('default', { cropTo: '.testWrapper' }).end()),
  ],
};

export const Unchecked = () => <Checkbox label="Unchecked checkbox" />;

export const UncheckedRTL = getStoryVariant(Unchecked, RTL);

export const Checked = () => <Checkbox label="Checked checkbox" checked />;

export const UncheckedDisabled = () => <Checkbox label="Unchecked disabled checkbox" disabled />;
UncheckedDisabled.storyName = 'Unchecked disabled';

export const CheckedDisabled = () => (
  <Checkbox label="Checked disabled checkbox" checked disabled />
);
CheckedDisabled.storyName = 'Checked disabled';

export const ControlledIndeterminate = () => (
  <Checkbox label="Controlled Indeterminate checkbox" indeterminate />
);

export const ControlledIndeterminateDisabled = () => (
  <Checkbox label="Controlled Indeterminate disabled checkbox" disabled indeterminate />
);
ControlledIndeterminateDisabled.storyName = 'Controlled Indeterminate disabled';

export const UncontrolledIndeterminate = () => (
  <Checkbox label="Uncontrolled Indeterminate checkbox" defaultIndeterminate />
);

export const UncontrolledIndeterminateDisabled = () => (
  <Checkbox label="Uncontrolled Indeterminate disabled checkbox" disabled defaultIndeterminate />
);
UncontrolledIndeterminateDisabled.storyName = 'Uncontrolled Indeterminate disabled';

export const End = () => <Checkbox label="Checkbox end" boxSide="end" />;

export const EndRTL = getStoryVariant(End, RTL);

export const MultiLineCheckbox = () => (
  <Checkbox
    // eslint-disable-next-line @fluentui/max-len
    label="Dignissim vehicula pretium. Mauris sapien lorem. Ipsum metus tristique. Aliquam mauris ac purus id nunc. Erat aenean ut commodo integer litora amet rutrum mus maecenas quisque lectus eget fames massa. Pede proin metus sollicitudin donec purus. Sem at tempus morbi metus sit. Quam odio porta. Cras nulla sed. Aliquam mauris auctor. Adipiscing magna rutrum est sed porttitor. Duis rhoncus convallis. Nunc qui amet. Quo eros ac. Nec laboris pharetra erat nec hymenaeos phasellus urna neque rerum ut ac. In natoque morbi. Risus wisi maecenas eros magna pellentesque inceptos mi nec mattis lacus tortor volutpat lorem vivamus. Magna amet nam non in non. Semper sagittis purus et tincidunt justo. Magna fusce enim amet nulla neque. A vestibulum risus wisi temporibus consectetuer. Non sociis sed risus sagittis condimentum. Erat vel interdum quas libero erat elementum massa duis elementum malesuada lacinia. Scelerisque vivamus elit. Bibendum libero adipiscing. Curae quis lacus. At metus vestibulum. Diam natoque nullam posuere vestibulum aliquam suscipit quis posuere sed penatibus sit sed sapien eros con sodales hymenaeos. Nulla vestibulum ut. Aenean curabitur diam lorem commodo malesuada dui nascetur pulvinar."
    defaultChecked={true}
  />
);
MultiLineCheckbox.storyName = 'Multi-line Checkbox';

export const CustomRenderCheckbox = () => (
  <Checkbox
    label="Persona Checkbox"
    onRenderLabel={props => {
      return <Persona text={props!.label} size={PersonaSize.size32} />;
    }}
  />
);
CustomRenderCheckbox.storyName = 'Custom render Checkbox';
