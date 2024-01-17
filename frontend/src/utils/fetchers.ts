export const convertFileFormatToPDF = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  return await fetch(`${import.meta.env.VITE_BACKEND_URL}/convert`, {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.blob();
    })
    .then((blob) => {
      return URL.createObjectURL(blob);
    })
    .catch((error) => {
      console.error(error);
    });
};
