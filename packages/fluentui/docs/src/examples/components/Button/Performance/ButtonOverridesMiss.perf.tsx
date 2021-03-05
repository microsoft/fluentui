import * as React from 'react';
import { Button, Provider, mergeThemes, teamsTheme } from '@fluentui/react-northstar';

const overrides = mergeThemes(teamsTheme, {
  componentStyles: {
    Button: {
      root: ({ variables: v }) => ({
        ...(v.isFoo1 && {
          border: '1px solid black',
          display: 'flex',
          padding: '10px',
          margin: '10px',
          position: 'initial',
        }),
        ...(v.isFoo2 && {
          border: '1px solid white',
          display: 'flex',
          padding: '10px',
          margin: '10px',
          position: 'initial',
        }),
        ...(v.isFoo3 && {
          border: '1px solid red',
          display: 'flex',
          padding: '10px',
          margin: '10px',
          position: 'initial',
        }),
        ...(v.isFoo4 && {
          border: '1px solid green',
          display: 'flex',
          padding: '10px',
          margin: '10px',
          position: 'initial',
        }),
        ...(v.isFoo5 && {
          border: '1px solid blue',
          display: 'flex',
          padding: '10px',
          margin: '10px',
          position: 'initial',
        }),
        ...(v.isFoo6 && {
          border: '1px solid yellow',
          display: 'flex',
          padding: '10px',
          margin: '10px',
          position: 'initial',
        }),
        ...(v.isFoo7 && {
          border: '1px solid orange',
          display: 'flex',
          padding: '10px',
          margin: '10px',
          position: 'initial',
        }),
        ...(v.isFoo8 && {
          border: '1px solid pink',
          display: 'flex',
          padding: '10px',
          margin: '10px',
          position: 'initial',
        }),
        ...(v.isFoo9 && {
          border: '1px solid magenta',
          display: 'flex',
          padding: '10px',
          margin: '10px',
          position: 'initial',
        }),
        ...(v.isFoo10 && {
          border: '1px solid salmon',
          display: 'flex',
          padding: '10px',
          margin: '10px',
          position: 'initial',
        }),
        ...(v.isFoo11 && {
          border: '1px solid aliceblue',
          display: 'flex',
          padding: '10px',
          margin: '10px',
          position: 'initial',
        }),
        ...(v.isFoo12 && {
          border: '1px solid #ccc',
          display: 'flex',
          padding: '10px',
          margin: '10px',
          position: 'initial',
        }),
        ...(v.isFoo13 && {
          border: '1px solid #fff',
          display: 'flex',
          padding: '10px',
          margin: '10px',
          position: 'initial',
        }),
        ...(v.isFoo14 && {
          border: '1px solid #000',
          display: 'flex',
          padding: '10px',
          margin: '10px',
          position: 'initial',
        }),
        ...(v.isFoo15 && {
          border: '1px solid #fffccc',
          display: 'flex',
          padding: '10px',
          margin: '10px',
          position: 'initial',
        }),
      }),
    },
  },
});

const ButtonOverridesMissPerf = () => (
  <Provider overwrite performance={{ enableBooleanVariablesCaching: true }} theme={overrides}>
    <Button content="Click here" variables={{ isFoo1: true }} /> {/* 1 */}
    <Button content="Click here" variables={{ isFoo2: true }} /> {/* 2 */}
    <Button content="Click here" variables={{ isFoo3: true }} /> {/* 3 */}
    <Button content="Click here" variables={{ isFoo4: true }} /> {/* 4 */}
    <Button content="Click here" variables={{ isFoo5: true }} /> {/* 5 */}
    <Button content="Click here" variables={{ isFoo6: true }} /> {/* 6 */}
    <Button content="Click here" variables={{ isFoo7: true }} /> {/* 7 */}
    <Button content="Click here" variables={{ isFoo8: true }} /> {/* 8 */}
    <Button content="Click here" variables={{ isFoo9: true }} /> {/* 9 */}
    <Button content="Click here" variables={{ isFoo10: true }} /> {/* 10 */}
    <Button content="Click here" variables={{ isFoo11: true }} /> {/* 11 */}
    <Button content="Click here" variables={{ isFoo12: true }} /> {/* 12 */}
    <Button content="Click here" variables={{ isFoo13: true }} /> {/* 13 */}
    <Button content="Click here" variables={{ isFoo14: true }} /> {/* 14 */}
    <Button content="Click here" variables={{ isFoo15: true }} /> {/* 15 */}
    {/* ---- */}
    <Button content="Click here" variables={{ isFoo1: true }} /> {/* 1 */}
    <Button content="Click here" variables={{ isFoo2: true }} /> {/* 2 */}
    <Button content="Click here" variables={{ isFoo3: true }} /> {/* 3 */}
    <Button content="Click here" variables={{ isFoo4: true }} /> {/* 4 */}
    <Button content="Click here" variables={{ isFoo5: true }} /> {/* 5 */}
    <Button content="Click here" variables={{ isFoo6: true }} /> {/* 6 */}
    <Button content="Click here" variables={{ isFoo7: true }} /> {/* 7 */}
    <Button content="Click here" variables={{ isFoo8: true }} /> {/* 8 */}
    <Button content="Click here" variables={{ isFoo9: true }} /> {/* 9 */}
    <Button content="Click here" variables={{ isFoo10: true }} /> {/* 10 */}
    <Button content="Click here" variables={{ isFoo11: true }} /> {/* 11 */}
    <Button content="Click here" variables={{ isFoo12: true }} /> {/* 12 */}
    <Button content="Click here" variables={{ isFoo13: true }} /> {/* 13 */}
    <Button content="Click here" variables={{ isFoo14: true }} /> {/* 14 */}
    <Button content="Click here" variables={{ isFoo15: true }} /> {/* 15 */}
    {/* ---- */}
    <Button content="Click here" variables={{ isFoo1: true }} /> {/* 1 */}
    <Button content="Click here" variables={{ isFoo2: true }} /> {/* 2 */}
    <Button content="Click here" variables={{ isFoo3: true }} /> {/* 3 */}
    <Button content="Click here" variables={{ isFoo4: true }} /> {/* 4 */}
    <Button content="Click here" variables={{ isFoo5: true }} /> {/* 5 */}
    <Button content="Click here" variables={{ isFoo6: true }} /> {/* 6 */}
    <Button content="Click here" variables={{ isFoo7: true }} /> {/* 7 */}
    <Button content="Click here" variables={{ isFoo8: true }} /> {/* 8 */}
    <Button content="Click here" variables={{ isFoo9: true }} /> {/* 9 */}
    <Button content="Click here" variables={{ isFoo10: true }} /> {/* 10 */}
    <Button content="Click here" variables={{ isFoo11: true }} /> {/* 11 */}
    <Button content="Click here" variables={{ isFoo12: true }} /> {/* 12 */}
    <Button content="Click here" variables={{ isFoo13: true }} /> {/* 13 */}
    <Button content="Click here" variables={{ isFoo14: true }} /> {/* 14 */}
    <Button content="Click here" variables={{ isFoo15: true }} /> {/* 15 */}
  </Provider>
);

ButtonOverridesMissPerf.iterations = 50;
ButtonOverridesMissPerf.filename = 'ButtonOverridesMiss.perf.tsx';

export default ButtonOverridesMissPerf;
