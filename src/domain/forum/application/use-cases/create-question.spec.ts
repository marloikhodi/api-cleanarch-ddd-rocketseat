import { randomUUID } from 'node:crypto'
import { InMemoryQuestionsRepository } from '@test/repositories/in-memory-questions-repository.js'
import { UniqueEntityId } from '@/core/entities/unique-entity-id.js'
import { CreateQuestionUseCase } from './create-question.js'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: CreateQuestionUseCase

describe('Create Question', () => {
	beforeEach(() => {
		inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
		sut = new CreateQuestionUseCase(inMemoryQuestionsRepository)
	})

	it('should be able to create a question', async () => {
		const result = await sut.execute({
			authorId: randomUUID(),
			content: 'New Question',
			title: 'New Question',
			attachmentsIds: ['1', '2'],
		})

		expect(result.isRight()).toBe(true)
		expect(inMemoryQuestionsRepository.items[0]).toEqual(result.value?.question)
		expect(inMemoryQuestionsRepository.items[0]?.attachments.currentItems).toHaveLength(2)
		expect(inMemoryQuestionsRepository.items[0]?.attachments.currentItems).toEqual([
			expect.objectContaining({ attachmentId: new UniqueEntityId('1') }),
			expect.objectContaining({ attachmentId: new UniqueEntityId('2') }),
		])
	})
})
