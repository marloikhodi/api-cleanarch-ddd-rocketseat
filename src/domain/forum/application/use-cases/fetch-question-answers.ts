import { type Either, right } from '@/core/either.js'
import type { Answer } from '../../enterprise/entities/answer.js'
import type { AnswersRepository } from '../repositories/answers-repository.js'

interface FetchQuestionAnswersUseCaseRequest {
	questionId: string
	page: number
}

type FetchQuestionAnswersUseCaseResponse = Either<null, { answers: Answer[] }>

export class FetchQuestionAnswersUseCase {
	constructor(private questionRepository: AnswersRepository) {}

	async execute({
		questionId,
		page,
	}: FetchQuestionAnswersUseCaseRequest): Promise<FetchQuestionAnswersUseCaseResponse> {
		const answers = await this.questionRepository.findManyByQuestionId(questionId, { page })

		return right({
			answers,
		})
	}
}
