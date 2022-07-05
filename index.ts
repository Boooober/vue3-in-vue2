import { ComponentInternalInstance } from '@vue/runtime-core';
import { createApp, getCurrentInstance, h, DefineComponent } from 'vue';
import { Vue, CreateElement } from 'vue2/types/vue';

export const vue3to2Adapter = (
  WrappedComponent: () => Promise<{ default: DefineComponent }>,
  onMount?: () => unknown
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
  async mounted(this: Vue & { id: string }): Promise<void> {
    onMount?.();

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

export const vue3to2AdapterSync = (Vue3Component: DefineComponent) =>
  vue3to2Adapter(() => Promise.resolve({ default: Vue3Component }));
