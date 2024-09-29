import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export default defineNuxtPlugin((nuxtApp) => {
  const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs));

  return {
    provide: {
      cn,
    },
  };
});
