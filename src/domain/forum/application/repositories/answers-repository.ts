import type { Answer } from '../../enterprise/entities/answer.js'

export interface AnswersRepository {
	create(answer: Answer): Promise<void>
	findById(id: string): Promise<Answer | null>
	delete(answer: Answer): Promise<void>
}
