import {
  Box,
  Button,
  Checkbox,
  TextField,
  ToastService,
  useCell,
} from "@davy/core";
import { createSignal } from "solid-js";
import { preferences, resetPreferences, savePreferences } from "../preferences";

export const SettingsPanel = () => {
  const [saved] = useCell(preferences);
  const [displayName, setDisplayName] = createSignal(saved().displayName);
  const [showGreeting, setShowGreeting] = createSignal(saved().showGreeting);
  const [busy, setBusy] = createSignal(false);
  const [error, setError] = createSignal("");

  const updatePreferences = async (reset = false) => {
    if (busy()) {
      return;
    }

    setBusy(true);
    setError("");

    try {
      if (reset) {
        await resetPreferences();
      } else {
        await savePreferences({
          displayName: displayName().trim() || "Davy",
          showGreeting: showGreeting(),
        });
      }

      setDisplayName(saved().displayName);
      setShowGreeting(saved().showGreeting);
      ToastService.success(reset ? "Preferences reset" : "Preferences saved");
    } catch {
      setError("Preferences could not be saved. Try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <Box spacing={12}>
      <p>Save preferences, then reload Davy to restore them.</p>

      <TextField
        label="Display name"
        value={displayName()}
        onValueInput={setDisplayName}
        disabled={busy()}
      />
      <Checkbox
        label="Show greeting"
        checked={showGreeting()}
        onCheckedChange={setShowGreeting}
        disabled={busy()}
      />

      <Button
        text="Save"
        icon="save"
        disabled={busy()}
        onClick={() => void updatePreferences()}
      />
      <Button
        text="Reset preferences"
        icon="refresh"
        disabled={busy()}
        onClick={() => void updatePreferences(true)}
      />

      {error() && <p role="alert">{error()}</p>}
      {saved().showGreeting && (
        <p role="status">Hello, {saved().displayName}!</p>
      )}
    </Box>
  );
};
