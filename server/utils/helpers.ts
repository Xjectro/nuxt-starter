export function createAvatarURL(names: string[]): string {
  const name = names.filter(Boolean).join(" ");
  return `https://ui-avatars.com/api/?size=128&bold=true&uppercase=true&background=ffffff&color=000000&name=${encodeURIComponent(name)}`;
}
