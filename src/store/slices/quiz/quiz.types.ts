import { QuizT } from '@/types'

export type QuizStateT = {
  quizzes: [] | QuizT[]
}

export type AddAnswerPayloadT = {
  isCorrect: boolean
  questionId: number
  quizId: number
  text: string
}

export type EditAnswerPayloadT = {
  id: number
  isCorrect?: boolean
  questionId: number
  quizId: number
  text?: string
}

export type RemoveAnswerPayloadT = {
  id: number
  questionId: number
  quizId: number
}
