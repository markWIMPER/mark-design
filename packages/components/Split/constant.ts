import type { InjectionKey } from 'vue';
import type { SplitUltraContext } from './types';

export const SPLIT_ULTRA_CTX_KEY: InjectionKey<SplitUltraContext> = Symbol('splitUltraContext');
