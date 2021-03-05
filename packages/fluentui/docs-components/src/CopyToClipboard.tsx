import * as copyToClipboard from 'copy-to-clipboard';
import * as PropTypes from 'prop-types';
import * as React from 'react';

export type CopyToClipboardProps = {
  children: (active: boolean, onClick: () => void) => React.ReactElement;
  timeout?: number;
  value: string | (() => string);
};

export const useCopyToClipboard = (value: string | (() => string), timeout: number = 3000): [boolean, () => void] => {
  const [active, setActive] = React.useState(false);
  const onCopy = React.useCallback(() => {
    copyToClipboard(typeof value === 'function' ? value() : value);
    setActive(true);

    const timeoutId = setTimeout(() => setActive(false), timeout);

    return () => clearTimeout(timeoutId);
  }, [timeout, value]);

  return [active, onCopy];
};

export const CopyToClipboard: React.FunctionComponent<CopyToClipboardProps> = props => {
  const { children, timeout, value } = props;
  const [active, onCopy] = useCopyToClipboard(value, timeout);

  return children(active, onCopy);
};

CopyToClipboard.propTypes = {
  children: PropTypes.func.isRequired,
  timeout: PropTypes.number,
  value: PropTypes.string.isRequired,
};
