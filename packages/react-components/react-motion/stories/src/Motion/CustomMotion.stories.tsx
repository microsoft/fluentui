import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  Button,
  createPresenceComponent,
  createPresenceComponentVariant,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  InlineDrawer,
  makeStyles,
  motionTokens,
  OverlayDrawer,
  tokens,
} from '@fluentui/react-components';
import { Dismiss24Regular } from '@fluentui/react-icons';

import description from './CustomMotion.stories.md';
import { Scale } from '../../../../react-motion-components-preview/library/src/index';

// --- Custom motions for Dialog ---

const SlideDialogMotion = createPresenceComponent(() => {
  const keyframes = [
    { opacity: 1, transform: 'translateX(-150%)', boxShadow: '0px 0px 0px 0px rgba(0, 0, 0, 0.1)' },
    { opacity: 1, transform: 'translateX(0)', boxShadow: tokens.shadow64 },
  ];

  return {
    enter: {
      keyframes,
      // easing: curveLinearToSoftClose,
      easing: curveSwimSpring2,
      duration: motionTokens.durationUltraSlow * 5,
    },
    exit: {
      keyframes: [...keyframes].reverse(),
      easing: motionTokens.curveAccelerateMid,
      duration: motionTokens.durationGentle,
    },
  };
});

const RadialBackdropMotion = createPresenceComponent(() => {
  const keyframes = [
    {
      opacity: 0,
      background: 'radial-gradient(circle at center, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 100%)',
      transform: 'scale(0)',
    },
    {
      opacity: 1,
      background: 'radial-gradient(circle at center, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 100%)',
      transform: 'scale(1)',
    },
  ];

  return {
    enter: {
      keyframes,
      easing: motionTokens.curveDecelerateMax,
      duration: motionTokens.durationGentle,
    },
    exit: {
      keyframes: [...keyframes].reverse(),
      easing: motionTokens.curveAccelerateMax,
      duration: motionTokens.durationGentle,
    },
  };
});

// ENTER EASINGS

// https://robertpenner.com/fuse/#head_type=bezier&tail_type=spring&join=.5&head_bezier_x1=.15&head_bezier_y1=.57&head_bezier_x2=.85&head_bezier_y2=.18&bounces=4&decay=95&show_heatmap=true&show_grid=false
const curveResistanceSpring = `linear(0, .05458 1%, .09434 2%, .1256 3%, .1514 4%, .1731 5%, .1918 6%, .2081 7%, .2225 8%, .2353 9%, .2468 10%, .2669 12%, .2839 14%, .2988 16%, .3185 19%, .3551 25%, .3749 28%, .3896 30%, .4061 32%, .425 34%, .447 36%, .4593 37%, .4728 38%, .4876 39%, .5039 40%, .5218 41%, .5418 42%, .5641 43%, .5893 44%, .6179 45%, .651 46%, .6898 47%, .7364 48%, .795 49%, .8741 50%, .9676 51%, 1.058 52%, 1.131 53%, 1.184 54%, 1.217 55%, 1.23 56%, 1.226 57%, 1.207 58%, 1.177 59%, 1.14 60%, 1.057 62%, 1.018 63%, .9838 64%, .9557 65%, .9348 66%, .9215 67%, .9155 68%, .9161 69%, .9222 70%, .9326 71%, .946 72%, .9764 74%, .991 75%, 1.004 76%, 1.015 77%, 1.023 78%, 1.028 79%, 1.031 80%, 1.031 81%, 1.029 82%, 1.026 83%, 1.015 85%, 1.004 87%, .9951 89%, .992 90%, .9898 91%, .9885 93%, .9903 95%, 1)`;

