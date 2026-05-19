import { randomUUID } from 'node:crypto'
import { InMemoryAnswersRepository } from '@test/repositories/in-memory-answers-repository.js'
import { AnswerQuestionUseCase } from './answer-question.js'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: AnswerQuestionUseCase

describe('Create Answer', () => {
	beforeEach(() => {
		inMemoryAnswersRepository = new InMemoryAnswersRepository()
		sut = new AnswerQuestionUseCase(inMemoryAnswersRepository)
	})

	it('should be able to create a answer', async () => {
		const { answer } = await sut.execute({
			content: 'Answer content',
			instructorId: randomUUID(),
			questionId: randomUUID(),
		})

		expect(answer.id).toBeTruthy()
		expect(inMemoryAnswersRepository.items[0]?.id).toEqual(answer.id)
	})
})
