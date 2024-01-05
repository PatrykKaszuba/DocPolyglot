import { useState } from "react";
import { Header } from "./components/header";
import { Button } from "./components/button";
import classNames from "classnames";
import { FileUpload } from "./components/file-upload";
import { Link } from "./components/link";

export const App = () => {
  const [translatedFile, setTranslatedFile] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async () => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      await fetch(`${import.meta.env.VITE_BACKEND_URL}/convert`, {
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
          setTranslatedFile(URL.createObjectURL(blob));
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <div className="bg-gray-50">
      <Header />
      <main className="mt-14 flex min-h-[calc(100vh-56px)] flex-col gap-y-4 p-6">
        {file ? (
          <div className="flex flex-1 items-center justify-center gap-x-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex max-w-[500px] flex-1 flex-col items-center justify-center gap-y-3">
              <div
                className={classNames(
                  "flex w-full justify-between rounded-lg p-4",
                  translatedFile ? "bg-blue-100" : "bg-gray-300",
                )}
              >
                <div>
                  <div className="font-bold">{file.name}</div>
                  <div>{file.size / 1000}KB</div>
                </div>
                <i
                  className="flex h-4 w-4 cursor-pointer bg-[url('src/assets/icons/close.svg')] bg-contain"
                  onClick={() => {
                    setFile(null);
                    setTranslatedFile(null);
                  }}
                />
              </div>
              <div className="flex w-full justify-end gap-x-4">
                {translatedFile ? (
                  <>
                    <Link href={translatedFile} download={file.name}>
                      <Button text="Download" color="secondary" />
                    </Link>
                    <Link href={translatedFile}>
                      <Button text="Open translation" color="primary" />
                    </Link>
                  </>
                ) : (
                  <Button
                    text="Translate"
                    color="primary"
                    onClick={() => void handleUpload()}
                  />
                )}
              </div>
            </div>
          </div>
        ) : (
          <FileUpload setFile={setFile} />
        )}
      </main>
    </div>
  );
};
