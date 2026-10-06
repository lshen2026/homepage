// Each navigation item loads its own editable HTML file.
const routes = {
  home: { file: 'home', title: 'Lu Shen' },
  research: { file: 'research', title: 'Research' },
  publications: { file: 'publication', title: 'Publications' },
  people: { file: 'people', title: 'People' },
  teaching: { file: 'teaching', title: 'Teaching' },
  about: { file: 'about', title: 'About' },
  contact: { file: 'contact', title: 'Contact' }
};
const view = document.querySelector('#view');
const navigation = document.querySelector('nav');
const menu = document.querySelector('#menu');
const cache = new Map();
let requestNumber = 0;

async function render(focusContent = false) {
  const requested = location.hash.slice(1) || 'home';
  const selected = Object.hasOwn(routes, requested) ? requested : 'home';
  const route = routes[selected];
  const currentRequest = ++requestNumber;
  view.setAttribute('aria-busy', 'true');
  navigation.classList.remove('open');
  menu.setAttribute('aria-expanded', 'false');
  try {
    if (!cache.has(route.file)) {
      const response = await fetch(`pages/${route.file}.html`);
      if (!response.ok) throw new Error(`Page request failed: ${response.status}`);
      cache.set(route.file, await response.text());
    }
    // Ignore responses for pages the visitor has already left.
    if (currentRequest !== requestNumber) return;
    view.innerHTML = cache.get(route.file);
    view.className = `page-${selected}`;
    document.title = `${route.title}${selected === 'home' ? '' : ' | Lu Shen'} | Peking University`;
    navigation.querySelectorAll('a').forEach(link => {
      if (link.hash === `#${selected}`) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
    window.scrollTo(0, 0);
    if (focusContent) document.querySelector('#content').focus({preventScroll: true});
  } catch (error) {
    if (currentRequest !== requestNumber) return;
    view.innerHTML = '<p>This page could not be loaded. Please refresh and try again.</p>';
    console.error(error);
  } finally {
    if (currentRequest === requestNumber) view.setAttribute('aria-busy', 'false');
  }
}
menu.addEventListener('click', () => {
  const open = navigation.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(open));
});
window.addEventListener('hashchange', () => render(true));
render();
