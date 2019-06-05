import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';

// This file is where many of the commonly appearing properties are defined for each page.

// If multiple platforms share the same page title, define the page title as a const. Add spaces and formatting as required.
const title = 'ThemeSlots';

// The location of the remote hosted page folder (GitHub/Azure). Used to generate the edit button for common sections.
const componentUrl =
  'https://onedrive.visualstudio.com/Design/_git/ui-fabric-website?path=/apps/fabric-website/src/pages/Styles/ThemeSlotsPage';

// If multiple platforms share the same related pages, those pages can be listed in a common 'Related' file.
// NOTE: This points to a Markdown file that does NOT live in a platform folder.
const related = require('!raw-loader!@uifabric/fabric-website/src/pages/Styles/ThemeSlotsPage/docs/ThemeSlotsRelated.md');

// An object containing the page props for each platform. Remove as needed.
// NOTE: A section won't render if the Markdown file imported here is empty. This is to make it easy to remove sections by just deleting the text instead of removing files and props.
export const ThemeSlotsPageProps: TFabricPlatformPageProps = {
  web: {
    // Page title.
    title,

    // The location of the page folder in hosted source code (GitHub/Azure). Used to generate the edit button for common sections.
    componentUrl,

    // Related pages to be listed in the side rail.
    related,

    // Raw import of overview Markdown file.
    overview: require('!raw-loader!@uifabric/fabric-website/src/pages/Styles/ThemeSlotsPage/docs/web/ThemeSlotsOverview.md') as string
  }
};
