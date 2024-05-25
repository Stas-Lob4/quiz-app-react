import { generateComplexId } from '@/shared/tools'
import {
  AddAnswerPayloadT,
  EditAnswerPayloadT,
  QuizStateT,
  RemoveAnswerPayloadT,
} from '@/store/slices/quiz/quiz.types'
import { AnswerT, QuizT } from '@/types/quiz.types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import initialQuizzesData from '../../../data/data.json'

type InitialStateT = QuizStateT

const getInitialState = (): QuizT[] => initialQuizzesData

const initialState: InitialStateT = {
  quizzes: getInitialState(),
}

const slice = createSlice({
  initialState,
  name: 'quiz',
  reducers: {
    addAnswer: (state, action: PayloadAction<AddAnswerPayloadT>) => {
      const { isCorrect, questionId, quizId, text } = action.payload

      const newAnswer: AnswerT = {
        id: state.quizzes[quizId].questions[questionId].answers.length,
        isCorrect,
        text,
      }

      state.quizzes = state.quizzes.map(quiz =>
        quiz.id === quizId
          ? {
              ...quiz,
              questions: quiz.questions.map(question =>
                question.id === questionId
                  ? {
                      ...question,
                      answers: [...question.answers, newAnswer],
                    }
                  : question
              ),
            }
          : quiz
      )
    },
    addQuestion: (state, action: PayloadAction<{ quizId: number; text: string }>) => {
      const newQuestion = {
        answers: [],
        id: generateComplexId(),
        text: action.payload.text,
      }

      state.quizzes = state.quizzes.map(quiz =>
        quiz.id === action.payload.quizId
          ? { ...quiz, questions: { ...quiz.questions, newQuestion } }
          : quiz
      )
    },
    addQuiz: (state, action: PayloadAction<{ name: string }>) => {
      const newQuiz: QuizT = {
        id: generateComplexId(),
        name: action.payload.name,
        questions: [],
      }

      state.quizzes = [newQuiz, ...state.quizzes]
    },
    editAnswer: (state, action: PayloadAction<EditAnswerPayloadT>) => {
      const { id, isCorrect, questionId, quizId, text } = action.payload

      state.quizzes = state.quizzes.map(quiz =>
        quiz.id === quizId
          ? {
              ...quiz,
              questions: quiz.questions.map(question =>
                question.id === questionId
                  ? {
                      ...question,
                      answers: question.answers.map(answer =>
                        answer.id === id
                          ? {
                              ...answer,
                              isCorrect: isCorrect ?? answer.isCorrect,
                              text: text ?? answer.text,
                            }
                          : answer
                      ),
                    }
                  : question
              ),
            }
          : quiz
      )
    },
    editQuestion: (state, action: PayloadAction<{ id: number; quizId: number; text: string }>) => {
      state.quizzes = state.quizzes.map(quiz =>
        quiz.id === action.payload.quizId
          ? {
              ...quiz,
              questions: quiz.questions.map(question =>
                question.id === action.payload.id
                  ? { ...question, text: action.payload.text }
                  : question
              ),
            }
          : quiz
      )
    },
    editQuiz: (state, action: PayloadAction<{ id: number; name: string }>) => {
      state.quizzes = state.quizzes.map(quiz =>
        quiz.id === action.payload.id ? { ...quiz, name: action.payload.name } : quiz
      )
    },
    removeAnswer: (state, action: PayloadAction<RemoveAnswerPayloadT>) => {
      const { id, questionId, quizId } = action.payload

      state.quizzes = state.quizzes.map(quiz =>
        quiz.id === quizId
          ? {
              ...quiz,
              questions: quiz.questions.map(question =>
                question.id === questionId
                  ? {
                      ...question,
                      answers: question.answers.filter(answer => answer.id !== id),
                    }
                  : question
              ),
            }
          : quiz
      )
    },
    removeQuestion: (state, action: PayloadAction<{ id: number; quizId: number }>) => {
      state.quizzes = state.quizzes.map(quiz =>
        quiz.id === action.payload.quizId
          ? {
              ...quiz,
              questions: quiz.questions.filter(question => question.id !== action.payload.id),
            }
          : quiz
      )
    },
    removeQuiz: (state, action: PayloadAction<{ id: number }>) => {
      state.quizzes = state.quizzes.filter(quiz => quiz.id !== action.payload.id)
    },
    setQuizzes: (state, action: PayloadAction<QuizT[]>) => {
      state.quizzes = action.payload
    },
  },
})

export const quizActions = slice.actions
export default slice.reducer
