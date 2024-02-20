import { useState } from "react";
import { getAllUsers, deleteUserByEmail } from "../../helpers/api-communicator";
import { toast } from "react-hot-toast";
import { useAuthAdmin } from "../../context/AuthContextAdmin";
import { useLayoutEffect } from "react";
import { FaTrashAlt } from "react-icons/fa";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

type User = {
  _id: string;
  name: string;
  email: string;
};

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [userToDelete, setUserToDelete] = useState("");
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const confirmDelete = (user: User) => {
    setUserToDelete(user);
    setIsModalOpen(true);
  };

  const authAdmin = useAuthAdmin();

  useLayoutEffect(() => {
    if (authAdmin?.isLoggedIn && authAdmin.admin) {
      toast.loading("Loading Users", { id: "loadusers" });
      getAllUsers()
        .then((data) => {
          setUsers(data.users); // Adjust based on actual structure. Use 'data' directly if it's already an array
          // Assuming the data returned is an array of User objects
          toast.success("Successfully loaded users", { id: "loadusers" });
        })
        .catch((err) => {
          console.error(err);
          toast.error("Loading Failed", { id: "loadusers" });
        });
    }
  }, [authAdmin]);

  const handleDeleteUser = (email: string) => {
    toast.loading("Deleting User...", { id: "deletingUser" });
    deleteUserByEmail(email)
      .then(() => {
        // Remove the user from the current list to update the UI
        setUsers(users.filter((user) => user.email !== email));
        toast.success("User deleted successfully", { id: "deletingUser" });
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to delete user", { id: "deletingUser" });
      });
  };

  return (
    <div className="overflow-x-auto p-6 m-6">
      <table className="table-auto w-full">
        <thead className="text-xs font-semibold uppercase text-gray-700 bg-gray-50">
          <tr>
            <th className="px-5 py-3">Name</th>
            <th className="px-5 py-3">Email</th>
            <th className="px-5 py-3"></th>
          </tr>
        </thead>
        <tbody className="text-sm divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user._id}>
              <td className="px-5 py-4">{user.name}</td>
              <td className="px-5 py-4">{user.email}</td>
              <td className="px-5 py-4">
                <FaTrashAlt
                  onClick={() => confirmDelete(user)}
                  style={{ cursor: "pointer" }}
                />
              </td>
            </tr>
          ))}
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
        <DialogTitle
          id="alert-dialog-title"
          style={{ color: "#DDD" }} // Darker text color for visibility, adjust as needed
        >
          {"Confirm User Deletion"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            style={{ color: "#BBB" }} // Darker text color for visibility, adjust as needed
          >
            Are you sure you want to delete this user: {userToDelete?.email}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setIsModalOpen(false)}
            style={{ color: "#AAA" }} // Adjust for better visibility
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              if (userToDelete) handleDeleteUser(userToDelete.email);
              setIsModalOpen(false);
            }}
            style={{ color: "#AAA" }} // Adjust for better visibility
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Users;
