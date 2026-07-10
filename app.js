const steps = [...document.querySelectorAll('.step')];
const progressValue = document.getElementById('progress-value');
const progressLabel = document.getElementById('progress-label');
const mobileStepNumber = document.getElementById('mobile-step-number');
const prevButton = document.getElementById('prev-step');
const nextButton = document.getElementById('next-step');
let currentStep = 0;

function updateProgress(index) {
  currentStep = Math.max(0, Math.min(index, steps.length - 1));
  const number = currentStep + 1;
  progressValue.style.width = `${(number / steps.length) * 100}%`;
  progressLabel.textContent = `Pasul ${number} din ${steps.length}`;
  mobileStepNumber.textContent = `${number} / ${steps.length}`;
  prevButton.disabled = currentStep === 0;
  nextButton.disabled = currentStep === steps.length - 1;
  nextButton.querySelector('span').textContent = currentStep === steps.length - 1 ? 'Final' : 'Următorul';
}

const observer = new IntersectionObserver((entries) => {
  const visible = entries
    .filter((entry) => entry.isIntersecting)
    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
  if (!visible) return;
  const index = steps.indexOf(visible.target);
  if (index >= 0) updateProgress(index);
}, { rootMargin: '-22% 0px -52% 0px', threshold: [0, .15, .35, .6] });

steps.forEach((step) => observer.observe(step));
updateProgress(0);

prevButton.addEventListener('click', () => {
  steps[Math.max(0, currentStep - 1)].scrollIntoView({ behavior: 'smooth', block: 'start' });
});
nextButton.addEventListener('click', () => {
  steps[Math.min(steps.length - 1, currentStep + 1)].scrollIntoView({ behavior: 'smooth', block: 'start' });
});

const overviewDialog = document.getElementById('overview-dialog');
document.querySelector('[data-open-overview]').addEventListener('click', () => overviewDialog.showModal());
document.querySelectorAll('[data-close-dialog]').forEach((element) => {
  element.addEventListener('click', () => overviewDialog.close());
});
overviewDialog.addEventListener('click', (event) => {
  if (event.target === overviewDialog) overviewDialog.close();
});

const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxCaption = document.getElementById('lightbox-caption');

document.querySelectorAll('.phone-shot').forEach((figure) => {
  figure.addEventListener('click', (event) => {
    if (event.target.closest('figcaption')) return;
    lightboxImage.src = figure.dataset.lightboxSrc;
    lightboxImage.alt = figure.dataset.lightboxAlt || '';
    lightboxCaption.textContent = figure.dataset.lightboxAlt || '';
    lightbox.showModal();
  });
});

document.querySelector('.lightbox-close').addEventListener('click', () => lightbox.close());
lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) lightbox.close();
});
