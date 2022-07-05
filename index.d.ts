import { DefineComponent } from 'vue';
export declare const vue3to2Adapter: (WrappedComponent: () => Promise<{
    default: DefineComponent;
}>, onMount?: () => unknown) => any;
export declare const vue3to2AdapterSync: (Vue3Component: DefineComponent) => any;
