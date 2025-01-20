import { Button, Title1, makeStyles } from '@fluentui/react-components';
import { bundleIcon, CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    padding: '32px',
  },
});

export const Example = () => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <Title1>Hello, Fluent UI!</Title1>
      <Button appearance="primary" icon={<CalendarMonth />}>
        Click Me
      </Button>
    </div>
  );
};
