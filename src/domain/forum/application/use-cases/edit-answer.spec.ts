import { makeAnswer } from '@test/factories/make-answer.js'
import { InMemoryAnswersRepository } from '@test/repositories/in-memory-answers-repository.js'
import { UniqueEntityId } from '@/core/entities/unique-entity-id.js'
import { EditAnswerUseCase } from './edit-answer.js'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: EditAnswerUseCase

describe('Edit Answer', () => {
	beforeEach(() => {
		inMemoryAnswersRepository = new InMemoryAnswersRepository()
		sut = new EditAnswerUseCase(inMemoryAnswersRepository)
	})

	it('should be able to edit a answer', async () => {
		const newAnswer = makeAnswer({ authorId: new UniqueEntityId('author-1') }, new UniqueEntityId('answer-1'))

		await inMemoryAnswersRepository.create(newAnswer)

		await sut.execute({
			authorId: 'author-1',
			answerId: newAnswer.id.toString(),
			content: 'Test Content',
		})

		expect(inMemoryAnswersRepository.items[0]).toMatchObject({
			content: 'Test Content',
		})
	})

	it('should not be able to edit a answer from another user', async () => {
		const newAnswer = makeAnswer({ authorId: new UniqueEntityId('author-1') }, new UniqueEntityId('answer-1'))

		await inMemoryAnswersRepository.create(newAnswer)

		expect(() =>
			sut.execute({
				authorId: 'author-2',
				answerId: newAnswer.id.toString(),
				content: 'Test Content',
			}),
		).rejects.toBeInstanceOf(Error)
	})
})
