<template>
  <div>
    <NuxtLayout name="auth" v-bind="layout" @interaction="onVerify()">
      <template #context-area>
        <div class="flex items-center w-full gap-5">
          <InputFloat
            v-model:value="inputs.firstName"
            :label="t('pages.auth.register.inputs.firstName')"
            type="text"
          />
          <InputFloat
            v-model:value="inputs.lastName"
            :label="t('pages.auth.register.inputs.lastName')"
            type="text"
          />
        </div>
        <InputFloat
          v-model:value="inputs.username"
          :label="t('pages.auth.register.inputs.username')"
          type="text"
        />
        <InputFloat
          v-model:value="inputs.email"
          :label="t('pages.auth.register.inputs.email')"
          type="email"
        />
        <InputFloat
          v-model:value="inputs.password"
          :label="t('pages.auth.register.inputs.password')"
          type="password"
        />
      </template>
      <template #button-area>
        {{ t("pages.auth.register.buttons.submit") }}
      </template>
    </NuxtLayout>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();
const { localePath } = useImports();

const layout = reactive({
  label: t("pages.auth.register.label"),
  sublabel: t("pages.auth.register.sublabel"),
  loaded: true,
  header: {
    paragraph: t("pages.auth.register.header.subtext"),
    button: { text: t("pages.auth.register.header.text"), to: "/auth/login" },
  },
  message: {
    label: t("pages.auth.register.messages.error"),
    visible: false,
    type: "error",
  },
  button: {
    loaded: true,
  },
});

const inputs = reactive({
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  password: "",
});

async function onVerify() {
  layout.button.loaded = false;

  const { error } = await useFetch("/api/auth/register", {
    method: "POST",
    body: {
      ...inputs,
    },
  });

  if (error.value) {
    layout.message.label = t("pages.auth.register.messages.error");
    layout.message.visible = true;
  } else {
    layout.message.label = t("pages.auth.register.messages.success");
    layout.message.type = "success";
    layout.message.visible = true;

    useDebounceFn(() => navigateTo(localePath("/auth/login")), 2000)();
  }

  setTimeout(() => (layout.message.visible = false), 5000);

  layout.button.loaded = true;
}
</script>
