import { makeStyles, tokens } from '@fluentui/react-components';

export const useStyles = makeStyles({
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
  },
  gridWrapper: {
    display: 'grid',
    margin: '60px 0',
    gridTemplateColumns: 'repeat(2, 150px)',
    justifyContent: 'center',
    gap: '20px',
  },
  box: {
    height: '150px',
    width: '150px',
    boxSizing: 'border-box',
    border: '1px solid green',
  },
  imageBox: {
    border: '1px dashed red',
  },
  imageWrapperV9: {
    display: 'flex',
    flexDirection: 'column',
  },
  imageWrapperV8: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    overflow: 'hidden',
  },
  imageV8: {
    display: 'block',
    position: 'absolute',
    borderRadius: `${tokens.borderRadiusCircular}`,
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },
  flexCenter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  auto: {
    height: 'auto',
    width: 'auto',
  },
  caption: {
    fontSize: '12px !important',
    lineHeight: tokens.lineHeightBase200,
    marginTop: '8px !important',
    textAlign: 'center',
  },
});
