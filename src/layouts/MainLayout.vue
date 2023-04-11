<script setup>
import { useMeta } from "quasar";

useMeta({
  title: "Certificate of Appearance",
});
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          <q-img
            src="philhealth.png"
            fit="contain"
            width="50px"
            height="50px"
          />
          Certificate of Appearance
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-footer elevated>
      <q-toolbar>
        <q-toolbar-title class="text-subtitle2 text-right">
          Developed and maintained by IT Unit of PRO NCR Central
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
