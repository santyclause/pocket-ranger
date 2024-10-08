import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { Post } from "@/models/Post.js"
import { AppState } from "@/AppState.js"

class PostsService {
  async deletePost(postId) {
    const response = await api.delete(`api/posts/${postId}`)
    const postIndex = AppState.posts.findIndex(post => post.id == postId)
    AppState.posts.splice(postIndex, 1)
  }
  async createPost(postData) {
    const response = await api.post('api/posts', postData)
    const createdPost = new Post(response.data)
    AppState.posts.push(createdPost)
    return createdPost
  }
  async getPostsByCommunity(parkCode) {
    const response = await api.get(`api/park/${parkCode}/posts`)
    logger.log(response)
    const newPosts = response.data.map(post => new Post(post))
    AppState.posts = newPosts
  }

}

export const postsService = new PostsService()