// https://robertpenner.com/fuse/#head_type=bezier&tail_type=bounce&join=.793&head_bezier_x1=.15&head_bezier_y1=.57&head_bezier_x2=.85&head_bezier_y2=.18&bounces=2&decay=95&show_heatmap=true&show_grid=false
// const curveResistanceBounce = `linear(0, .04199 1%, .07554 2%, .1035 3%, .1276 4%, .1486 5%, .1672 6%, .1839 7%, .199 8%, .2128 9%, .2253 10%, .2476 12%, .2668 14%, .2835 16%, .2983 18%, .3178 21%, .3347 24%, .3546 28%, .4079 40%, .4269 44%, .4426 47%, .46 50%, .4797 53%, .4944 55%, .5106 57%, .5286 59%, .5487 61%, .5712 63%, .5968 65%, .6109 66%, .626 67%, .6422 68%, .6597 69%, .6786 70%, .6991 71%, .7216 72%, .7462 73%, .7734 74%, .8039 75%, .8383 76%, .8778 77%, .9243 78%, .9811 79%, .9897 80%, .9768 81%, .9656 82%, .9563 83%, .9487 84%, .9429 85%, .9389 86%, .9367 87%, .9362 88%, .9376 89%, .9407 90%, .9456 91%, .9523 92%, .9607 93%, .971 94%, .983 95%, .9968 96%, .9979 97%, .9968 98%, .9975 99%, 1)`;

//https:robertpenner.com/fuse/#head_type=power-back&tail_type=bounce&join=.361&head_overshoot=0&head_exponent=1.03&bounces=1&decay=76&duration=700&show_heatmap=true&show_grid=false
const curveGlideRelaxedBounce = `linear(0, .02484 1%, .1036 4%, .2116 8%, .3488 13%, .5156 19%, .7405 27%, .9959 36%, .9942 37%, .9752 40%, .9581 43%, .943 46%, .9298 49%, .9185 52%, .9091 55%, .9017 58%, .8962 61%, .8926 64%, .8909 67%, .8912 70%, .8934 73%, .8975 76%, .9036 79%, .9116 82%, .9215 85%, .9333 88%, .9471 91%, .9628 94%, .9804 97%, 1)`;

// https://robertpenner.com/fuse/#head_type=power-back&tail_type=power-back&join=.361&head_overshoot=0&head_exponent=1.03&tail_overshoot=30&tail_exponent=3.03&duration=700&show_heatmap=true&show_grid=false
const curveGlideRelaxedBack = `linear(0, .0396 2%, .1228 6%, .2292 11%, .3807 18%, .5559 26%, .7773 36%, .7992 37%, .82 38%, .8397 39%, .8762 41%, .9088 43%, .9377 45%, .9632 47%, .9853 49%, 1.004 51%, 1.02 53%, 1.034 55%, 1.044 57%, 1.053 59%, 1.059 61%, 1.063 63%, 1.065 65%, 1.066 67%, 1.064 70%, 1.06 73%, 1.053 76%, 1.04 81%, 1.019 88%, 1.009 92%, 1.004 95%, 1.001 98%, 1)`;

// https://robertpenner.com/fuse/#head_type=power-back&tail_type=power-back&join=.501&head_overshoot=0&head_exponent=1.03&tail_overshoot=30&tail_exponent=3.03&show_heatmap=true
const curveGlideRelaxedBack30pct = `linear(0, .04109 3%, .1128 8%, .2304 16%, .3799 26%, .5616 38%, .7758 52%, .899 60%, .9142 61%, .9284 62%, .9414 63%, .9533 64%, .9642 65%, .9829 67%, .9978 69%, 1.009 71%, 1.018 73%, 1.024 75%, 1.027 77%, 1.028 79%, 1.028 81%, 1.025 84%, 1.018 88%, 1.007 93%, 1.003 96%, 1 99%, 1)`;

// https://robertpenner.com/fuse/#head_type=power-back&tail_type=power-back&join=.501&head_overshoot=0&head_exponent=1.03&tail_overshoot=10&tail_exponent=3.03&show_heatmap=true
const curveGlideRelaxedBack10pct = `linear(0, .02981 2%, .09244 6%, .1888 12%, .3195 20%, .4851 30%, .686 42%, .8209 50%, .8531 52%, .8817 54%, .9069 56%, .929 58%, .948 60%, .9643 62%, .978 64%, .9893 66%, .9984 68%, 1.006 70%, 1.011 72%, 1.014 74%, 1.017 77%, 1.018 80%, 1.015 84%, 1.004 93%, 1.001 97%, 1)`;

