/* ==========================================
   SayClo – Virtual Try-On (Pose Detection)
   ========================================== */

// Grab required DOM elements
const cameraVideo = document.getElementById("camera");
const overlayCanvas = document.getElementById("overlay");
const canvasContext = overlayCanvas.getContext("2d");

let poseDetector = null;
let selectedOverlayColor = "rgba(0,150,255,0.5)";


/* ==========================================
   Start Camera + Try-On
   ========================================== */

const startButton = document.getElementById("startTryOn");

if (startButton) {
    startButton.addEventListener("click", async () => {
        try {
            // Ask user for camera access
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true
            });

            cameraVideo.srcObject = stream;

            // Once video metadata is ready, match canvas size
            cameraVideo.onloadedmetadata = async () => {
                overlayCanvas.width = cameraVideo.videoWidth;
                overlayCanvas.height = cameraVideo.videoHeight;

                await initializePoseModel();
                runPoseDetection();
            };

        } catch (error) {
            console.error("Camera access denied:", error);
            alert("Please allow camera access to use virtual try-on.");
        }
    });
}


/* ==========================================
   Load AI Pose Detection Model
   ========================================== */

async function initializePoseModel() {
    const modelType = poseDetection.SupportedModels.MoveNet;
    poseDetector = await poseDetection.createDetector(modelType);
}


/* ==========================================
   Main Pose Detection Loop
   ========================================== */

async function runPoseDetection() {

    if (!poseDetector) return;

    const poses = await poseDetector.estimatePoses(cameraVideo);

    // Clear previous frame drawing
    canvasContext.clearRect(
        0,
        0,
        overlayCanvas.width,
        overlayCanvas.height
    );

    if (poses.length > 0) {
        const keypoints = poses[0].keypoints;

        const leftShoulder = keypoints[5];
        const rightShoulder = keypoints[6];

        // Make sure shoulders are confidently detected
        if (leftShoulder.score > 0.5 && rightShoulder.score > 0.5) {

            // Calculate garment size based on shoulder width
            const shoulderWidth =
                Math.abs(rightShoulder.x - leftShoulder.x);

            const garmentWidth = shoulderWidth * 1.5;
            const garmentX = leftShoulder.x - garmentWidth * 0.25;
            const garmentY = leftShoulder.y;

            // Draw overlay (placeholder clothing block)
            canvasContext.fillStyle = selectedOverlayColor;
            canvasContext.fillRect(
                garmentX,
                garmentY,
                garmentWidth,
                garmentWidth
            );
        }
    }

    // Keep detecting on next frame
    requestAnimationFrame(runPoseDetection);
}


/* ==========================================
   Product Selection (Change Overlay Color)
   ========================================== */

document.querySelectorAll(".product-card").forEach(card => {
    card.addEventListener("click", () => {

        // Random color to simulate selecting a different product
        selectedOverlayColor = `hsl(${Math.random() * 360}, 70%, 60%)`;

        alert("Product selected. Now click 'Start Try-On' to activate the camera.");
    });
});