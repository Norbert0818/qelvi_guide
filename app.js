'use strict';

const steps = Array.from(document.querySelectorAll('.step'));
const progressValue = document.getElementById('progress-value');
const progressLabel = document.getElementById('progress-label');
const mobileStepNumber = document.getElementById('mobile-step-number');
const prevButton = document.getElementById('prev-step');
const nextButton = document.getElementById('next-step');
let currentStep = 0;

function updateProgress(index) {
  if (!steps.length) return;

  currentStep = Math.max(0, Math.min(index, steps.length - 1));
  const number = currentStep + 1;

  if (progressValue) {
    progressValue.style.width = `${(number / steps.length) * 100}%`;
  }

  if (progressLabel) {
    progressLabel.textContent = `Pasul ${number} din ${steps.length}`;
  }

  if (mobileStepNumber) {
    mobileStepNumber.textContent = `${number} / ${steps.length}`;
  }

  if (prevButton) {
    prevButton.disabled = currentStep === 0;
  }

  if (nextButton) {
    nextButton.disabled = currentStep === steps.length - 1;
    const label = nextButton.querySelector('span');
    if (label) label.textContent = currentStep === steps.length - 1 ? 'Final' : 'Următorul';
  }
}

if ('IntersectionObserver' in window && steps.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) return;
      const index = steps.indexOf(visible.target);
      if (index >= 0) updateProgress(index);
    },
    {
      rootMargin: '-22% 0px -52% 0px',
      threshold: [0, 0.15, 0.35, 0.6],
    },
  );

  steps.forEach((step) => observer.observe(step));
}

prevButton?.addEventListener('click', () => {
  steps[Math.max(0, currentStep - 1)]?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
});

nextButton?.addEventListener('click', () => {
  steps[Math.min(steps.length - 1, currentStep + 1)]?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
});

const overviewDialog = document.getElementById('overview-dialog');
const openOverviewButton = document.querySelector('[data-open-overview]');

openOverviewButton?.addEventListener('click', () => {
  if (typeof overviewDialog?.showModal === 'function') overviewDialog.showModal();
});

document.querySelectorAll('[data-close-dialog]').forEach((element) => {
  element.addEventListener('click', () => overviewDialog?.close());
});

overviewDialog?.addEventListener('click', (event) => {
  if (event.target === overviewDialog) overviewDialog.close();
});

const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxClose = document.querySelector('.lightbox-close');

document.querySelectorAll('.phone-shot').forEach((figure) => {
  figure.addEventListener('click', (event) => {
    if (event.target.closest('figcaption')) return;

    const source = figure.dataset.lightboxSrc;
    if (!source || !lightbox || !lightboxImage) return;

    lightboxImage.src = source;
    lightboxImage.alt = figure.dataset.lightboxAlt || '';

    if (lightboxCaption) {
      lightboxCaption.textContent = figure.dataset.lightboxAlt || '';
    }

    if (typeof lightbox.showModal === 'function') lightbox.showModal();
  });
});

lightboxClose?.addEventListener('click', () => lightbox?.close());
lightbox?.addEventListener('click', (event) => {
  if (event.target === lightbox) lightbox.close();
});

updateProgress(0);
