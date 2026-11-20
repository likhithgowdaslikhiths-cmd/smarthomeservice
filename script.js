const WA = 'https://wa.me/918660519706?text=';
const DEFAULT_MESSAGE = 'Hi, I need an appliance repair in Mysore. My area is ____.';
let contactOpener = null;

function setDropdownState(dropdown, isOpen) {
  const trigger = dropdown.querySelector('.drop-trigger');
  dropdown.classList.toggle('open', isOpen);
  trigger.setAttribute('aria-expanded', String(isOpen));
}

function openContact(message = DEFAULT_MESSAGE) {
  const modal = document.getElementById('contactModal');
  if (modal) {
    contactOpener = document.activeElement;
    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    modal.querySelector('.modal-close')?.focus();
  }

  const whatsapp = document.getElementById('modalWhatsApp');
  if (whatsapp) whatsapp.href = WA + encodeURIComponent(message);
}

function closeContact() {
  const modal = document.getElementById('contactModal');
  if (!modal) return;

  modal.classList.remove('show');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  if (contactOpener instanceof HTMLElement) contactOpener.focus();
  contactOpener = null;
}

function initializePage() {
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const dropdowns = [...document.querySelectorAll('.dropdown')];

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      menuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
      menuToggle.textContent = isOpen ? '×' : '☰';
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Open menu');
        menuToggle.textContent = '☰';
      });
    });
  }

  dropdowns.forEach(dropdown => {
    const trigger = dropdown.querySelector('.drop-trigger');
    let openedByHover = false;
    trigger.addEventListener('click', () => {
      if (openedByHover && dropdown.classList.contains('open')) {
        openedByHover = false;
        return;
      }
      setDropdownState(dropdown, !dropdown.classList.contains('open'));
    });
    dropdown.addEventListener('pointerenter', event => {
      if (event.pointerType === 'mouse') {
        openedByHover = true;
        setDropdownState(dropdown, true);
      }
    });
    dropdown.addEventListener('pointerleave', event => {
      if (event.pointerType === 'mouse') {
        openedByHover = false;
        setDropdownState(dropdown, false);
      }
    });
    dropdown.addEventListener('focusin', event => {
      if (event.target !== trigger) setDropdownState(dropdown, true);
    });
    dropdown.addEventListener('focusout', event => {
      if (!dropdown.contains(event.relatedTarget)) setDropdownState(dropdown, false);
    });
  });

  document.addEventListener('click', event => {
    if (!(event.target instanceof Element) || !event.target.closest('.dropdown')) {
      dropdowns.forEach(dropdown => setDropdownState(dropdown, false));
    }
  });

  document.querySelectorAll('[data-contact]').forEach(element => {
    element.addEventListener('click', event => {
      event.preventDefault();
      openContact(element.dataset.message || DEFAULT_MESSAGE);
    });
  });

  document.querySelectorAll('.modal-close,.modal-backdrop').forEach(element => {
    element.addEventListener('click', event => {
      if (event.target === element) closeContact();
    });
  });

  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;

    const openDropdown = dropdowns.find(dropdown => dropdown.classList.contains('open'));
    if (openDropdown) {
      const trigger = openDropdown.querySelector('.drop-trigger');
      setDropdownState(openDropdown, false);
      trigger.focus();
    }

    if (mobileMenu?.classList.contains('open')) {
      mobileMenu.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open menu');
      menuToggle.textContent = '☰';
      menuToggle.focus();
    }

    if (document.getElementById('contactModal')?.classList.contains('show')) closeContact();
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializePage, { once: true });
} else {
  initializePage();
}
