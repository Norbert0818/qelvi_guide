document.addEventListener("DOMContentLoaded", () => {
  initGuideNavigation();
  initOverviewDialog();
  initLightbox();
});

function initGuideNavigation() {
  const steps = [...document.querySelectorAll(".step")];

  if (steps.length === 0) {
    return;
  }

  const progressValue = document.getElementById("progress-value");
  const progressLabel = document.getElementById("progress-label");
  const mobileStepNumber = document.getElementById("mobile-step-number");
  const prevButton = document.getElementById("prev-step");
  const nextButton = document.getElementById("next-step");

  let currentStep = 0;

  function updateProgress(index) {
    currentStep = Math.max(0, Math.min(index, steps.length - 1));

    const number = currentStep + 1;
    const percentage = (number / steps.length) * 100;

    if (progressValue) {
      progressValue.style.width = `${percentage}%`;
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
      const nextLabel = nextButton.querySelector("span");

      nextButton.disabled = currentStep === steps.length - 1;

      if (nextLabel) {
        nextLabel.textContent =
          currentStep === steps.length - 1 ? "Final" : "Următorul";
      }
    }
  }

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort(
          (firstEntry, secondEntry) =>
            secondEntry.intersectionRatio - firstEntry.intersectionRatio,
        )[0];

      if (!visible) {
        return;
      }

      const index = steps.indexOf(visible.target);

      if (index >= 0) {
        updateProgress(index);
      }
    },
    {
      rootMargin: "-22% 0px -52% 0px",
      threshold: [0, 0.15, 0.35, 0.6],
    },
  );

  steps.forEach((step) => observer.observe(step));

  prevButton?.addEventListener("click", () => {
    const previousIndex = Math.max(0, currentStep - 1);

    steps[previousIndex].scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });

  nextButton?.addEventListener("click", () => {
    const nextIndex = Math.min(steps.length - 1, currentStep + 1);

    steps[nextIndex].scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });

  updateProgress(0);
}

function initOverviewDialog() {
  const overviewDialog = document.getElementById("overview-dialog");

  const openButton = document.querySelector("[data-open-overview]");

  if (!overviewDialog || !openButton) {
    return;
  }

  openButton.addEventListener("click", () => {
    overviewDialog.showModal();
  });

  document.querySelectorAll("[data-close-dialog]").forEach((element) => {
    element.addEventListener("click", () => {
      overviewDialog.close();
    });
  });

  overviewDialog.addEventListener("click", (event) => {
    if (event.target === overviewDialog) {
      overviewDialog.close();
    }
  });
}

function initLightbox() {
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightbox-image");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const closeButton = document.querySelector(".lightbox-close");

  if (!lightbox || !lightboxImage || !lightboxCaption || !closeButton) {
    return;
  }

  document.querySelectorAll(".phone-shot").forEach((figure) => {
    figure.addEventListener("click", (event) => {
      if (event.target.closest("figcaption")) {
        return;
      }

      const imageSource = figure.dataset.lightboxSrc;

      const imageAlt = figure.dataset.lightboxAlt || "";

      if (!imageSource) {
        return;
      }

      lightboxImage.src = imageSource;
      lightboxImage.alt = imageAlt;
      lightboxCaption.textContent = imageAlt;

      lightbox.showModal();
    });
  });

  closeButton.addEventListener("click", () => {
    lightbox.close();
  });

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      lightbox.close();
    }
  });
}
