import type { Question } from '../../enterprise/entities/question.js'
import type { QuestionsRepository } from '../repositories/questions-repository.js'

type GetQuestionBySlugUseCaseRequest = {
	slug: string
}

type GetQuestionBySlugUseCaseResponse = {
	question: Question
}

export class GetQuestionBySlugUseCase {
	constructor(private questionRepository: QuestionsRepository) {}

	async execute({
		slug,
	}: GetQuestionBySlugUseCaseRequest): Promise<GetQuestionBySlugUseCaseResponse> {
		const question = await this.questionRepository.findBySlug(slug)

		if (!question) {
			throw new Error('Question not found.')
		}

		return {
			question,
		}
	}
}
