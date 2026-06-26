import { NotAllowedError } from '@core/errors/errors/not-allowed-error.js'
import { ResourceNotFoundError } from '@core/errors/errors/resource-not-found-error.js'
import { type Either, left, right } from '@/core/either.js'
import { UniqueEntityId } from '@/core/entities/unique-entity-id.js'
import type { Question } from '../../enterprise/entities/question.js'
import { QuestionAttachment } from '../../enterprise/entities/question-attachment.js'
import { QuestionAttachmentList } from '../../enterprise/entities/question-attachment-list.js'
import type { QuestionAttachmentsRepository } from '../repositories/question-attachments-repository.js'
import type { QuestionsRepository } from '../repositories/questions-repository.js'

interface EditQuestionUseCaseRequest {
	authorId: string
	questionId: string
	title: string
	content: string
	attachmentsIds: string[]
}

type EditQuestionUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, { question: Question }>

export class EditQuestionUseCase {
	constructor(
		private questionRepository: QuestionsRepository,
		private questionAttachmentsRepository: QuestionAttachmentsRepository,
	) {}

	async execute({
		authorId,
		questionId,
		title,
		content,
		attachmentsIds,
	}: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
		const question = await this.questionRepository.findById(questionId)

		if (!question) {
			return left(new ResourceNotFoundError())
		}

		if (authorId !== question.authorId.toString()) {
			return left(new NotAllowedError())
		}

		const currentQuestionAttachments = await this.questionAttachmentsRepository.findManyByQuestionId(questionId)

		const questionAttachmentList = new QuestionAttachmentList(currentQuestionAttachments)

		const questionAttachments = attachmentsIds.map((attachmentId) => {
			return QuestionAttachment.create({
				attachmentId: new UniqueEntityId(attachmentId),
				questionId: question.id,
			})
		})

		questionAttachmentList.update(questionAttachments)

		question.title = title
		question.content = content
		question.attachments = questionAttachmentList

		await this.questionRepository.save(question)

		return right({ question })
	}
}
