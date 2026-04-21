import { Entity } from '../../core/entities/entity.js'
import type { Slug } from './value-objects/slug.js'

interface QuestionProps {
	slug: Slug
	title: string
	content: string
	authorId: string
}

export class Question extends Entity<QuestionProps> {}
