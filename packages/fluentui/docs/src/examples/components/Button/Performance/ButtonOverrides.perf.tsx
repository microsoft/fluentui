import * as React from 'react';
import { Button, Provider, mergeThemes, teamsTheme } from '@fluentui/react-northstar';

const overrides = mergeThemes(teamsTheme, {
  componentStyles: {
    Button: {
      root: ({ variables: v }) => ({
        ...(v.isFoo && {
          border: '1px solid red',
          display: 'flex',
          padding: '10px',
          margin: '10px',
          position: 'initial',
        }),
      }),
    },
  },
});

const ButtonOverridesPerf = () => (
  <Provider overwrite performance={{ enableBooleanVariablesCaching: true }} theme={overrides}>
    <Button content="Click here" variables={{ isFoo: true }} /> {/* 1 */}
    <Button content="Click here" variables={{ isFoo: true }} /> {/* 2 */}
    <Button content="Click here" variables={{ isFoo: true }} /> {/* 3 */}
    <Button content="Click here" variables={{ isFoo: true }} /> {/* 4 */}
    <Button content="Click here" variables={{ isFoo: true }} /> {/* 5 */}
    <Button content="Click here" variables={{ isFoo: true }} /> {/* 6 */}
    <Button content="Click here" variables={{ isFoo: true }} /> {/* 7 */}
    <Button content="Click here" variables={{ isFoo: true }} /> {/* 8 */}
    <Button content="Click here" variables={{ isFoo: true }} /> {/* 9 */}
    <Button content="Click here" variables={{ isFoo: true }} /> {/* 10 */}
    <Button content="Click here" variables={{ isFoo: true }} /> {/* 11 */}
    <Button content="Click here" variables={{ isFoo: true }} /> {/* 12 */}
    <Button content="Click here" variables={{ isFoo: true }} /> {/* 13 */}
    <Button content="Click here" variables={{ isFoo: true }} /> {/* 14 */}
    <Button content="Click here" variables={{ isFoo: true }} /> {/* 15 */}
    {/* ---- */}
    <Button content="Click here" variables={{ isFoo: true }} /> {/* 1 */}
    <Button content="Click here" variables={{ isFoo: true }} /> {/* 2 */}
    <Button content="Click here" variables={{ isFoo: true }} /> {/* 3 */}
    <Button content="Click here" variables={{ isFoo: true }} /> {/* 4 */}
    <Button content="Click here" variables={{ isFoo: true }} /> {/* 5 */}
    <Button content="Click here" variables={{ isFoo: true }} /> {/* 6 */}
    <Button content="Click here" variables={{ isFoo: true }} /> {/* 7 */}
    <Button content="Click here" variables={{ isFoo: true }} /> {/* 8 */}
    <Button content="Click here" variables={{ isFoo: true }} /> {/* 9 */}
    <Button content="Click here" variables={{ isFoo: true }} /> {/* 10 */}
    <Button content="Click here" variables={{ isFoo: true }} /> {/* 11 */}
    <Button content="Click here" variables={{ isFoo: true }} /> {/* 12 */}
    <Button content="Click here" variables={{ isFoo: true }} /> {/* 13 */}
    <Button content="Click here" variables={{ isFoo: true }} /> {/* 14 */}
    <Button content="Click here" variables={{ isFoo: true }} /> {/* 15 */}
    {/* ---- */}
    <Button content="Click here" variables={{ isFoo: true }} /> {/* 1 */}
    <Button content="Click here" variables={{ isFoo: true }} /> {/* 2 */}
    <Button content="Click here" variables={{ isFoo: true }} /> {/* 3 */}
    <Button content="Click here" variables={{ isFoo: true }} /> {/* 4 */}
    <Button content="Click here" variables={{ isFoo: true }} /> {/* 5 */}
    <Button content="Click here" variables={{ isFoo: true }} /> {/* 6 */}
    <Button content="Click here" variables={{ isFoo: true }} /> {/* 7 */}
    <Button content="Click here" variables={{ isFoo: true }} /> {/* 8 */}
    <Button content="Click here" variables={{ isFoo: true }} /> {/* 9 */}
    <Button content="Click here" variables={{ isFoo: true }} /> {/* 10 */}
    <Button content="Click here" variables={{ isFoo: true }} /> {/* 11 */}
    <Button content="Click here" variables={{ isFoo: true }} /> {/* 12 */}
    <Button content="Click here" variables={{ isFoo: true }} /> {/* 13 */}
    <Button content="Click here" variables={{ isFoo: true }} /> {/* 14 */}
    <Button content="Click here" variables={{ isFoo: true }} /> {/* 15 */}
  </Provider>
);

export default ButtonOverridesPerf;
