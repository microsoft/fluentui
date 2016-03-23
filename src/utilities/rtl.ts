let _isRTL: boolean;

export function getRTL() {
  if (_isRTL === undefined) {
    _isRTL = document.documentElement.getAttribute('dir') === 'rtl';
  }

  return _isRTL;
}

export function setRTL(isRTL: boolean) {
  document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
  _isRTL = isRTL;
}