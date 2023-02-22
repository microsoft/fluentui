export const QualitativePalette = {
  dataVizSlot1: '#4F6BED',
  dataVizSlot2: '#E61C99',
  dataVizSlot3: '#00A5AF',
  dataVizSlot4: '#9470BD',
  dataVizSlot5: '#689920',
  dataVizSlot6: '#3487C7',
  dataVizSlot7: '#CA5010',
  dataVizSlot8: '#009B51',
  dataVizSlot9: '#B27C00',
  dataVizSlot10: '#B146C2',
  dataVizSlot11: '#637CEF',
  dataVizSlot12: '#EE5FB7',
  dataVizSlot13: '#008B94',
  dataVizSlot14: '#D77440',
  dataVizSlot15: '#BA58C9',
  dataVizSlot16: '#3A96DD',
  dataVizSlot17: '#E3008C',
  dataVizSlot18: '#57811B',
  dataVizSlot19: '#C36BD1',
  dataVizSlot20: '#D06228',
};

const QUALITATIVE_COLORS = Object.values(QualitativePalette);

export const getNextColor = (index: number, offset: number = 0): string => {
  return QUALITATIVE_COLORS[(index + offset) % QUALITATIVE_COLORS.length];
};

export const SemanticPalette = {
  info: '#015cda',
  success: '#57a300',
  warning: '#db7500',
  error: '#e00b1c',
  disabled: '#8a8886',
};
