import { useState, useEffect } from "react";
import { Box, Typography, Link, Snackbar, Alert } from "@mui/material";
import { Routes, Route, Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import ItemEntry from "./components/ItemEntry";
import StockInformation from "./components/StockInformation";
import SupplyRequests from "./components/SupplyRequests";
import Home from "./components/Home";
import Inbox from "./components/inbox";
import Footer from "./components/footer";
import ContactUs from "./components/ContactUs";
import AboutUs from "./components/AboutUs";
import Careers from "./components/Careers";
import FAQs from "./components/FAQs";
import Teams from "./components/Teams";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import ForgotPasswordForm from "./components/ForgotPasswordForm";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./App.css";
import { Item } from "./types/Item";

const App = () => {
  const [activeComponent, setActiveComponent] = useState('');

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const [items, setItems] = useState<Item[]>(() => {
    const storedItems = localStorage.getItem("items");
    return storedItems ? JSON.parse(storedItems) : [];
  });

  const navigate = useNavigate();
  const location = useLocation();

  // useEffect(() => {
  //   if (location.pathname === "/") {
  //     navigate("/login");
  //   }
  // }, [location, navigate]);

  useEffect(() => {
    const updatedItems = items.map((item) => ({
      ...item,
      stockStatus: item.stockStatus || "In Stock",
    }));
    if (JSON.stringify(updatedItems) !== JSON.stringify(items)) {
      localStorage.setItem("items", JSON.stringify(updatedItems));
      setItems(updatedItems);
    }
  }, [items]);

  const handleAddItem = (newItem: Item) => {
    const updatedItems = [...items, newItem];
    setItems(updatedItems);
    localStorage.setItem("items", JSON.stringify(updatedItems));
  };

  const handleDeleteItem = (index: number) => {
    const updatedItems = items.filter((_, i: number) => i !== index);
    setItems(updatedItems);
    localStorage.setItem("items", JSON.stringify(updatedItems));
  };

  const handleEditItem = (index: number, editedItem: Item) => {
    const updatedItems = items.map((item, i: number) =>
      i === index ? editedItem : item
    );
    setItems(updatedItems);
    localStorage.setItem("items", JSON.stringify(updatedItems));
  };

  const handleSnackbarClose = (event: React.SyntheticEvent | Event) => {
    if (event && "preventDefault" in event) {
      event.preventDefault();
    }
    setSnackbar({ ...snackbar, open: false });
    };
  

  return (
    <div className="app">
      <Sidebar setActiveComponent={setActiveComponent} />
      <main className="main-content">
        <Routes>
          {/* <Route
            path="/login"
            element={
              <Box
                sx={{
                  width: "100%",
                  maxWidth: 350,
                  margin: "auto",
                  bgcolor: "white",
                  p: 3,
                  borderRadius: 2,
                  boxShadow: 3,
                }}
              >
                <LoginForm setSnackbar={setSnackbar} />
                <Typography variant="body2" align="center" sx={{ mt: 2, fontSize: "0.75rem" }}>
                  Don't have an account?{" "}
                  <Link component={RouterLink} to="/signup" sx={{ color: "#20B2AA" }}>
                    Sign up here
                  </Link>
                </Typography>
              </Box>
            }
          /> */}
          {/* <Route
            path="/signup"
            element={
              <Box
                sx={{
                  width: "100%",
                  maxWidth: 350,
                  margin: "auto",
                  bgcolor: "white",
                  p: 3,
                  borderRadius: 2,
                  boxShadow: 3,
                }}
              >
                <SignupForm setSnackbar={setSnackbar} />
                <Typography variant="body2" align="center" sx={{ mt: 2, fontSize: "0.75rem" }}>
                  Already have an account?{" "}
                  <Link component={RouterLink} to="/login" sx={{ color: "#20B2AA" }}>
                    Sign in
                  </Link>
                </Typography>
              </Box>
            }
          /> */}
          {/* <Route path="/forgot-password" element={<ForgotPasswordForm setSnackbar={setSnackbar} />} /> */}
          <Route path="/home" element={<Home />} />
          <Route path="/item-entry" element={<ItemEntry onAddItem={handleAddItem} />} />
          <Route
            path="/stock-information"
            element={
              <StockInformation items={items} onDelete={handleDeleteItem} onEdit={handleEditItem} />
            }
          />
          <Route path="/supply-requests" element={<SupplyRequests />} />
          <Route path="/inbox" element={<Inbox />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/teams" element={<Teams />} />
          <Route
            path="*"
            element={
              <Box sx={{ textAlign: "center", p: 3 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  404 - Page Not Found
                </Typography>
                <Link component={RouterLink} to="/login" sx={{ color: "#20B2AA" }}>
                  Go to Login
                </Link>
              </Box>
            }
          />
        </Routes>
      </main>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={(e) => handleSnackbarClose(e)}
      >
        <Alert
          onClose={(e) => handleSnackbarClose(e)}
          severity={snackbar.severity as unknown as undefined}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
      <Footer setActiveComponent={setActiveComponent} />
    </div>
  );
};

export default App;

// import { useState, useEffect } from "react";
// import { Box, Typography, Link, Snackbar, Alert } from "@mui/material";
// import { Routes, Route, Link as RouterLink, useNavigate, useLocation, Navigate } from "react-router-dom";
// import Sidebar from "./components/Sidebar";
// import ItemEntry from "./components/ItemEntry";
// import StockInformation from "./components/StockInformation";
// import SupplyRequests from "./components/SupplyRequests";
// import Home from "./components/Home";
// import Inbox from "./components/inbox";
// import Footer from "./components/footer";
// import ContactUs from "./components/ContactUs";
// import AboutUs from "./components/AboutUs";
// import Careers from "./components/Careers";
// import FAQs from "./components/FAQs";
// import Teams from "./components/Teams";
// import LoginForm from "./components/LoginForm";
// import SignupForm from "./components/SignupForm";
// import ForgotPasswordForm from "./components/ForgotPasswordForm";
// import PrivateRoute from "./components/PrivateRoute"; // Import PrivateRoute
// import { AuthProvider } from "./context/AuthContext"; // Import AuthProvider
// import "@fortawesome/fontawesome-free/css/all.min.css";
// import "./App.css";
// import { Item } from "./types/Item";

// const App = () => {
//   const [activeComponent, setActiveComponent] = useState('');

//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: "",
//     severity: "info",
//   });

//   const [items, setItems] = useState<Item[]>(() => {
//     const storedItems = localStorage.getItem("items");
//     return storedItems ? JSON.parse(storedItems) : [];
//   });

//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     if (location.pathname === "/") {
//       navigate("/login");
//     }
//   }, [location, navigate]);

//   useEffect(() => {
//     const updatedItems = items.map((item) => ({
//       ...item,
//       stockStatus: item.stockStatus || "In Stock",
//     }));
//     if (JSON.stringify(updatedItems) !== JSON.stringify(items)) {
//       localStorage.setItem("items", JSON.stringify(updatedItems));
//       setItems(updatedItems);
//     }
//   }, [items]);

//   const handleAddItem = (newItem: Item) => {
//     const updatedItems = [...items, newItem];
//     setItems(updatedItems);
//     localStorage.setItem("items", JSON.stringify(updatedItems));
//   };

//   const handleDeleteItem = (index: number) => {
//     const updatedItems = items.filter((_, i: number) => i !== index);
//     setItems(updatedItems);
//     localStorage.setItem("items", JSON.stringify(updatedItems));
//   };

//   const handleEditItem = (index: number, editedItem: Item) => {
//     const updatedItems = items.map((item, i: number) =>
//       i === index ? editedItem : item
//     );
//     setItems(updatedItems);
//     localStorage.setItem("items", JSON.stringify(updatedItems));
//   };

//   const handleSnackbarClose = (event: React.SyntheticEvent | Event) => {
//     if (event && "preventDefault" in event) {
//       event.preventDefault();
//     }
//     setSnackbar({ ...snackbar, open: false });
//     };
  
//   return (
//     <AuthProvider>
//       <div className="app">
//         <Sidebar setActiveComponent={setActiveComponent} />
//         <main className="main-content">
//           <Routes>
//             <Route
//               path="/login"
//               element={
//                 <Box
//                   sx={{
//                     width: "100%",
//                     maxWidth: 350,
//                     margin: "auto",
//                     bgcolor: "white",
//                     p: 3,
//                     borderRadius: 2,
//                     boxShadow: 3,
//                   }}
//                 >
//                   <LoginForm setSnackbar={setSnackbar} />
//                   <Typography variant="body2" align="center" sx={{ mt: 2, fontSize: "0.75rem" }}>
//                     Don't have an account?{" "}
//                     <Link component={RouterLink} to="/signup" sx={{ color: "#20B2AA" }}>
//                       Sign up here
//                     </Link>
//                   </Typography>
//                 </Box>
//               }
//             />
//             <Route
//               path="/signup"
//               element={
//                 <Box
//                   sx={{
//                     width: "100%",
//                     maxWidth: 350,
//                     margin: "auto",
//                     bgcolor: "white",
//                     p: 3,
//                     borderRadius: 2,
//                     boxShadow: 3,
//                   }}
//                 >
//                   <SignupForm setSnackbar={setSnackbar} />
//                   <Typography variant="body2" align="center" sx={{ mt: 2, fontSize: "0.75rem" }}>
//                     Already have an account?{" "}
//                     <Link component={RouterLink} to="/login" sx={{ color: "#20B2AA" }}>
//                       Sign in
//                     </Link>
//                   </Typography>
//                 </Box>
//               }
//             />
//             <Route path="/forgot-password" element={<ForgotPasswordForm setSnackbar={setSnackbar} />} />
//             <PrivateRoute path="/home" element={<Home />} />
//             <PrivateRoute path="/item-entry" element={<ItemEntry onAddItem={handleAddItem} />} />
//             <PrivateRoute
//               path="/stock-information"
//               element={
//                 <StockInformation items={items} onDelete={handleDeleteItem} onEdit={handleEditItem} />
//               }
//             />
//             <PrivateRoute path="/supply-requests" element={<SupplyRequests />} />
//             <PrivateRoute path="/inbox" element={<Inbox />} />
//             <PrivateRoute path="/contact-us" element={<ContactUs />} />
//             <PrivateRoute path="/about-us" element={<AboutUs />} />
//             <PrivateRoute path="/careers" element={<Careers />} />
//             <PrivateRoute path="/faqs" element={<FAQs />} />
//             <PrivateRoute path="/teams" element={<Teams />} />
//             <Route
//               path="*"
//               element={
//                 <Box sx={{ textAlign: "center", p: 3 }}>
//                   <Typography variant="h6" sx={{ mb: 2 }}>
//                     404 - Page Not Found
//                   </Typography>
//                   <Link component={RouterLink} to="/login" sx={{ color: "#20B2AA" }}>
//                     Go to Login
//                   </Link>
//                 </Box>
//               }
//             />
//           </Routes>
//         </main>
//         <Snackbar
//           open={snackbar.open}
//           autoHideDuration={6000}
//           onClose={(e) => handleSnackbarClose(e)}
//         >
//           <Alert
//             onClose={(e) => handleSnackbarClose(e)}
//             severity={snackbar.severity as unknown as undefined}
//             sx={{ width: "100%" }}
//           >
//             {snackbar.message}
//           </Alert>
//         </Snackbar>
//         <Footer setActiveComponent={setActiveComponent} />
//       </div>
//     </AuthProvider>
//   );
// };

// export default App;
