import { WatchedList } from '@/core/entities/watchetd-list.js'
import type { AnswerAttachment } from './answer-attachment.js'

export class AnswerAttachmentList extends WatchedList<AnswerAttachment> {
	compareItems(a: AnswerAttachment, b: AnswerAttachment): boolean {
		return a.attachmentId === b.attachmentId
	}
}
