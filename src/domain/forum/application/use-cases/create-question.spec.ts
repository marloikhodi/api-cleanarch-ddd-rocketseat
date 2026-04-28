import { randomUUID } from 'node:crypto'
import type { Question } from '../../enterprise/entities/question.js'
import type { QuestionsRepository } from '../repositories/questions-repository.js'
import { CreateQuestionUseCase } from './create-question.js'

const fakeQuestionsRepository: QuestionsRepository = {
	create: async (_question: Question) => {
		return
	},
}

test('create a question', async () => {
	const createQuestion = new CreateQuestionUseCase(fakeQuestionsRepository)

	const { question } = await createQuestion.execute({
		authorId: randomUUID(),
		content: 'New Question',
		title: 'New Question',
	})

	expect(question.id).toBeTruthy()
})
