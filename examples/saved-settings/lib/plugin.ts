import { ToolService, type PluginContext } from "@davy/core";
import { SettingsPanel } from "./components/SettingsPanel";
import { loadPreferences } from "./preferences";
import { runtime } from "./runtime";

export const startPlugin = async (context: PluginContext) => {
  runtime.start(context);
  await loadPreferences();

  ToolService.addTool({
    id: "example.saved-settings",
    title: "Saved settings",
    icon: "settings",
    component: SettingsPanel,
  });
};
