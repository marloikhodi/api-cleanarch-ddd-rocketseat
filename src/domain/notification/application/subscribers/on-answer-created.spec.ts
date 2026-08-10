import { makeAnswer } from '@test/factories/make-answer.js'
import { makeQuestion } from '@test/factories/make-question.js'
import { InMemoryAnswerAttachmentsRepository } from '@test/repositories/in-memory-answer-attachment-repository.js'
import { InMemoryAnswersRepository } from '@test/repositories/in-memory-answers-repository.js'
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository.js'
import { InMemoryQuestionAttachmentsRepository } from '@test/repositories/in-memory-question-attachment-repository.js'
import { InMemoryQuestionsRepository } from '@test/repositories/in-memory-questions-repository.js'
import { waitFor } from '@test/utils/wait-for.js'
import { SendNotificationUseCase } from '../use-cases/send-notification.js'
import { OnAnswerCreated } from './on-answer-created.js'

let inMemoryQuestionsAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryNotificationsRepository: InMemoryNotificationsRepository
let sendNotificationUseCase: SendNotificationUseCase

let sendNotificationExecuteSpy: ReturnType<typeof vi.spyOn>

describe('On Answer Created', () => {
	beforeEach(() => {
		inMemoryQuestionsAttachmentsRepository = new InMemoryQuestionAttachmentsRepository()
		inMemoryQuestionsRepository = new InMemoryQuestionsRepository(inMemoryQuestionsAttachmentsRepository)
		inMemoryAnswerAttachmentsRepository = new InMemoryAnswerAttachmentsRepository()
		inMemoryAnswersRepository = new InMemoryAnswersRepository(inMemoryAnswerAttachmentsRepository)
		inMemoryNotificationsRepository = new InMemoryNotificationsRepository()
		sendNotificationUseCase = new SendNotificationUseCase(inMemoryNotificationsRepository)

		sendNotificationExecuteSpy = vi.spyOn(sendNotificationUseCase, 'execute')

		new OnAnswerCreated(inMemoryQuestionsRepository, sendNotificationUseCase)
	})
	it('should send a notification when an answer is created', async () => {
		const question = makeQuestion()
		const answer = makeAnswer({ questionId: question.id })

		inMemoryQuestionsRepository.create(question)
		inMemoryAnswersRepository.create(answer)

		await waitFor(() => {
			expect(sendNotificationExecuteSpy).toHaveBeenCalled()
		})
	})
})
