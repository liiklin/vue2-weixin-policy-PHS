<template lang="pug">
div
	.header(flex="dir:left main:center")
		.header-left
			i.iconfont.icon-psd-header
		.header-right
			span 国家知识产权政策
	.body
		div(v-for="article in articleList")
			.title
				p.divider(v-text="article.name" flex="dir:left main:center")
			.items
				.item(@click="open(item.id)" v-for="item in article.items")
					.item-top
						span(v-text="item.name")
					.item-bottom
						.item-bottom-left
							span(v-text="'发文部门:'+item.sendDepartment")
						.item-bottom-right
							span(v-text="item.sendDate")
</template>

<script>
import {
  mapGetters,
  mapActions
} from 'vuex'

async function fetchArticleList(store) {
  return store.dispatch('getArticleList')
}

export default {
  data() {
    return {
      articleList: [],
    }
  },
  computed: {
    ...mapGetters([
      'getArticleList',
    ])
  },
  methods: {
    open(id) {
      this.$router.push({
        name: 'detail',
        query: {
          id
        }
      })
    }
  },
  async mounted() {
    await fetchArticleList(this.$store)
    this.articleList = this.$store.getters.getArticleList
  }
}
</script>


<style scoped lang="stylus">
@import '../stylus/pages/index'
</style>
