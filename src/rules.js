const rules = {
    isGuest(to, from, next) {
      if (localStorage.getItem("token") && to.path !== "/dashboard") {
        return next("/dashboard");
      }
      next();
    },
    isLoggedIn(to, from, next) {
      if (!localStorage.getItem("token") && to.path !== "/login") {
        return next("/login");
      }
      next();
    }
  };
  
  export default rules;
  