// https://robertpenner.com/fuse/#head_type=power-back&tail_type=power-back&join=.302&head_overshoot=0&head_exponent=1.03&tail_overshoot=10&tail_exponent=3.03&show_heatmap=true
const curveGlideMoreRelaxedBack10pct = `linear(0, .04065 2%, .126 6%, .2353 11%, .3908 18%, .5708 26%, .6839 31%, .7262 33%, .7651 35%, .8007 37%, .8332 39%, .8626 41%, .8892 43%, .913 45%, .9342 47%, .953 49%, .9693 51%, .9835 53%, .9956 55%, 1.006 57%, 1.014 59%, 1.021 61%, 1.026 63%, 1.031 66%, 1.033 69%, 1.033 72%, 1.031 75%, 1.026 79%, 1.009 90%, 1.003 94%, 1.001 97%, 1)`;

// https://robertpenner.com/fuse/#head_type=power-back&tail_type=power-back&join=.202&head_overshoot=0&head_exponent=1.03&tail_overshoot=5&tail_exponent=3.03&show_heatmap=true
const curveGlideEvenMoreRelaxedBack5pct = `linear(0, .04695 2%, .1207 5%, .2464 10%, .3998 16%, .5288 21%, .5777 23%, .6234 25%, .6659 27%, .7055 29%, .7421 31%, .7759 33%, .807 35%, .8355 37%, .8615 39%, .8852 41%, .9065 43%, .9257 45%, .9428 47%, .9579 49%, .9712 51%, .9827 53%, .9926 55%, 1.001 57%, 1.008 59%, 1.016 62%, 1.021 65%, 1.024 68%, 1.025 71%, 1.023 75%, 1.019 80%, 1.007 90%, 1.002 95%, 1 99%, 1)`;

// EXIT EASINGS

// https://robertpenner.com/fuse/#head_type=power-back&tail_type=bounce&join=.497&head_overshoot=0&head_exponent=.56&bounces=3&decay=90&show_heatmap=true
const curveSqrtBounce = `linear(0, .1122 1%, .1654 2%, .2076 3%, .2439 4%, .2763 5%, .306 6%, .3336 7%, .3595 8%, .384 9%, .4074 10%, .4511 12%, .4918 14%, .53 16%, .5661 18%, .6005 20%, .6494 23%, .6956 26%, .7395 29%, .7814 32%, .8216 35%, .8729 39%, .922 43%, .969 47%, .9919 49%, .9982 50%, .9868 52%, .9772 54%, .9695 56%, .9638 58%, .9599 60%, .9579 62%, .9578 64%, .9596 66%, .9633 68%, .9689 70%, .9764 72%, .9857 74%, .997 76%, .9982 77%, .9925 79%, .9887 81%, .9868 83%, .9868 85%, .9887 87%, .9925 89%, .9982 91%, .9991 92%, .9965 94%, .9958 96%, .9969 98%, 1)`;

// https://robertpenner.com/fuse/#head_type=power-back&tail_type=power-back&join=.206&head_overshoot=26&head_exponent=2.07&tail_overshoot=0&tail_exponent=3.03&show_heatmap=true
const curve2TwitchOut = `linear(0, -.02098 2%, -.02946 3%, -.03612 4%, -.04084 5%, -.04353 6%, -.04413 7%, -.0426 8%, -.0389 9%, -.03299 10%, -.02485 11%, -.01445 12%, -.001776 13%, .0132 14%, .03049 15%, .05012 16%, .07209 17%, .09642 18%, .1231 19%, .1522 20%, .2143 22%, .2738 24%, .3302 26%, .3835 28%, .434 30%, .4816 32%, .5264 34%, .5686 36%, .6081 38%, .6452 40%, .6798 42%, .7121 44%, .7422 46%, .77 48%, .7958 50%, .8196 52%, .8414 54%, .8614 56%, .8796 58%, .8961 60%, .9111 62%, .9245 64%, .9365 66%, .952 69%, .9648 72%, .975 75%, .983 78%, .9891 81%, .9947 85%, .9979 89%, .9997 94%, 1)`;

