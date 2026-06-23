import { type Either, right } from '@/core/either.js'
import { UniqueEntityId } from '@/core/entities/unique-entity-id.js'
import { Question } from '../../enterprise/entities/question.js'
import { QuestionAttachment } from '../../enterprise/entities/question-attachment.js'
import { QuestionAttachmentList } from '../../enterprise/entities/question-attachment-list.js'
import type { QuestionsRepository } from '../repositories/questions-repository.js'

interface CreateQuestionUseCaseRequest {
	authorId: string
	title: string
	content: string
	attachmentsIds: string[]
}

type CreateQuestionUseCaseResponse = Either<null, { question: Question }>

export class CreateQuestionUseCase {
	constructor(private questionRepository: QuestionsRepository) {}

	async execute({
		authorId,
		content,
		title,
		attachmentsIds,
	}: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
		const question = Question.create({
			authorId: new UniqueEntityId(authorId),
			content,
			title,
		})

		const questionAttachments = attachmentsIds.map((attachmentId) => {
			return QuestionAttachment.create({
				attachmentId: new UniqueEntityId(attachmentId),
				questionId: question.id,
			})
		})

		question.attachments = new QuestionAttachmentList(questionAttachments)

		await this.questionRepository.create(question)

		return right({
			question,
		})
	}
}
