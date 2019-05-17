import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';

// This file is where many of the commonly appearing properties are defined for each page.

// If multiple platforms share the same page title, define the page title as a const.
const title = 'Template Page';

// The location of the remote hosted page folder (GitHub/Azure). Used to generate the edit button for common sections.
const componentUrl =
  'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/apps/fabric-website/src/pages/PageTemplates/TemplatePage';

// If multiple platforms share the same related pages, those pages can be listed in a common 'Related' file.
// NOTE: This points to a Markdown file that does NOT live in a platform folder.
const related = require('!raw-loader!@uifabric/fabric-website/src/pages/PageTemplates/TemplatePage/docs/TemplateRelated.md');

// An object containing the page props for each platform. Remove as needed.
// NOTE: A section won't render if the Markdown file imported here is empty. This is to make it easy to remove sections by just deleting the text instead of removing files and props.
export const TemplatePageProps: TFabricPlatformPageProps = {
  default: {
    // Page title.
    title,

    // The location of the page folder in hosted source code (GitHub/Azure). Used to generate the edit button for common sections.
    componentUrl,

    // Related pages to be listed in the side rail.
    related,

    // Raw import of overview Markdown file.
    overview: require('!raw-loader!@uifabric/fabric-website/src/pages/PageTemplates/TemplatePage/docs/default/TemplateOverview.md') as string,

    // Raw import of best practices Markdown file.
    bestPractices: require('!raw-loader!@uifabric/fabric-website/src/pages/PageTemplates/TemplatePage/docs/default/TemplateBestPractices.md') as string,

    // Raw import of do's Markdown file.
    dos: require('!raw-loader!@uifabric/fabric-website/src/pages/PageTemplates/TemplatePage/docs/default/TemplateDos.md') as string,

    // Raw import of don'ts Markdown file.
    donts: require('!raw-loader!@uifabric/fabric-website/src/pages/PageTemplates/TemplatePage/docs/default/TemplateDonts.md') as string,

    // Raw import of usage guidelines Markdown file.
    usage: require('!raw-loader!@uifabric/fabric-website/src/pages/PageTemplates/TemplatePage/docs/default/TemplateUsage.md') as string,

    // Raw import of design guidelines Markdown file.
    design: require('!raw-loader!@uifabric/fabric-website/src/pages/PageTemplates/TemplatePage/docs/default/TemplateDesign.md') as string,

    // Optional title of the generic Markdown section.
    addlContentTitle: 'Markdown Section',

    // Raw import of the generic Markdown file.
    addlContent: require('!raw-loader!@uifabric/fabric-website/src/pages/PageTemplates/TemplatePage/docs/default/TemplateMarkdown.md') as string,

    // Raw import of the page contact Markdown file.
    contact: require('!raw-loader!@uifabric/fabric-website/src/pages/PageTemplates/TemplatePage/docs/default/TemplateContact.md') as string,

    // Raw import of a types definition file to render the Implementation Section. (Array)
    propertiesTablesSources: [require('!raw-loader!office-ui-fabric-react/src/components/TeachingBubble/TeachingBubble.types.ts') as string]
  }

  // Define the platform specific props as default above, just make sure that the imports point to the correct files and folders.
  // web: {},
  // ios: {},
  // android: {},
};
