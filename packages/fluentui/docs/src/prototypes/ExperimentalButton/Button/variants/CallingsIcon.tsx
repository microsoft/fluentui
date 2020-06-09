import * as React from 'react';
interface CallingsIconProps {
  className?: string;
  children?: React.ReactElement;
}
const CallingsIcon = React.forwardRef((props: CallingsIconProps, ref) => {
  return (
    <div className={props.className}>
      {React.cloneElement(props.children, {
        ref,
        bordered: true,
        circular: true,
      })}
    </div>
  );
});

export default CallingsIcon;
