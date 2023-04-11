<script setup>
import { useQuasar } from "quasar";
import { useGenerateAppearanceStore } from "src/stores/GenerateAppearancePDF";
import { useRouter } from "vue-router";

const $q = useQuasar();
const gas = useGenerateAppearanceStore();
const router = useRouter();

const handleSubmit = () => {
  try {
    gas.generatePdf();
    $q.dialog({
      message: "Certificate of Appearance has been generated!",
      ok: true,
    });
  } catch (error) {
    $q.dialog({
      message: "Failed to generate pdf!",
      color: "negative",
    });
  }
};

const handleCreateSignature = () => router.push({ name: "signature-pad-page" });
</script>

<template>
  <q-card style="max-width: 80%; width: 800px">
    <q-card-section> </q-card-section>
    <q-card-section class="text-h6"> Enter your info: </q-card-section>
    <q-form @submit.prevent="handleSubmit" greedy>
      <q-card-section class="q-col-gutter-sm">
        <div class="row q-col-gutter-sm">
          <q-input
            v-model="gas.form.ob_date"
            class="col-12 col-md-6"
            label="OB date"
            type="date"
            outlined
            :rules="[(val) => !!val || 'OB date is required!']"
          />
          <q-input
            v-model="gas.form.place_visited"
            class="col-12 col-md-6"
            label="Place Visited"
            outlined
            :rules="[(val) => !!val || 'Place visited is required!']"
          />
        </div>
        <q-input
          v-model="gas.form.employee_name"
          class="col-12"
          label="Employee name"
          outlined
          :rules="[(val) => !!val || 'Employee name is required!']"
        />
        <div class="row q-col-gutter-sm">
          <q-input
            v-model="gas.form.time_of_arrival"
            class="col-12 col-md-6"
            label="Time of Arrival"
            type="time"
            outlined
            :rules="[(val) => !!val || 'Time of Arrival is required!']"
          />
          <q-input
            v-model="gas.form.time_of_departure"
            class="col-12 col-md-6"
            label="Time of Departure"
            type="time"
            outlined
            :rules="[(val) => !!val || 'Time of Departure is required!']"
          />
        </div>
        <q-input
          v-model="gas.form.person_visited"
          class="col"
          label="Person visited"
          outlined
          :rules="[(val) => !!val || 'Person Visited is required!']"
        />
        <q-toolbar>
          <div class="text-weight-bold">Person Visited Signature</div>
          <q-space />
          <q-btn
            @click="handleCreateSignature"
            label="CREATE SIGNATURE"
            outline
            color="primary"
            icon="person"
          />
        </q-toolbar>

        <!-- DISPLAY THE SIGNATURE -->
        <div class="row justify-center q-mt-md">
          <div class="col-12 col-md-6">
            <q-img
              v-if="gas.form.signature"
              :src="gas.form.signature"
              alt="person visited signature"
            />
          </div>
        </div>

        <q-toolbar>
          <div class="text-weight-bold">Person Visited Id</div>
          <q-space />
          <q-btn
            :to="{ name: 'camera-capture-page' }"
            icon="photo_camera"
            label="TAKE ID PIC"
            color="primary"
            outline
          />
        </q-toolbar>

        <!-- DISPLAY THE CAPTURED ID  -->
        <div class="row justify-center q-col-gutter-md">
          <div class="col-12 col-md-6">
            <q-img v-if="gas.form.image" :src="gas.form.image" />
          </div>
        </div>
      </q-card-section>

      <q-card-actions>
        <q-btn
          v-if="gas.form.image !== null"
          label="GENERATE"
          type="submit"
          class="full-width"
          color="primary"
        />
      </q-card-actions>
    </q-form>
  </q-card>
</template>
