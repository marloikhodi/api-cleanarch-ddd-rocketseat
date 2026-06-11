import type { PaginationParams } from '@/core/repositories/pagination-params.js'
import type { Question } from '../../enterprise/entities/question.js'

export interface QuestionsRepository {
	create(question: Question): Promise<void>
	save(question: Question): Promise<void>
	delete(question: Question): Promise<void>
	findManyRecent(params: PaginationParams): Promise<Question[]>
	findById(id: string): Promise<Question | null>
	findBySlug(slug: string): Promise<Question | null>
}
