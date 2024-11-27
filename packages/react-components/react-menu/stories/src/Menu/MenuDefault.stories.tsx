import React from "react";
import {
  makeStyles,
  mergeClasses,
  FluentProvider,
  webLightTheme,
  Slider,
  Switch,
  Checkbox,
  Button,
  shorthands,
} from "@fluentui/react-components";

const useStyles = makeStyles({
  hidden: {
    ...shorthands.overflow("hidden"),
  },
  inlineFlex: {
    display: "inline-flex",
  },
});

export const Default = () => {
  const classes = useStyles();

  return (
    <FluentProvider theme={webLightTheme}>
      <div className={classes.hidden}>
        <h2>Cut cases:</h2>
        <Slider />
        <br />
        <div className={mergeClasses(classes.hidden, classes.inlineFlex)}>
          <Slider />
        </div>
        <br />
        <Slider vertical />
        <br />
        <Switch defaultChecked />
        <br />
        <Checkbox defaultChecked />

        <hr />
        <h2>Invisible cases:</h2>
        <div className={mergeClasses(classes.hidden, classes.inlineFlex)}>
          <Slider vertical />
        </div>
        <br />
        <div className={mergeClasses(classes.hidden, classes.inlineFlex)}>
          <Switch defaultChecked />
        </div>
        <br />
        <div className={mergeClasses(classes.hidden, classes.inlineFlex)}>
          <Checkbox defaultChecked />
        </div>
        <hr />
        <h2>
          Reference (not using <code>createFocusOutlineStyle</code> for border):
        </h2>
        <Button>Reference</Button>
        <br />
        <div className={mergeClasses(classes.hidden, classes.inlineFlex)}>
          <Button>Reference</Button>
        </div>
      </div>
    </FluentProvider>
  );
}
