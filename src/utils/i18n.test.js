import { questions } from '../components/Quiz/quizQuestions';
import { translateText } from './i18n';

describe('quiz translations', () => {
  test('provides English text for every quiz prompt and option', () => {
    questions.forEach((question) => {
      expect(translateText(question.question, 'en-US')).not.toBe(question.question);
      question.options.forEach((option) => {
        expect(translateText(option.text, 'en-US')).not.toBe(option.text);
      });
    });
  });
});
