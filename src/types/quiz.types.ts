export type QuizT = {
  id: number
  name: string
  questions: [] | QuestionT[]
}

export type QuestionT = {
  answers: [] | AnswerT[]
  id: number
  text: string
}

export type AnswerT = {
  id: number
  isCorrect: boolean
  text: string
}