// https://robertpenner.com/fuse/#head_type=bezier&tail_type=power-back&head_bezier_x1=.24&head_bezier_y1=1.66&head_bezier_x2=.32&head_bezier_y2=-.1&tail_overshoot=0&tail_exponent=1.04&show_heatmap=true&tail_enabled=false
const curveOutIn = `linear(0, .06781 1%, .1328 2%, .1949 3%, .2539 4%, .3097 5%, .3622 6%, .4114 7%, .4572 8%, .4995 9%, .5382 10%, .5735 11%, .6052 12%, .6335 13%, .6585 14%, .6802 15%, .6987 16%, .7143 17%, .7271 18%, .7373 19%, .7451 20%, .7506 21%, .7542 22%, .7559 23%, .7561 24%, .7548 25%, .7523 26%, .7443 28%, .7333 30%, .7135 33%, .6783 38%, .6588 41%, .6472 43%, .637 45%, .6283 47%, .6213 49%, .616 51%, .6126 53%, .6109 55%, .6111 57%, .613 59%, .6168 61%, .6223 63%, .6296 65%, .6386 67%, .6492 69%, .6615 71%, .6754 73%, .6909 75%, .7078 77%, .7263 79%, .7462 81%, .7674 83%, .7901 85%, .8265 88%, .8659 91%, .9079 94%, .9527 97%, 1)`;

// https://robertpenner.com/fuse/#head_type=bezier&tail_type=power-back&join=.57&head_bezier_x1=.28&head_bezier_y1=1.56&head_bezier_x2=.47&head_bezier_y2=.11&tail_overshoot=0&tail_exponent=3.03&duration=1500&show_heatmap=true
const curveBezierOutInCubicOut = `linear(0, .06665 1%, .1286 2%, .1858 3%, .2383 4%, .2861 5%, .3292 6%, .3677 7%, .4018 8%, .4316 9%, .4572 10%, .4789 11%, .4969 12%, .5115 13%, .523 14%, .5316 15%, .5376 16%, .5413 17%, .543 18%, .5429 19%, .5415 20%, .5352 22%, .5261 24%, .5054 28%, .4963 30%, .4892 32%, .4848 34%, .4837 36%, .4861 38%, .4922 40%, .5024 42%, .5089 43%, .5165 44%, .5251 45%, .5347 46%, .5453 47%, .5569 48%, .5832 50%, .6134 52%, .6475 54%, .6854 56%, .726 58%, .7636 60%, .7976 62%, .8282 64%, .8555 66%, .8798 68%, .9011 70%, .9198 72%, .9359 74%, .9497 76%, .9614 78%, .9711 80%, .979 82%, .9853 84%, .9922 87%, .9965 90%, .9992 94%, 1)`;

// https://robertpenner.com/fuse/#head_type=power-back&tail_type=bezier&join=.303&head_overshoot=0&head_exponent=2&tail_bezier_x1=.06&tail_bezier_y1=.51&tail_bezier_x2=.24&tail_bezier_y2=.53&duration=1500
const curveQuadraticToSoftClose = `linear(0, .0006991 1%, .002796 2%, .006292 3%, .01119 4%, .01748 5%, .02517 6%, .03426 7%, .04474 8%, .05663 9%, .06991 10%, .08459 11%, .1007 12%, .1181 13%, .137 14%, .1573 15%, .179 16%, .202 17%, .2265 18%, .2524 19%, .2796 20%, .3083 21%, .3384 22%, .3698 23%, .4027 24%, .4369 25%, .4726 26%, .5096 27%, .5481 28%, .5879 29%, .6292 30%, .668 31%, .6954 32%, .7157 33%, .7318 34%, .745 35%, .7562 36%, .7659 37%, .7823 39%, .7957 41%, .8073 43%, .8222 46%, .8392 50%, .8579 55%, .8815 62%, .981 94%, 1)`;

