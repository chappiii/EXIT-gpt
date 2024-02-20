import axios from "axios";

export const getAllUsers = async () => {
  const res = await axios.get("/user");
  if (res.status !== 200) {
    throw new Error("Unable to fetch users");
  }
  const data = await res.data; // This already returns the data, no need to await here since axios.get is already awaited
  return data;
};


export const loginUser = async (email: string, password: string) => {
  const res = await axios.post("/user/login", { email, password });
  if (res.status !== 200) {
    throw new Error("Unable to login");
  }
  const data = await res.data;
  return data;
};

export const signupUser = async (
  name: string,
  email: string,
  password: string
) => {
  const res = await axios.post("/user/signup", { name, email, password });
  if (res.status !== 201) {
    throw new Error("Unable to Signup");
  }
  const data = await res.data;
  return data;
};

export const checkAuthStatus = async () => {
  const res = await axios.get("/user/auth-status");
  if (res.status !== 200) {
    throw new Error("Unable to authenticate");
  }
  const data = await res.data;
  return data;
};

export const deleteUserByEmail = async (email: string) => {
  const res = await axios.delete(`/user/delete/${email}`);
  if (res.status !== 200) {
    throw new Error("Unable to delete user");
  }
  const data = await res.data;
  return data;
};

export const deleteQuestionById = async (id: string) => {
  const res = await axios.delete(`/questions/delete/${id}`);
  if (res.status !== 200) {
    throw new Error("Unable to delete question");
  }
  const data = await res.data;
  return data;
};

export const sendChatRequest = async (message: string) => {
  const res = await axios.post("/chat/new", { message });
  if (res.status !== 200) {
    throw new Error("Unable to send chat");
  }
  const data = await res.data;
  return data;
};

export const getUserChats = async () => {
  const res = await axios.get("/chat/all-chats");
  if (res.status !== 200) {
    throw new Error("Unable to send chat");
  }
  const data = await res.data;
  return data;
};

export const deleteUserChats = async () => {
  const res = await axios.delete("/chat/delete");
  if (res.status !== 200) {
    throw new Error("Unable to delete chats");
  }
  const data = await res.data;
  return data;
};

export const logoutUser = async () => {
  const res = await axios.get("/user/logout");
  if (res.status !== 200) {
    throw new Error("Unable to delete chats");
  }
  const data = await res.data;
  return data;
};

export const getAllQuestions = async () => {
  const res = await axios.get("/questions");
  if (res.status !== 200) {
    throw new Error("Unable to get questions");
  }
  const data = await res.data;
  return data;
};

export const generateQuestionsFromPdf = async (message: string) => {
  const res = await axios.post("/pdfquestions/new", { message });
  if (res.status !== 200) {
    throw new Error("Unable to generate questions");
  }
  const data = await res.data;
  return data;
};

// export const generateQuestionsFromPdf = async (message: string) => {
//   try {
//     const res = await axios.post("/pdfquestions", { message });
//     // Directly return res.data, no need to await on it
//     return res.data;
//   } catch (error) {
//     // Error handling could be more descriptive based on error.response.data if available
//     throw new Error(error.response?.data?.message || "Unable to generate questions");
//   }
// };

export const getPdfChats = async () => {
  const res = await axios.get("/chat/all-chats");
  if (res.status !== 200) {
    throw new Error("Unable to send chat");
  }
  const data = await res.data;
  return data;
};



export const checkAdminAuthStatus = async () => {
  const res = await axios.get("/admin/auth-status");
  if (res.status !== 200) {
    throw new Error("Unable to authenticate");
  }
  const data = await res.data;
  return data;
};

export const loginAdmin = async (email: string, password: string) => {
  const res = await axios.post("/admin/login", { email, password });
  if (res.status !== 200) {
    throw new Error("Unable to login");
  }
  const data = await res.data;
  return data;
};


export const logoutAdmin = async () => {
  const res = await axios.get("/admin/logout");
  if (res.status !== 200) {
    throw new Error("Unable to delete chats");
  }
  const data = await res.data;
  return data;
};

export const addQuestion = async (
  question: string,
  options: string[],
  correctAnswer: string
) => {
  try {
    const res = await axios.post("/questions/add", {
      question,
      options,
      correctAnswer
    });
    if (res.status !== 200) { // Assuming 201 for successful creation, adjust based on your backend
      throw new Error("Unable to add question");
    }
    const data = await res.data;
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // If the error comes from Axios, extract and throw its response message
      throw new Error(error.response?.data?.message || "An error occurred while adding the question");
    } else {
      // For non-Axios errors, throw a generic error
      throw new Error("An unexpected error occurred during question creation");
    }
  }
};
