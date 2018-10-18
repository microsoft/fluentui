import { mergeLayerCollectionBase, IThemeLayersBase, IThemeLayersConfig, getLayerWorker, IThemeLayerBase } from './themeLayers';

const config: IThemeLayersConfig = {
  collections: ['state', 'part'],
  overrides: { collection: 'state' }
};

interface IContent {
  n?: number;
  s?: string;
  o?: {
    n1?: number;
    n2?: number;
  };
  state?: {
    disabled?: IContent;
    pressed?: IContent;
    hovered?: IContent;
  };
  part?: {
    [part: string]: IContent;
  };
}

function getLayer(
  layers: IThemeLayersBase<IContent>,
  name: string,
  applyOverrides?: boolean,
  mixins?: string[]
): IThemeLayerBase<IContent> {
  return getLayerWorker(config, layers, { layer: name, mixins, applyOverrides }) || {};
}

const BaseLayers: IThemeLayersBase<IContent> = {
  base: { n: 1, o: { n1: 1 } },
  L1a: { n: 2 },
  L1b: { parent: 'base', s: 'foo' },
  L1c: { o: { n1: 4 } },
  L1d: { o: { n2: 3 } },
  L2a: { parent: 'L1b', n: 3 },
  L2b: { parent: ['L1a', 'L1b', 'L1c', 'L1d'], s: 'bar' }
};

const ExpectedBase: IThemeLayersBase<IContent> = {
  base: { n: 1, o: { n1: 1 } },
  L1a: { n: 2 },
  L1b: { mixins: ['base'], n: 1, o: { n1: 1 }, s: 'foo' },
  L1c: { o: { n1: 4 } },
  L1d: { o: { n2: 3 } },
  L2a: { mixins: ['base', 'L1b'], n: 3, s: 'foo', o: { n1: 1 } },
  L2b: { mixins: ['L1a', 'base', 'L1b', 'L1c', 'L1d'], n: 1, s: 'bar', o: { n2: 3 } }
};

const LayerSet2: IThemeLayersBase<IContent> = {
  base: {
    state: {
      hovered: { s: 'hover' },
      pressed: { s: 'press' },
      disabled: { s: 'disabled' }
    }
  },
  ButtonBase: {
    parent: 'base',
    s: 'button',
    state: {
      disabled: {
        n: -10
      }
    },
    part: {
      icon: {
        o: { n1: 32, n2: 32 },
        state: { disabled: { n: -20 } }
      }
    }
  },
  Button1: {
    parent: 'ButtonBase',
    state: {
      hovered: { n: 5 }
    }
  },
  Button2: {
    parent: 'ButtonBase',
    part: {
      widget: { s: 'foo' }
    }
  }
};

const ExpectedLayer2Merge: IThemeLayersBase<IContent> = {
  base: {
    n: 1,
    o: { n1: 1 },
    state: {
      hovered: { s: 'hover' },
      pressed: { s: 'press' },
      disabled: { s: 'disabled' }
    }
  },
  ButtonBase: {
    mixins: ['base'],
    n: 1,
    s: 'button',
    o: { n1: 1 },
    state: {
      hovered: { s: 'hover' },
      pressed: { s: 'press' },
      disabled: { s: 'disabled', n: -10 }
    },
    part: {
      icon: {
        o: { n1: 32, n2: 32 },
        state: { disabled: { n: -20 } }
      }
    }
  },
  Button1: {
    mixins: ['base', 'ButtonBase'],
    n: 1,
    s: 'button',
    o: { n1: 1 },
    state: {
      hovered: { s: 'hover', n: 5 },
      pressed: { s: 'press' },
      disabled: { s: 'disabled', n: -10 }
    },
    part: {
      icon: {
        o: { n1: 32, n2: 32 },
        state: { disabled: { n: -20 } }
      }
    }
  },
  Button2: {
    mixins: ['base', 'ButtonBase'],
    n: 1,
    s: 'button',
    o: { n1: 1 },
    state: {
      hovered: { s: 'hover' },
      pressed: { s: 'press' },
      disabled: { s: 'disabled', n: -10 }
    },
    part: {
      icon: {
        o: { n1: 32, n2: 32 },
        state: { disabled: { n: -20 } }
      },
      widget: { s: 'foo' }
    }
  }
};

describe('layer functionality', () => {
  it('getLayer L1a', () => {
    const layer = getLayer(BaseLayers, 'L1a');
    expect(layer).toMatchObject(ExpectedBase.L1a);
  });

  it('getLayer L2b', () => {
    const layer = getLayer(BaseLayers, 'L2b');
    expect(layer).toMatchObject(ExpectedBase.L2b);
  });

  it('getLayer logic', () => {
    for (const key in BaseLayers) {
      if (BaseLayers.hasOwnProperty(key)) {
        expect(ExpectedBase.hasOwnProperty(key)).toBeTruthy();
        const layer = getLayer(BaseLayers, key);
        expect(layer).toMatchObject(ExpectedBase[key]);
      }
    }
  });

  it('test mergeLayers works for complex objects', () => {
    const mergedLayers = mergeLayerCollectionBase<IContent>(config.collections, BaseLayers, LayerSet2);
    for (const key in LayerSet2) {
      if (mergedLayers.hasOwnProperty(key)) {
        expect(ExpectedLayer2Merge.hasOwnProperty(key)).toBeTruthy();
        const layer = getLayer(mergedLayers, key);
        expect(layer).toMatchObject(ExpectedLayer2Merge[key]);
      }
    }
  });
});

