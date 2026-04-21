import { randomUUID } from 'node:crypto'
import type { Slug } from './value-objects/slug.js'

interface QuestionProps {
	slug: Slug
	title: string
	content: string
	authorId: string
}

export class Question {
	public id: string
	public slug: Slug
	public title: string
	public content: string
	public authorId: string

	constructor(props: QuestionProps, id?: string) {
		this.slug = props.slug
		this.title = props.title
		this.content = props.content
		this.authorId = props.authorId

		this.id = id ?? randomUUID()
	}
}
