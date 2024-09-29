import { defineStore } from "pinia";

export const useUserStore = defineStore({
  id: "userStore",
  state: () => ({
    user: null as object | null,
  }),
  getters: {
    setUser: (state) => (user: object | null) => {
      state.user = user;
    },
  },
  actions: {
    initUser() {
      const makeRequest = async () => {
        const authCookie = useCookie("auth") as {
          value: {
            access_token: string;
          };
        };

        const { error, data } = await useFetch("/api/users/@me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authCookie.value?.access_token}`,
          },
        });

        if (error.value) {
          // Pass
        } else {
          this.setUser(data);
        }
      };
      return makeRequest();
    },
  },
});
