<template>
  <div>
    <NuxtLayout name="auth" v-bind="layout" @interaction="onVerify()">
      <template #context-area>
        <InputFloat
          v-if="form.timeline == 'verify'"
          v-model:value="inputs.email"
          :label="t('pages.auth.login.inputs.email')"
          type="email"
        />
        <InputFloat
          v-if="form.timeline == 'verify'"
          v-model:value="inputs.password"
          :label="t('pages.auth.login.inputs.password')"
          type="password"
        />
      </template>
      <template #button-area>
        {{
          form.timeline === "verify"
            ? t("pages.auth.login.buttons.verify")
            : t("pages.auth.login.buttons.submit")
        }}
      </template>
    </NuxtLayout>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();
const { app } = useRuntimeConfig();
const { localePath } = useImports();

const form = reactive({
  timeline: "verify",
});

const layout = reactive({
  label: t("pages.auth.login.label"),
  sublabel: t("pages.auth.login.sublabel"),
  loaded: true,
  header: {
    paragraph: t("pages.auth.login.header.subtext", { name: app.title }),
    button: { text: t("pages.auth.login.header.text"), to: "/auth/register" },
  },
  message: {
    label: t("pages.auth.login.messages.error"),
    visible: false,
    type: "error",
  },
  timeline: [
    t("pages.auth.login.timeline.verify"),
    t("pages.auth.login.timeline.submit"),
  ],
  button: {
    loaded: true,
  },
});

const inputs = reactive({
  email: "",
  password: "",
});

async function onVerify() {
  layout.button.loaded = false;

  const { error } = await useFetch("/api/auth/login", {
    method: "POST",
    body: {
      email: inputs.email,
      password: inputs.password,
    },
  });

  if (error.value) {
    layout.message.label = t("pages.auth.login.messages.error");
    layout.message.visible = true;
  } else {
    layout.message.label = t("pages.auth.login.messages.success");
    layout.message.type = "success";
    layout.message.visible = true;

    useDebounceFn(() => navigateTo(localePath("/")), 2000)();
  }

  setTimeout(() => (layout.message.visible = false), 5000);

  layout.button.loaded = true;
}
</script>
