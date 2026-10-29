import React from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { translateText } from '../../utils/i18n';

/**
 * QuizQuestion - Exibe uma pergunta do quiz com opções
 */
function QuizQuestion({ question, totalQuestions, currentIndex, onAnswer, onPrevious, selectedAnswer }) {
  const progress = ((currentIndex + 1) / totalQuestions) * 100;
  const { language } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {translateText('Pergunta', language)} {currentIndex + 1} {translateText('de', language)} {totalQuestions}
          </span>
          <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary-500 to-purple-500 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-6 border border-gray-100 dark:border-gray-700 transition-colors">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">{question.icon}</div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            {translateText(question.question, language)}
          </h2>
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => onAnswer(option.value)}
              className={`group relative p-6 rounded-xl border-2 text-left transition-all duration-300 transform hover:scale-105 ${
                selectedAnswer === option.value
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 shadow-lg'
                  : 'border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 hover:border-primary-300 dark:hover:border-primary-600 hover:shadow-md'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                  selectedAnswer === option.value
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300 group-hover:bg-primary-100 dark:group-hover:bg-primary-800'
                }`}>
                  {String.fromCharCode(65 + index)}
                </div>
                <div className="flex-1">
                  <p className={`font-medium transition-colors ${
                    selectedAnswer === option.value
                      ? 'text-primary-700 dark:text-primary-300'
                      : 'text-gray-800 dark:text-gray-200 group-hover:text-primary-600 dark:group-hover:text-primary-400'
                  }`}>
                    {translateText(option.text, language)}
                  </p>
                </div>
                {selectedAnswer === option.value && (
                  <div className="flex-shrink-0">
                    <svg className="w-6 h-6 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={onPrevious}
          disabled={currentIndex === 0}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
            currentIndex === 0
              ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 shadow-md hover:shadow-lg'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {translateText('Anterior', language)}
        </button>

        <div className="text-sm text-gray-500 dark:text-gray-400">
          {selectedAnswer ? `✓ ${translateText('Respondida', language)}` : translateText('Selecione uma opção', language)}
        </div>

        {selectedAnswer && (
          <button
            onClick={() => onAnswer(selectedAnswer)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
          >
            {translateText(currentIndex === totalQuestions - 1 ? 'Finalizar' : 'Próxima', language)}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

export default QuizQuestion;
