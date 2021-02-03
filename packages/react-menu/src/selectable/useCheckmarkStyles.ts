import { makeStyles } from '@fluentui/react-make-styles';

const useStyles = makeStyles([
  [
    null,
    () => ({
      width: '16px',
      height: '16px',
    }),
  ],
]);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useCheckmarkStyles = (state: any) => {
  const checkmarkClassName = useStyles({});
  if (state.checkmark) {
    state.checkmark.className = checkmarkClassName;
  }
};
