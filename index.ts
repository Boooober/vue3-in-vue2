import { ComponentInternalInstance } from '@vue/runtime-core';
import { createApp, getCurrentInstance, h, DefineComponent } from 'vue';
import { Vue, CreateElement } from 'vue2/types/vue';

interface Hooks<T extends Record<string, unknown>> {
  mounted?(this: T): unknown;
}

export const vue3to2Adapter = <T extends Record<string, unknown> = {}>(
  WrappedComponent: () => Promise<{ default: DefineComponent }>,
  hooks?: Hooks<T>
): any => ({
  data() {
    return {
      id: `vue3-${Math.random().toString(32).slice(2)}`
    };
  },
  render(this: Vue & { id: string }, createElement: CreateElement): ReturnType<CreateElement> {
    return createElement(
      'div',
      {
        attrs: {
          id: this.id
        }
      },
      []
    );
  },
  async mounted(this: T & Vue & { id: string }): Promise<void> {
    hooks?.mounted?.call(this);

    const { default: Vue3Component } = await WrappedComponent();

    let instance: ComponentInternalInstance | null = null;
    const app = createApp({
      render: () => {
        instance = getCurrentInstance();
        return h(Vue3Component, {
          ...this.$attrs,
          ...Object.keys(this.$listeners).reduce(
            (result, name) =>
              Object.assign(result, { [`on${name[0].toUpperCase()}${name.slice(1)}`]: this.$listeners[name] }),
            {}
          )
        });
      }
    });
    app.mount(`#${this.id}`);

    this.$once('hook:beforeDestroy', () => app.unmount());
    this.$watch('$attrs', () => instance?.update(), { deep: true });
  }
});

export const vue3to2AdapterSync = <T extends Record<string, unknown> = {}>(
  Vue3Component: DefineComponent,
  hooks?: Hooks<T>
) => vue3to2Adapter<T>(() => Promise.resolve({ default: Vue3Component }), hooks);
