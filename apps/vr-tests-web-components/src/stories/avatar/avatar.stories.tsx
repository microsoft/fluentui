import * as React from 'react';
import { default as parse } from 'html-react-parser';
import { Steps, StoryWright } from 'storywright';
import { AvatarDefinition, FluentDesignSystem } from '@fluentui/web-components';
import { DARK_MODE, getStoryVariant, RTL } from '../../utilities/WCThemeDecorator.js';

AvatarDefinition.define(FluentDesignSystem.registry);

export default {
  title: 'Avatar',
  decorators: [
    (story: () => React.ReactElement) => {
      return (
        <StoryWright steps={new Steps().snapshot('normal', { cropTo: '.testWrapper' }).end()}>
          <div className="testWrapper" style={{ width: '300px' }}>
            {story()}
          </div>
        </StoryWright>
      );
    },
  ],
};

export const Default = () =>
  parse(`
  <fluent-avatar></fluent-avatar>
  `);

export const DefaultRTL = getStoryVariant(Default, RTL);

export const Image = () =>
  parse(`<fluent-avatar>
  <img
    alt="Persona test"
    role="presentation"
    aria-hidden="true"
    src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/KatriAthokas.jpg"
  />
</fluent-avatar>`);

export const Icon = () =>
  parse(`
  <fluent-avatar
    ><svg
      fill="currentColor"
      aria-hidden="true"
      width="1em"
      height="1em"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 3a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM7.5 4.5a2.5 2.5 0 115 0 2.5 2.5 0 01-5 0zm8-.5a1 1 0 100 2 1 1 0 000-2zm-2 1a2 2 0 114 0 2 2 0 01-4 0zm-10 0a1 1 0 112 0 1 1 0 01-2 0zm1-2a2 2 0 100 4 2 2 0 000-4zm.6 12H5a2 2 0 01-2-2V9.25c0-.14.11-.25.25-.25h1.76c.04-.37.17-.7.37-1H3.25C2.56 8 2 8.56 2 9.25V13a3 3 0 003.4 2.97 4.96 4.96 0 01-.3-.97zm9.5.97A3 3 0 0018 13V9.25C18 8.56 17.44 8 16.75 8h-2.13c.2.3.33.63.37 1h1.76c.14 0 .25.11.25.25V13a2 2 0 01-2.1 2c-.07.34-.17.66-.3.97zM7.25 8C6.56 8 6 8.56 6 9.25V14a4 4 0 008 0V9.25C14 8.56 13.44 8 12.75 8h-5.5zM7 9.25c0-.14.11-.25.25-.25h5.5c.14 0 .25.11.25.25V14a3 3 0 11-6 0V9.25z"
        fill="currentColor"
      ></path></svg
  ></fluent-avatar>
`);

export const IconDarkMode = getStoryVariant(Icon, DARK_MODE);

export const Color = () =>
  parse(`
  <div style="display: flex; gap: 8px; flex-wrap: wrap;">
    <fluent-avatar color="neutral" name="Neutral avatar"></fluent-avatar>
    <fluent-avatar color="brand" name="Brand avatar"></fluent-avatar>
    <fluent-avatar color="dark-red" name="dark-red avatar"></fluent-avatar>
    <fluent-avatar color="cranberry" name="cranberry avatar"></fluent-avatar>
    <fluent-avatar color="red" name="red avatar"></fluent-avatar>
    <fluent-avatar color="pumpkin" name="pumpkin avatar"></fluent-avatar>
    <fluent-avatar color="peach" name="peach avatar"></fluent-avatar>
    <fluent-avatar color="marigold" name="marigold avatar"></fluent-avatar>
    <fluent-avatar color="gold" name="gold avatar"></fluent-avatar>
    <fluent-avatar color="brass" name="brass avatar"></fluent-avatar>
    <fluent-avatar color="brown" name="brown avatar"></fluent-avatar>
    <fluent-avatar color="forest" name="forest avatar"></fluent-avatar>
    <fluent-avatar color="seafoam" name="seafoam avatar"></fluent-avatar>
    <fluent-avatar color="dark-green" name="dark-green avatar"></fluent-avatar>
    <fluent-avatar color="light-teal" name="light-teal avatar"></fluent-avatar>
    <fluent-avatar color="teal" name="teal avatar"></fluent-avatar>
    <fluent-avatar color="steel" name="steel avatar"></fluent-avatar>
    <fluent-avatar color="blue" name="blue avatar"></fluent-avatar>
    <fluent-avatar color="royal-blue" name="royal-blue avatar"></fluent-avatar>
    <fluent-avatar color="cornflower" name="cornflower avatar"></fluent-avatar>
    <fluent-avatar color="navy" name="navy avatar"></fluent-avatar>
    <fluent-avatar color="lavender" name="lavender avatar"></fluent-avatar>
    <fluent-avatar color="purple" name="purple avatar"></fluent-avatar>
    <fluent-avatar color="grape" name="grape avatar"></fluent-avatar>
    <fluent-avatar color="lilac" name="lilac avatar"></fluent-avatar>
    <fluent-avatar color="pink" name="pink avatar"></fluent-avatar>
    <fluent-avatar color="magenta" name="magenta avatar"></fluent-avatar>
    <fluent-avatar color="plum" name="plum avatar"></fluent-avatar>
    <fluent-avatar color="beige" name="beige avatar"></fluent-avatar>
    <fluent-avatar color="mink" name="mink avatar"></fluent-avatar>
    <fluent-avatar color="platinum" name="platinum avatar"></fluent-avatar>
    <fluent-avatar color="anchor" name="anchor avatar"></fluent-avatar>
  </div>
`);

