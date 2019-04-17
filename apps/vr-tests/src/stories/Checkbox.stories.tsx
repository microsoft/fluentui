/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { FabricDecorator } from '../utilities';
import { Checkbox, Persona, PersonaSize } from 'office-ui-fabric-react';

storiesOf('Checkbox', module)
  .addDecorator(FabricDecorator)
  .addDecorator(story =>
    // prettier-ignore
    <Screener
      steps={new Screener.Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </Screener>
  )
  .addStory('Unchecked', () => <Checkbox label="Unchecked checkbox" />, { rtl: true })
  .addStory('Checked', () => <Checkbox label="Checked checkbox" checked />)
  .addStory('Unchecked disabled', () => <Checkbox label="Unchecked disabled checkbox" disabled />)
  .addStory('Checked disabled', () => (
    <Checkbox label="Checked disabled checkbox" checked disabled />
  ))
  .addStory('End', () => <Checkbox label="Checkbox end" boxSide="end" />, { rtl: true })
  .addStory('Multi-line Checkbox', () => (
    <Checkbox
      // tslint:disable-next-line:max-line-length
      label="Dignissim vehicula pretium. Mauris sapien lorem. Ipsum metus tristique. Aliquam mauris ac purus id nunc. Erat aenean ut commodo integer litora amet rutrum mus maecenas quisque lectus eget fames massa. Pede proin metus sollicitudin donec purus. Sem at tempus morbi metus sit. Quam odio porta. Cras nulla sed. Aliquam mauris auctor. Adipiscing magna rutrum est sed porttitor. Duis rhoncus convallis. Nunc qui amet. Quo eros ac. Nec laboris pharetra erat nec hymenaeos phasellus urna neque rerum ut ac. In natoque morbi. Risus wisi maecenas eros magna pellentesque inceptos mi nec mattis lacus tortor volutpat lorem vivamus. Magna amet nam non in non. Semper sagittis purus et tincidunt justo. Magna fusce enim amet nulla neque. A vestibulum risus wisi temporibus consectetuer. Non sociis sed risus sagittis condimentum. Erat vel interdum quas libero erat elementum massa duis elementum malesuada lacinia. Scelerisque vivamus elit. Bibendum libero adipiscing. Curae quis lacus. At metus vestibulum. Diam natoque nullam posuere vestibulum aliquam suscipit quis posuere sed penatibus sit sed sapien eros con sodales hymenaeos. Nulla vestibulum ut. Aenean curabitur diam lorem commodo malesuada dui nascetur pulvinar."
      defaultChecked={true}
      onChange={this._onCheckboxChange}
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
