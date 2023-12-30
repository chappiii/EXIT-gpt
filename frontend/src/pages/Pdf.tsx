import React, { useState, ChangeEvent } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Pdf: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState<string>("");

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const onDocumentLoadSuccess = async ({ numPages }: { numPages: number }) => {
    if (file) {
      setText("");
      const pdfDocument = await pdfjs.getDocument(URL.createObjectURL(file))
        .promise;
      for (let pageNumber = 1; pageNumber <= numPages; pageNumber++) {
        const page = await pdfDocument.getPage(pageNumber);
        const textContent = await page.getTextContent();

        // Here's where you apply the solution
        const pageText = textContent.items
          .map((item) => {
            if ("str" in item) {
              return item.str;
            }
            return "";
          })
          .join(" ");

        setText((prevText) => prevText + pageText + "\n\n");
      }
    }
  };

  return (
    <div>
      <input type="file" onChange={onFileChange} accept=".pdf" />
      <p>{text}</p>
      {file && (
        <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={1} renderMode="none" />
        </Document>
      )}
    </div>
  );
};

export default Pdf;
