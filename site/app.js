const searchInput = document.querySelector('#care-search');
const filterButtons = [...document.querySelectorAll('.filter-button')];
const services = [...document.querySelectorAll('.service-item')];
const emptyState = document.querySelector('#empty-state');
const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#primary-nav');

let activeFilter = 'all';

function updateServices() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  let visibleCount = 0;

  for (const service of services) {
    const matchesFilter = activeFilter === 'all' || service.dataset.category === activeFilter;
    const matchesSearch = service.dataset.name.includes(searchTerm) || service.textContent.toLowerCase().includes(searchTerm);
    const isVisible = matchesFilter && matchesSearch;
    service.hidden = !isVisible;
    if (isVisible) visibleCount += 1;
  }

  emptyState.hidden = visibleCount > 0;
}

for (const button of filterButtons) {
  button.addEventListener('click', () => {
    activeFilter = button.dataset.filter;
    for (const filterButton of filterButtons) {
      const isActive = filterButton === button;
      filterButton.classList.toggle('is-active', isActive);
      filterButton.setAttribute('aria-pressed', String(isActive));
    }
    updateServices();
  });
}

searchInput.addEventListener('input', updateServices);
document.querySelector('.search-box kbd').addEventListener('click', () => searchInput.focus());
document.addEventListener('keydown', (event) => {
  if (event.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
    event.preventDefault();
    searchInput.focus();
  }
});

menuToggle.addEventListener('click', () => {
  const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isExpanded));
  menuToggle.setAttribute('aria-label', isExpanded ? 'Open navigation' : 'Close navigation');
  navigation.classList.toggle('is-open', !isExpanded);
});

navigation.addEventListener('click', (event) => {
  if (event.target.closest('a')) {
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation');
    navigation.classList.remove('is-open');
  }
});

document.querySelector('#year').textContent = new Date().getFullYear();