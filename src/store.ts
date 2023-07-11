import { writable } from "svelte/store";
import type { IMXProvider } from "@imtbl/sdk";
import { Environment, Passport, ImmutableConfiguration } from "@imtbl/sdk";

const passportConfig = {
  clientId: "dJSRl3RTNKif0L5d42b2ehMrWILqIgFN",
  redirectUri: "http://localhost:5173/login",
  logoutRedirectUri: "http://localhost:5173/logout",
  scope: "transact openid offline_access email",
  audience: "platform_api",
  baseConfig: new ImmutableConfiguration({
    environment: Environment.SANDBOX, // Set the appropriate environment value
    apiKey: "", // Provide the apiKey if required
  }),
};

const passport = new Passport(passportConfig);

export const providerStore = writable<IMXProvider | null>(null);
export const passportStore = writable<Passport>(passport);
