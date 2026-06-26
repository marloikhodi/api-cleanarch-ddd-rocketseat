import { type Either, left, right } from '@/core/either.js'
import { NotAllowedError } from '../../../../core/errors/errors/not-allowed-error.js'
import { ResourceNotFoundError } from '../../../../core/errors/errors/resource-not-found-error.js'
import type { Question } from '../../enterprise/entities/question.js'
import type { AnswersRepository } from '../repositories/answers-repository.js'
import type { QuestionsRepository } from '../repositories/questions-repository.js'

interface ChooseQuestionBestAnswerUseCaseRequest {
	answerId: string
	authorId: string
}

type ChooseQuestionBestAnswerUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, { question: Question }>

export class ChooseQuestionBestAnswerUseCase {
	constructor(
		private answersRepository: AnswersRepository,
		private questionsRepository: QuestionsRepository,
	) {}

	async execute({
		answerId,
		authorId,
	}: ChooseQuestionBestAnswerUseCaseRequest): Promise<ChooseQuestionBestAnswerUseCaseResponse> {
		const answer = await this.answersRepository.findById(answerId)

		if (!answer) {
			return left(new ResourceNotFoundError())
		}
		const question = await this.questionsRepository.findById(answer.questionId.toString())

		if (!question) {
			return left(new ResourceNotFoundError())
		}

		if (authorId !== question.authorId.toString()) {
			return left(new NotAllowedError())
		}

		question.bestAnswerId = answer.id

		await this.questionsRepository.save(question)

		return right({
			question,
		})
	}
}
