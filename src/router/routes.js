import authGuard from "src/authGuard.js";

const routes = [
  {
    path: "/",
    component: () => import("src/pages/MainLayout.vue"),
    beforeEnter: authGuard,
  },
  {
    path: "/login",
    component: () => import("src/login/LoginPage.vue"),
  },
  {
    path: "/register",
    component: () => import("src/login/RegisterPage.vue"),
  },

  // Always leave this as last one,
  // but you can also remove it
];

export default routes;
