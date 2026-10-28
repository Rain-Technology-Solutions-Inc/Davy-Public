import { isEmbedded, ToolService, type PluginContext } from "@davy/core";
import { HelloPanel } from "./components/HelloPanel";

export const startPlugin = (_context: PluginContext) => {
  if (isEmbedded()) {
    return;
  }

  ToolService.addTool({
    id: "example.hello-panel",
    title: "Hello panel",
    icon: "info",
    component: HelloPanel,
  });
};
