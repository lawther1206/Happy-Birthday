<template>
  <div class="center">
    <div class="audio" @click="togglePlayback">
      <Microphone v-if="birthdayMusic.isPlaying.value" />
      <Mute v-else />
    </div>

    <Login @showLogin="showLogin" v-if="state.isShow" />
    <div>
      <BirthdayCake v-if="!state.isShow" :name="state.name" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Microphone, Mute } from "@element-plus/icons-vue";
import { reactive, onMounted } from "vue";

import BirthdayCake from "@/components/BirthdayCake.vue";
import Login from "@/components/index.vue";
import { useSound } from "@vueuse/sound";

const birthdayMusic = useSound("/Happy-Birthday/audio/happy-birthday.mp3");

const state = reactive({
  isShow: true,
  name: "",
});

const togglePlayback = () => {
  birthdayMusic.isPlaying.value ? birthdayMusic.pause() : birthdayMusic.play();
};
onMounted(() => {
  birthdayMusic.play();
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
.audio {
  position: absolute;
  right: 20px;
  top: 20px;
  z-index: 999;
  width: 24px;
  color: #fff;
}

.rotate {
  animation: zoomInAndOut 2s infinite;
}

@keyframes zoomInAndOut {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style>