export const ColorRTL = getStoryVariant(Color, RTL);
export const ColorDarkMode = getStoryVariant(Color, DARK_MODE);

export const Colorful = () =>
  parse(`
  <div style="display: flex; gap: 8px; flex-wrap: wrap;">
    <fluent-avatar color="colorful" name="Mona Kane"></fluent-avatar>
    <fluent-avatar color="colorful" name="Tim Deboer"></fluent-avatar>
    <fluent-avatar color="colorful" name="Kevin Sturgis"></fluent-avatar>
    <fluent-avatar color="colorful" color-id="pumpkin" name="pumpkin avatar"></fluent-avatar>
    <fluent-avatar color="colorful" color-id="lilac" name="lilac avatar"></fluent-avatar>
    <fluent-avatar color="colorful" color-id="pink" name="pink avatar"></fluent-avatar>
    <fluent-avatar color="colorful" color-id="magenta" name="magenta avatar"></fluent-avatar>
    <fluent-avatar color="colorful" color-id="plum" name="plum avatar"></fluent-avatar>
    <fluent-avatar color="colorful" color-id="beige" name="beige avatar"></fluent-avatar>
    <fluent-avatar color="colorful" color-id="mink" name="mink avatar"></fluent-avatar>
    <fluent-avatar color="colorful" color-id="platinum" name="platinum avatar"></fluent-avatar>
    <fluent-avatar color="colorful" color-id="anchor" name="anchor avatar"></fluent-avatar>
  </div>
`);

export const ColorfulRTL = getStoryVariant(Colorful, RTL);
export const ColorfulDarkMode = getStoryVariant(Colorful, DARK_MODE);

export const Shape = () =>
  parse(`
  <fluent-avatar shape="circular"></fluent-avatar>
  <fluent-avatar shape="square"></fluent-avatar>
`);

export const Active = () =>
  parse(`
  <div style="display: flex; gap: 24px; flex-wrap: wrap; padding: 24px">
    <fluent-avatar>U</fluent-avatar>
    <fluent-avatar active="active">A</fluent-avatar>
    <fluent-avatar active="inactive">I</fluent-avatar>
    <div></div>
  </div>
`);

export const ActiveDarkMode = getStoryVariant(Active, DARK_MODE);

export const ActiveAppearance = () =>
  parse(`
  <div style="display: flex; gap: 24px; flex-wrap: wrap; padding: 24px">
    <fluent-avatar active="active" appearance="ring">R</fluent-avatar>
    <fluent-avatar active="active" appearance="shadow">S</fluent-avatar>
    <fluent-avatar active="active" appearance="ring-shadow">RS</fluent-avatar>
  </div>
`);

export const ActiveAppearanceDarkMode = getStoryVariant(ActiveAppearance, DARK_MODE);

export const CustomInitials = () =>
  parse(`
    <fluent-avatar initials="CRF"></fluent-avatar>
`);

export const CustomInitialsRTL = getStoryVariant(CustomInitials, RTL);

export const Size = () =>
  parse(`
  <div style="display: flex; gap: 24px; flex-wrap: wrap;">
    <fluent-avatar name="Jane Doe" size="16">16</fluent-avatar>
    <fluent-avatar name="Lydia Bauer" size="20">20</fluent-avatar>
    <fluent-avatar name="Amanda Brady" size="24">24</fluent-avatar>
    <fluent-avatar name="Henry Brill" size="28">28</fluent-avatar>
    <fluent-avatar name="Robin Counts" size="32">32</fluent-avatar>
    <fluent-avatar name="Tim Deboer" size="36">36</fluent-avatar>
    <fluent-avatar name="Cameron Evans" size="40">40</fluent-avatar>
    <fluent-avatar name="Mona Kane" size="48">48</fluent-avatar>
    <fluent-avatar name="Allan Munger" size="56">56</fluent-avatar>
    <fluent-avatar name="Erik Nason" size="64">64</fluent-avatar>
    <fluent-avatar name="Daisy Phillips" size="72">72</fluent-avatar>
    <fluent-avatar name="Kevin Sturgis" size="96">96</fluent-avatar>
    <fluent-avatar name="Elliot Woodward" size="120">120</fluent-avatar>
    <fluent-avatar name="John Doe" size="128">128</fluent-avatar>
  </div>
`);
