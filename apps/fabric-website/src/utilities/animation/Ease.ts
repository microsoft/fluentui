// Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license. See LICENSE in the project root for license information.
// 'use strict';

export class Ease {
  private static CB = 'cubic-bezier';

  public static QUAD_EASE_IN: string = Ease.CB + '(0.550, 0.085, 0.680, 0.530)';
  public static CUBIC_EASE_IN: string = Ease.CB + '(0.550, 0.055, 0.675, 0.190)';
  public static QUART_EASE_IN: string = Ease.CB + '(0.895, 0.030, 0.685, 0.220)';
  public static QUINT_EASE_IN: string = Ease.CB + '(0.755, 0.050, 0.855, 0.060)';
  public static SINE_EASE_IN: string = Ease.CB + '(0.470, 0, 0.745, 0.715)';
  public static EXPO_EASE_IN: string = Ease.CB + '(0.950, 0.050, 0.795, 0.035)';
  public static CIRC_EASE_IN: string = Ease.CB + '(0.600, 0.040, 0.980, 0.335)';
  public static BACK_EASE_IN: string = Ease.CB + '(0.600, 0.040, 0.980, 0.335)';

  public static QUAD_EASE_OUT: string = Ease.CB + '(0.250, 0.460, 0.450, 0.940)';
  public static CUBIC_EASE_OUT: string = Ease.CB + '(0.215, 0.610, 0.355, 1)';
  public static QUART_EASE_OUT: string = Ease.CB + '(0.165, 0.840, 0.440, 1)';
  public static QUINT_EASE_OUT: string = Ease.CB + '(0.230, 1, 0.320, 1)';
  public static SINE_EASE_OUT: string = Ease.CB + '(0.390, 0.575, 0.565, 1)';
  public static EXPO_EASE_OUT: string = Ease.CB + '(0.190, 1, 0.220, 1)';
  public static CIRC_EASE_OUT: string = Ease.CB + '(0.075, 0.820, 0.165, 1)';
  public static BACK_EASE_OUT: string = Ease.CB + '(0.175, 0.885, 0.320, 1.275)';

  public static QUAD_EASE_IN_OUT: string = Ease.CB + '(0.455, 0.030, 0.515, 0.955)';
  public static CUBIC_EASE_IN_OUT: string = Ease.CB + '(0.645, 0.045, 0.355, 1)';
  public static QUART_EASE_IN_OUT: string = Ease.CB + '(0.770, 0, 0.175, 1)';
  public static QUINT_EASE_IN_OUT: string = Ease.CB + '(0.860, 0, 0.070, 1)';
  public static SINE_EASE_IN_OUT: string = Ease.CB + '(0.445, 0.050, 0.550, 0.950)';
  public static EXPO_EASE_IN_OUT: string = Ease.CB + '(1, 0, 0, 1)';
  public static CIRC_EASE_IN_OUT: string = Ease.CB + '(0.785, 0.135, 0.150, 0.860)';
  public static BACK_EASE_IN_OUT: string = Ease.CB + '(0.680, -0.550, 0.265, 1.550)';
}
