import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { getAllQuestions } from "../helpers/api-communicator";
import { getAllUsers } from "../helpers/api-communicator";

interface DashboardContextType {
  questionCount: number;
  userCount: number;
}

const DashboardContext = createContext<DashboardContextType>({
  questionCount: 0,
  userCount: 0,
});

export const useDashboard = () => useContext(DashboardContext);

interface DashboardProviderProps {
  children: ReactNode; // This specifies that children can be any valid React child
}

export const DashboardProvider: React.FC<DashboardProviderProps> = ({
  children,
}) => {
  const [questionCount, setQuestionCount] = useState<number>(0);
  const [userCount, setUserCount] = useState<number>(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const questionData = await getAllQuestions();
        const userData = await getAllUsers();
        setQuestionCount(questionData.questions?.length || 0);
        setUserCount(userData.users?.length || 0);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <DashboardContext.Provider value={{ questionCount, userCount }}>
      {children}
    </DashboardContext.Provider>
  );
};
