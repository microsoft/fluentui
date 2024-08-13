import { SendRegular } from '@fluentui/react-icons';
import descriptionMd from './IconsDescription.md';

export { Default } from './IconsDefault.stories';
export { BundleIcon as bundleIcon } from './IconsBundleIcon.stories';
export { Styling } from './IconsStyling.stories';
export { FontSize } from './IconsFontSize.stories';

export default {
  title: 'Icons/Overview',
  component: SendRegular,
  parameters: {
    docs: {
      description: {
        component: descriptionMd,
      },
    },
    videos: [
      {
        href: 'https://www.youtube.com/watch?v=XSPwgmUZ4Tw',
        preview: './social/fluent-trainings-ep03.webp',
        source: 'youtube',
        title: 'Fluent UI React Trainings: Styling best practices and icons',
      },
    ],
  },
  argTypes: {
    className: {
      control: false,
      description: 'Used to style the icon',
      table: { defaultValue: '' },
      type: { name: 'string' },
    },
    filled: {
      control: false,
      description:
        'Used to determine whether the filled or unfilled version of an icon is the default when `bundleIcon` is used',
      table: { defaultValue: { summary: 'false' } },
      type: { name: 'boolean' },
    },
    primaryFill: {
      control: false,
      description: 'Used to change the primary fill of the icon',
      table: { defaultValue: { summary: 'currentColor' } },
      type: { name: 'string' },
    },
    title: {
      control: false,
      description: 'Specifies the title attribute for the svg',
      table: { defaultValue: '' },
      type: { name: 'string' },
    },
  },
};
