<template lang="pug">
div
	.header(flex="dir:left main:center")
		.header-left
			i.iconfont.icon-psd-header
		.header-right
			span 国家知识产权政策
	.body
		div(v-for="item in articleItem")
			.items(@click="open(item.id,item.name)")
				.item
					span(v-text="item.name")
</template>

<script>
import {
  mapGetters,
  mapActions
} from 'vuex'

import _ from 'underscore'

async function fetchArticleList(store) {
  return store.dispatch('getArticleList')
}

export default {
  data() {
    return {
      articleItem: [],
			articleList:[]
    }
  },
  computed: {
    ...mapGetters([
      'getArticleList',
    ])
  },
  methods: {
    open(id, title) {
      //提交统计
      window._czc.push('_trackEvent', '政策小灵通', '打开', `打开列表${title}`)
      this.$router.push({
        name: 'detailList',
        query: {
          id
        }
      })
			let currentArticleList = _.filter(this.articleList,item=>{
				return item.id == id
			})
			this.$store.dispatch('setCurrentArticle',{
				currentArticleList
			})
    }
  },
  async mounted() {
    await fetchArticleList(this.$store)
    this.articleList = this.$store.getters.getArticleList
    this.articleItem = _.map(this.articleList, item => {
      return {
        id: item.id,
        name: item.name
      }
    })
  },
  beforeMount() {
    document.body.style.background = '#f7f7f7'
  }
}
</script>


<style scoped lang="stylus">
@import '../stylus/pages/index'
</style>
