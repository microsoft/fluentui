import * as React from 'react';
import { Button } from './Button';
import { ButtonProps } from './Button.types';
import * as classes from './Button.stories.scss';

const ButtonVariants = (props: ButtonProps) => (
  <div className={classes.hStack}>
    <Button {...props} content="Hello, world" icon="X" />
    <Button {...props} primary content="Hello, world" icon="X" />
    <Button {...props} disabled content="Hello, world" icon="X" />
    <Button {...props} primary disabled content="Hello, world" icon="X" />
  </div>
);

export const ButtonCss = () => (
  <>
    <h3>A button can appear round using the `circular` prop.</h3>
    <ButtonVariants circular />

    <h3>A button can fill the width of its container using the `fluid` prop.</h3>
    <div className={classes.vStack}>
      <Button fluid content="Hello, world" icon="X" />
      <Button fluid primary content="Hello, world" icon="X" />
      <Button fluid disabled content="Hello, world" icon="X" />
      <Button fluid primary disabled content="Hello, world" icon="X" />
    </div>

    <h3>A button can contain only an icon using the `iconOnly` prop.</h3>
    <ButtonVariants iconOnly />

    <h3>A button can be both `circular` and `iconOnly`.</h3>
    <ButtonVariants circular iconOnly />

    <h3>An icon button can format its Icon to appear before or after its content.</h3>
    <div className={classes.vStack}>
      <ButtonVariants iconPosition="before" />
      <ButtonVariants iconPosition="after" />
    </div>

    {/* <h3>A button can inherit its background and have a subtle appearance using the `inverted` prop.</h3>
    <ButtonVariants inverted /> */}

    <h3>A button can show a loading indicator using the `loading` prop.</h3>
    <ButtonVariants loading />

    <h3>A button can be sized.</h3>
    <div className={classes.vStack}>
      <ButtonVariants size="smallest" />
      <ButtonVariants size="smaller" />
      <ButtonVariants size="small" />
      <ButtonVariants size="large" />
      <ButtonVariants size="larger" />
      <ButtonVariants size="largest" />
    </div>
  </>
);

export const ButtonTokens = () => (
  <>
    <h3>A button can be colored using inline tokens.</h3>
    <div className={classes.vStack}>
      <Button
        icon="O"
        tokens={{
          padding: '3px 10px',
          fontSize: '12px',
          fontWeight: '600',
          borderColor: {
            default: 'rgba(27, 31, 35, 0.2)',
            hovered: 'rgba(27, 31, 35, .5)',
            pressed: 'rgba(27, 31, 35, .5)',
          },
          contentGap: '4px',
          borderRadius: '4px',
          borderWidth: '1px',
          background: {
            default: 'linear-gradient(-180deg,#34d058,#28a745 90%)',
            hovered: 'linear-gradient(-180deg,#34d058,#28a745 90%)',
            pressed: '#279f43',
          },
          contentColor: {
            default: 'white',
            hovered: 'white',
            pressed: 'white',
          },
          transform: {
            pressed: 'none',
          },
        }}
        content="Github: Open issue"
      />
      <Button
        tokens={{
          fontFamily: `"Amazon Ember", Arial, sans-serif`,
          fontSize: '13px',
          fontWeight: '400',
          borderRadius: '3px',
          background: {
            default: 'linear-gradient(to bottom,#f7dfa5,#f0c14b)',
            hovered: 'linear-gradient(to bottom,#f5d78e,#eeb933)',
            pressed: '#f0c14b',
          },
          contentColor: {
            default: 'rgb(17, 17, 17)',
          },
          borderColor: {
            default: 'rgb(168, 135, 52) rgb(156, 126, 49) rgb(132, 106, 41)',
            hovered: '#a88734 #9c7e31 #846a29',
          },
          padding: '0 10px',
        }}
        content="Amazon: Proceed to checkout"
      />

      <Button
        tokens={{
          background: {
            default: 'rgb(229, 9, 20)',
            hovered: 'rgb(255, 50, 61)',
            pressed: 'rgb(229, 9, 20)',
          },
          contentColor: {
            default: 'rgb(255, 255, 255)',
            hovered: 'rgb(255, 255, 255)',
            pressed: 'rgb(255, 255, 255)',
          },
          borderColor: {
            default: 'rgb(255, 255, 255)',
          },
          borderWidth: '0px',
          padding: '7px 17px',
          borderRadius: '3px',
          fontFamily: '"Netflix Sans", "Helvetica Neue", Helvetica, Arial, sans-serif',
          fontSize: '16px',
          fontWeight: '400',
        }}
        content="Netflix: Sign In"
      />
      <Button
        tokens={{
          height: '48px',
          transform: {
            pressed: 'none',
          },
          background: {
            default: 'rgb(29, 185, 84) none repeat scroll 0% 0% / auto padding-box border-box',
            hovered: 'rgb(30, 215, 96) none repeat scroll 0% 0% / auto padding-box border-box',
            pressed: '#1aa34a',
          },
          contentColor: {
            default: 'rgb(255, 255, 255)',
            hovered: 'rgb(255, 255, 255)',
            pressed: 'rgb(255, 255, 255)',
          },
          borderColor: {
            default: 'rgb(255, 255, 255)',
            hovered: 'rgb(255, 255, 255)',
          },
          borderWidth: '0px',
          padding: '17px 48px',
          borderRadius: '500px',
          fontFamily: 'Circular, Helvetica, Arial, sans-serif',
          fontSize: '14px',
          fontWeight: '700',
        }}
        content="Spotify: GET PREMIUM"
      />
      <Button
        tokens={{
          height: '52px',
          background: {
            default: 'rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box',
          },
          contentColor: {
            default: 'rgb(0, 0, 0)',
          },
          borderColor: {
            default: 'rgb(0, 0, 0)',
          },
          borderWidth: '2px',
          padding: '17px 48px',
          borderRadius: '500px',
          fontFamily: 'Circular, Helvetica, Arial, sans-serif',
          fontSize: '14px',
          fontWeight: '700',
        }}
        content="Spotify: LEARN MORE"
      />
    </div>
    <h3>A tokenized button can be customized for any size or padding.</h3>
    <div className={classes.vStack}>
      <ButtonVariants
        tokens={{
          height: '24px',
          fontSize: '12px',
          iconSize: '22px',
          padding: '0 8px',
        }}
      />
      <ButtonVariants
        tokens={{
          height: '70px',
          fontSize: '48px',
          iconSize: '48px',
        }}
      />
    </div>
  </>
);
