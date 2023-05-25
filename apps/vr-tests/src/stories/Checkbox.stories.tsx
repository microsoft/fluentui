import * as React from 'react';
import { Steps, StoryWright } from 'storywright';
import { storiesOf } from '@storybook/react';
import { TestWrapperDecorator } from '../utilities/index';
import { Checkbox, Persona, PersonaSize } from '@fluentui/react';

storiesOf('Checkbox', module)
  .addDecorator(TestWrapperDecorator)
  .addDecorator(story =>
    // prettier-ignore
    <StoryWright
      steps={new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </StoryWright>,
  )
  .addStory('Unchecked', () => <Checkbox label="Unchecked checkbox" />, { includeRtl: true })
  .addStory('Checked', () => <Checkbox label="Checked checkbox" checked />)
  .addStory('Unchecked disabled', () => <Checkbox label="Unchecked disabled checkbox" disabled />)
  .addStory('Checked disabled', () => (
    <Checkbox label="Checked disabled checkbox" checked disabled />
  ))
  .addStory('Controlled Indeterminate', () => (
    <Checkbox label="Controlled Indeterminate checkbox" indeterminate />
  ))
  .addStory('Controlled Indeterminate disabled', () => (
    <Checkbox label="Controlled Indeterminate disabled checkbox" disabled indeterminate />
  ))
  .addStory('Uncontrolled Indeterminate', () => (
    <Checkbox label="Uncontrolled Indeterminate checkbox" defaultIndeterminate />
  ))
  .addStory('Uncontrolled Indeterminate disabled', () => (
    <Checkbox label="Uncontrolled Indeterminate disabled checkbox" disabled defaultIndeterminate />
  ))
  .addStory('End', () => <Checkbox label="Checkbox end" boxSide="end" />, { includeRtl: true })
  .addStory('Multi-line Checkbox', () => (
    <Checkbox
      // eslint-disable-next-line @fluentui/max-len
      label="Dignissim vehicula pretium. Mauris sapien lorem. Ipsum metus tristique. Aliquam mauris ac purus id nunc. Erat aenean ut commodo integer litora amet rutrum mus maecenas quisque lectus eget fames massa. Pede proin metus sollicitudin donec purus. Sem at tempus morbi metus sit. Quam odio porta. Cras nulla sed. Aliquam mauris auctor. Adipiscing magna rutrum est sed porttitor. Duis rhoncus convallis. Nunc qui amet. Quo eros ac. Nec laboris pharetra erat nec hymenaeos phasellus urna neque rerum ut ac. In natoque morbi. Risus wisi maecenas eros magna pellentesque inceptos mi nec mattis lacus tortor volutpat lorem vivamus. Magna amet nam non in non. Semper sagittis purus et tincidunt justo. Magna fusce enim amet nulla neque. A vestibulum risus wisi temporibus consectetuer. Non sociis sed risus sagittis condimentum. Erat vel interdum quas libero erat elementum massa duis elementum malesuada lacinia. Scelerisque vivamus elit. Bibendum libero adipiscing. Curae quis lacus. At metus vestibulum. Diam natoque nullam posuere vestibulum aliquam suscipit quis posuere sed penatibus sit sed sapien eros con sodales hymenaeos. Nulla vestibulum ut. Aenean curabitur diam lorem commodo malesuada dui nascetur pulvinar."
      defaultChecked={true}
    />
  ))
  .addStory('Custom render Checkbox', () => (
    <Checkbox
      label="Persona Checkbox"
      onRenderLabel={props => {
        return <Persona text={props!.label} size={PersonaSize.size32} />;
      }}
    />
  ));

storiesOf('Checkbox Indeterminate', module)
  .addDecorator(TestWrapperDecorator)
  .addDecorator(story =>
    // prettier-ignore
    <StoryWright
      steps={new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('.ms-Checkbox')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .click('.ms-Checkbox')
        .snapshot('clicked', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </StoryWright>,
  )
  .addStory('Uncontrolled Indeterminate checkbox', () => (
    <Checkbox label="Uncontrolled Indeterminate checkbox" defaultIndeterminate />
  ))
  .addStory('Uncontrolled Indeterminate defaultChecked checkbox', () => (
    <Checkbox
      label="Uncontrolled Indeterminate defaultChecked checkbox"
      defaultIndeterminate
      defaultChecked
    />
  ))
  .addStory('Controlled Indeterminate checkbox without onChange callback', () => (
    <Checkbox
      label="Controlled Indeterminate checkbox without onChange callback"
      indeterminate={true}
    />
  ))
  .addStory('Uncontrolled and Controlled Indeterminate checkbox', () => (
    <Checkbox
      label="Uncontrolled and Controlled Indeterminate checkbox"
      defaultIndeterminate
      indeterminate={true}
    />
  ));
