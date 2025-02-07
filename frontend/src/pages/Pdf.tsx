import React, { useState, ChangeEvent } from "react";
import { Document, pdfjs } from "react-pdf";
import { generateQuestionsFromPdf } from "../helpers/api-communicator";
import Header from "../components/Header";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Pdf: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState<string>("");
  const [questions, setQuestions] = useState<string[]>([]);

  //chosen pdf file
  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  //PDF Text Extraction
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
  const textToPdf = async () => {
    const content = text; // Use state value for content
    if (content) {
      setText(""); // Clear the input field for the next submission

      try {
        // Send the text to the backend and wait for the response
        const responseData = await generateQuestionsFromPdf(content);
        // Update the local state with the response
        // Assume responseData has the format { questions: [...] }
        setQuestions(responseData.questions);
      } catch (error) {
        console.error("Failed to send text or update questions:", error);
        alert("Failed to update questions. Please try again.");
      }
    }
  };

  return (
    <>
      <Header />
      <div className="flex flex-col mt-8 items-center justify-center h-scre p-4">
        <div className="text-center mb-4">
          <h1 className="text-3xl font-semibold">Get question From PDF</h1>
          <p className="text-gray-200">
            Convert PDF documents to exercise questions using chat-gpt in
            seconds. Easily extract questions and practice.
          </p>
        </div>
        <div className="flex flex-col items-center text-white p-8 ">
          <label className="w-64 flex flex-col items-center px-4 py-6 bg-red-500 rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-red-400 hover:text-white">
            <svg
              className="w-8 h-8"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M16.7,5.3l-3.3-3.3c-0.4-0.4-1-0.4-1.4,0H5C4.4,2,4,2.4,4,3v14c0,0.6,0.4,1,1,1h10c0.6,0,1-0.4,1-1V6.7 C17.1,6.3,17.1,5.7,16.7,5.3z M12,3.5l3.5,3.5H12V3.5z M15,17H5V3h6v5h5V17z" />
            </svg>
            <span className="mt-2 text-base leading-normal">
              Select a PDF file
            </span>
            <input
              type="file"
              className="hidden"
              onChange={onFileChange}
              accept=".pdf"
            />
          </label>

          <p className="white mt-4">{text}</p>

          {file && (
            <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
              {/* Your Document rendering */}
            </Document>
          )}
        </div>
        {/* <button className=" border bg-red-500" onClick={textToPdf}>
        generate Questions
      </button>
      <div className="questions-container mt-8">
        <h2 className="text-2xl font-semibold mb-4">Extracted Questions</h2>
        {questions.length > 0 ? (
          <ul className="list-disc pl-5 text-left">
            {questions.map((question, index) => (
              <li key={index} className="mb-2">
                {question}
              </li>
            ))}
          </ul>
        ) : (
          <p>No questions have been generated yet.</p>
        )}
      </div> */}
      </div>
    </>
  );
};

export default Pdf;
