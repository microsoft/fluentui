export const ColorPickerStyles = {
  input: {
    selectors: {
      '&.ms-TextField': {
        paddingRight: 2
      }
    }
  },
  table: {
    selectors: {
      'tbody td:last-of-type .ms-ColorPicker-input': {
        paddingRight: 0
      }
    }
  },
  tableHeader: {
    selectors: {
      td: {
        paddingBottom: 0
      }
    }
  }
};

export const ColorRectangleStyles = {
  root: {
    border: 'none'
  },
  thumb: {
    borderColor: 'rgba(255,255,255,.8)',
    boxShadow: '0 0 15px -5px black',
    selectors: {
      ':before': {
        border: 'none'
      }
    }
  }
};

export const ColorSliderStyles = {
  root: {
    marginBottom: 5
  },
  sliderThumb: {
    borderColor: 'rgba(255,255,255,.8)',
    boxShadow: '0 0 15px -5px black'
  }
};
