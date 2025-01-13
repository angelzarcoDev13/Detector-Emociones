const form = document.getElementById('upload-form');
const imageInput = document.getElementById('image-input');
const emotionResult = document.getElementById('emotion-result');
const driveId = document.getElementById('drive-id');
const processedImage = document.getElementById('processed-image');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const file = imageInput.files[0];
  if (!file) {
    alert('Por favor, selecciona una imagen.');
    return;
  }

  const formData = new FormData();
  formData.append('file', file);

  try {
    // Enviar la imagen al backend
    const response = await fetch('https://web-production-c4eef.up.railway.app/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Error al procesar la imagen');
    }

    const data = await response.json();

    // Mostrar los resultados
    emotionResult.textContent = `Emoción Dominante: ${data.dominant_emotion}`;
    processedImage.src = `data:image/png;base64,${data.image_with_points_base64}`;
    processedImage.style.display = 'block';
  } catch (error) {
    console.error(error);
    alert('Hubo un error al procesar la imagen. Por favor, intenta nuevamente.');
  }
});
