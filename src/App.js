import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import FloatingThemeToggle from "./components/UI/FloatingThemeToggle";
import HomePage from "./pages/HomePage";
import StatsPage from "./pages/StatsPage";
import ComparePage from "./pages/ComparePage";
import QuizPage from "./pages/QuizPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  const basename = process.env.NODE_ENV === 'production' ? '/teste-catapi' : '';

  return (
    <Router basename={basename}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <Header />
        <FloatingThemeToggle />

        {/* Navegação por Tabs */}
        <nav className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10 transition-colors">
          <div className="container mx-auto px-4">
            <div className="flex overflow-x-auto">
              <NavLink
                to="/"
                className={({ isActive }) => `px-6 py-4 font-medium whitespace-nowrap transition-colors border-b-2 ${
                  isActive
                    ? 'border-primary-600 text-primary-600 dark:border-primary-400 dark:text-primary-400'
                    : 'border-transparent text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
                }`}
              >
                🐱 Raças
              </NavLink>
              <NavLink
                to="/stats"
                className={({ isActive }) => `px-6 py-4 font-medium whitespace-nowrap transition-colors border-b-2 ${
                  isActive
                    ? 'border-primary-600 text-primary-600 dark:border-primary-400 dark:text-primary-400'
                    : 'border-transparent text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
                }`}
              >
                📊 Dashboard
              </NavLink>
              <NavLink
                to="/compare"
                className={({ isActive }) => `px-6 py-4 font-medium whitespace-nowrap transition-colors border-b-2 ${
                  isActive
                    ? 'border-primary-600 text-primary-600 dark:border-primary-400 dark:text-primary-400'
                    : 'border-transparent text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
                }`}
              >
                🔄 Comparar
              </NavLink>
              <NavLink
                to="/quiz"
                className={({ isActive }) => `px-6 py-4 font-medium whitespace-nowrap transition-colors border-b-2 ${
                  isActive
                    ? 'border-primary-600 text-primary-600 dark:border-primary-400 dark:text-primary-400'
                    : 'border-transparent text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
                }`}
              >
                🎯 Quiz
              </NavLink>
            </div>
          </div>
        </nav>

        {/* Conteúdo */}
        <main className="pb-12">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/stats" element={<StatsPage />} />
            <Route path="/compare" element={<ComparePage />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
