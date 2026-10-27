import KatriAthokas from './KatriAthokas.jpg';
import ElviaAtkins from './ElviaAtkins.jpg';
import MauricioAugust from './MauricioAugust.jpg';
import ColinBallinger from './ColinBallinger.jpg';
import LydiaBauer from './LydiaBauer.jpg';
import AmandaBrady from './AmandaBrady.jpg';
import HenryBrill from './HenryBrill.jpg';
import CelesteBurton from './CelesteBurton.jpg';
import RobinCounts from './RobinCounts.jpg';
import TimDeboer from './TimDeboer.jpg';
import CameronEvans from './CameronEvans.jpg';
import IsaacFielder from './IsaacFielder.jpg';
import CecilFolk from './CecilFolk.jpg';
import MiguelGarcia from './MiguelGarcia.jpg';

/**
 * Avatar photos inlined as data URIs (see `inlineAssets` in .storybook/main.js).
 *
 * Chromium loads data URIs right away, so the photos are part of the first paint. Photos fetched over the network
 * can arrive after it, which makes the rendering of an active Avatar's ring depend on network timing.
 */
export const inlinedAvatarImages: readonly string[] = [
  KatriAthokas,
  ElviaAtkins,
  MauricioAugust,
  ColinBallinger,
  LydiaBauer,
  AmandaBrady,
  HenryBrill,
  CelesteBurton,
  RobinCounts,
  TimDeboer,
  CameronEvans,
  IsaacFielder,
  CecilFolk,
  MiguelGarcia,
];
