import * as React from 'react';
import { css } from '@fluentui/react';
import {
  IPageSectionProps,
  Markdown,
  Table,
  ITableRowProps,
  ITableColumnProps,
  MarkdownCode,
} from '@fluentui/react-docsite-components/lib/index2';
import { IStylesPageProps, StylesAreaPage } from '../StylesAreaPage';
import { TypographyPageProps, sizeUsage, weightUsage } from './TypographyPage.doc';
import * as styles from './TypographyPage.module.scss';
import { Platforms } from '../../../interfaces/Platforms';

const typeSizes = require('office-ui-fabric-core/src/data/type-sizes.json');
const typeWeights = require('office-ui-fabric-core/src/data/type-weights.json');

const baseUrl =
  'https://github.com/microsoft/fluentui/tree/master/apps/public-docsite/src/pages/Styles/TypographyPage/docs';

export const TypographyPage: React.FunctionComponent<IStylesPageProps> = props => {
  const { platform } = props;
  return (
    <StylesAreaPage
      {...props}
      {...TypographyPageProps[platform!]}
      otherSections={_otherSections(platform!) as IPageSectionProps[]}
    />
  );
};

function _otherSections(platform: Platforms): IPageSectionProps<Platforms>[] | undefined {
  switch (platform) {
    case 'web':
      return [
        {
          sectionName: 'Weights',
          editUrl: `${baseUrl}/web/TypographyWeights.md`,
          content: (
            <>
              <Markdown>
                {
                  require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Styles/TypographyPage/docs/web/TypographyWeights.md') as string
                }
              </Markdown>
              {_renderWeightsTable(typeWeights)}
            </>
          ),
        },
        {
          sectionName: 'Sizes',
          editUrl: `${baseUrl}/web/TypographySizes.md`,
          content: (
            <>
              <Markdown>
                {
                  require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Styles/TypographyPage/docs/web/TypographySizes.md') as string
                }
              </Markdown>
              {_renderSizesTable(typeSizes)}
            </>
          ),
        },
        {
          sectionName: 'Implementation',
          editUrl: `${baseUrl}/web/TypographyImplementation.md`,
          content:
            require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Styles/TypographyPage/docs/web/TypographyImplementation.md') as string,
        },
        {
          sectionName: 'Customization',
          editUrl: `${baseUrl}/web/TypographyCustomization.md`,
          content:
            require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Styles/TypographyPage/docs/web/TypographyCustomization.md') as string,
        },
      ];
  }
}

function _renderWeightsTable(weights: ITableRowProps[]) {
  return (
    <Table
      columns={[
        { title: 'Weight', percentWidth: 10 },
        { title: 'Example', data: 'example' },
        { title: 'Usage', percentWidth: 20 },
        { title: 'Core class', percentWidth: 15, overflowX: 'auto' },
        { title: 'React variable', percentWidth: 20, overflowX: 'auto' },
      ]}
      rows={weights}
      formatter={(column, row) => {
        const content = row[column.data!];
        switch (column.title) {
          case 'Weight':
            return `${row.name} (${row.weight})`;
          case 'Core class':
            return <MarkdownCode>ms-fontWeight-{row.name.toLowerCase()}</MarkdownCode>;
          case 'React variable':
            return <MarkdownCode>FontWeights.{row.name.toLowerCase()}</MarkdownCode>;
          case 'Example':
            return (
              <span className={`ms-fontWeight-${row.name.toLowerCase()}`}>
                The quick brown fox jumps over the lazy dog
              </span>
            );
          case 'Usage':
            return weightUsage.filter(x => x.name === row.name)[0].usage;
          default:
            return content;
        }
      }}
    />
  );
}

function _renderSizesTable(sizes: ITableColumnProps[]) {
  return (
    <Table
      columns={[
        { title: 'Size', data: 'size', percentWidth: 10 },
        { title: 'Example', data: 'example', overflowX: 'auto' },
        { title: 'Usage', percentWidth: 20 },
        { title: 'Core class', percentWidth: 15 },
        { title: 'React variable', percentWidth: 20, overflowX: 'auto' },
      ]}
      rows={sizes}
      formatter={(column, row) => {
        const content = row[column.data!];
        switch (column.title) {
          case 'Core class':
            return <MarkdownCode>ms-fontSize-{row.size}</MarkdownCode>;
          case 'React variable':
            return <MarkdownCode>FontSizes.size{row.size}</MarkdownCode>;
          case 'Size':
            return `${row.size}px`;
          case 'Example':
            return (
              <div className={css(styles.example, `ms-fontSize-${row.size}`)}>
                The quick brown fox jumps over the lazy dog
              </div>
            );
          case 'Usage':
            return sizeUsage.filter(x => x.size === row.size)[0].usage;
          default:
            return content;
        }
      }}
    />
  );
}
