import React, { useState } from 'react';
import { useCatBreeds } from '../../hooks/useCatBreeds';
import QuizWelcome from './QuizWelcome';
import QuizQuestion from './QuizQuestion';
import QuizResults from './QuizResults';
import LoadingSpinner from '../UI/LoadingSpinner';
import ErrorMessage from '../UI/ErrorMessage';
import { questions } from './quizQuestions';
import { calculateMatches, hasQuizData } from './quizAlgorithm';
import { useLanguage } from '../../hooks/useLanguage';
import { translateText } from '../../utils/i18n';

function Quiz() {
  const { breeds, loading, error } = useCatBreeds();
  const { language } = useLanguage();
  const quizDataAvailable = hasQuizData(breeds);
  const [quizState, setQuizState] = useState('welcome'); // 'welcome', 'quiz', 'loading', 'results'
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [matches, setMatches] = useState([]);

  const handleStart = () => {
    setQuizState('quiz');
    setCurrentQuestion(0);
    setAnswers({});
  };

  const handleAnswer = (answer) => {
    const newAnswers = {
      ...answers,
      [currentQuestion]: answer
    };
    setAnswers(newAnswers);

    // Próxima pergunta ou calcular resultados
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Finalizar quiz
      setQuizState('loading');

      // Simular processamento (para efeito visual)
      setTimeout(() => {
        const results = calculateMatches(newAnswers, breeds);
        setMatches(results);
        setQuizState('results');
      }, 2000);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleRestart = () => {
    setQuizState('welcome');
    setCurrentQuestion(0);
    setAnswers({});
    setMatches([]);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <LoadingSpinner message={translateText('Carregando quiz...', language)} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <ErrorMessage
          message={`${translateText('Erro ao carregar quiz:', language)} ${error}`}
          onRetry={() => window.location.reload()}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {quizState === 'welcome' && (
        <QuizWelcome onStart={handleStart} isAvailable={quizDataAvailable} />
      )}

      {quizState === 'quiz' && (
        <QuizQuestion
          question={questions[currentQuestion]}
          currentIndex={currentQuestion}
          totalQuestions={questions.length}
          onAnswer={handleAnswer}
          onPrevious={handlePrevious}
          selectedAnswer={answers[currentQuestion]}
        />
      )}

      {quizState === 'loading' && (
        <div className="max-w-2xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-12 text-center border border-gray-200 dark:border-gray-700">
            <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-primary-600 dark:border-primary-400 mx-auto mb-6"></div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              {translateText('Analisando suas respostas...', language)}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {translateText('Estamos encontrando as raças que mais combinam com você!', language)} 🐱✨
            </p>
          </div>
        </div>
      )}

      {quizState === 'results' && (
        <QuizResults
          matches={matches}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}

export default Quiz;
