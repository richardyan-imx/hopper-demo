import type { IMXProvider } from "@imtbl/sdk";
import { providerStore, passportStore } from "./store";
import { get } from "svelte/store";

export async function login(): Promise<void> {
    const passport = get(passportStore);
    const provider: IMXProvider = await passport.connectImx();
    providerStore.set(provider);
  }

export async function handleLoginCallback(): Promise<void> {
    const passport = get(passportStore);
    await passport.loginCallback();    
}