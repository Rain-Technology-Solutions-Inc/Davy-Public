import { Box, Button, SimpleCard, TextField, ToastService } from "@davy/core";
import { createSignal } from "solid-js";

export const HelloPanel = () => {
  const [name, setName] = createSignal("");
  const greeting = () => `Hello, ${name().trim() || "Davy"}!`;

  return (
    <Box spacing={12}>
      <p>A plugin panel built with Davy's shared UI components.</p>

      <TextField
        label="Your name"
        placeholder="Davy"
        value={name()}
        onValueInput={setName}
      />

      <SimpleCard
        title={greeting()}
        description="The preview updates as you type."
      />

      <Button
        text="Say hello"
        icon="info"
        onClick={() => ToastService.success(greeting())}
      />
    </Box>
  );
};
