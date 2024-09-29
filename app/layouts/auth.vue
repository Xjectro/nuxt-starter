<template>
  <Splitter layout="horizontal">
    <SplitterPanel
      class="transition-all flex flex-col items-center min-h-screen z-10 w-full sm:w-4/5 md:w-3/5 lg:w-2/5 bg-white dark:bg-black"
    >
      <div
        class="flex flex-col items-center justify-between my-10 w-full h-full max-w-md px-5 gap-20"
      >
        <nav class="flex items-center justify-between w-full">
          <NdsButton to="/" class="max-w-12 max-h-12">
            <img
              src="/assets/images/app.png"
              alt="App logo"
              class="w-full h-full"
            />
          </NdsButton>
          <div class="flex flex-wrap items-center justify-end gap-4">
            <p
              class="transition-all whitespace-normal md:whitespace-nowrap text-end font-medium text-zinc-800 dark:text-zinc-500"
            >
              {{ props.header.paragraph }}
            </p>
            <Button
              :to="props.header.button.to"
              class="whitespace-nowrap py-3 px-5"
              severity="secondary"
            >
              {{ props.header.button.text }}
            </Button>
          </div>
        </nav>

        <div
          class="transition-all flex flex-col items-start w-full gap-7 font-chakra-petch text-black dark:text-stone-100"
        >
          <header
            class="flex flex-col items-start justify-start w-full gap-2 text-center"
          >
            <h1
              class="text-start font-bold text-2xl drop-shadow-dark-lg dark:drop-shadow-light-lg"
            >
              {{ label }}
            </h1>
            <p
              class="transition-all text-start font-medium text-zinc-600 dark:text-zinc-400"
            >
              {{ sublabel }}
            </p>
          </header>

          <Timeline
            v-if="props.timeline"
            :values="
              props.timeline.map((v) => ({
                name: v as string,
                icon: 'line-md:calendar',
              }))
            "
          />
          <Message v-bind="props.message" />

          <section
            class="flex flex-col items-start justify-center w-full gap-5"
          >
            <template v-if="loaded">
              <slot name="context-area" />
              <Button
                v-if="$slots['button-area']"
                :loading="!props.button.loaded"
                severity="alien"
                class="px-3 py-2.5"
                @interaction="emit('interaction')"
              >
                <slot name="button-area" />
              </Button>
            </template>
            <template v-else>
              <PreloadInput v-for="i in 2" :key="i" />
            </template>
          </section>
        </div>

        <span />
      </div>
    </SplitterPanel>
    <SplitterPanel>
      <img
        src="/assets/images/form-background.png"
        class="transition-all fixed z-0 w-full min-h-screen max-h-screen object-cover opacity-30 dark:opacity-90"
      />
    </SplitterPanel>
  </Splitter>
</template>

<script lang="ts" setup>
const emit = defineEmits(["interaction"]);
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  sublabel: {
    type: String,
    required: true,
  },
  header: {
    type: {} as PropType<{
      paragraph: string;
      button: { to: string; text: string };
    }>,
    default: {},
  },
  timeline: {
    type: Array,
    default: undefined,
  },
  message: {
    type: {} as PropType<{
      visible: boolean;
      label: string;
      type: "error" | "success";
    }>,
    default: {},
  },
  loaded: {
    type: Boolean,
    default: false,
  },
  button: {
    type: {} as PropType<{ loaded: boolean }>,
    default: {},
  },
});

useHead({
  bodyAttrs: {
    class: "",
  },
});
</script>
