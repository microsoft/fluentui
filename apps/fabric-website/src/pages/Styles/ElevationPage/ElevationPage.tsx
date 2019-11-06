import * as React from 'react';
import { css } from 'office-ui-fabric-react';
import { Markdown, Table, IPageSectionProps } from '@uifabric/example-app-base/lib/index2';
import { IStylesPageProps, StylesAreaPage } from '../StylesAreaPage';
import { ElevationPageProps, depthUsage } from './ElevationPage.doc';
import * as styles from './ElevationPage.module.scss';
import { Platforms } from '../../../interfaces/Platforms';

const baseUrl = 'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/apps/fabric-website/src/pages/Styles/ElevationPage/docs';

export const ElevationPage: React.StatelessComponent<IStylesPageProps> = props => {
  const { platform } = props;
  return <StylesAreaPage {...props} {...ElevationPageProps[platform]} otherSections={_otherSections(platform) as IPageSectionProps[]} />;
};

function _otherSections(platform: Platforms): IPageSectionProps<Platforms>[] {
  switch (platform) {
    case 'web':
      return [
        {
          sectionName: 'Depth',
          editUrl: `${baseUrl}/web/ElevationDepth.md`,
          content: (
            <>
              <Markdown>
                {require('!raw-loader!@uifabric/fabric-website/src/pages/Styles/ElevationPage/docs/web/ElevationDepth.md') as string}
              </Markdown>
              <div style={{ marginTop: 12 }}>{_renderDepthsTable()}</div>
            </>
          )
        },
        {
          sectionName: 'Implementation',
          editUrl: `${baseUrl}/web/ElevationImplementation.md`,
          content: (
            <Markdown>
              {require('!raw-loader!@uifabric/fabric-website/src/pages/Styles/ElevationPage/docs/web/ElevationImplementation.md') as string}
            </Markdown>
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

function _renderDepthsTable() {
  return (
    <Table
      columns={[
        {
          title: 'Level',
          rowProperty: 'level',
          percentWidth: 8
        },
        {
          title: 'Example',
          overflow: 'visible'
        },
        {
          title: 'Usage',
          rowProperty: 'usage',
          percentWidth: 25
        },
        {
          title: 'Core class'
        },
        {
          title: 'React variable',
          overflowX: 'auto'
        }
      ]}
      rows={[
        {
          level: '4'
        },
        {
          level: '8'
        },
        {
          level: '16'
        },
        {
          level: '64'
        }
      ]}
      /* tslint:disable-next-line jsx-no-lambda */
      formatter={(column, row) => {
        const depth = depthUsage.filter(x => x.level === row.level)[0];
        switch (column.title) {
          case 'Core class':
            return `ms-depth-${row.level}`;
          case 'React variable':
            return `Depths.depth${row.level}`;
          case 'Usage':
            return (
              <ul className={styles.usageList}>
                {depth.usage.map((use, index) => (
                  <li key={index} className={styles.usageListItem}>
                    {use}
                  </li>
                ))}
              </ul>
            );
          case 'Example':
            return (
              <div className={css(styles.example, styles.compact, `ms-depth-${row.level}`)}>
                <span className={styles.caption}>Depth {row.level}</span>
              </div>
            );
          default:
            return row[column.rowProperty];
        }
      }}
    />
  );
}
