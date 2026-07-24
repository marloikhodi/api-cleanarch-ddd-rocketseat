import { makeAnswer } from '@test/factories/make-answer.js'
import { InMemoryAnswerAttachmentsRepository } from '@test/repositories/in-memory-answer-attachment-repository.js'
import { InMemoryAnswersRepository } from '@test/repositories/in-memory-answers-repository.js'
import { OnAnswerCreated } from './on-answer-created.js'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository

describe('On Answer Created', () => {
	beforeEach(() => {
		inMemoryAnswerAttachmentsRepository = new InMemoryAnswerAttachmentsRepository()
		inMemoryAnswersRepository = new InMemoryAnswersRepository(inMemoryAnswerAttachmentsRepository)
	})
	it('should send a notification when an answer is created', () => {
		const _onAnswerCreated = new OnAnswerCreated()

		const answer = makeAnswer()

		inMemoryAnswersRepository.create(answer)
	})
})