// https://robertpenner.com/fuse/#head_type=power-back&tail_type=bezier&join=.303&head_overshoot=0&head_exponent=1&tail_bezier_x1=.06&tail_bezier_y1=.51&tail_bezier_x2=.24&tail_bezier_y2=.53&duration=1500
const curveLinearToSoftClose = `linear(0, .774 30%, .7977 31%, .8144 32%, .8268 33%, .8366 34%, .8446 35%, .8574 37%, .8673 39%, .8792 42%, .8916 46%, .9044 51%, .9218 59%, .9961 98%, 1)`;

// http://localhost:3000/#head_type=power-back&tail_type=bezier&join=.403&head_overshoot=10&head_exponent=2.5&tail_bezier_x1=.06&tail_bezier_y1=.51&tail_bezier_x2=.24&tail_bezier_y2=.53&duration=2000
const curveBackToSoftClose1 = `linear(0, -.002844 1%, -.01341 3%, -.03805 7%, -.04837 9%, -.05577 11%, -.05807 12%, -.05931 13%, -.0594 14%, -.05823 15%, -.05573 16%, -.05181 17%, -.0464 18%, -.03943 19%, -.03082 20%, -.0205 21%, -.008402 22%, .00553 23%, .02136 24%, .03916 25%, .05897 26%, .08086 27%, .1049 28%, .1311 29%, .1596 30%, .1903 31%, .2234 32%, .2589 33%, .2968 34%, .3373 35%, .3802 36%, .4258 37%, .474 38%, .5249 39%, .5785 40%, .629 41%, .663 42%, .6876 43%, .7067 44%, .7222 45%, .7352 46%, .7465 47%, .7565 48%, .7736 50%, .7881 52%, .8066 55%, .8228 58%, .8422 62%, .8686 68%, .975 94%, 1)`;

// https://robertpenner.com/fuse/#head_type=power-back&tail_type=bezier&join=.257&head_exponent=1.5&head_overshoot=0&tail_bezier_x1=.03&tail_bezier_y1=.31&tail_bezier_x2=.08&tail_bezier_y2=.48&duration=1200&show_heatmap=true&show_grid=false&paused=true
const curvePower1_5ToSoftClose = `linear(0, .005362 1%, .01517 2%, .02786 3%, .04289 4%, .05995 5%, .0788 6%, .0993 7%, .1213 8%, .1448 9%, .1696 10%, .1956 11%, .2229 12%, .2513 13%, .2809 14%, .3115 15%, .3432 16%, .4095 18%, .4796 20%, .5533 22%, .6304 24%, .7104 26%, .7379 27%, .7549 28%, .7671 29%, .777 30%, .7853 31%, .7991 33%, .8106 35%, .8253 38%, .8421 42%, .8602 47%, .8797 53%, .9031 61%, .93 71%, .9624 84%, 1)`;

// https://robertpenner.com/fuse/#head_type=power-back&tail_type=bezier&join=.16&head_exponent=1.06&head_overshoot=0&tail_bezier_x1=.03&tail_bezier_y1=.31&tail_bezier_x2=.08&tail_bezier_y2=.48&duration=1200&show_heatmap=true&show_grid=false
const curvePower1_5ToSoftClose2 = `linear(0, .04106 1%, .08561 2%, .1785 4%, .2743 6%, .3721 8%, .5716 12%, .6081 13%, .6316 14%, .6488 15%, .6625 16%, .6741 17%, .6843 18%, .7016 20%, .7164 22%, .7356 25%, .7523 28%, .7722 32%, .7945 37%, .8187 43%, .8447 50%, .8757 59%, .9111 70%, .9507 83%, .9972 99%, 1)`;

// https://robertpenner.com/fuse/#head_type=power-back&tail_type=bezier&join=.16&head_exponent=1.06&head_overshoot=0&tail_bezier_x1=.02&tail_bezier_y1=.48&tail_bezier_x2=.08&tail_bezier_y2=.48&duration=1200&show_heatmap=true
const curveLinearToSoftClose2 = `linear(0, .04212 1%, .08781 2%, .1831 4%, .2814 6%, .3817 8%, .535 11%, .6908 14%, .7959 16%, .8297 17%, .8446 18%, .854 19%, .861 20%, .8713 22%, .879 24%, .888 27%, .8975 31%, .9093 37%, .9257 47%, .9532 66%, 1)`;

