import { makeQuestion } from '@test/factories/make-question.js'
import { InMemoryQuestionsRepository } from '@test/repositories/in-memory-questions-repository.js'
import { UniqueEntityId } from '@/core/entities/unique-entity-id.js'
import { EditQuestionUseCase } from './edit-question.js'
import { NotAllowedError } from './errors/not-allowed-error.js'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: EditQuestionUseCase

describe('Edit Question', () => {
	beforeEach(() => {
		inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
		sut = new EditQuestionUseCase(inMemoryQuestionsRepository)
	})

	it('should be able to edit a question', async () => {
		const newQuestion = makeQuestion({ authorId: new UniqueEntityId('author-1') }, new UniqueEntityId('question-1'))

		await inMemoryQuestionsRepository.create(newQuestion)

		await sut.execute({
			authorId: 'author-1',
			questionId: newQuestion.id.toString(),
			title: 'Test Question',
			content: 'Test Content',
		})

		expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
			title: 'Test Question',
			content: 'Test Content',
		})
	})

	it('should not be able to edit a question from another user', async () => {
		const newQuestion = makeQuestion({ authorId: new UniqueEntityId('author-1') }, new UniqueEntityId('question-1'))

		await inMemoryQuestionsRepository.create(newQuestion)

		const result = await sut.execute({
			authorId: 'author-2',
			questionId: newQuestion.id.toString(),
			title: 'Test Question',
			content: 'Test Content',
		})

		expect(result.isLeft()).toBe(true)
		expect(result.value).toBeInstanceOf(NotAllowedError)
	})
})
