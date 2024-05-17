import * as React from 'react';
import { IconButton, TooltipLinkList, WithTooltip } from '@storybook/components';
import { useParameter } from '@storybook/api';
import { ColorBackground24Filled } from '@fluentui/react-icons';

import { MATERIAL_TYPE_ID } from '../constants';
import { useGlobals, FluentParameters } from '../hooks';
import { MaterialType, MaterialTypeContextValue } from '@fluentui/react-shared-contexts';

export const MaterialTypePicker = () => {
  const [globals, updateGlobals] = useGlobals();
  const semiTransparentParameter: FluentParameters['materialType'] = useParameter('semiTransparent');

  const semiTransparent = semiTransparentParameter ?? globals[MATERIAL_TYPE_ID] ?? MaterialType.Opaque;

  const setValue = React.useCallback(
    (value: MaterialTypeContextValue) => updateGlobals({ [MATERIAL_TYPE_ID]: value }),
    [updateGlobals],
  );

  const renderTooltip = React.useCallback(
    (props: { onHide: () => void }) => {
      return (
        <TooltipLinkList
          links={[
            {
              id: MaterialType.Opaque,
              title: MaterialType.Opaque,
              onClick: () => {
                setValue(MaterialType.Opaque);
                props.onHide();
              },
              active: semiTransparent === MaterialType.Opaque,
            },
            {
              id: MaterialType.SemiTransparent,
              title: MaterialType.SemiTransparent,
              onClick: () => {
                setValue(MaterialType.SemiTransparent);
                props.onHide();
              },
              active: semiTransparent === MaterialType.SemiTransparent,
            },
            {
              id: MaterialType.Translucent,
              title: MaterialType.Translucent,
              onClick: () => {
                setValue(MaterialType.Translucent);
                props.onHide();
              },
              active: semiTransparent === MaterialType.Translucent,
            },
            {
              id: MaterialType.SemiOpaque,
              title: MaterialType.SemiOpaque,
              onClick: () => {
                setValue(MaterialType.SemiOpaque);
                props.onHide();
              },
              active: semiTransparent === MaterialType.SemiOpaque,
            },
          ]}
        />
      );
    },
    [semiTransparent, setValue],
  );

  return (
    <>
      <WithTooltip placement="top" trigger="click" closeOnClick tooltip={renderTooltip}>
        <IconButton
          key={MATERIAL_TYPE_ID}
          title="Change Background transparency"
          active={semiTransparent !== MaterialType.Opaque}
        >
          <ColorBackground24Filled />
        </IconButton>
      </WithTooltip>
    </>
  );
};
