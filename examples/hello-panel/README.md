# Hello panel

Register a toolbar tool and render its panel using Davy's `Box`, `TextField`,
`SimpleCard`, and `Button`. Solid's signal updates the greeting as you type;
`ToastService` displays it when you press **Say hello**.

## Run it

Follow the [workspace setup](../README.md), copy this folder to
`plugins/hello-panel`, and add `hello-panel/dist` to `plugins/plugins.json`.
Run `npm run check` and `npm run dev` from the workspace root.

Open **Hello panel** from the toolbar. Enter a name and press **Say hello**.
The name is local UI state and resets when the panel is recreated.

## Source

- [`lib/plugin.ts`](lib/plugin.ts) registers the tool during `startPlugin`.
- [`lib/components/HelloPanel.tsx`](lib/components/HelloPanel.tsx) owns the UI.
- [`lib/index.ts`](lib/index.ts) exports startup and the embedded root panel.

No plugin runtime holder is needed because this example does not use storage,
files, networking, or other context services. Davy supplies the component styles
and panel padding.

## Embedded build

From the workspace root, run:

```sh
npm run build:embedded -- hello-panel --prod
```

Serve the complete `plugins/hello-panel/dist/embedded/` directory over local
HTTP(S) in a WebView. Davy runs `startPlugin` and renders `rootPanel` directly;
`isEmbedded()` skips toolbar registration. This example needs no host map or
storage providers.

Run the embedded build after normal plugin builds, which clear `dist/`.
The bundle contains web assets, not a native installer. See
[Davy Embedded](https://davy.raintechsolutions.com/docs/guides/embedded-builds)
for host integration.
