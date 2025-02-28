import * as React from 'react';
import { CardPreview, tokens, makeStyles, mergeClasses, FluentProvider } from '@fluentui/react-components';
import type { CardState, FluentProviderCustomStyleHooks } from '@fluentui/react-components';

const useCardPreviewStyle = makeStyles({
  root: {
    backgroundColor: tokens.colorNeutralBackground3,
    padding: '30px',
    margin: 'auto',
  },
});

const useCardPreviewStyles = (state: unknown) => {
  const cardStyles = useCardPreviewStyle();
  const componentState = state as CardState;
  componentState.root.className = mergeClasses(componentState.root.className, cardStyles.root);
};

const CUSTOM_STYLE_HOOKS: FluentProviderCustomStyleHooks = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  useCardPreviewStyles_unstable: useCardPreviewStyles,
};

const resolveAsset = (asset: string) => {
  const ASSET_URL =
    'https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-card/stories/src/assets/';

  return `${ASSET_URL}${asset}`;
};

export const Default = () => (
  <FluentProvider customStyleHooks_unstable={CUSTOM_STYLE_HOOKS}>
    <CardPreview logo={<img src={resolveAsset('docx.png')} alt="Microsoft Word logo" />}>
      <img src={resolveAsset('doc_template.png')} alt="Preview of a Word document " />
    </CardPreview>
  </FluentProvider>
);
