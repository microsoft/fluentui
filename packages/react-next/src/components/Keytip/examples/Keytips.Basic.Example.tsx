import * as React from 'react';
import { keytipMap } from 'office-ui-fabric-react/lib/components/Keytip/examples/KeytipSetup';
import { Checkbox } from '@fluentui/react-next/lib/Checkbox';
import { ComboBox } from '@fluentui/react-next/lib/ComboBox';
import { Dropdown } from '@fluentui/react-next/lib/Dropdown';
import { Link } from '@fluentui/react-next/lib/Link';
import { SpinButton, ISpinButtonStyles } from '@fluentui/react-next/lib/SpinButton';
import { Toggle } from '@fluentui/react-next/lib/Toggle';
import { Pivot, PivotItem } from '@fluentui/react-next/lib/Pivot';
import { IStackTokens, Stack } from '@fluentui/react-next/lib/Stack';
import { useKeytipRef } from '@fluentui/react-next/lib/KeytipData';

const pivotItemStyle: React.CSSProperties = { width: 500, paddingTop: 20 };
const stackTokens: IStackTokens = { childrenGap: 20 };
const spinButtonStyles: Partial<ISpinButtonStyles> = { root: { maxWidth: 200 } };

const sampleOptions = [
  { key: 'A', text: 'Option 1' },
  { key: 'B', text: 'Option 2' },
  { key: 'C', text: 'Option 3' },
];

export const KeytipsBasicExample: React.FunctionComponent = () => {
  const checkboxRef = useKeytipRef<HTMLDivElement>({ keytipProps: keytipMap.CheckboxKeytip });
  const linkRef = useKeytipRef<HTMLAnchorElement>({ keytipProps: keytipMap.LinkKeytip });
  const toggleRef = useKeytipRef<HTMLDivElement>({ keytipProps: keytipMap.ToggleKeytip });

  return (
    <div>
      <p>
        For Pivots, keytips will first show for each of the pivots. After selecting a pivot, the Keytips for its content
        are shown.
      </p>
      <Pivot>
        <PivotItem headerText="Pivot 1" keytipProps={keytipMap.Pivot1Keytip} style={pivotItemStyle}>
          <Stack tokens={stackTokens}>
            <SpinButton label="Spin Button" keytipProps={keytipMap.SpinButtonKeytip} styles={spinButtonStyles} />
            <Toggle ref={toggleRef} onText="Yes" offText="No" />
            <span>
              Go to{' '}
              <Link ref={linkRef} href="http://www.bing.com" target="_blank">
                Bing
              </Link>
            </span>
          </Stack>
        </PivotItem>

        <PivotItem headerText="Pivot 2" keytipProps={keytipMap.Pivot2Keytip} style={pivotItemStyle}>
          <Stack tokens={stackTokens}>
            <Checkbox label="Checkbox" ref={checkboxRef} />
            <Dropdown label="Dropdown" keytipProps={keytipMap.DropdownKeytip} options={sampleOptions} />
          </Stack>
        </PivotItem>

        <PivotItem headerText="Pivot 3" keytipProps={keytipMap.Pivot3Keytip} style={pivotItemStyle}>
          <ComboBox label="Combo Box" keytipProps={keytipMap.ComboBoxKeytip} options={sampleOptions} />
        </PivotItem>
      </Pivot>
    </div>
  );
};
