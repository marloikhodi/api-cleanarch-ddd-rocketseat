import { makeQuestion } from '@test/factories/make-question.js'
import { InMemoryQuestionRepository } from '@test/repositories/in-memory-question-repository.js'
import { UniqueEntityId } from '@/core/entities/unique-entity-id.js'
import { DeleteQuestionUseCase } from './delete-questions-use-case.js'

let inMemoryQuestionsRepository: InMemoryQuestionRepository
let sut: DeleteQuestionUseCase

describe('Delete Question', () => {
	beforeEach(() => {
		inMemoryQuestionsRepository = new InMemoryQuestionRepository()
		sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository)
	})

	it('should be able to delete a question', async () => {
		const newQuestion = makeQuestion({ authorId: new UniqueEntityId('author-1') }, new UniqueEntityId('question-1'))

		await inMemoryQuestionsRepository.create(newQuestion)

		await sut.execute({
			questionId: 'question-1',
			authorId: 'author-1',
		})

		expect(inMemoryQuestionsRepository.items).toHaveLength(0)
	})

	it('should not be able to delete a question from another user', async () => {
		const newQuestion = makeQuestion({ authorId: new UniqueEntityId('author-1') }, new UniqueEntityId('question-1'))

		await inMemoryQuestionsRepository.create(newQuestion)

		expect(() =>
			sut.execute({
				questionId: 'question-1',
				authorId: 'author-2',
			}),
		).rejects.toBeInstanceOf(Error)
	})
})
