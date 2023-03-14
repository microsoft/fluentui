import * as React from 'react';
import { IPageSectionProps, Markdown } from '@fluentui/react-docsite-components/lib/index2';
import { Platforms } from '../../../interfaces/Platforms';

/**
 * Get the implementation section for a colors page, including a version of ColorsImplementation.md
 * customized for the page's color group.
 * @param baseUrl Base URL for editing files
 * @param jsColorGroup Name of the color group exported from FluentColors, such as "CommunicationColors"
 * @param jsColorName Name of JS variable for the example color, such as "primary"
 * @param scssColorName Full name of the example color as used in SCSS, such as "communicationPrimary"
 */
export function getColorsImplementation(
  baseUrl: string,
  jsColorGroup: string,
  jsColorName: string,
  scssColorName: string,
): IPageSectionProps<Platforms> {
  const colorsMarkdown =
    require<string>('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Styles/Colors/docs/web/ColorsImplementation.md')
      .replace(/CommunicationColors\.primary/g, `${jsColorGroup}.${jsColorName}`)
      .replace(/CommunicationColors/g, jsColorGroup)
      .replace(/communicationPrimary/g, scssColorName);

  return {
    sectionName: 'Implementation',
    editUrl: `${baseUrl}/web/ColorsImplementation.md`,
    content: <Markdown>{colorsMarkdown}</Markdown>,
  };
}
