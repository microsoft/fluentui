import { html } from '@microsoft/fast-element';
import type { Args, Meta } from '@storybook/html';
import { renderComponent } from '../../helpers.stories.js';
import type { BaseAvatar as KumoAvatar } from '../../avatar/avatar.js';
import { AvatarActive, AvatarColor, AvatarSize } from '../../avatar/avatar.options.js';

type AvatarStoryArgs = Args & KumoAvatar;
type AvatarStoryMeta = Meta<AvatarStoryArgs>;

const storyTemplate = html<AvatarStoryArgs>`
  <kumo-avatar
    appearance="${x => x.appearance}"
    active="${x => x.active}"
    color="${x => x.color}"
    shape="${x => x.shape}"
    size="${x => x.size}"
    initials="${x => x.initials}"
    name="${x => x.name}"
  ></kumo-avatar>
`;

export default {
  title: 'Components/Kumo/Avatar',
  argTypes: {
    active: {
      options: Object.values(AvatarActive),
      control: {
        type: 'select',
      },
    },
    color: {
      options: Object.values(AvatarColor),
      control: {
        type: 'select',
      },
    },
    initials: {
      control: 'text',
    },
    name: {
      control: 'text',
    },
    size: {
      options: Object.values(AvatarSize),
      control: {
        type: 'select',
      },
    },
  },
} as AvatarStoryMeta;

export const Avatar = renderComponent(storyTemplate).bind({});

export const Image = renderComponent(html<AvatarStoryArgs>`<kumo-avatar>
  <img
    alt="Persona test"
    role="presentation"
    aria-hidden="true"
    src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/KatriAthokas.jpg"
  />
</kumo-avatar>`);

export const Icon = renderComponent(html<AvatarStoryArgs>`
  <kumo-avatar
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
  ></kumo-avatar>
`);

export const Badge = renderComponent(html<AvatarStoryArgs>` <kumo-avatar name="Lydia Bauer"
  ><fluent-badge slot="badge" size="extra-small"></fluent-badge
></kumo-avatar>`);

export const ColorBrand = renderComponent(html<AvatarStoryArgs>`<kumo-avatar color="brand"></kumo-avatar>`);

export const Color = renderComponent(html<AvatarStoryArgs>`
  <div style="display: flex; gap: 8px; flex-wrap: wrap;">
    <kumo-avatar color="neutral" name="Neutral avatar"></kumo-avatar>
    <kumo-avatar color="brand" name="Brand avatar"></kumo-avatar>
    <kumo-avatar color="dark-red" name="dark-red avatar"></kumo-avatar>
    <kumo-avatar color="cranberry" name="cranberry avatar"></kumo-avatar>
    <kumo-avatar color="red" name="red avatar"></kumo-avatar>
    <kumo-avatar color="pumpkin" name="pumpkin avatar"></kumo-avatar>
    <kumo-avatar color="peach" name="peach avatar"></kumo-avatar>
    <kumo-avatar color="marigold" name="marigold avatar"></kumo-avatar>
    <kumo-avatar color="gold" name="gold avatar"></kumo-avatar>
    <kumo-avatar color="brass" name="brass avatar"></kumo-avatar>
    <kumo-avatar color="brown" name="brown avatar"></kumo-avatar>
    <kumo-avatar color="forest" name="forest avatar"></kumo-avatar>
    <kumo-avatar color="seafoam" name="seafoam avatar"></kumo-avatar>
    <kumo-avatar color="dark-green" name="dark-green avatar"></kumo-avatar>
    <kumo-avatar color="light-teal" name="light-teal avatar"></kumo-avatar>
    <kumo-avatar color="teal" name="teal avatar"></kumo-avatar>
    <kumo-avatar color="steel" name="steel avatar"></kumo-avatar>
    <kumo-avatar color="blue" name="blue avatar"></kumo-avatar>
    <kumo-avatar color="royal-blue" name="royal-blue avatar"></kumo-avatar>
    <kumo-avatar color="cornflower" name="cornflower avatar"></kumo-avatar>
    <kumo-avatar color="navy" name="navy avatar"></kumo-avatar>
    <kumo-avatar color="lavender" name="lavender avatar"></kumo-avatar>
    <kumo-avatar color="purple" name="purple avatar"></kumo-avatar>
    <kumo-avatar color="grape" name="grape avatar"></kumo-avatar>
    <kumo-avatar color="lilac" name="lilac avatar"></kumo-avatar>
    <kumo-avatar color="pink" name="pink avatar"></kumo-avatar>
    <kumo-avatar color="magenta" name="magenta avatar"></kumo-avatar>
    <kumo-avatar color="plum" name="plum avatar"></kumo-avatar>
    <kumo-avatar color="beige" name="beige avatar"></kumo-avatar>
    <kumo-avatar color="mink" name="mink avatar"></kumo-avatar>
    <kumo-avatar color="platinum" name="platinum avatar"></kumo-avatar>
    <kumo-avatar color="anchor" name="anchor avatar"></kumo-avatar>
  </div>
`);