// https://robertpenner.com/fuse/#head_type=power-back&tail_type=bezier&join=.226&head_exponent=1.5&head_overshoot=0&tail_bezier_x1=.04&tail_bezier_y1=.63&tail_bezier_x2=.24&tail_bezier_y2=.53&duration=1500
const curvePower1_5ToSoftClose3 = `linear(0, .005601 1%, .01584 2%, .0291 3%, .04481 4%, .06262 5%, .08231 6%, .1037 7%, .1267 8%, .1512 9%, .1771 10%, .2043 11%, .2328 12%, .2625 13%, .2934 14%, .3254 15%, .3584 16%, .3926 17%, .4638 19%, .539 21%, .6169 23%, .6466 24%, .6689 25%, .6866 26%, .7013 27%, .7137 28%, .7246 29%, .7428 31%, .7579 33%, .7709 35%, .7876 38%, .8022 41%, .8194 45%, .8387 50%, .8633 57%, .9024 69%, .9968 99%, 1)`;

// https://robertpenner.com/fuse/#head_type=power-back&tail_type=bezier&join=.25&head_exponent=1.4&head_overshoot=0&tail_bezier_x1=.07&tail_bezier_y1=.49&tail_bezier_x2=0&tail_bezier_y2=.27&duration=1500&show_heatmap=true
const curvePower1_4ToSoftClose = `linear(0, .006908 1%, .01823 2%, .03216 3%, .04811 4%, .06575 5%, .08487 6%, .1053 7%, .127 8%, .1497 9%, .1983 11%, .2505 13%, .3061 15%, .3647 17%, .4262 19%, .4903 21%, .5569 23%, .6259 25%, .6614 26%, .6937 27%, .7168 28%, .7321 29%, .7428 30%, .7511 31%, .7637 33%, .7737 35%, .7862 38%, .8078 44%, .8877 68%, .9393 83%, .9964 99%, 1)`;

// --- Custom motion for Drawer ---

const CustomSlideMotion = createPresenceComponent(() => {
  return {
    enter: {
      // Slide in from the left
      keyframes: [{ translate: '-100% 0' }, { translate: '0 0' }],
      duration: motionTokens.durationUltraSlow * 2,
      // easing: curveGlideRelaxedBack30pct,
      // easing: curveGlideRelaxedBack10pct,
      // easing: curveGlideMoreRelaxedBack10pct,
      easing: curveGlideEvenMoreRelaxedBack5pct,
    },
    exit: {
      // Slide out to the left
      keyframes: [{ translate: '0 0' }, { translate: '-100% 0' }],
      duration: motionTokens.durationUltraSlow * 5,
      // easing: curveQuadraticToSoftClose,
      // easing: curvePower1_5ToSoftClose3,
      easing: curvePower1_4ToSoftClose,
      // easing: curvePower1_5ToSoftClose2,
      // easing: curveLinearToSoftClose,
      // easing: curveBackToSoftClose1,
    },
  };
});

const SoftCloseDrawerMotion = createPresenceComponent(() => {
  return {
    enter: {
      // Slide in from the left
      keyframes: [{ translate: '-100% 0' }, { translate: '0 0' }],
      duration: motionTokens.durationUltraSlow * 3,
      easing: curveGlideRelaxedBack30pct,
    },
    exit: {
      // Slide out to the left with a soft close
      keyframes: [
        { translate: '0 0', easing: 'ease-in' },
        { translate: '-80% 0', easing: 'ease-out', offset: 0.3 },
        { translate: '-100% 0', offset: 1 },
      ],
      duration: motionTokens.durationUltraSlow * 6,
      // easing: curveOutIn,
    },
  };
});

