import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import SocialMediaIcons from "./SocialMediaIcons";
import HackathonLogo from "../assets/images/HackathonLogo.png";
function NavBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ marginLeft: "auto" }}>
          <SocialMediaIcons />
        </Toolbar>
      </AppBar>
      <Box className="ml-0 sm:ml-4 mt-2 max-w-full">
        <a href="https://www.senecahackathon.com" target="_blank">
          <img
            className="max-w-full"
            src={HackathonLogo}
            alt="Hackathon Logo"
          />
        </a>
      </Box>
    </Box>
  );
}

export default NavBar;
