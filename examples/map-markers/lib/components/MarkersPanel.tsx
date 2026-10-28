import {
  Box,
  Button,
  geoPoint,
  getMap,
  PERSIST_FLAG,
  SimpleCard,
  TextField,
  ToastService,
  toLonLat,
  type FeatureNode,
} from "@davy/core";
import { createSignal, For, onCleanup } from "solid-js";

export const MarkersPanel = () => {
  const map = getMap();
  const layer = map.createLayer(
    {
      kind: "vector",
      label: "Example markers",
      tags: { [PERSIST_FLAG]: false },
    },
    true,
  );

  const [longitude, setLongitude] = createSignal("-77.0365");
  const [latitude, setLatitude] = createSignal("38.8977");
  const [features, setFeatures] = createSignal<FeatureNode[]>([]);
  const [error, setError] = createSignal("");
  const listeners = new Map<FeatureNode, () => void>();
  let nextMarker = 1;

  const addMarker = () => {
    const lon = Number(longitude());
    const lat = Number(latitude());

    if (
      !longitude().trim() ||
      !latitude().trim() ||
      !Number.isFinite(lon) ||
      !Number.isFinite(lat) ||
      lon < -180 ||
      lon > 180 ||
      lat < -90 ||
      lat > 90
    ) {
      setError("Enter longitude from -180 to 180 and latitude from -90 to 90.");
      return;
    }

    setError("");

    const title = `Marker ${nextMarker++}`;
    const feature = layer.createFeature(
      geoPoint(toLonLat([lat, lon]), { style: { title } }),
    );

    listeners.set(
      feature,
      feature.onClick(() => ToastService.info(`Selected ${title}`)),
    );
    setFeatures((current) => [...current, feature]);
    feature.zoomTo({ maxZoom: 14 });
  };

  const removeMarker = (feature: FeatureNode) => {
    listeners.get(feature)?.();
    listeners.delete(feature);
    feature.remove();
    setFeatures((current) => current.filter((item) => item !== feature));
  };

  const clearMarkers = () => {
    // Remove the features, keeping the layer available for the next marker.
    for (const feature of features()) {
      removeMarker(feature);
    }
  };

  onCleanup(() => {
    for (const unsubscribe of listeners.values()) {
      unsubscribe();
    }

    listeners.clear();
    layer.remove();
  });

  return (
    <Box spacing={12}>
      <p>
        Add a point, then click it on the map. Markers are temporary and belong
        to this panel.
      </p>

      <TextField
        label="Longitude"
        type="number"
        step="any"
        value={longitude()}
        onValueInput={setLongitude}
      />
      <TextField
        label="Latitude"
        type="number"
        step="any"
        value={latitude()}
        onValueInput={setLatitude}
      />
      {error() && <p role="alert">{error()}</p>}

      <Button text="Add marker" icon="add" onClick={addMarker} />
      <Button
        text="Clear markers"
        icon="trash"
        disabled={features().length === 0}
        onClick={clearMarkers}
      />

      <For each={features()}>
        {(feature) => (
          <SimpleCard
            title={String(
              feature.geojson?.properties?.style?.title ?? "Marker",
            )}
            icon="mapPin"
            actions={[
              {
                title: "Focus",
                icon: "target",
                onSelect: () => feature.zoomTo({ maxZoom: 14 }),
              },
              {
                title: "Remove",
                icon: "trash",
                variant: "danger",
                onSelect: () => removeMarker(feature),
              },
            ]}
          />
        )}
      </For>
    </Box>
  );
};
