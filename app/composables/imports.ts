export const useImports = () => {
  return {
    get router() {
      return useRouter();
    },
    get route() {
      return useRoute();
    },
    get localePath() {
      return useLocalePath();
    },
    get userStore() {
      return useUserStore();
    },
  };
};
