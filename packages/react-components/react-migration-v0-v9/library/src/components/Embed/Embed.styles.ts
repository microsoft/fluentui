import { makeStyles } from '@griffel/react';

export const useStyles = makeStyles({
  root: {
    display: 'inline-block',
    verticalAlign: 'middle',
    position: 'relative',
    cursor: 'pointer',
    height: "auto",
    outline: 0,
    ":hover, :focus-within": {
      "& .fui-Embed-control": {
      opacity: 1,
    }
  }
}
});
