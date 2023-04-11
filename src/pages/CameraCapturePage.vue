<script setup>
import { useQuasar } from "quasar";
import { ref, onMounted, onUnmounted } from "vue";
import Camera from "simple-vue-camera";
import { useGenerateAppearanceStore } from "src/stores/GenerateAppearancePDF";
import { useRouter } from "vue-router";

const cameraRef = ref(null);
const showCamera = ref(false);
const gas = useGenerateAppearanceStore();
const cameraStatus = ref("");
const cameraLoading = ref(false);

const $q = useQuasar();
const router = useRouter();

const snapshot = async () => {
  try {
    const blob = await cameraRef.value?.snapshot();
    gas.form.image = URL.createObjectURL(blob);
    router.back();
  } catch (error) {
    console.error(error);
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
    ok: true,
  });
};

onMounted(() => {
  showCamera.value = true;
  console.log(showCamera.value);
});
onUnmounted(() => (showCamera.value = false));
</script>

<template>
  <q-page padding>
    <q-page-sticky position="upper-right">
      <q-btn fab to="/" color="negative" label="CANCEL" icon="camera" />
      <q-btn
        fab
        @click="snapshot"
        color="primary"
        label="CAPTURE"
        icon="camera"
      />
    </q-page-sticky>
    <div class="row items-center justify-center q-gutter-md">
      <div style="max-height: 90%; height: 800px; max-width: 90%; width: 800px">
        <Camera
          @loading="handleLoading"
          @started="handleStarted"
          @error="handleError"
          ref="cameraRef"
          :resolution="{ width: 1920, height: 1080 }"
          autoplay
        >
        </Camera>
      </div>
    </div>
  </q-page>
</template>
