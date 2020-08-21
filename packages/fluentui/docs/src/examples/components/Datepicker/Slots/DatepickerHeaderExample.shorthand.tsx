import { Datepicker, Flex, Text, pxToRem } from '@fluentui/react-northstar';
import * as React from 'react';

const DatepickerHeaderExample = () => {
  return (
    <Datepicker
      today={new Date(2020, 8, 12, 0, 0, 0, 0)}
      calendar={{
        header: {
          children: (ComponentType, props) => {
            return (
              <Flex space={'between'} hAlign={'center'}>
                <Datepicker.CalendarHeaderAction
                  onClick={props.onPreviousClick}
                  direction={'previous'}
                  title={props.prevMonthAriaLabel}
                  disabled={props.disabledPreviousButton}
                  icon={{}}
                />
                <Text content={props.label} styles={{ paddingTop: pxToRem(5) }} />
                <Datepicker.CalendarHeaderAction
                  onClick={props.onNextClick}
                  direction={'next'}
                  title={props.nextMonthAriaLabel}
                  disabled={props.disabledNextButton}
                  icon={{}}
                />
              </Flex>
            );
          },
        },
      }}
    />
  );
};

export default DatepickerHeaderExample;
