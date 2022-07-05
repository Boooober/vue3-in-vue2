import { DefineComponent } from 'vue';
interface Hooks<T extends Record<string, unknown>> {
    mounted?(this: T): unknown;
}
export declare const vue3to2Adapter: <T extends Record<string, unknown> = {}>(WrappedComponent: () => Promise<{
    default: DefineComponent;
}>, hooks?: Hooks<T> | undefined) => any;
export declare const vue3to2AdapterSync: <T extends Record<string, unknown> = {}>(Vue3Component: DefineComponent, hooks?: Hooks<T> | undefined) => any;
export {};
