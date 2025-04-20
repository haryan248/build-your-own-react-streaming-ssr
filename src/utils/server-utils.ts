import { fileURLToPath } from "node:url";

const buildDir = new URL("../build/", import.meta.url);

export function resolveBuild(path = "") {
  return fileURLToPath(new URL(path, buildDir));
}

export const resolveCWD = (path: string, basePath: string) => {
  const baseURL = new URL("./", basePath);

  return fileURLToPath(new URL(path, baseURL));
};
