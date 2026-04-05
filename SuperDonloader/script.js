function startDownload() {
    const progress = document.getElementById("progress");
    const status = document.getElementById("status");

    let percent = 0;
    status.innerText = "⏳ Przetwarzanie...";

    const interval = setInterval(() => {
        percent += Math.random() * 10;
        if (percent >= 100) {
            percent = 100;
            clearInterval(interval);

            status.innerText = "✅ Gotowe!";
        }

        progress.style.width = percent + "%";
    }, 200);
}
