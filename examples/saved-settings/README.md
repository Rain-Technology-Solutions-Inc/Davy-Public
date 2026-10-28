# Saved settings

Save a display name and a greeting preference using the plugin-scoped store.
The example separates editable form values from saved state, validates restored
JSON, and handles storage failures in the panel.

## Run it

Follow the [workspace setup](../README.md), copy this folder to
`plugins/saved-settings`, and add `saved-settings/dist` to `plugins/plugins.json`.
Run `npm run check` and `npm run dev` from the workspace root.

1. Open **Saved settings** from the toolbar.
2. Change the name or toggle the greeting, then press **Save**.
3. Reload the app at the same local address and reopen the tool. The saved values return.
4. Press **Reset preferences** to delete this plugin's saved key and restore defaults.

Unsaved edits are discarded when the panel is recreated. Browser data is tied
to the app's origin; changing the development host or port uses different storage.

## Source

- [`lib/plugin.ts`](lib/plugin.ts) starts the runtime and awaits restoration before
  registering the tool.
- [`lib/runtime.ts`](lib/runtime.ts) keeps the plugin's context available to its modules.
- [`lib/preferences.ts`](lib/preferences.ts) validates stored data and owns load,
  save, and reset operations.
- [`lib/components/SettingsPanel.tsx`](lib/components/SettingsPanel.tsx) uses Davy
  controls and `useCell` to render saved state reactively.

`runtime.store` scopes the `preferences` key to this plugin's package identity.
Keep that identity stable to retain saved data. Reset deletes only this key;
it does not clear other plugins' state.

This example uses a custom preference panel. To put preferences inside Davy's
built-in Settings screen, use `runtime.settings.registerSchema` instead. See
[Plugin Runtime](https://davy.raintechsolutions.com/docs/guides/plugin-runtime)
and [Store and Files](https://davy.raintechsolutions.com/docs/guides/store-and-files).
