import { UniqueEntityId } from '@/core/entities/unique-entity-id.js'
import { Question } from '../../enterprise/entities/question.js'
import type { QuestionsRepository } from '../repositories/questions-repository.js'

type CreateQuestionUseCaseRequest = {
	authorId: string
	title: string
	content: string
}

type CreateQuestionUseCaseResponse = {
	question: Question
}

export class CreateQuestionUseCase {
	constructor(private questionRepository: QuestionsRepository) {}

	async execute({
		authorId,
		content,
		title,
	}: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
		const question = Question.create({
			authorId: new UniqueEntityId(authorId),
			content,
			title,
		})

		await this.questionRepository.create(question)

		return {
			question,
		}
	}
}
