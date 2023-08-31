document.addEventListener("DOMContentLoaded", function() {
    const image = document.getElementById("image");
    const imageInput = document.getElementById("imageInput");
    const brightnessSlider = document.getElementById("brightnessSlider");
    const saturationSlider = document.getElementById("saturationSlider");
    const contrastSlider = document.getElementById("contrastSlider");
    const saveButton = document.getElementById("saveButton");

    function updateImageFilters() {
        const brightnessValue = brightnessSlider.value;
        const saturationValue = saturationSlider.value;
        const contrastValue = contrastSlider.value;
        
        image.style.filter = `brightness(${brightnessValue}%) saturate(${saturationValue}%) contrast(${contrastValue}%)`;
    }

    brightnessSlider.addEventListener("input", updateImageFilters);
    saturationSlider.addEventListener("input", updateImageFilters);
    contrastSlider.addEventListener("input", updateImageFilters);

    imageInput.addEventListener("change", function(event) {
        const selectedImage = event.target.files[0];
        if (selectedImage) {
            const imageURL = URL.createObjectURL(selectedImage);
            image.src = imageURL;
            image.onload = function() {
                URL.revokeObjectURL(imageURL);
            };
        }
    });

    saveImageButton.addEventListener("click", function() {
        if (originalImage) {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            canvas.width = uploadedImage.width;
            canvas.height = uploadedImage.height;
            ctx.filter = uploadedImage.style.filter;
            ctx.drawImage(uploadedImage, 0, 0, canvas.width, canvas.height);

            const dataURL = canvas.toDataURL("image/jpeg");
            const link = document.createElement("a");
            link.href = dataURL;
            link.download = "edited_image.jpg";
            link.click();
        }
    });
});