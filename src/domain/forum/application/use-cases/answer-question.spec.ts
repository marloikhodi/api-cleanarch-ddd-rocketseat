import type { AnswersRepository } from '../repositories/answers-repository.js'
import { AnswerQuestionUseCase } from './answer-question.js'

const fakeAnswersRepository: AnswersRepository = {
	create: async () => {
		return
	},
}

test('create an answer', async () => {
	const answerQuestion = new AnswerQuestionUseCase(fakeAnswersRepository)

	const answer = await answerQuestion.execute({
		questionId: '1',
		instructorId: '2',
		content: 'New Answer',
	})

	expect(answer.content).toEqual('New Answer')
})
