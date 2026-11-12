// Native disclosure keeps the project list usable without JavaScript.
const projectMenu = document.querySelector('.project-menu');
if (projectMenu) {
  const trigger = projectMenu.querySelector('summary');
  document.addEventListener('click', event => {
    if (!projectMenu.contains(event.target)) projectMenu.open = false;
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && projectMenu.open) {
      projectMenu.open = false;
      trigger.focus();
    }
  });
  projectMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => { projectMenu.open = false; });
  });
  document.addEventListener('focusin', event => {
    if (!projectMenu.contains(event.target)) projectMenu.open = false;
  });
}
