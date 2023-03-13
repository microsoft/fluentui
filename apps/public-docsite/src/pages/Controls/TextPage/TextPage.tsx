import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { TextPageProps } from './TextPage.doc';
import { Platforms } from '../../../interfaces/Platforms';
import { IPageSectionProps, ImplementationSection } from '@fluentui/react-docsite-components/lib/index2';
import { ApiKind } from '@fluentui/react/lib/common/DocPage.types';

/* eslint-disable @fluentui/max-len */

const baseUrl = 'https://github.com/microsoft/fluentui/tree/master/apps/public-docsite/src/pages/Controls/TextPage/';

export const TextPage: React.FunctionComponent<IControlsPageProps> = props => {
  const { platform } = props;
  return (
    <ControlsAreaPage
      {...props}
      title="Text"
      {...TextPageProps[props.platform!]}
      otherSections={_otherSections(platform!) as any}
    />
  );
};

function _otherSections(platform: Platforms): IPageSectionProps<Platforms>[] | undefined {
  switch (platform) {
    case 'ios':
      return [
        {
          sectionName: 'Implementation',
          editUrl: baseUrl + 'docs/ios/TextImplementation.md',
          content:
            require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Controls/TextPage/docs/ios/TextImplementation.md') as string,
        },
      ];

    case 'android':
      return [
        {
          sectionName: 'Implementation',
          editUrl: baseUrl + 'docs/android/TextImplementation.md',
          content:
            require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Controls/TextPage/docs/android/TextImplementation.md') as string,
        },
      ];
    case 'cross':
      return [
        {
          sectionName: 'Implementation',
          editUrl: baseUrl + 'docs/cross/TextImplementation.md',
          content: (
            <ImplementationSection
              jsonDocs={{
                name: '',
                tables: [
                  {
                    kind: 'interface' as ApiKind,
                    name: 'ITextProps',
                    description: '\n',
                    extendsTokens: [],
                    members: [
                      {
                        name: 'color',
                        typeTokens: [
                          {
                            text: 'string',
                          },
                        ],
                        kind: 'property' as 'property',
                        description: 'Foreground color of Text.\n',
                        deprecated: false,
                      },
                      {
                        name: 'disabled',
                        typeTokens: [
                          {
                            text: 'boolean',
                          },
                        ],
                        kind: 'property' as 'property',
                        defaultValue: 'false',
                        description: 'Sets disabled style to the Text.\n',
                        deprecated: false,
                      },
                      {
                        name: 'variant',
                        typeTokens: [
                          {
                            text: 'keyof IVariants | VariantValue',
                          },
                        ],
                        kind: 'property' as 'property',
                        description: 'Optional font style for Text.\n',
                        defaultValue: 'secondaryStandard',
                        deprecated: false,
                      },
                    ],
                  },
                  {
                    kind: 'interface' as ApiKind,
                    name: 'ITextTokens',
                    description: '\n',
                    extendsTokens: [],
                    members: [
                      {
                        name: 'backgroundColor',
                        typeTokens: [
                          {
                            text: 'string',
                          },
                        ],
                        kind: 'property' as 'property',
                        description: 'Background color of Text.\n',
                        deprecated: false,
                      },
                      {
                        name: 'fontFamily',
                        typeTokens: [
                          {
                            text: 'keyOf IFontFamilies | FontFamilyValue',
                          },
                        ],
                        kind: 'property' as 'property',
                        description:
                          'Font family of the Text. E.g. "Arial", "Segoe UI", "San Francisco". Note that certain font families are only available on certain platforms.\n',
                        deprecated: false,
                      },
                      {
                        name: 'fontSize',
                        typeTokens: [
                          {
                            text: 'keyOf IFontSizes | FontSizeValuePoints',
                          },
                        ],
                        kind: 'property' as 'property',
                        description:
                          'Font size of the Text in CSS pixels. Can either use a number, or use a predefined font size from IFontSizes.\n',
                        deprecated: false,
                      },
                      {
                        name: 'fontWeight',
                        typeTokens: [
                          {
                            text: 'keyof IFontWeights | FontWeightValue',
                          },
                        ],
                        kind: 'property' as 'property',
                        description:
                          'Font weight of the Text. Can use a value between "100" and "900", or a predefined font weight from IFontWeights.\n',
                        deprecated: false,
                      },
                      {
                        name: 'variant',
                        typeTokens: [
                          {
                            text: 'keyof IVariants | VariantValue',
                          },
                        ],
                        kind: 'property' as 'property',
                        description: 'Optional font style for Text.\n',
                        deprecated: false,
                      },
                    ],
                  },
                  {
                    kind: 'interface' as ApiKind,
                    name: 'IVariants',
                    description: '\n',
                    extendsTokens: [],
                    members: [
                      {
                        name: 'captionStandard',
                        typeTokens: [
                          {
                            text: 'VariantValue',
                          },
                        ],
                        kind: 'property' as 'property',
                        description: 'Used for caption text.\n',
                        deprecated: false,
                      },
                      {
                        name: 'secondaryStandard',
                        typeTokens: [
                          {
                            text: 'VariantValue',
                          },
                        ],
                        kind: 'property' as 'property',
                        description: 'Used for secondary text or subtext.\n',
                        deprecated: false,
                      },
                      {
                        name: 'secondarySemibold',
                        typeTokens: [
                          {
                            text: 'VariantValue',
                          },
                        ],
                        kind: 'property' as 'property',
                        description: 'Semibold version of secondary text.\n',
                        deprecated: false,
                      },
                      {
                        name: 'bodyStandard',
                        typeTokens: [
                          {
                            text: 'VariantValue',
                          },
                        ],
                        kind: 'property' as 'property',
                        description: 'Used for body text.\n',
                        deprecated: false,
                      },
                      {
                        name: 'bodySemibold',
                        typeTokens: [
                          {
                            text: 'VariantValue',
                          },
                        ],
                        kind: 'property' as 'property',
                        description: 'Semibold version of body text.\n',
                        deprecated: false,
                      },
                      {
                        name: 'subheaderStandard',
                        typeTokens: [
                          {
                            text: 'VariantValue',
                          },
                        ],
                        kind: 'property' as 'property',
                        description: 'Used for subheader text.\n',
                        deprecated: false,
                      },
                      {
                        name: 'subheaderSemibold',
                        typeTokens: [
                          {
                            text: 'VariantValue',
                          },
                        ],
                        kind: 'property' as 'property',
                        description: 'Semibold version of subheader text.\n',
                        deprecated: false,
                      },
                      {
                        name: 'headerStandard',
                        typeTokens: [
                          {
                            text: 'VariantValue',
                          },
                        ],
                        kind: 'property' as 'property',
                        description: 'Used for header text.\n',
                        deprecated: false,
                      },
                      {
                        name: 'headerSemibold',
                        typeTokens: [
                          {
                            text: 'VariantValue',
                          },
                        ],
                        kind: 'property' as 'property',
                        description: 'Semibold version of header text.\n',
                        deprecated: false,
                      },
                      {
                        name: 'heroStandard',
                        typeTokens: [
                          {
                            text: 'VariantValue',
                          },
                        ],
                        kind: 'property' as 'property',
                        description: 'Used for large text.\n',
                        deprecated: false,
                      },
                      {
                        name: 'heroSemibold',
                        typeTokens: [
                          {
                            text: 'VariantValue',
                          },
                        ],
                        kind: 'property' as 'property',
                        description: 'Semibold version of hero text.\n',
                        deprecated: false,
                      },
                      {
                        name: 'heroLargeStandard',
                        typeTokens: [
                          {
                            text: 'VariantValue',
                          },
                        ],
                        kind: 'property' as 'property',
                        description: 'Used for largest text. The largest text in the typeramp.\n',
                        deprecated: false,
                      },
                      {
                        name: 'heroLargeSemibold',
                        typeTokens: [
                          {
                            text: 'VariantValue',
                          },
                        ],
                        kind: 'property' as 'property',
                        description: 'Semibold version of heroLarge text.\n',
                        deprecated: false,
                      },
                    ],
                  },
                  {
                    kind: 'interface' as ApiKind,
                    name: 'IFontSizes',
                    description: '\n',
                    extendsTokens: [],
                    members: [
                      {
                        name: 'caption',
                        typeTokens: [
                          {
                            text: 'FontSizeValuePoints',
                          },
                        ],
                        kind: 'property' as 'property',
                        description: 'Used for caption text.\n',
                        deprecated: false,
                      },
                      {
                        name: 'secondary',
                        typeTokens: [
                          {
                            text: 'FontSizeValuePoints',
                          },
                        ],
                        kind: 'property' as 'property',
                        description: 'Used for secondary text or subtext.\n',
                        deprecated: false,
                      },
                      {
                        name: 'body',
                        typeTokens: [
                          {
                            text: 'FontSizeValuePoints',
                          },
                        ],
                        kind: 'property' as 'property',
                        description: 'Used for body text.\n',
                        deprecated: false,
                      },
                      {
                        name: 'subheader',
                        typeTokens: [
                          {
                            text: 'FontSizeValuePoints',
                          },
                        ],
                        kind: 'property' as 'property',
                        description: 'Used for subheader text.\n',
                        deprecated: false,
                      },
                      {
                        name: 'header',
                        typeTokens: [
                          {
                            text: 'FontSizeValuePoints',
                          },
                        ],
                        kind: 'property' as 'property',
                        description: 'Used for header text.\n',
                        deprecated: false,
                      },
                      {
                        name: 'hero',
                        typeTokens: [
                          {
                            text: 'FontSizeValuePoints',
                          },
                        ],
                        kind: 'property' as 'property',
                        description: 'Used for large text.\n',
                        deprecated: false,
                      },
                      {
                        name: 'heroLarge',
                        typeTokens: [
                          {
                            text: 'FontSizeValuePoints',
                          },
                        ],
                        kind: 'property' as 'property',
                        description: 'Used for largest text. The largest text in the typeramp.\n',
                        deprecated: false,
                      },
                    ],
                  },
                  {
                    kind: 'interface' as ApiKind,
                    name: 'IFontWeights',
                    description: '\n',
                    extendsTokens: [],
                    members: [
                      {
                        name: 'regular',
                        typeTokens: [
                          {
                            text: 'FontWeightValue',
                          },
                        ],
                        kind: 'property' as 'property',
                        description: 'Used for regular text.\n',
                        deprecated: false,
                      },
                      {
                        name: 'semiBold',
                        typeTokens: [
                          {
                            text: 'FontWeightValue',
                          },
                        ],
                        kind: 'property' as 'property',
                        description: 'Used for semiBold text.\n',
                        deprecated: false,
                      },
                    ],
                  },
                  {
                    kind: 'interface' as ApiKind,
                    name: 'IFontWeights',
                    description:
                      'A collection of named font families. They should be used when defining a theme for your app. For more information on theming, see [Theming documentation](https://github.com/microsoft/fluentui-react-native/blob/master/packages/framework/theming-react-native/README.md).\n',
                    extendsTokens: [],
                    members: [
                      {
                        name: 'primary',
                        typeTokens: [
                          {
                            text: 'FontFamilyValue',
                          },
                        ],
                        kind: 'property' as 'property',
                        description: 'Used for primary text in a theme.\n',
                        deprecated: false,
                      },
                      {
                        name: 'secondary',
                        typeTokens: [
                          {
                            text: 'FontFamilyValue',
                          },
                        ],
                        kind: 'property' as 'property',
                        description: 'Used for secondary text in a theme.\n',
                        deprecated: false,
                      },
                      {
                        name: 'cursive',
                        typeTokens: [
                          {
                            text: 'FontFamilyValue',
                          },
                        ],
                        kind: 'property' as 'property',
                        description: 'Used for cursive text in a theme.\n',
                        deprecated: false,
                      },
                      {
                        name: 'monospace',
                        typeTokens: [
                          {
                            text: 'FontFamilyValue',
                          },
                        ],
                        kind: 'property' as 'property',
                        description: 'Used for monospace text in a theme.\n',
                        deprecated: false,
                      },
                      {
                        name: 'sansSerif',
                        typeTokens: [
                          {
                            text: 'FontFamilyValue',
                          },
                        ],
                        kind: 'property' as 'property',
                        description: 'Used for sansSerif text in a theme.\n',
                        deprecated: false,
                      },
                      {
                        name: 'serif',
                        typeTokens: [
                          {
                            text: 'FontFamilyValue',
                          },
                        ],
                        kind: 'property' as 'property',
                        description: 'Used for serif text in a theme.\n',
                        deprecated: false,
                      },
                    ],
                  },
                ],
              }}
            />
          ),
        },
      ];
  }
}
