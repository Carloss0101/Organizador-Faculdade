export function mostrarLoading() {
  if (document.getElementById("loading-overlay")) return;

  const overlay = document.createElement("div");
  overlay.id = "loading-overlay";

  const spinner = document.createElement("div");
  spinner.className = "spinner";

  overlay.appendChild(spinner);
  document.body.appendChild(overlay);
}

export function esconderLoading() {
  const overlay = document.getElementById("loading-overlay");
  if (overlay) {
    overlay.remove();
  }
}