// import { useDashboard } from "../../context/dashboardcontext";
import { DashboardProvider, useDashboard } from "../../context/DashboardContext";


function Dashboard() {
  const { questionCount, userCount } = useDashboard();
  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-5">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center">
          <h2 className="text-lg font-semibold text-gray-700">
            Number of Questions
          </h2>
          <p className="text-3xl font-bold text-blue-500">{questionCount}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center">
          <h2 className="text-lg font-semibold text-gray-700">
            Number of Users
          </h2>
          <p className="text-3xl font-bold text-green-500">{userCount}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
