import * as React from 'react';
import { Image, Link } from '@fluentui/react';
import { Markdown, MarkdownHeader, IPageSectionProps } from '@fluentui/react-docsite-components/lib/index2';
import { IStylesPageProps, StylesAreaPage } from '../StylesAreaPage';
import { OfficeBrandIconsPageProps } from './OfficeBrandIconsPage.doc';
import { Platforms } from '../../../interfaces/Platforms';
import * as styles from './OfficeBrandIconsPage.module.scss';

const baseUrl =
  'https://github.com/microsoft/fluentui/tree/master/apps/public-docsite/src/pages/Styles/OfficeBrandIconsPage/docs';
const fabricCDN = 'https://static2.sharepointonline.com/files/fabric-cdn-prod_20200430.002/assets';

const productIcons = require<
  { icon: string; name: string }[]
  // eslint-disable-next-line import/no-extraneous-dependencies
>('@fluentui/public-docsite/lib/data/brand-icons-products.json');

export const OfficeBrandIconsPage: React.FunctionComponent<IStylesPageProps> = props => {
  const { platform } = props;
  return (
    <StylesAreaPage
      {...props}
      {...OfficeBrandIconsPageProps[platform]}
      otherSections={_otherSections(platform) as IPageSectionProps[]}
    />
  );
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
                  require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Styles/OfficeBrandIconsPage/docs/web/OfficeBrandIconsOverview.md') as string
                }
              </Markdown>
              <MarkdownHeader as="h3">When should I use Office Brand icons?</MarkdownHeader>
              <div className="ms-Grid">
                <div className="ms-Grid-row">
                  <div className="ms-Grid-col ms-sm12 ms-lg6">
                    <p>
                      Use Office brand icons to help your users transition between Microsoft products. Product icons
                      should only be used when the behavior of the command (app icon) is to launch the application. Do
                      not use a product icon to create a new file of that type. For example, do not use the Word app
                      icon for the menu option that allows users create a new Word document.
                    </p>
                    <p>
                      If you're looking for icons for command bars, navigation, status indicators, or similar, check out
                      the{' '}
                      <Link href="#/styles/web/icons" underline>
                        Fluent UI icons page
                      </Link>
                      . Alternatively, if you're looking for file type icons to represent digital content or to indicate
                      to users that they are creating a new file of that type, check out the{' '}
                      <Link href="#/styles/web/file-type-icons" underline>
                        Fluent UI file type icons page
                      </Link>
                      .
                    </p>
                  </div>
                  <div className="ms-Grid-col ms-sm12 ms-lg6">
                    <ul className={styles.exampleIcons}>
                      <li>
                        <Image
                          src={`${fabricCDN}/brand-icons/product/svg/word_48x1.svg`}
                          className={styles.productIcon}
                          alt="Word logo"
                        />
                      </li>
                      <li>
                        <Image
                          src={`${fabricCDN}/brand-icons/product/svg/excel_48x1.svg`}
                          className={styles.productIcon}
                          alt="Excel logo"
                        />
                      </li>
                      <li>
                        <Image
                          src={`${fabricCDN}/brand-icons/product/svg/powerpoint_48x1.svg`}
                          className={styles.productIcon}
                          alt="PowerPoint logo"
                        />
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </>
          ),
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
                      require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Styles/OfficeBrandIconsPage/docs/web/OfficeBrandIconsFormat.md') as string
                    }
                  </Markdown>
                </div>
                <div className="ms-Grid-col ms-sm12 ms-lg6">
                  <ul className={styles.exampleIcons}>
                    <li>
                      <Image
                        src={`${fabricCDN}/brand-icons/product/png/outlook_16x1.png`}
                        width="16"
                        height="16"
                        alt="Outlook 16x1 PNG product icon"
                      />
                      <span>16px</span>
                    </li>
                    <li>
                      <Image
                        src={`${fabricCDN}/brand-icons/product/png/outlook_32x1.png`}
                        width="32"
                        height="32"
                        alt="Outlook 32x1 PNG product icon"
                      />
                      <span>32px</span>
                    </li>
                    <li>
                      <Image
                        src={`${fabricCDN}/brand-icons/product/png/outlook_48x1.png`}
                        width="48"
                        height="48"
                        alt="Outlook 48x1 PNG product icon"
                      />
                      <span>48px</span>
                    </li>
                    <li>
                      <Image
                        src={`${fabricCDN}/brand-icons/product/png/outlook_96x1.png`}
                        width="96"
                        height="96"
                        alt="Outlook 96x1 PNG product icon"
                      />
                      <span>96px</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ),
        },
        {
          sectionName: 'Resolutions',
          editUrl: `${baseUrl}/web/OfficeBrandIconsResolutions.md`,
          content: (
            <Markdown>
              {
                require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Styles/OfficeBrandIconsPage/docs/web/OfficeBrandIconsResolutions.md') as string
              }
            </Markdown>
          ),
        },
        {
          sectionName: 'Implementation',
          editUrl: `${baseUrl}/web/OfficeBrandIconsImplementation.md`,
          content: (
            <Markdown>
              {
                require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Styles/OfficeBrandIconsPage/docs/web/OfficeBrandIconsImplementation.md') as string
              }
            </Markdown>
          ),
        },

        {
          sectionName: 'Branded icon library',
          content: (
            <>
              <ul className={styles.iconList}>
                {productIcons.map((icon, iconIndex) => (
                  <li key={iconIndex}>
                    <Image
                      src={`${fabricCDN}/brand-icons/product/svg/${icon.icon}_48x1.svg`}
                      width="48"
                      height="48"
                      alt={icon.name + ' product icon'}
                      className={styles.icon}
                    />
                    <span className={styles.iconName}>{icon.name}</span>
                  </li>
                ))}
              </ul>
            </>
          ),
        },
      ];

    default:
      return [];
  }
}
