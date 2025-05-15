// 📐 Dynamic scaling based on screen size
//function getDynamicScale(baseScale) {
   // const img = document.getElementById('tapestry');
   // const imgWidth = img?.clientWidth || window.innerWidth;

   // if (imgWidth > 2500) {
        //return baseScale * 0.7; // very large screens
   // } else if (imgWidth > 1800) {
        //return baseScale * 0.8; // large monitors
   // } else if (imgWidth > 1200) {
        //return baseScale * 0.9;
   // } else {
        //return baseScale; // laptops and small screens
   // }
//}

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
    console.log("Hotspot clicked: " + area);

    const img = document.getElementById('tapestry');
    const overlay = document.getElementById('gray-overlay');
    const textBox = document.querySelector('.text-box');
    const allHotspots = document.querySelectorAll('.hotspot');
    const header = document.querySelector('header');

    // Make sure elements exist
    if (!img || !overlay || !textBox || !header) {
        console.error("One or more elements are missing in the HTML.");
        return;
    }

    // Hide all hotspots and text
    allHotspots.forEach(hotspot => hotspot.style.display = 'none');
    textBox.style.display = 'none';

    // Define zoom settings for each area
    const zoomAreas = {
        "area1": { scale: 4, origin: "30% 19%" },
        "area2": { scale: 4, origin: "62% 48%" },
        "area3": { scale: 4.2, origin: "57% 16%", videoPos: { top: "40%", left: "50%" } },
        "area4": { scale: 3.6, origin: "75% 20%", videoPos: { top: "42%", left: "55%" } },
        "area5": { scale: 3.5, origin: "40% 42%", videoPos: { top: "50%", left: "45%" } },
        "area6": { scale: 3.5, origin: "25% 40%", videoPos: { top: "55%", left: "60%" } },
        "area7": { scale: 3.6, origin: "25% 60%", videoPos: { top: "65%", left: "40%" } },
        "area8": { scale: 3.1, origin: "72% 83%", videoPos: { top: "75%", left: "50%" } },
        "area9": { scale: 4.5, origin: "21% 87%", videoPos: { top: "80%", left: "30%" } },
        "area10": { scale: 4.7, origin: "79% 45%", videoPos: { top: "60%", left: "65%" } }
    };    
    
    // Define zoom settings for each area
    //const zoomAreas = {
       // "area1": { scale: getDynamicScale(4), origin: "30% 19%" },
       // "area2": { scale: getDynamicScale(4), origin: "62% 48%" },
       // "area3": { scale: getDynamicScale(4.2), origin: "57% 16%", videoPos: { top: "40%", left: "50%" } },
       // "area4": { scale: getDynamicScale(3.6), origin: "75% 20%", videoPos: { top: "42%", left: "55%" } },
       // "area5": { scale: getDynamicScale(3.5), origin: "40% 42%", videoPos: { top: "50%", left: "45%" } },
       // "area6": { scale: getDynamicScale(3.5), origin: "25% 40%", videoPos: { top: "55%", left: "60%" } },
       // "area7": { scale: getDynamicScale(3.6), origin: "25% 60%", videoPos: { top: "65%", left: "40%" } },
       // "area8": { scale: getDynamicScale(3.1), origin: "72% 83%", videoPos: { top: "75%", left: "50%" } },
       // "area9": { scale: getDynamicScale(4.5), origin: "21% 87%", videoPos: { top: "80%", left: "30%" } },
       // "area10": { scale: getDynamicScale(4.7), origin: "79% 45%", videoPos: { top: "60%", left: "65%" } }
    //};

    // 📈 Apply zoom
    if (zoomAreas[area]) {
        img.style.transition = "transform 1.5s ease"; // smooth zoom
        img.style.transform = `scale(${zoomAreas[area].scale})`;
        img.style.transformOrigin = zoomAreas[area].origin;
    }

    // 🌑 Show overlay and hide header
    overlay.style.display = 'block';
    header.style.display = 'none';

    // 🔒 Prevent dragging the page while zoomed in
    document.body.style.overflow = 'hidden';

    // 🎥 Handle video placeholders
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

    // Hide all video placeholders first
    Object.values(videoPlaceholders).forEach(placeholder => {
        if (placeholder) placeholder.style.display = 'none';
    });

    // Show the right video placeholder
    if (videoPlaceholders[area]) {
        videoPlaceholders[area].style.display = 'flex';
    
        // Move it to correct position if needed
        if (zoomAreas[area].videoPos) {
            videoPlaceholders[area].style.top = zoomAreas[area].videoPos.top;
            videoPlaceholders[area].style.left = zoomAreas[area].videoPos.left;
        }
        // 🔥 Add fade-in
        setTimeout(() => {
            videoPlaceholders[area].classList.add('active');
        }, 50); // short delay to trigger transition
    }

    // ▶️ Restart and auto-play video
    const videoElement = videoPlaceholders[area]?.querySelector('video');
    if (videoElement) {
        videoElement.currentTime = 0;
        videoElement.play();
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

        // 🎯 Smoothly reset zoom
        img.style.transition = "transform 0.9s ease"; // 🔥 Add smooth zoom-out
        img.style.transform = "scale(1)";
        img.style.position = "relative";
        img.style.left = "initial";
        img.style.top = "initial";
        img.style.transformOrigin = "center center";

        // Hide overlay
        overlay.style.display = 'none';

        // Show description box again
        textBox.style.display = 'block';

        // Show all hotspots
        allHotspots.forEach(hotspot => {
            hotspot.style.display = 'block';
        });

        // Show header again
        header.style.display = 'block';

        // 🔇 Pause all videos
        const videos = document.querySelectorAll('video');
        videos.forEach(video => {
            video.pause();
        });

       // Hide all video placeholders
        const videoPlaceholders = document.querySelectorAll('.video-placeholder');
        videoPlaceholders.forEach(placeholder => {
        placeholder.style.display = 'none';
        placeholder.classList.remove('active'); // 🔥 also remove active for smooth next fade-in
        });

        // 🔓 Re-enable page scrolling again
        document.body.style.overflow = 'auto';
    }
});

// 🔄 Reload page when resizing screen (to reset scales)
//window.addEventListener('resize', () => {
//    location.reload();
//});