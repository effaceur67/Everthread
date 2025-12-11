document.addEventListener('DOMContentLoaded', () => {
        const hamburger = document.querySelector(".hamburger");
        const navMenu = document.querySelector(".nav-menu");

        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
        });

        document.querySelectorAll(".nav-menu a").forEach(link => {
            link.addEventListener("click", () => {
                hamburger.classList.remove("active");
                navMenu.classList.remove("active");
            });
        });
    });
const imageUpload = document.getElementById('image_upload')
const imagePreview = document.getElementById('img_preview')

imageUpload.addEventListener('change', (event) => {
    const reader = new FileReader();
    reader.onload = (e) => {
        imagePreview.src = e.target.result;
        imagePreview.style.maxWidth = '100%';
        imagePreview.style.width = '500px';
        imagePreview.style.height = 'auto';
    };
    if (event.target.files.length > 0){
        reader.readAsDataURL(event.target.files[0])
    }
})
// Here we use a transition to show the image that the user is uploading into the html, showing a small preview //

const URL = "https://teachablemachine.withgoogle.com/models/O-1f0qGmP/"

// We conect the AI to the js so it can work in base to the outputs of the machine //
let model;
let maxPredictions;


const analyzeButton = document.getElementById('submit_button');
analyzeButton.addEventListener('click', () => predict());
async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();
    
    console.log("Processing through AI");
    
    analyzeButton.innerHTML = "Analize image";
    analyzeButton.disabled = false;
}

analyzeButton.innerHTML = "loading...";
analyzeButton.disabled = true; 
init();

async function predict() {
    const image = document.getElementById('img_preview');

    const prediction = await model.predict(image);

    let highestPrediction = { className: "", probability: 0 };
    for (let i = 0; i < maxPredictions; i++) {
        if (prediction[i].probability > highestPrediction.probability) {
            highestPrediction = prediction[i];
        }
    }

    handleResults(highestPrediction.className);
}

// The code above is the one produced by teachable machine // 

function handleResults(detectedBrand) {
    const resultsContainer = document.getElementById('results_here');

    switch (detectedBrand) {
        case "Zara": 
            resultsContainer.innerHTML = "<h3> Alert... </h3><p> Detected ZARA. This is a Fast Fashion brand.</p>";
            break;
        case "H&M": 
            resultsContainer.innerHTML = "<h3> Alert... </h3><p> Detectamos H&M. This is a Fast Fashion brand.</p>";
            break;
        case "Bershka":
            resultsContainer.innerHTML = "<h3> Alert... </h3><p>Detectamos Bershka. This is a Fast Fashion brand.</p>";
            break;
        case "Pull&Bear": 
            resultsContainer.innerHTML = "<h3> Alert... </h3><p>Detectamos Pull&Bear. This is a Fast Fashion brand.</p>";
            break;
        case "Stradivarius": 
            resultsContainer.innerHTML = "<h3> Alert... </h3><p>Detectamos Stradivarius. This is a Fast Fashion brand.</p>";
            break;

        case "Font": 
            resultsContainer.innerHTML = "<h3> Awesome... </h3><p> Not a Fast Fashion brand detected. (maybe not in my database) </p>";
            break;
            
        default:
            resultsContainer.innerHTML = "<p> No file detected </p>";
    }
}
// Code for showing different results in base of the result or output of teachable machine