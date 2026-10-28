import { ToolService, type PluginContext } from "@davy/core";
import { MarkersPanel } from "./components/MarkersPanel";

export const startPlugin = (_context: PluginContext) => {
  ToolService.addTool({
    id: "example.map-markers",
    title: "Map markers",
    icon: "mapPin",
    component: MarkersPanel,
  });
};
