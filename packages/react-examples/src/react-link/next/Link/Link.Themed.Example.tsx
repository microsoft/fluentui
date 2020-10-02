import * as React from 'react';
import { Link, ILinkStyleProps } from '@fluentui/react-link/lib/next';
import { Stack } from '@fluentui/react/lib/Stack';
import { Customizer } from '@uifabric/utilities';

const customStyles = { root: { background: 'lightblue' } };
const themedStyles = (props: ILinkStyleProps) => ({
  root: {
    background: props.theme.palette.greenLight,
  },
});
const scopedSettings = { Link: { styles: customStyles } };

export const LinkThemedExample: React.FunctionComponent = () => {
  return (
    <Stack>
      <Link href="http://dev.microsoft.com/fluentui#/controls/web/link" styles={customStyles}>
        Link styled via styles prop
      </Link>
      <Link href="http://dev.microsoft.com/fluentui#/controls/web/link" styles={themedStyles}>
        Link styled via styles prop with theme value
      </Link>

      <Customizer scopedSettings={scopedSettings}>
        <Link href="http://dev.microsoft.com/fluentui#/controls/web/link">
          Link styled via Customizer's scoped settings
        </Link>
      </Customizer>
    </Stack>
  );
};
