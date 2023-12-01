<template>
  <button ref="clickBtn" @click="onClick">❤️绽放</button>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { animateParticles } from "@/utils/index";

const clickBtn = ref<HTMLElement | null>(null);

function onClick() {
  animateParticles({
    parent: clickBtn.value!,
    total: 40,
  });
}

onMounted(() => {
  setInterval(() => {
    onClick();
  }, 5500);
});
</script>

<style>
.like-btn-shape {
  --size: 8px;
  position: absolute;
  top: calc(50% - var(--size));
  left: calc(50% - var(--size));
  width: calc(var(--size) * 2);
  height: calc(var(--size) * 2);
  animation: popup var(--d) cubic-bezier(0.08, 0.56, 0.53, 0.98) forwards;
}

.square {
  border-radius: 4px;
  background-color: var(--c);
}

.circle {
  border-radius: 50%;
  background-color: var(--c);
}

.triangle {
  width: 0;
  height: 0;
  background-color: none;
  border-top: var(--size) solid transparent;
  border-bottom: calc(var(--size) * 2) solid var(--c);
  border-left: var(--size) solid transparent;
  border-right: var(--size) solid transparent;
}

.heart {
  --size: 6px;
  background-color: var(--c);
}

.heart::before,
.heart::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: var(--c);
  border-radius: 50%;
}

.heart::before {
  left: -50%;
}

.heart::after {
  top: -50%;
}

@keyframes popup {
  0% {
    opacity: 0;
  }

  60% {
    opacity: 1;
  }

  100% {
    opacity: 0;
    transform: translate(var(--x), var(--y)) rotate(var(--r));
  }
}
</style>
