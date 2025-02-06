import { useState } from "react";
import Header from "./Header";
import Dashboard from "./Dashboard";
import Users from "./Users";
import Questions from "./Questions";
// import { DashboardProvider } from "../../context/DashboardContext";
import { DashboardProvider, useDashboard } from "../../context/DashboardContext";



function Home() {
  // State to track the current active component
  const [activeComponent, setActiveComponent] = useState("Dashboard");

  // Function to render the active component
  const renderComponent = () => {
    switch (activeComponent) {
      case "Dashboard":
        return <Dashboard />;
      case "Users":
        return <Users />;
      case "Questions":
        return <Questions />;
      default:
        return <Dashboard />; // Default to Dashboard if none match
    }
  };

  return (
    <DashboardProvider>
      <div className="flex h-screen">
        <aside className="bg-gray-800 text-white w-72 min-h-screen">
          <div className="py-7 px-2">
            <a
              className="text-white flex items-center space-x-2 px-4 cursor-pointer"
              onClick={() => setActiveComponent("Dashboard")}
            >
              <span className="text-2xl font-extrabold">Admin Dashboard</span>
            </a>
            <nav className="pt-10">
              <a
                className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white cursor-pointer"
                onClick={() => setActiveComponent("Dashboard")}
              >
                Dashboard
              </a>
              <a
                className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white cursor-pointer"
                onClick={() => setActiveComponent("Users")}
              >
                Users
              </a>
              <a
                className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white cursor-pointer"
                onClick={() => setActiveComponent("Questions")}
              >
                Questions
              </a>
            </nav>
          </div>
        </aside>
        <div className="flex-1 flex flex-col">
          <Header />
          {renderComponent()}
        </div>
      </div>
    </DashboardProvider>
  );
}

export default Home;
