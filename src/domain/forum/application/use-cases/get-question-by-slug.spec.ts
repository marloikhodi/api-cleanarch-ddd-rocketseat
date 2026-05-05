import { InMemoryQuestionRepository } from '@test/repositories/in-memory-question-repository.js'
import { UniqueEntityId } from '@/core/entities/unique-entity-id.js'
import { Question } from '../../enterprise/entities/question.js'
import { Slug } from '../../enterprise/entities/value-objects/slug.js'
import { GetQuestionBySlugUseCase } from './get-question-by-slug.js'

let inMemoryQuestionsRepository: InMemoryQuestionRepository
let sut: GetQuestionBySlugUseCase

describe('Get Question By Slug', () => {
	beforeEach(() => {
		inMemoryQuestionsRepository = new InMemoryQuestionRepository()
		sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository)
	})

	it('should be able to get a question by slug', async () => {
		const newQuestion = Question.create({
			title: 'Example Question',
			slug: Slug.create('example-question'),
			authorId: new UniqueEntityId(),
			content: 'Example Question',
		})

		await inMemoryQuestionsRepository.create(newQuestion)

		const { question } = await sut.execute({
			slug: 'example-question',
		})

		expect(question.id).toBeTruthy()
		expect(question.title).toEqual(newQuestion.title)
	})
})
