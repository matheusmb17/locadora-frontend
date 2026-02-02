import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import UserView from "../views/UserView.vue";
import BookView from "../views/BookView.vue";
import EditView from "../views/PublisherView.vue";
import AlugView from "../views/RentalView.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import Auth from "@/services/auth";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: LoginView,
  },
  {
    path: "/registro",
    name: "register",
    component: RegisterView,
  },
  {
    path: "/home",
    name: "home",
    component: HomeView,
  },
  {
    path: "/usuario",
    name: "user",
    component: UserView,
  },
  {
    path: "/livro",
    name: "book",
    component: BookView,
  },
  {
    path: "/editora",
    name: "edit",
    component: EditView,
  },
  {
    path: "/aluguel",
    name: "alug",
    component: AlugView,
  },
  {
    path: "*",
    redirect: "/home",
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const publicPages = ["/", "/registro"];

  if (Auth.isAuthenticated() && publicPages.includes(to.path)) return next("/home");

  const authRequired = !publicPages.includes(to.path);

  if (authRequired && !Auth.isAuthenticated()) return next("/");

  next();
});

export default router;