export const Colorful = renderComponent(html<AvatarStoryArgs>`
  <div style="display: flex; gap: 8px; flex-wrap: wrap;">
    <kumo-avatar color="colorful" name="Mona Kane"></kumo-avatar>
    <kumo-avatar color="colorful" name="Tim Deboer"></kumo-avatar>
    <kumo-avatar color="colorful" name="Kevin Sturgis"></kumo-avatar>
    <kumo-avatar color="colorful" color-id="pumpkin" name="pumpkin avatar"></kumo-avatar>
    <kumo-avatar color="colorful" color-id="lilac" name="lilac avatar"></kumo-avatar>
    <kumo-avatar color="colorful" color-id="pink" name="pink avatar"></kumo-avatar>
    <kumo-avatar color="colorful" color-id="magenta" name="magenta avatar"></kumo-avatar>
    <kumo-avatar color="colorful" color-id="plum" name="plum avatar"></kumo-avatar>
    <kumo-avatar color="colorful" color-id="beige" name="beige avatar"></kumo-avatar>
    <kumo-avatar color="colorful" color-id="mink" name="mink avatar"></kumo-avatar>
    <kumo-avatar color="colorful" color-id="platinum" name="platinum avatar"></kumo-avatar>
    <kumo-avatar color="colorful" color-id="anchor" name="anchor avatar"></kumo-avatar>
  </div>
`);

export const Active = renderComponent(html<AvatarStoryArgs>`
  <div style="display: flex; gap: 24px; flex-wrap: wrap;">
    <kumo-avatar>U</kumo-avatar>
    <kumo-avatar active="active">A</kumo-avatar>
    <kumo-avatar active="inactive">I</kumo-avatar>
    <div></div>
  </div>
`);

export const CustomInitials = renderComponent(html<AvatarStoryArgs>` <fluent-avatar initials="CRF"></fluent-avatar> `);

export const Size = renderComponent(html<AvatarStoryArgs>`
  <div style="display: flex; gap: 24px; flex-wrap: wrap;">
    <kumo-avatar name="Jane Doe" size="16">16</kumo-avatar>
    <kumo-avatar name="Lydia Bauer" size="20">20</kumo-avatar>
    <kumo-avatar name="Amanda Brady" size="24">24</kumo-avatar>
    <kumo-avatar name="Henry Brill" size="28">28</kumo-avatar>
    <kumo-avatar name="Robin Counts" size="32">32</kumo-avatar>
    <kumo-avatar name="Tim Deboer" size="36">36</kumo-avatar>
    <kumo-avatar name="Cameron Evans" size="40">40</kumo-avatar>
    <kumo-avatar name="Mona Kane" size="48">48</kumo-avatar>
    <kumo-avatar name="Allan Munger" size="56">56</kumo-avatar>
    <kumo-avatar name="Erik Nason" size="64">64</kumo-avatar>
    <kumo-avatar name="Daisy Phillips" size="72">72</kumo-avatar>
    <kumo-avatar name="Kevin Sturgis" size="96">96</kumo-avatar>
    <kumo-avatar name="Elliot Woodward" size="120">120</kumo-avatar>
    <kumo-avatar name="John Doe" size="128">128</kumo-avatar>
  </div>
`);
