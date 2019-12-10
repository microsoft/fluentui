import * as React from 'react';
import { ButtonDefaultExample } from './examples/Button.Default.Example';
import { ButtonThemedExample } from './examples/Button.Themed.Example';
import { IDocPageProps } from '../../common/DocPage.types';

export interface IButtonDocPageProps {
  areButtonsDisabled: boolean;
  areButtonsChecked: boolean;
}

/**
 * Exports a function because the documentation of this page requires some interactivity that is passed in here as a prop
 * @param props Props that are specific to generating page props for ButtonPage
 */
export const ButtonPageProps = (props: IButtonDocPageProps): IDocPageProps => ({
  title: 'Button',
  componentName: 'ButtonExample',
  componentUrl: 'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/Button',
  examples: [
    {
      title: 'Base Button',
      code: '',
      view: <ButtonDefaultExample />
    },
    {
      title: 'Themed Button',
      code: '',
      view: <ButtonThemedExample />
    }
  ],

  allowNativeProps: true,
  nativePropsElement: ['a', 'button'],
  overview: require<string>('!raw-loader!office-ui-fabric-react/src/components/Button/docs/ButtonOverview.md'),
  dos: require<string>('!raw-loader!office-ui-fabric-react/src/components/Button/docs/ButtonDos.md'),
  donts: require<string>('!raw-loader!office-ui-fabric-react/src/components/Button/docs/ButtonDonts.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true
});
