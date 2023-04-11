<script setup>
import { useQuasar } from "quasar";
import { ref, onMounted, onUnmounted } from "vue";
import Camera from "simple-vue-camera";
import { useGenerateAppearanceStore } from "src/stores/GenerateAppearancePDF";

const cameraRef = ref(null);
const showCamera = ref(false);
const gas = useGenerateAppearanceStore();
const dialogRef = ref(null);
const cameraStatus = ref("");
const cameraLoading = ref(false);

const $q = useQuasar();

const snapshot = async () => {
  try {
    const blob = await cameraRef.value?.snapshot();
    gas.form.image = URL.createObjectURL(blob);
    dialogRef.value.hide();
  } catch (error) {
    $q.dialog({
      message: "Failed capture image!",
    });
  }
};

const handleLoading = () => {
  cameraStatus.value = "loading";
  console.log(cameraStatus.value, cameraLoading.value);
};
const handleStarted = () => {
  cameraStatus.value = "started";
  console.log(cameraStatus.value);
  console.log(cameraStatus.value, cameraLoading.value);
};
const handleError = () => {
  cameraStatus.value = "error";
  cameraLoading.value = false;
  $q.dialog({
    message:
      "Error: Failed to load capture device! Please check the capture device",
    color: "negative",
  }).onOk(() => dialogRef.value.hide());
};

onMounted(() => (showCamera.value = true));
onUnmounted(() => (showCamera.value = false));
</script>

<template>
  <q-dialog ref="dialogRef">
    <q-card style="max-width: 80%">
      <q-card-section>
        <div class="row justify-center q-gutter-md">
          <q-spinner
            v-if="cameraStatus === 'loading'"
            class="flex flex-center"
            color="primary"
            size="3em"
            :thickness="2"
          />
          <Camera
            @loading="handleLoading"
            @started="handleStarted"
            @error="handleError"
            ref="cameraRef"
            :resolution="{ width: 1920, height: 1080 }"
            :autoplay="showCamera"
          />
        </div>
      </q-card-section>

      <q-card-actions align="center">
        <q-btn v-close-popup color="negative" label="CANCEL" icon="camera" />
        <q-btn
          @click="snapshot"
          color="primary"
          label="CAPTURE"
          icon="camera"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
