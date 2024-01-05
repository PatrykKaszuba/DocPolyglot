import classNames from "classnames";
import {
  Dispatch,
  SetStateAction,
  useState,
  DragEvent,
  ChangeEvent,
} from "react";

interface FileUploadProps {
  setFile: Dispatch<SetStateAction<File | null>>;
}

export const FileUpload = ({ setFile }: FileUploadProps) => {
  const [dragIsOver, setDragIsOver] = useState(false);

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragIsOver(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragIsOver(false);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragIsOver(false);
    setFile(event.dataTransfer.files[0]);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={classNames(
        "flex flex-1 gap-x-4 rounded-lg border border-gray-200  p-6 shadow-sm",
        dragIsOver ? "bg-blue-200" : "bg-white",
      )}
    >
      <div className="flex flex-1 flex-col items-center justify-center gap-y-4">
        <img
          src="src/assets/images/drag_and_drop.png"
          alt=""
          className="h-auto w-full max-w-[450px]"
        />
        <p className="text-lg">Drag and drop</p>
      </div>
      <span className="border border-gray-300" />
      <div className="flex flex-1 items-center justify-center">
        <div className="flex max-w-[200px] flex-1 flex-col items-center justify-center gap-y-3">
          <div>Or choose a file</div>
          <label
            htmlFor="file"
            className="w-full cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-center text-white"
          >
            Browse
          </label>
          <input
            id="file"
            type="file"
            accept=".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={handleFileChange}
            className="invisible"
          />
        </div>
      </div>
    </div>
  );
};
