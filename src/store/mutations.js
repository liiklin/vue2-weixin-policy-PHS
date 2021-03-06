import * as types from './mutation-types'

export default {
  [types.SET_ARTICLE_LIST](state, {articleList}) {
    state.articleList = articleList
  },
  [types.SET_ARTICLE](state, {article}) {
    state.article = article
  },
  [types.SET_CURRENT_ARTICLE_LIST](state, {currentArticleList}) {
    state.currentArticleList = currentArticleList
  }
}
