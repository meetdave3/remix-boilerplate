import invariant from "tiny-invariant";

export function getEnv() {
  invariant(process.env.SESSION_SECRET, "Missing env SESSION_SECRET");

  return {
    SESSION_SECRET: process.env.SESSION_SECRET,
  };
}

declare global {
  var ENV: ReturnType<typeof getEnv>;
}
