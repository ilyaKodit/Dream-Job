import React, { useState } from 'react';

import Question from './Question';

import './FAQ.css'

export default function FAQ() {
  const [faqs, setfaqs] = useState([
    {
      question: 'Как можно получить доступ к приложению?',
      answer: "Ответ: Для доступа к приложению необходимо быть студентом bootcampa 'Elbrus'",
      open: false,
    },
    {
      question: 'Чем отличается DreamJob от других подобных приложений?',
      answer: "Ответ: DreamJob - это закрытое приложение созданное для комьюнити bootcampa 'Elbrus'",
      open: false,
    },
    {
      question: 'Как мне оставить свой отзыв в приложение?',
      answer: 'Ответ: Это очень просто. Для этого нужно заполнить все поля формы нового отзыва ',
      open: false,
    },
  ]);

  const toggleFAQ = index => {
    setfaqs(
      faqs.map((faq, i) => {
        if (i === index) {
          faq.open = !faq.open;
        } else {
          faq.open = false;
        }

        return faq;
      }),
    );
  };

  return (
    <div className="App">
      <div className="faqs">
        {faqs.map((faq, i) => (
          <Question key={i} faq={faq} index={i} toggleFAQ={toggleFAQ} />
        ))}
      </div>
    </div>
  );
}
