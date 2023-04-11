<script setup>
import { onMounted } from "vue";

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
});

onMounted(() => console.log(props.src));
</script>

<template>
  <q-dialog>
    <q-card style="max-width: 80%">
      <q-card-section>
        <iframe :src="props.src" width="700" height="500"></iframe>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
