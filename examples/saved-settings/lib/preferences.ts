import { cell, isBoolean, isRecord, isString } from "@davy/core";
import { runtime } from "./runtime";

export interface Preferences {
  displayName: string;
  showGreeting: boolean;
}

export const defaults: Preferences = {
  displayName: "Davy",
  showGreeting: true,
};
export const preferences = cell<Preferences>({ ...defaults });

export const loadPreferences = async () => {
  const saved = await runtime.store.get<unknown>("preferences");

  // Stored data may come from an earlier version of this plugin.
  if (
    isRecord(saved) &&
    isString(saved.displayName) &&
    isBoolean(saved.showGreeting)
  ) {
    preferences.set({
      displayName: saved.displayName,
      showGreeting: saved.showGreeting,
    });
  }
};

export const savePreferences = async (value: Preferences) => {
  await runtime.store.set("preferences", value);
  preferences.set(value);
};

export const resetPreferences = async () => {
  // Delete only this plugin's key, not the application's shared store.
  await runtime.store.delete("preferences");
  preferences.set({ ...defaults });
};
