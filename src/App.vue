<template>
  <div class="center">
    <Login @showLogin="showLogin" v-if="state.isShow" />
    <div>
      <BirthdayCake v-if="!state.isShow" :name="state.name" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";

import BirthdayCake from "@/components/BirthdayCake.vue";
import Login from "@/components/index.vue";
const state = reactive({
  isShow: true,
  name: "",
});

const showLogin = (name: string) => {
  state.name = name;
  state.isShow = !state.isShow;
};
</script>

<style scoped>
.center {
  height: 100vh;
}
</style>
