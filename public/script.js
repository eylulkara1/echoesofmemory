// ✅ Setup hotspot event listeners after page loads
document.addEventListener("DOMContentLoaded", function () {
    const hotspots = [];
    for (let i = 1; i <= 10; i++) {
        hotspots.push(document.getElementById(`hotspot${i}`));
    }

    hotspots.forEach((hotspot, index) => {
        if (hotspot) {
            hotspot.addEventListener('click', () => zoomIn(`area${index + 1}`, `hotspot${index + 1}`));
        }
    });
});

function zoomIn(area) {
    const img = document.getElementById('tapestry');
    const overlay = document.getElementById('gray-overlay');
    const textBox = document.querySelector('.text-box');
    const allHotspots = document.querySelectorAll('.hotspot');
    const header = document.querySelector('header');

    if (!img || !overlay || !textBox || !header) {
        console.error("One or more elements are missing in the HTML.");
        return;
    }

    allHotspots.forEach(hotspot => hotspot.style.display = 'none');
    textBox.style.display = 'none';

    const zoomAreas = {
        "area1": { scale: 4, origin: "300px 130px" },
        "area2": { scale: 4, origin: "610px 360px" },
        "area3": { scale: 4.2, origin: "600px 110px" },
        "area4": { scale: 3.6, origin: "800px 130px" },
        "area5": { scale: 3.5, origin: "440px 330px" },
        "area6": { scale: 3.5, origin: "280px 300px" },
        "area7": { scale: 3.6, origin: "270px 400px" },
        "area8": { scale: 3, origin: "730px 600px" },
        "area9": { scale: 4.2, origin: "200px 630px" },
        "area10": { scale: 3.5, origin: "780px 300px" }
    };

    if (zoomAreas[area]) {
        img.style.transition = "transform 1.5s ease";
        img.style.transform = `scale(${zoomAreas[area].scale})`;
        img.style.transformOrigin = zoomAreas[area].origin;
    }

    overlay.style.display = 'block';
    header.style.display = 'none';
    document.body.style.overflow = 'hidden';

    const videoPlaceholders = {
        "area1": document.getElementById('video-placeholder'),
        "area2": document.getElementById('video-container2'),
        "area3": document.getElementById('video-container3'),
        "area4": document.getElementById('video-container4'),
        "area5": document.getElementById('video-container5'),
        "area6": document.getElementById('video-container6'),
        "area7": document.getElementById('video-container7'),
        "area8": document.getElementById('video-container8'),
        "area9": document.getElementById('video-container9'),
        "area10": document.getElementById('video-container10')
    };

    Object.values(videoPlaceholders).forEach(placeholder => {
        if (placeholder) placeholder.style.display = 'none';
    });

    if (videoPlaceholders[area]) {
        videoPlaceholders[area].style.display = 'flex';

        if (zoomAreas[area].videoPos) {
            videoPlaceholders[area].style.top = zoomAreas[area].videoPos.top;
            videoPlaceholders[area].style.left = zoomAreas[area].videoPos.left;
        }

        setTimeout(() => {
            videoPlaceholders[area].classList.add('active');
        }, 50);

        const videoElement = videoPlaceholders[area].querySelector('video');
        if (videoElement) {
            videoElement.currentTime = 0;
            videoElement.play();
        }
    }
}

// 🧹 Detect clicks outside to reset zoom
document.addEventListener('click', function (event) {
    if (!event.target.classList.contains('hotspot') && !event.target.closest('.video-placeholder')) {
        const img = document.getElementById('tapestry');
        const overlay = document.getElementById('gray-overlay');
        const textBox = document.querySelector('.text-box');
        const allHotspots = document.querySelectorAll('.hotspot');
        const header = document.querySelector('header');

        if (!img || !overlay || !textBox || !header) return;

        img.style.transition = "transform 0.9s ease";
        img.style.transform = "scale(1)";
        img.style.transformOrigin = "center center";

        overlay.style.display = 'none';
        textBox.style.display = 'block';

        allHotspots.forEach(hotspot => hotspot.style.display = 'block');
        header.style.display = 'block';

        document.querySelectorAll('video').forEach(video => video.pause());

        document.querySelectorAll('.video-placeholder').forEach(placeholder => {
            placeholder.style.display = 'none';
            placeholder.classList.remove('active');
        });

        document.body.style.overflow = 'auto';
    }
});