const OverrideBase: IThemeLayersBase<IContent> = {
  default: {
    n: 1,
    s: 'default'
  },
  disabled: {
    s: 'disabled'
  },
  pressed: {
    s: 'pressed'
  },
  hovered: {
    s: 'hovered'
  },
  buttonBase: {
    parent: 'default',
    state: {
      disabled: {
        n: 0
      },
      pressed: {
        s: 'buttonPress'
      }
    }
  },
  disabledButton: {
    parent: ['buttonBase', 'disabled']
  },
  normalButton: {
    parent: 'buttonBase'
  }
};

const ExpectedOverrideValues: IThemeLayersBase<IContent> = {
  buttonBase: {
    mixins: ['default', 'buttonBase'],
    n: 1,
    s: 'default',
    state: {
      disabled: {
        n: 0
      },
      pressed: {
        s: 'buttonPress'
      }
    }
  },
  disabledButton: {
    mixins: ['default', 'buttonBase', 'disabled'],
    n: 0,
    s: 'disabled',
    state: {
      disabled: {
        n: 0
      },
      pressed: {
        s: 'buttonPress'
      }
    }
  },
  buttonWithPressedMixin: {
    mixins: ['default', 'buttonBase', 'pressed'],
    n: 1,
    s: 'buttonPress',
    state: {
      disabled: {
        n: 0
      },
      pressed: {
        s: 'buttonPress'
      }
    }
  },
  buttonWithHoveredMixin: {
    mixins: ['default', 'buttonBase', 'hovered'],
    n: 1,
    s: 'hovered',
    state: {
      disabled: {
        n: 0
      },
      pressed: {
        s: 'buttonPress'
      }
    }
  }
};

describe('layer overriding tests', () => {
  it('getLayer button', () => {
    const layer = getLayer(OverrideBase, 'normalButton', true);
    expect(layer).toMatchObject(ExpectedOverrideValues.buttonBase);
  });

  it('getLayer L2b', () => {
    const layer = getLayer(OverrideBase, 'disabledButton', true);
    expect(layer).toMatchObject(ExpectedOverrideValues.disabledButton);
  });

  it('getLayer with pressed mixins', () => {
    const layer = getLayer(OverrideBase, 'normalButton', true, ['pressed']);
    expect(layer).toMatchObject(ExpectedOverrideValues.buttonWithPressedMixin);
  });

  it('getLayer with hovered mixins', () => {
    const layer = getLayer(OverrideBase, 'normalButton', true, ['hovered']);
    expect(layer).toMatchObject(ExpectedOverrideValues.buttonWithHoveredMixin);
  });
});

const CycledLayers: IThemeLayersBase<IContent> = {
  l1: {
    parent: 'l2',
    n: 1,
  },
  l2: {
    parent: 'l1',
    n: 2,
  },
  l3: {
    parent: ['l1', 'l2'],
    s: 'yo'
  },
  l4: {
    parent: 'l3',
    n: 4
  },
  l5: {
    parent: 'l1',
    s: 'foo'
  }
};

const CycledExpected: IThemeLayersBase<IContent> = {
  l1: {
    mixins: ['l1', 'l2'],
    n: 1
  },
  l2: {
    mixins: ['l1'],
    n: 2
  },
  l3: {
    mixins: ['l1', 'l2'],
    n: 2,
    s: 'yo'
  },
  l4: {
    mixins: ['l1', 'l2', 'l3'],
    n: 4,
    s: 'yo'
  },
  l5: {
    mixins: ['l1', 'l2'],
    n: 1,
    s: 'foo'
  }
};

describe('layer cycle tests', () => {
  it('l1', () => {
    const layer = getLayer(CycledLayers, 'l1', true);
    expect(layer).toMatchObject(CycledExpected.l1);
  });

  it('l2', () => {
    const layer = getLayer(CycledLayers, 'l2', true);
    expect(layer).toMatchObject(CycledExpected.l2);
  });

  it('l3', () => {
    const layer = getLayer(CycledLayers, 'l3', true);
    expect(layer).toMatchObject(CycledExpected.l3);
  });

  it('l4', () => {
    const layer = getLayer(CycledLayers, 'l4', true);
    expect(layer).toMatchObject(CycledExpected.l4);
  });

  it('l5', () => {
    const layer = getLayer(CycledLayers, 'l5', true);
    expect(layer).toMatchObject(CycledExpected.l5);
  });
});
