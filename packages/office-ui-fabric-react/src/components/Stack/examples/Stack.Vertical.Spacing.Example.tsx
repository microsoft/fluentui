import * as React from 'react';
import { Stack, IStackStyles, IStackTokens } from 'office-ui-fabric-react/lib/Stack';
import { mergeStyles, DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

// Styles definition
const stackStyles: IStackStyles = {
  root: {
    background: DefaultPalette.themeTertiary
  }
};
const stackItemStyles = mergeStyles({
  alignItems: 'center',
  background: DefaultPalette.themePrimary,
  color: DefaultPalette.white,
  display: 'flex',
  height: 50,
  justifyContent: 'center',
  width: 50
});

// Tokens definition
const sectionStackTokens: IStackTokens = { childrenGap: 10 };
const headingStackTokens: IStackTokens = { childrenGap: 50 };
const numericalSpacingStackTokens: IStackTokens = {
  childrenGap: 10,
  padding: 10
};
const customSpacingStackTokens: IStackTokens = {
  childrenGap: '20%',
  padding: 'm 40px'
};
const themedExtraSmallStackTokens: IStackTokens = {
  childrenGap: 's2',
  padding: 's2'
};
const themedSmallStackTokens: IStackTokens = {
  childrenGap: 's1',
  padding: 's1'
};
const themedMediumStackTokens: IStackTokens = {
  childrenGap: 'm',
  padding: 'm'
};
const themedLargeStackTokens: IStackTokens = {
  childrenGap: 'l1',
  padding: 'l1'
};
const themedExtraLargeStackTokens: IStackTokens = {
  childrenGap: 'l2',
  padding: 'l2'
};

export const VerticalStackSpacingExample: React.FunctionComponent = () => {
  return (
    <Stack tokens={sectionStackTokens}>
      <Stack horizontal disableShrink tokens={headingStackTokens}>
        <Stack>
          <span>Numerical spacing</span>
          <Stack styles={stackStyles} tokens={numericalSpacingStackTokens}>
            <span className={stackItemStyles}>1</span>
            <span className={stackItemStyles}>2</span>
            <span className={stackItemStyles}>3</span>
          </Stack>
        </Stack>

        <Stack>
          <span>Custom spacing</span>
          <Stack styles={stackStyles} tokens={customSpacingStackTokens}>
            <span className={stackItemStyles}>1</span>
            <span className={stackItemStyles}>2</span>
            <span className={stackItemStyles}>3</span>
          </Stack>
        </Stack>
      </Stack>

      <Stack horizontal disableShrink horizontalAlign="space-between">
        <Stack>
          <span>Themed spacing (extra small)</span>
          <Stack styles={stackStyles} tokens={themedExtraSmallStackTokens}>
            <span className={stackItemStyles}>1</span>
            <span className={stackItemStyles}>2</span>
            <span className={stackItemStyles}>3</span>
          </Stack>
        </Stack>

        <Stack>
          <span>Themed spacing (small)</span>
          <Stack styles={stackStyles} tokens={themedSmallStackTokens}>
            <span className={stackItemStyles}>1</span>
            <span className={stackItemStyles}>2</span>
            <span className={stackItemStyles}>3</span>
          </Stack>
        </Stack>

        <Stack>
          <span>Themed spacing (medium)</span>
          <Stack styles={stackStyles} tokens={themedMediumStackTokens}>
            <span className={stackItemStyles}>1</span>
            <span className={stackItemStyles}>2</span>
            <span className={stackItemStyles}>3</span>
          </Stack>
        </Stack>

        <Stack>
          <span>Themed spacing (large)</span>
          <Stack styles={stackStyles} tokens={themedLargeStackTokens}>
            <span className={stackItemStyles}>1</span>
            <span className={stackItemStyles}>2</span>
            <span className={stackItemStyles}>3</span>
          </Stack>
        </Stack>

        <Stack>
          <span>Themed spacing (extra large)</span>
          <Stack styles={stackStyles} tokens={themedExtraLargeStackTokens}>
            <span className={stackItemStyles}>1</span>
            <span className={stackItemStyles}>2</span>
            <span className={stackItemStyles}>3</span>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
