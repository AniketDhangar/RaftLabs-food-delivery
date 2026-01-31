import { Box } from "@mui/material";
import Navbar from "./Navbar";

const UserLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <Box>{children}</Box>
    </>
  );
};

export default UserLayout;
