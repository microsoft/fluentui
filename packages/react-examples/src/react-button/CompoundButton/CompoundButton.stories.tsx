import * as React from 'react';
import { CompoundButton, CompoundButtonProps } from '@fluentui/react-button';

const CompoundButtonExamples = (props: CompoundButtonProps) => (
  <div>
    <CompoundButton {...props} icon="O" secondaryContent="This is some secondary text">
      Hello, world
    </CompoundButton>
    <CompoundButton {...props} disabled icon="O" secondaryContent="This is some secondary text">
      Hello, world
    </CompoundButton>
    <CompoundButton {...props} primary icon="O" secondaryContent="This is some secondary text">
      Hello, world
    </CompoundButton>
    <CompoundButton {...props} primary disabled icon="O" secondaryContent="This is some secondary text">
      Hello, world
    </CompoundButton>
    <CompoundButton {...props} ghost icon="O" secondaryContent="This is some secondary text">
      Hello, world
    </CompoundButton>
    <CompoundButton {...props} ghost disabled icon="O" secondaryContent="This is some secondary text">
      Hello, world
    </CompoundButton>
    <CompoundButton {...props} transparent icon="O" secondaryContent="This is some secondary text">
      Hello, world
    </CompoundButton>
    <CompoundButton {...props} transparent disabled icon="O" secondaryContent="This is some secondary text">
      Hello, world
    </CompoundButton>
  </div>
);

export const CompoundButtons = () => (
  <div>
    <h3>A CompoundButton comes in default and `primary` flavors.</h3>
    <CompoundButtonExamples />

    <h3>A CompoundButton can be focusable when disabled</h3>
    <div>
      <CompoundButton disabled icon="X" secondaryContent="This is some secondary text">
        Disabled, non-focusable button
      </CompoundButton>
      <CompoundButton disabled disabledFocusable icon="X" secondaryContent="This is some secondary text">
        Disabled, focusable button
      </CompoundButton>
    </div>

    <h3>A CompoundButton can appear round using the `circular` prop.</h3>
    <CompoundButtonExamples circular />

    <h3>A CompoundButton can fill the width of its container using the `block` prop.</h3>
    <CompoundButtonExamples block />

    <h3>A CompoundButton can contain only an icon using the `iconOnly` prop.</h3>
    <CompoundButtonExamples iconOnly />

    <h3>A CompoundButton can be both `circular` and `iconOnly`.</h3>
    <CompoundButtonExamples circular iconOnly />

    <h3>An icon CompoundButton can format its Icon to appear before or after its content.</h3>
    <div>
      <CompoundButtonExamples iconPosition="before" />
      <CompoundButtonExamples iconPosition="after" />
    </div>

    <h3>A CompoundButton can show a loading indicator using the `loading` prop.</h3>
    <CompoundButtonExamples loading />

    <h3>A CompoundButton can be sized.</h3>
    <div>
      <CompoundButtonExamples size="smallest" />
      <CompoundButtonExamples size="smaller" />
      <CompoundButtonExamples size="small" />
      <CompoundButtonExamples size="large" />
      <CompoundButtonExamples size="larger" />
      <CompoundButtonExamples size="largest" />
    </div>
  </div>
);
