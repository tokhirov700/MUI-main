import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { admin } from "../../routes/routes";
import { Header } from "@layout";
const drawerWidth = 240;

function ResponsiveDrawer(props) {
   const { window } = props;
   const [mobileOpen, setMobileOpen] = React.useState(false);
   const [isClosing, setIsClosing] = React.useState(false);

   const handleDrawerClose = () => {
      setIsClosing(true);
      setMobileOpen(false);
   };

   const handleDrawerTransitionEnd = () => {
      setIsClosing(false);
   };

   const handleDrawerToggle = () => {
      if (!isClosing) {
         setMobileOpen(!mobileOpen);
      }
   };

   const { pathname } = useLocation();

   const drawer = (
      <div>
         <Toolbar />
         <Divider />
         <List>
            {admin.map((item, index) => (
               <NavLink
                  key={index}
                  to={item.path}
                  className={
                     pathname === item.path
                        ? "block bg-blue-500 text-white"
                        : ""
                  }
               >
                  <ListItem disablePadding>
                     <ListItemButton>
                        <ListItemIcon>
                           <span
                              className={
                                 pathname === item.path ? "text-white" : ""
                              }
                           >
                              <InboxIcon />
                           </span>
                        </ListItemIcon>
                        <ListItemText primary={item.content} />
                     </ListItemButton>
                  </ListItem>
               </NavLink>
            ))}
         </List>
         <Divider />
      </div>
   );

   const container =
      window !== undefined ? () => window().document.body : undefined;

   return (
      <Box sx={{ display: "flex" }}>
         <CssBaseline />
         <Header handleDrawerToggle={handleDrawerToggle} />
         <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="mailbox folders"
         >
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Drawer
               container={container}
               variant="temporary"
               open={mobileOpen}
               onTransitionEnd={handleDrawerTransitionEnd}
               onClose={handleDrawerClose}
               ModalProps={{
                  keepMounted: true, // Better open performance on mobile.
               }}
               sx={{
                  display: { xs: "block", sm: "none" },
                  "& .MuiDrawer-paper": {
                     boxSizing: "border-box",
                     width: drawerWidth,
                  },
               }}
            >
               {drawer}
            </Drawer>
            <Drawer
               variant="permanent"
               sx={{
                  display: { xs: "none", sm: "block" },
                  "& .MuiDrawer-paper": {
                     boxSizing: "border-box",
                     width: drawerWidth,
                  },
               }}
               open
            >
               {drawer}
            </Drawer>
         </Box>
         <Box
            component="main"
            sx={{
               flexGrow: 1,
               p: 3,
               width: { sm: `calc(100% - ${drawerWidth}px)` },
            }}
         >
            <Toolbar />
            <Outlet />
         </Box>
      </Box>
   );
}

ResponsiveDrawer.propTypes = {
   /**
    * Injected by the documentation to work in an iframe.
    * Remove this when copying and pasting into your project.
    */
   window: PropTypes.func,
};

export default ResponsiveDrawer;
