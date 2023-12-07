import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

const birthday = () => import("@/views/Birthday/index.vue");

const name = () => import("@/views/Name/NameTest.vue");

const home = () => import("@/views/Home/index.vue");

const routes: Array<RouteRecordRaw> = [
  { path: "/", redirect: "/Happy-Birthday/home" },
  { path: "/Happy-Birthday", redirect: "/Happy-Birthday/home" },
  {
    path: "/Happy-Birthday/home",
    component: home,
    meta: {},
  },
  {
    path: "/Happy-Birthday/birthday",
    component: birthday,
    meta: {},
  },
  {
    path: "/Happy-Birthday/name",
    component: name,
    meta: {},
  },
  {
    path: "/:path(.*)*",
    name: "notFound",
    component: home,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  next();
});

export default router;
