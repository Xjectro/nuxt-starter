<template>
  <div>
    <nuxt-link v-if="!!props.to" v-bind="button">
      <Icon v-if="loading" name="svg-spinners:3-dots-scale" class="w-6 h-6" />
      <slot v-else />
    </nuxt-link>
    <button v-else v-bind="button" type="button" @click="$emit('interaction')">
      <Icon v-if="loading" name="svg-spinners:3-dots-scale" class="w-6 h-6" />
      <slot v-else />
    </button>
  </div>
</template>

<script lang="ts" setup>
const { $cn } = useNuxtApp();

defineEmits(["interaction"]);
const props = defineProps({
  severity: {
    type: String as PropType<
      "secondary" | "primary" | "success" | "danger" | "alien"
    >,
    default: "alien",
  },
  class: { type: String, default: "" },
  to: { type: String, required: false, default: null },
  loading: Boolean,
  disabled: Boolean,
});

defineComponent({
  name: "ButtonComponent",
});

const severityClasses = new Map([
  [
    "secondary",
    "bg-zinc-100 hover:bg-zinc-200 focus:bg-zinc-200 dark:bg-zinc-950 dark:hover:bg-zinc-900 dark:focus:bg-zinc-900 text-zinc-900 dark:text-white",
  ],
  [
    "alien",
    "bg-alien bg-opacity-40 hover:bg-opacity-60 text-black dark:text-white",
  ],
]);

const button = reactive({
  class: $cn(
    "transition-all flex flex-grow-0 items-center font-chakra-petch font-medium rounded-lg",
    severityClasses.get(props.severity),
    props.disabled
      ? "cursor-not-allowed opacity-80"
      : "pointer-events-auto cursor-pointer opacity-100",
    props.class,
  ),
  disabled: props.disabled,
  to: useLocalePath()(props.to),
});
</script>
