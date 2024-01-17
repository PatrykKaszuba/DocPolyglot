import { useCallback, useEffect, useState } from "react";
import { Header } from "./components/header";
import { Button } from "./components/button";
import { FileUpload } from "./components/file-upload";
import { Link } from "./components/link";
import { convertFileFormatToPDF } from "./utils/fetchers";

export const App = () => {
  const [file, setFile] = useState<File | null>(null);
  const [convertedSourceFile, setConvertedSourceFile] = useState<string | null>(
    null,
  );
  const [translatedFile, setTranslatedFile] = useState<string | null>(null);

  const handleUpload = useCallback(async () => {
    if (file) {
      const srcConverted = await convertFileFormatToPDF(file);
      const translated = await convertFileFormatToPDF(file);

      if (srcConverted) setConvertedSourceFile(srcConverted);
      if (translated) setTranslatedFile(translated);
    }
  }, [file]);

  useEffect(() => {
    if (file) void handleUpload();
  }, [file, handleUpload]);

  const handleBackButtonClick = () => {
    setFile(null);
    setTranslatedFile(null);
    setConvertedSourceFile(null);
  };

  const shouldRenderResultPage = file && convertedSourceFile && translatedFile;

  return (
    <div className="bg-gray-50">
      <Header />
      <main className="mt-14 flex min-h-[calc(100vh-56px)] flex-col gap-y-4 p-6">
        {shouldRenderResultPage ? (
          <div className="flex flex-1 flex-col gap-y-8">
            <div className="flex flex-1 gap-x-8">
              <iframe
                src={convertedSourceFile}
                className="flex-1 rounded-md shadow-md"
              />
              <iframe
                src={translatedFile}
                className="flex-1 rounded-md shadow-md"
              />
            </div>
            <div className="flex justify-between">
              <Button
                text="Back"
                color="secondary"
                onClick={handleBackButtonClick}
              />
              <Link download={file.name} href={translatedFile}>
                <Button color="primary" text="Download" />
              </Link>
            </div>
          </div>
        ) : (
          <FileUpload setFile={setFile} />
        )}
      </main>
    </div>
  );
};
