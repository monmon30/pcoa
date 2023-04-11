<script setup>
import { ref } from "vue";
import { VueSignaturePad } from "vue-signature-pad";
import { useGenerateAppearanceStore } from "src/stores/GenerateAppearancePDF";
const signPadRef = ref(null);
const dialogRef = ref(null);
const gas = useGenerateAppearanceStore();

const handleUndo = () => signPadRef.value.undoSignature();
const handleClear = () => signPadRef.value.clearSignature();
const handleSave = () => {
  const { data } = signPadRef.value.saveSignature();
  gas.form.signature = data;
  dialogRef.value.hide();
};
</script>

<template>
  <q-dialog ref="dialogRef">
    <q-card
      style="max-width: 80%; width: 800px; height: 1000px; max-height: 50%"
    >
      <q-card-section class="text-h5"> Signature Pad </q-card-section>
      <q-card-section>
        <VueSignaturePad class="signature" ref="signPadRef" height="250px" />
      </q-card-section>

      <q-card-actions align="center" class="q-gutter-sm">
        <q-btn @click="handleUndo" icon="undo" label="UNDO" color="info" />
        <q-btn
          @click="handleClear"
          icon="backspace"
          label="CLEAR"
          color="info"
        />
        <q-btn v-close-popup icon="close" label="CLOSE" color="info" />
        <q-btn @click="handleSave" icon="save" label="save" color="primary" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped>
.signature {
  border: double 3px transparent;
  border-radius: 5px;
  background-image: linear-gradient(white, white),
    radial-gradient(circle at top left, #4bc5e8, #9f6274);
  background-origin: border-box;
  background-clip: content-box, border-box;
}
</style>
