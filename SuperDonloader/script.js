function startDownload() {
    const url = document.getElementById("url").value;
    const format = document.getElementById("format").value;
    const status = document.getElementById("status");
    const progress = document.getElementById("progress");

    if (!url) {
        status.innerText = "❌ Wklej link!";
        return;
    }

    status.innerText = "⏳ Pobieranie...";
    progress.style.width = "0%";

    let percent = 0;

    const interval = setInterval(() => {
        percent += Math.random() * 15;
        if (percent >= 100) {
            percent = 100;
            clearInterval(interval);

            status.innerText = "✅ Gotowe! (symulacja)";
            
            // fake download pliku demo
            const a = document.createElement("a");
            a.href = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";
            a.download = "plik_demo.pdf";
            a.click();
        }

        progress.style.width = percent + "%";
    }, 300);
}
