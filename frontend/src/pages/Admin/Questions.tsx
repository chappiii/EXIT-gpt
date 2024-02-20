import { TextField } from "@mui/material";
import {
  getAllQuestions,
  deleteQuestionById,
  addQuestion,
} from "../../helpers/api-communicator";
import { useLayoutEffect, useState } from "react";
import { useAuthAdmin } from "../../context/AuthContextAdmin";
import toast from "react-hot-toast";
import { FaTrashAlt } from "react-icons/fa";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

interface Question {
  _id: string;
  question: string;
  options: string[];
  correctAnswer: string;
}

function Questions() {
  const authAdmin = useAuthAdmin();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [questionToDelete, setQuestionToDelete] = useState<Question | null>(
    null
  );
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newQuestion, setNewQuestion] = useState({
    question: "",
    options: ["", "", "", ""],
    correctAnswer: "",
  });

  const handleOpenAddModal = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleChangeOption = (index: number, value: string) => {
    const updatedOptions = [...newQuestion.options];
    updatedOptions[index] = value;
    setNewQuestion({ ...newQuestion, options: updatedOptions });
  };

  const handleChangeNewQuestion = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setNewQuestion({ ...newQuestion, [name]: value });
  };

  const confirmDelete = (question: Question) => {
    setQuestionToDelete(question);
    setIsModalOpen(true);
  };

  useLayoutEffect(() => {
    if (authAdmin?.isLoggedIn && authAdmin.admin) {
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
  }, [authAdmin]);

  const handleDeleteQuestion = (id: string) => {
    toast.loading("Deleting Question...", { id: "deletingQuestion" });
    deleteQuestionById(id)
      .then(() => {
        setQuestions(questions.filter((question) => question._id !== id));
        toast.success("Question deleted successfully", {
          id: "deletingQuestion",
        });
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to delete question", { id: "deletingQuestion" });
      });
    setIsModalOpen(false); // Close the modal after handling delete
  };

  const handleAddQuestion = async () => {
    try {
      // Extracting the new question data
      const { question, options, correctAnswer } = newQuestion;

      // Calling the API to add the new question
      const response = await addQuestion(question, options, correctAnswer);

      // Check if the question was successfully added by inspecting the response
      if (response && response.message === "OK") {
        toast.success("Question added successfully");
        // Update the local list of questions after successful addition
        const updatedQuestions = await getAllQuestions();
        setQuestions(updatedQuestions.questions || []); // Update with new list or empty if undefined
        setNewQuestion({
          question: "",
          options: ["", "", "", ""], // Reset to initial state with empty strings
          correctAnswer: "",
        });
        handleCloseAddModal();
      } else {
        // Handle scenarios where response might not be in expected format
        throw new Error(
          response?.message || "Failed to add question without clear error."
        );
      }
    } catch (error) {
      console.error(error);
      toast.error(
        (error as Error).message ||
          "Failed to add question due to unexpected error."
      );
    }
  };

  return (
    <div className="overflow-x-auto p-6 m-6">
      <Button
        variant="contained"
        onClick={handleOpenAddModal}
        style={{ marginBottom: "20px" }}
      >
        Add Question
      </Button>
      <table className="table-auto w-full">
        <thead className="text-xs font-semibold uppercase text-gray-700 bg-gray-50">
          <tr>
            <th className="px-5 py-3">question</th>
            <th className="px-5 py-3">correctAnswer</th>
            <th className="px-5 py-3"></th>
          </tr>
        </thead>
        <tbody className="text-sm divide-y divide-gray-200">
          {questions.map(
            (
              question // Changed from 'questions' to 'question'
            ) => (
              <tr key={question._id}>
                <td className="px-5 py-4">{question.question}</td>
                <td className="px-5 py-4">{question.correctAnswer}</td>
                <td className="px-5 py-4">
                  <FaTrashAlt
                    onClick={() => confirmDelete(question)}
                    style={{ cursor: "pointer" }}
                  />
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          style: {
            backgroundColor: "#333",
          },
        }}
      >
        <DialogTitle id="alert-dialog-title" style={{ color: "#DDD" }}>
          {"Confirm Question Deletion"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            style={{ color: "#BBB" }}
          >
            Are you sure you want to delete this question:{" "}
            {questionToDelete?.question}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setIsModalOpen(false)}
            style={{ color: "#AAA" }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              if (questionToDelete) {
                handleDeleteQuestion(questionToDelete._id);
                setIsModalOpen(false); // It's better to close the modal after the action is confirmed
              }
            }}
            style={{ color: "#AAA" }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={isAddModalOpen}
        onClose={handleCloseAddModal}
        PaperProps={{
          style: {
            backgroundColor: "#333",
          },
        }}
      >
        <DialogTitle>Add New Question</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="question"
            label="Question"
            type="text"
            fullWidth
            variant="outlined"
            name="question"
            value={newQuestion.question}
            onChange={handleChangeNewQuestion}
            InputProps={{
              style: {
                color: "#fff", // Set the text color to white
              },
            }}
          />
          {newQuestion.options.map((option, index) => (
            <TextField
              key={index}
              margin="dense"
              id={`option-${index}`}
              label={`Option ${index + 1}`}
              type="text"
              fullWidth
              variant="outlined"
              value={option}
              onChange={(e) => handleChangeOption(index, e.target.value)}
              InputProps={{
                style: {
                  color: "#fff", // Set the text color to white
                },
              }}
            />
          ))}
          <TextField
            margin="dense"
            id="correctAnswer"
            label="Correct Answer"
            type="text"
            fullWidth
            variant="outlined"
            name="correctAnswer"
            value={newQuestion.correctAnswer}
            onChange={handleChangeNewQuestion}
            InputProps={{
              style: {
                color: "#fff", // Set the text color to white
              },
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddModal}>Cancel</Button>
          <Button onClick={handleAddQuestion}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Questions;
