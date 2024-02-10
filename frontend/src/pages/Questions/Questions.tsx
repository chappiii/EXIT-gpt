import { useLayoutEffect, useState } from "react";
import { getAllQuestions } from "../../helpers/api-communicator";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

// Define an interface for the question
interface Question {
  _id: string;
  question: string;
  options: string[];
  correctAnswer: string;
}

function Questions() {
  // return <div>Questions</div>;
  const auth = useAuth();
  const [questions, setQuestions] = useState<Question[]>([]);

  useLayoutEffect(() => {
    if (auth?.isLoggedIn && auth.user) {
      toast.loading("Loading Questions", { id: "loadquestions" });
      getAllQuestions()
        .then((data: { questions: Question[] }) => {
          setQuestions(data.questions);
          toast.success("Questions loaded Successfully", {
            id: "loadquestions",
          });
        })
        .catch((err) => {
          console.log(err);
          toast.error("Loading Failed", { id: "loadquestions" });
        });
    }
  }, [auth]);

  return (
    <>
      <div className="text-white">
        {questions.map((question) => (
          <div key={question._id}>
            <h3>{question.question}</h3>
            <ul>
              {question.options.map((option, index) => (
                <li key={index}>{option}</li>
              ))}
            </ul>
            <p>Correct Answer: {question.correctAnswer}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default Questions;

// function Questions() {
//   return (
//     <>
//       <div className="flex justify-evenly  mt-16">
//         <div className="max-w-sm max-h-sm p-6 bg-green-100 border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
//           <h2 className="py-2">Question 1</h2>
//           <h3>not yet answered</h3>
//         </div>

//         <div className="max-w-sm max-h-sm p-6 bg-green-100 border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
//           <div className=" question block max-w-2lg  max-h-2lg p-6 bg-green-100 border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
//             <h2 className="py-2">question</h2>
//             <ul>
//               <li>
//                 <label className="">
//                   <input type="radio" />
//                   jvndfkjvn
//                 </label>
//               </li>
//               <li>
//                 <label className="">
//                   <input type="radio" />
//                   jvndfkjvn
//                 </label>
//               </li>
//               <li>
//                 <label className="">
//                   <input type="radio" />
//                   jvndfkjvn
//                 </label>
//               </li>
//             </ul>{" "}
//             <br></br>
//             <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
//               Submit Answer
//             </button>
//           </div>
//         </div>

//         <div className="max-w-sm max-h-sm p-6 bg-green-100 border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
//           <h2>Flag</h2>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Questions;
