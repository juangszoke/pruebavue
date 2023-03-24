export default function authGuard(to, from, next) {
  const isAuthenticated = localStorage.getItem("user");

  if (to.path === "/" && !isAuthenticated) {
    next("/login");
  } else {
    next();
  }
}
