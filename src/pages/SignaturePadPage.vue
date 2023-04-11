<script setup>
import { ref } from "vue";
import { VueSignaturePad } from "vue-signature-pad";
import { useGenerateAppearanceStore } from "src/stores/GenerateAppearancePDF";
import { useRouter } from "vue-router";
const signPadRef = ref(null);
const gas = useGenerateAppearanceStore();
const router = useRouter();

const handleUndo = () => signPadRef.value.undoSignature();
const handleClear = () => signPadRef.value.clearSignature();
const handleSave = () => {
  const { data } = signPadRef.value.saveSignature();
  gas.form.signature = data;
  router.back();
};
</script>

<template>
  <q-page padding>
    <VueSignaturePad class="signature" ref="signPadRef" style="height: 300px" />

    <div class="q-mt-md flex flex-center q-gutter-sm items-center">
      <q-btn @click="handleUndo" icon="undo" label="UNDO" color="info" />
      <q-btn @click="handleClear" icon="backspace" label="CLEAR" color="info" />
      <q-btn v-close-popup icon="close" label="CLOSE" color="info" />
      <q-btn @click="handleSave" icon="save" label="save" color="primary" />
    </div>
  </q-page>
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
