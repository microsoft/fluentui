import { readStore } from '@ws/store';
import { readBarrel } from './barrel';
import { readRelative } from './relative';
import { readFeature } from '@ws/feature';
import { readBuilt } from '@ws/refs-built';
import { readUnbuilt } from '@ws/refs-unbuilt';
import { readCjs } from '@ws/cjs-dist';
import { readExternal } from 'third-party-store';
import { readInternal } from '#internal/internal';
import { readNodeNext } from '../../shared/util.js';

export function PathsWidget() { return <div>{readStore()}</div>; }
export function BarrelWidget() { return <div>{readBarrel()}</div>; }
export function RelativeWidget() { return <div>{readRelative()}</div>; }
export function FeatureWidget() { return <div>{readFeature()}</div>; }
export function BuiltWidget() { return <div>{readBuilt()}</div>; }
export function UnbuiltWidget() { return <div>{readUnbuilt()}</div>; }
export function CjsWidget() { return <div>{readCjs()}</div>; }
export function ExternalWidget() { return <div>{readExternal()}</div>; }
export function InternalWidget() { return <div>{readInternal()}</div>; }
export function NodeNextWidget() { return <div>{readNodeNext()}</div>; }
