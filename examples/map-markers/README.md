# Map markers

Create a vector layer and interact with point features through Davy's map API.
The example uses `getMap`, `toLonLat`, `geoPoint`, `LayerNode`, and `FeatureNode`.

## Run it

Follow the [workspace setup](../README.md), copy this folder to
`plugins/map-markers`, and add `map-markers/dist` to `plugins/plugins.json`.
Run `npm run check` and `npm run dev` from the workspace root.

1. Open **Map markers** from the toolbar.
2. Enter longitude and latitude, then press **Add marker**. The map focuses it.
3. Click the point on the map to show a toast.
4. Use the card's action menu to focus or remove a marker.
5. Press **Clear markers**, then add another point to reuse the same layer.
6. Close the panel. Its layer and event subscriptions are removed.

Coordinates are WGS84. Davy's map and GeoJSON helpers use **longitude, latitude**;
`toLonLat([lat, lon])` converts a **latitude, longitude** pair into that order:

```ts
geoPoint(toLonLat([lat, lon]), { style: { title } });
```

The panel checks input ranges before conversion so it can show a helpful error
beside the controls. Markers added at the same coordinates overlap; change the
coordinates to see separate points.

## Source and lifetime

- [`lib/plugin.ts`](lib/plugin.ts) registers the toolbar tool.
- [`lib/components/MarkersPanel.tsx`](lib/components/MarkersPanel.tsx) creates the
  layer, validates coordinates, binds click handlers, and renders feature cards.

The layer is tagged with `PERSIST_FLAG: false`, so regular Davy does not save it
across reloads. Clearing removes only this example's features; disposing the
panel removes its layer. Other plugins' map content is left alone.

This example runs in the standard Davy host. To adapt it for an embedded host,
export the panel as `rootPanel`, skip toolbar registration, and supply a host map
provider. See [The Map](https://davy.raintechsolutions.com/docs/guides/the-map).
