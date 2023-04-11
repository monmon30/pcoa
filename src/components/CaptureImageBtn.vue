<script setup>
import { useQuasar } from "quasar";
import CaptureImage from "src/components/CaptureImage.vue";

const $q = useQuasar();

const handleClick = () => {
  $q.dialog({
    component: CaptureImage,
  });
};
</script>

<template>
  <q-btn
    @click="handleClick"
    icon="photo_camera"
    label="TAKE ID PIC"
    color="primary"
    outline
  />
</template>
