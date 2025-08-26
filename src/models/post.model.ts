import { User } from './user.model'

export interface PostModel {
  _id: string
  title: string
  photo: string
  video?: string
  audio?: string
  authorId: string
  description: string
  isApproved: boolean
  isRejected: boolean
  comments: PostComment[]
}

export interface BePost {
  _id: string
  title: string
  photo: string
  video?: string
  audio?: string
  authorId: Partial<User>
  description: string
  comments: PostComment[]
  createdAt: string
  isApproved: boolean
  isRejected: boolean
}
export interface PostComment {
  _id: string
  comment: string
  userId: Partial<User>
  postId: string
  createdAt: string
}
