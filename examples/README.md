# Davy SDK examples

Small, independent plugins that demonstrate Davy's public APIs.

| Example                                    | Summary                                                                           |
| ------------------------------------------ | --------------------------------------------------------------------------------- |
| [Hello panel](hello-panel/README.md)       | Plugin startup, toolbar registration, Davy UI, toasts, and an embedded root panel |
| [Map markers](map-markers/README.md)       | Vector layers, points, map events, feature actions, and cleanup                   |
| [Saved settings](saved-settings/README.md) | Plugin runtime, scoped storage, validation, and reactive UI                       |

## Create a workspace

Obtain and extract the Davy SDK available to your account. Use the Node.js version
specified in the SDK's `.nvmrc`. From the directory containing `davy-sdk/`, run:

```sh
node ./davy-sdk/toolchain/bin/davy.js create workspace example-workspace
cd example-workspace
npm install
```

Keep the workspace alongside the extracted SDK: its package dependencies point
back to that folder. See [SDK Workspaces](https://davy.raintechsolutions.com/docs/guides/sdk-workspaces)
for installation and platform commands.

## Add an example

Copy the entire example directory into your workspace's `plugins/` directory.
For example, copy `examples/hello-panel/` to `example-workspace/plugins/hello-panel/`.
Do not run `npm install` inside the individual example.

Add `hello-panel/dist` to the `plugins` array in `plugins/plugins.json`. To load
all three examples, use:

```json
{
  "plugins": ["hello-panel/dist", "map-markers/dist", "saved-settings/dist"]
}
```

Preserve any other entries you still want to load. The workspace generator also
creates a starter plugin named `example-workspace`; remove its manifest entry
if you don't want to load it. These examples don't import one another, so no
additional TypeScript path mappings are needed.

## Check, run, and package

Run these commands from the workspace root:

```sh
npm run check
npm run dev
```

Open the local URL printed by the development host. Each example adds a named
toolbar tool; its README describes what to try. If a tool isn't visible, open
**Configure tools** and select it. Existing toolbar preferences can hide newly
added tools.

To produce distributable plugins:

```sh
npm run build:prod
```

Each plugin's `dist/` folder contains its JavaScript, CSS, metadata, declarations,
and a `.davy` archive. The SDK supplies Davy core and shared runtime dependencies;
they are not copied into each normal plugin archive.

The [Hello panel](hello-panel/README.md#embedded-build) also demonstrates building
a self-contained WebView bundle with Davy Embedded.
