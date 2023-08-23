'use client'

import { useState } from 'react';

import {preguntas} from '../data.json'

interface Question {
  id: number,
  question: string,
}

interface Answer extends Question {
  rate: 1 | 2 | 3 | 4 | 5,
}

const questions: Question[] = preguntas;

function Rating({
  value, 
  onChange,
  isReadOnly
}: 
  | {
  value: Answer['rate'], 
  onChange: (value: Answer['rate']) => void,
  isReadOnly?: never,
    } 
  | {
  value: Answer['rate'],
  isReadOnly: boolean,
  onChange?: never,
    }) {
  const [hoverValue, setHoverValue] = useState<Answer['rate'] | null>(null);

  return (
    <div
      className={`text-2xl ${hoverValue ? "text-yellow-300" : "text-yellow-500"}`}
      onMouseLeave={() => setHoverValue(null)}
    >
      {"★"
        .repeat(hoverValue || value)
        .padEnd(5, "☆")
        .split("")
        .map((elem, index) => (
          <span
            key={index}
            className={!isReadOnly ? "cursor-pointer" : ""}
            onClick={() => !isReadOnly && onChange?.((index + 1) as Answer['rate'])}
            onMouseOver={() => !isReadOnly && setHoverValue((index + 1) as Answer['rate'])}
          >
            {elem}
          </span>
        ))}
    </div>
  );
}

export default function Home() {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const currentQuestion: Question = questions[answers.length];

  function handleRate(rating: Answer['rate']) {
    setAnswers((answers) => answers.concat({
      ...currentQuestion, 
      rate: rating
    }));
  }

  if (!currentQuestion) {
    return (
      <ul className="rounded-md border p-4">
        {answers.map((answer) => (
          <li className="flex items-center justify-between p-2" key={answer.id}>
            <span>{answer.question}</span>
            <Rating isReadOnly value={answer.rate} />
          </li>
        ))}
      </ul>
    )
  }

  return (
    <div className="text-center flex flex-col gap-6">
      <h1 className="text-xl">{currentQuestion.question}</h1>
      <Rating value={1} onChange={handleRate} />
    </div>
  )
}
