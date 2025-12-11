import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/Home";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";

import GamifiedSection from "./pages/GamefiedSection";
import Marketplace from "./pages/Marketplace";
import Community from "./pages/Community";
import ServiceSelection from "./pages/ServiceSelection";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SignupSelection from "./pages/SignupSelection";
import Payment from "./pages/Payment";
import OrderPlaced from "./pages/OrderPlaced";
import AthleteDashboard from "./pages/AthleteDashboard";
import SponsorshipMarketplace from "./pages/SponsorshipMarketplace";
import CoachDashboard from "./pages/CoachDashboard";
import AcademyDashboard from "./pages/AcademyDashboard";
import SponsorDashboard from "./pages/SponsorDashboard";
import Profile from "./pages/Profile";
import { AuthProvider } from "./contexts/AuthContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import AuthWrapper from "./auth/AuthWrapper";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <AuthProvider>
          <AuthWrapper>
            <Router>
              <div className="min-h-screen bg-slate-900">
                {/* <Navigation /> */}
                <Layout>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/services" element={
                      <ProtectedRoute>
                        <Services />
                      </ProtectedRoute>
                    } />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/service-selection" element={<ServiceSelection />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup-selection" element={<SignupSelection />} />
                    <Route path="/signup" element={<Signup />} />

                    <Route path="/gamified" element={<GamifiedSection />} />
                    <Route path="/marketplace" element={
                      <ProtectedRoute>
                        <Marketplace />
                      </ProtectedRoute>
                    } />
                    <Route path="/community" element={
                      <ProtectedRoute>
                        <Community />
                      </ProtectedRoute>
                    } />
                    <Route path="/payment" element={
                      <ProtectedRoute>
                        <Payment />
                      </ProtectedRoute>
                    } />
                    <Route path="/order-placed" element={
                      <ProtectedRoute>
                        <OrderPlaced />
                      </ProtectedRoute>
                    } />
                    <Route path="/athlete-dashboard" element={
                      <ProtectedRoute>
                        <AthleteDashboard />
                      </ProtectedRoute>
                    } />
                    <Route path="/sponsorship" element={
                      <ProtectedRoute>
                        <SponsorshipMarketplace />
                      </ProtectedRoute>
                    } />
                    <Route path="/coach-dashboard" element={
                      <ProtectedRoute>
                        <CoachDashboard />
                      </ProtectedRoute>
                    } />
                    <Route path="/academy-dashboard" element={
                      <ProtectedRoute>
                        <AcademyDashboard />
                      </ProtectedRoute>
                    } />
                    <Route path="/sponsor-dashboard" element={
                      <ProtectedRoute>
                        <SponsorDashboard />
                      </ProtectedRoute>
                    } />
                    <Route path="/profile" element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    } />
                  </Routes>
                </Layout>
              </div>
            </Router>
          </AuthWrapper>
        </AuthProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
