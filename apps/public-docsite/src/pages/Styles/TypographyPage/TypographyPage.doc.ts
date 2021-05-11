import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';

const title = 'Typography';
const componentUrl =
  'https://github.com/microsoft/fluentui/tree/master/apps/public-docsite/src/pages/Styles/TypographyPage';

export const TypographyPageProps: TFabricPlatformPageProps = {
  web: {
    title,
    componentUrl,
  },
};

export const weightUsage = [
  {
    name: 'Regular',
    usage: 'Size 10-24px.',
  },
  {
    name: 'Semibold',
    usage: 'Size 18-32px.',
  },
  {
    name: 'Bold',
    usage: 'Limited usage',
  },
];

export const sizeUsage = [
  {
    size: 68,
    usage:
      'Data visualization and/or large numerics. Use sparingly when specific figures need to stand out. ' +
      'Recommended line height is 76px.',
  },
  {
    size: 42,
    usage:
      'Full-screen hero moments: OneDrive album titles, dates in All Photos view, SharePoint site titles, ' +
      'first run hero moments, greeting moments at the start screen. Recommended line height is 52px.',
  },
  {
    size: 32,
    usage: 'Titles for favorite document cards, Greeting moments. Recommended line height is 40px.',
  },
  {
    size: 28,
    usage: 'Page titles. Recommended line height is 36px.',
  },
  {
    size: 24,
    usage: 'Marketing email header. Recommended line height is 32px.',
  },
  {
    size: 20,
    usage:
      'Page and pane headers, suite nav, titles in teaching bubbles, dialogs and file hover cards. ' +
      'Recommended line height is 28px.',
  },
  {
    size: 18,
    usage: 'Header for Team’s channel names. Recommended line height is 24px.',
  },
  {
    size: 16,
    usage:
      'Subject line in mail, SharePoint article body, marketing emails as file name and body text. ' +
      'Recommended line height is 22px.',
  },
  {
    size: 14,
    usage:
      'Commands and controls (left nav, Teams channels, command bar, checkbox, dropdown menu, toggle, radio button, ' +
      'button text and links), in file or document titles and as body text. Recommended line height is 20px.',
  },
  {
    size: 12,
    usage:
      'Metadata in file lists and grid views, denotes any activity on items (number of views, shares or @mentions, ' +
      'timestamps), sharing permissions, persona names and in tooltips. Recommended line height is 16px.',
  },
  {
    size: 10,
    usage:
      'Limited usage, use in places where text is mandatory and space is tight. For example, it is used for any ' +
      'disclaimer text that may appear in a purchase flow. It’s also used as the initials in a list of SharePoint ' +
      'sites in the left nav. Recommended line height is 14px.',
  },
];
