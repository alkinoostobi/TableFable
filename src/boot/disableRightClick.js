export default ({ app }) => {
  app.directive('no-right-click', {
    mounted(el) {
      el.addEventListener('contextmenu', function(e) {
        e.preventDefault();
      });
    }
  });
};
