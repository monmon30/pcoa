<script setup>
import { useQuasar } from "quasar";
import AppearanceForm from "../components/AppearanceForm.vue";
const $q = useQuasar();
</script>

<template>
  <q-page class="flex flex-center">
    <AppearanceForm :flat="$q.platform.is.mobile" />
  </q-page>
</template>