const SoftCloseDrawerMotion2 = createPresenceComponent(() => {
  return {
    enter: {
      // Slide in from the left
      keyframes: [{ translate: '-100% 0' }, { translate: '0 0' }],
      duration: motionTokens.durationUltraSlow * 2,
      easing: curveGlideRelaxedBack30pct,
    },
    exit: {
      // Slide out to the left with a soft close
      keyframes: [
        { translate: '0 0' },
        // { translate: '-70% 0', easing: 'linear', offset: 0.3 },
        { translate: '-100% 0' },
      ],
      duration: motionTokens.durationUltraSlow * 3,
      easing: 'linear(0, 30% .7, 1)',
    },
  };
});

// --- Styles ---

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: '40px',
  },

  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  sectionTitle: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    margin: '0',
  },
  sectionDescription: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground3,
    margin: '0',
  },
  buttons: {
    display: 'flex',
    gap: '12px',
  },

  drawerContainer: {
    border: `2px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusMedium,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column-reverse',
    height: '300px',
    backgroundColor: tokens.colorNeutralBackground1,
  },
  drawerContent: {
    flex: '1',
    padding: '16px',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
  },
});

// http://localhost:3000/#head_type=swim&tail_type=spring&join=.377&head_strokes=2&head_effort=27&head_gamma=4.6&bounces=3&decay=90&duration=2000&show_heatmap=true&show_grid=false
const curveSwimSpring = `linear(0, .006229 1%, .02395 2%, .05184 3%, .08874 4%, .1336 5%, .1803 6%, .2218 7%, .2584 8%, .2909 9%, .3196 10%, .345 11%, .3675 12%, .3874 13%, .4051 14%, .4207 15%, .4345 16%, .4467 17%, .4576 18%, .4673 19%, .4838 20%, .5106 21%, .5466 22%, .5906 23%, .6924 25%, .7372 26%, .7769 27%, .812 28%, .8431 29%, .8706 30%, .8949 31%, .9165 32%, .9356 33%, .9525 34%, .9674 35%, .9807 36%, .9924 37%, 1.003 38%, 1.012 39%, 1.02 40%, 1.027 41%, 1.032 42%, 1.036 43%, 1.038 44%, 1.04 45%, 1.04 46%, 1.038 48%, 1.032 50%, 1.021 53%, 1.005 57%, .9984 59%, .9932 61%, .9896 63%, .9877 65%, .9876 68%, .99 71%, .9987 78%, 1.002 82%, 1.004 86%, 1.003 91%, 1)`;

// http://localhost:3000/#head_type=swim&tail_type=power-back&join=.703&head_strokes=3&head_effort=24&head_gamma=7.5&tail_overshoot=100&tail_exponent=3&duration=2000&show_heatmap=true
const curveSwimSpring2 = `linear(0, .003149 1%, .01215 2%, .02643 3%, .04544 4%, .06871 5%, .09533 6%, .1204 7%, .1429 8%, .1632 9%, .1814 10%, .1977 11%, .2124 12%, .2257 13%, .2375 14%, .2482 15%, .2664 17%, .2811 19%, .293 21%, .3078 24%, .3181 25%, .3336 26%, .3536 27%, .3778 28%, .4342 30%, .4598 31%, .4827 32%, .5034 33%, .5219 34%, .5386 35%, .5536 36%, .5671 37%, .5792 38%, .5901 39%, .6086 41%, .6236 43%, .6358 45%, .6456 47%, .6537 48%, .6672 49%, .6855 50%, .7081 51%, .7346 52%, .7638 53%, .7908 54%, .8151 55%, .8369 56%, .8565 57%, .8741 58%, .8899 59%, .9041 60%, .9169 61%, .9284 62%, .9387 63%, .9563 65%, .9706 67%, .9821 69%, .9914 71%, .9987 73%, 1.004 75%, 1.008 77%, 1.011 80%, 1.012 83%, 1.01 87%, 1.002 95%, 1 99%, 1)`;

const CustomDialogMotion = createPresenceComponentVariant(Scale, {
  outScale: 0.1,
  duration: motionTokens.durationUltraSlow * 8,
  // easing: motionTokens.curveDecelerateMid,
  easing: curveSwimSpring,
  // exitDuration: motionTokens.durationGentle,
  exitEasing: motionTokens.curveAccelerateMin,
});

// --- Dialog examples ---

const DialogExample = () => {
  const classes = useStyles();

  return (
    <div className={classes.section}>
      <p className={classes.sectionTitle}>Dialog</p>
      <p className={classes.sectionDescription}>
        Override Dialog&apos;s <code>surfaceMotion</code> or DialogSurface&apos;s <code>backdropMotion</code> with a
        custom animation via a render function.
      </p>

      <div className={classes.buttons}>
        <Dialog
          surfaceMotion={{
            children: (_, props) => <SlideDialogMotion {...props}>{props.children}</SlideDialogMotion>,
            // children: (_, props) => <CustomDialogMotion {...props}>{props.children}</CustomDialogMotion>,
          }}
        >
          <DialogTrigger disableButtonEnhancement>
            <Button>Custom surface (slide)</Button>
          </DialogTrigger>
          <DialogSurface>
            <DialogBody>
              <DialogTitle>Custom surface motion</DialogTitle>
              <DialogContent>
                The <code>surfaceMotion</code> slot uses a render function to replace the default scale animation with a
                slide-in from the left.
              </DialogContent>
              <DialogActions>
                <DialogTrigger disableButtonEnhancement>
                  <Button appearance="secondary">Close</Button>
                </DialogTrigger>
              </DialogActions>
            </DialogBody>
          </DialogSurface>
        </Dialog>

        <Dialog>
          <DialogTrigger disableButtonEnhancement>
            <Button>Custom backdrop (radial)</Button>
          </DialogTrigger>
          <DialogSurface
            backdropMotion={{
              children: (_, props) => <RadialBackdropMotion {...props}>{props.children}</RadialBackdropMotion>,
            }}
          >
            <DialogBody>
              <DialogTitle>Custom backdrop motion</DialogTitle>
              <DialogContent>
                The <code>backdropMotion</code> slot uses a render function to replace the default fade with a radial
                gradient that scales in.
              </DialogContent>
              <DialogActions>
                <DialogTrigger disableButtonEnhancement>
                  <Button appearance="secondary">Close</Button>
                </DialogTrigger>
              </DialogActions>
            </DialogBody>
          </DialogSurface>
        </Dialog>
      </div>
    </div>
  );
};

// --- Drawer example ---

const DrawerExample = () => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className={classes.section}>
      <p className={classes.sectionTitle}>Drawer</p>
      <p className={classes.sectionDescription}>
        Override Drawer&apos;s <code>surfaceMotion</code> with a custom animation. This custom motion slides in with an
        overshoot, and exits like a soft-close drawer (hydraulic).
      </p>

      <div className={classes.drawerContainer}>
        <InlineDrawer
          surfaceMotion={{ children: (_, props) => <CustomSlideMotion {...props} /> }}
          // surfaceMotion={{ children: (_, props) => <SoftCloseDrawerMotion {...props} /> }}
          separator
          open={isOpen}
          style={{ backgroundColor: tokens.colorNeutralBackground6, marginLeft: '-5%', paddingLeft: '5%' }}
        >
          <DrawerHeader>
            <DrawerHeaderTitle
              action={
                <Button
                  appearance="subtle"
                  aria-label="Close"
                  icon={<Dismiss24Regular />}
                  onClick={() => setIsOpen(false)}
                />
              }
            >
              Custom motion
            </DrawerHeaderTitle>
          </DrawerHeader>
          <DrawerBody>
            <p>
              The <code>surfaceMotion</code> slot uses a render function to apply a bouncy slide-in animation.
            </p>
          </DrawerBody>
        </InlineDrawer>

        <div className={classes.drawerContent}>
          <Button appearance="primary" onClick={() => setIsOpen(!isOpen)}>
            Toggle drawer
          </Button>
        </div>
      </div>
    </div>
  );
};

// --- Story ---

export const CustomMotion = (): JSXElement => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <DialogExample />
      <DrawerExample />
    </div>
  );
};

CustomMotion.parameters = {
  docs: {
    description: {
      story: description,
    },
  },
};
