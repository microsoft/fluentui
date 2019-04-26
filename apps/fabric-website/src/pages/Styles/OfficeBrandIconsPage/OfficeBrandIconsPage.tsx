import * as React from 'react';
import { IconGrid } from '../../../components/IconGrid/IconGrid';
import { Markdown, IPageSectionProps } from '@uifabric/example-app-base/lib/index2';
import { IStylesPageProps, StylesAreaPage } from '../StylesAreaPage';
import { OfficeBrandIconsPageProps } from './OfficeBrandIconsPage.doc';
import * as styles from './OfficeBrandIconsPage.module.scss';
import { Platforms } from '../../../interfaces/Platforms';

const baseUrl =
  'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/apps/fabric-website/src/pages/Styles/OfficeBrandIconsPage/docs';

const productIcons = require('../../../data/brand-icons-products.json');
const documentIcons = require('../../../data/brand-icons-documents.json');
const monochromeIcons = require('../../../data/brand-icons-monochrome.json');

export const OfficeBrandIconsPage: React.StatelessComponent<IStylesPageProps> = props => {
  const { platform } = props;
  return <StylesAreaPage {...props} {...OfficeBrandIconsPageProps[platform]} otherSections={_otherSections(platform)} />;
};

function _otherSections(platform: Platforms): IPageSectionProps<Platforms>[] {
  switch (platform) {
    case 'web':
      return [
        {
          sectionName: 'Overview',
          editUrl: `${baseUrl}/web/OfficeBrandIconsOverview.md`,
          content: (
            <>
              <Markdown>
                {
                  require('!raw-loader!@uifabric/fabric-website/src/pages/Styles/OfficeBrandIconsPage/docs/web/OfficeBrandIconsOverview.md') as string
                }
              </Markdown>
              <h3>Product icons</h3>
              <div className="ms-Grid">
                <div className="ms-Grid-row">
                  <div className="ms-Grid-col ms-sm12 ms-lg6">
                    <p>
                      Use product icons to help your users transition between Microsoft products. Product icons represent an app or brand.
                      Do not use a product icon to create a new document of that type. For example, do not create a Word document from a
                      Word product icon.
                    </p>
                  </div>
                  <div className="ms-Grid-col ms-sm12 ms-lg6">
                    <ul className={styles.exampleIcons}>
                      <li>
                        <img
                          src="https://static2.sharepointonline.com/files/fabric/assets/brand-icons/product/svg/word_48x1.svg"
                          width="100"
                          height="100"
                          alt="Word logo"
                        />
                      </li>
                      <li>
                        <img
                          src="https://static2.sharepointonline.com/files/fabric/assets/brand-icons/product/svg/excel_48x1.svg"
                          width="100"
                          height="100"
                          alt="Excel logo"
                        />
                      </li>
                      <li>
                        <img
                          src="https://static2.sharepointonline.com/files/fabric/assets/brand-icons/product/svg/powerpoint_48x1.svg"
                          width="100"
                          height="100"
                          alt="PowerPoint logo"
                        />
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <h3>Document icons</h3>
              <div className="ms-Grid">
                <div className="ms-Grid-row">
                  <div className="ms-Grid-col ms-sm12 ms-lg6">
                    <p>
                      Use document icons to indicate to users that they are creating a new document of that type. Make sure that a document
                      of the type that the icon represents loads when the user selects the icon. Document icons should always represent
                      Microsoft Office documents. For example, do not use a Word .docx icon to open a .txt file.
                    </p>
                  </div>
                  <div className="ms-Grid-col ms-sm12 ms-lg6">
                    <ul className={styles.exampleIcons}>
                      <li>
                        <img
                          src="https://static2.sharepointonline.com/files/fabric/assets/brand-icons/document/svg/docx_48x1.svg"
                          width="100"
                          height="100"
                          alt="Docx documents SVG"
                        />
                      </li>
                      <li>
                        <img
                          src="https://static2.sharepointonline.com/files/fabric/assets/brand-icons/document/svg/xlsx_48x1.svg"
                          width="100"
                          height="100"
                          alt="Xlsx documents logo"
                        />
                      </li>
                      <li>
                        <img
                          src="https://static2.sharepointonline.com/files/fabric/assets/brand-icons/document/svg/pptx_48x1.svg"
                          width="100"
                          height="100"
                          alt="PPTX documents logo"
                        />
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </>
          )
        },
        {
          sectionName: 'Format and sizes',
          editUrl: `${baseUrl}/web/OfficeBrandIconsFormat.md`,
          content: (
            <div className="ms-Grid">
              <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm12 ms-lg6">
                  <Markdown>
                    {
                      require('!raw-loader!@uifabric/fabric-website/src/pages/Styles/OfficeBrandIconsPage/docs/web/OfficeBrandIconsFormat.md') as string
                    }
                  </Markdown>
                </div>
                <div className="ms-Grid-col ms-sm12 ms-lg6">
                  <ul className={styles.exampleIcons}>
                    <li>
                      <img
                        src="https://static2.sharepointonline.com/files/fabric/assets/brand-icons/product/png/outlook_16x1.png"
                        width="16"
                        height="16"
                        alt="Outlook 16x1 PNG product icon"
                      />
                      <span>16px (SVG, PNG)</span>
                    </li>
                    <li>
                      <img
                        src="https://static2.sharepointonline.com/files/fabric/assets/brand-icons/product/png/outlook_32x1.png"
                        width="32"
                        height="32"
                        alt="Outlook 32x1 PNG product icon"
                      />
                      <span>32px (PNG)</span>
                    </li>
                    <li>
                      <img
                        src="https://static2.sharepointonline.com/files/fabric/assets/brand-icons/product/png/outlook_48x1.png"
                        width="48"
                        height="48"
                        alt="Outlook 48x1 PNG product icon"
                      />
                      <span>48px (SVG, PNG)</span>
                    </li>
                    <li>
                      <img
                        src="https://static2.sharepointonline.com/files/fabric/assets/brand-icons/product/png/outlook_96x1.png"
                        width="96"
                        height="96"
                        alt="Outlook 96x1 PNG product icon"
                      />
                      <span>96px (PNG)</span>
                    </li>
                  </ul>
                  <ul className={styles.exampleIcons}>
                    <li>
                      <i className="ms-Icon ms-Icon--OutlookLogo ms-fontColor-neutralSecondary" style={{ fontSize: '64px' }} />
                      <span>Icon font</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )
        },
        {
          sectionName: 'Resolutions',
          editUrl: `${baseUrl}/web/OfficeBrandIconsResolutions.md`,
          content: (
            <Markdown>
              {
                require('!raw-loader!@uifabric/fabric-website/src/pages/Styles/OfficeBrandIconsPage/docs/web/OfficeBrandIconsResolutions.md') as string
              }
            </Markdown>
          )
        },
        {
          sectionName: 'Implementation',
          editUrl: `${baseUrl}/web/OfficeBrandIconsImplementation.md`,
          content: (
            <Markdown>
              {
                require('!raw-loader!@uifabric/fabric-website/src/pages/Styles/OfficeBrandIconsPage/docs/web/OfficeBrandIconsImplementation.md') as string
              }
            </Markdown>
          )
        },

        {
          sectionName: 'Branded icon library',
          content: (
            <>
              <h3>Product icons</h3>
              <ul className={styles.iconList}>
                {productIcons.map((icon, iconIndex) => (
                  <li key={iconIndex}>
                    <img
                      src={`https://static2.sharepointonline.com/files/fabric/assets/brand-icons/product/svg/${icon.name}_48x1.svg`}
                      alt={icon.name + 'Brand icon'}
                    />
                    <span>{icon.name}</span>
                  </li>
                ))}
              </ul>

              <h3>Document icons</h3>
              <ul className={styles.iconList}>
                {documentIcons.map((icon, iconIndex) => (
                  <li key={iconIndex}>
                    {/* @todo: Change this back to using SVGs once the CDN has been updated to include the "xsn" icons (issue 252058) */}
                    <img
                      src={`https://static2.sharepointonline.com/files/fabric/assets/brand-icons/document/svg/${icon.name}_48x1.svg`}
                      alt={icon.name + ' Document Icon'}
                    />
                    <span>{icon.name}</span>
                  </li>
                ))}
              </ul>

              <h3>Single-color icons</h3>
              <Markdown>
                {
                  require('!raw-loader!@uifabric/fabric-website/src/pages/Styles/OfficeBrandIconsPage/docs/web/OfficeBrandIconsSingleColor.md') as string
                }
              </Markdown>
              <IconGrid icons={monochromeIcons} />
            </>
          )
        }
      ];

    default:
      return [
        {
          sectionName: 'Coming Soon',
          content: 'Coming Soon'
        }
      ];
  }
}
