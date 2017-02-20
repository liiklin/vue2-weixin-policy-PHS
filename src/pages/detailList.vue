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
				.item(@click="open(item.id,item.name)" v-for="item in article.items")
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

import {
	wxShareConfig
} from '../util/util'

import _ from 'underscore'
import queryString from 'query-string'

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
    open(id, title) {
      //提交统计
      window._czc.push('_trackEvent', '政策小灵通', '打开', `打开文章${title}`)
      this.$router.push({
        name: 'detail',
        query: {
          id
        }
      })
    },
    setDocumentTitle(title) {
        document.title = title;
        let ua = navigator.userAgent;
        if (/\bMicroMessenger\/([\d\.]+)/.test(ua) && /ip(hone|od|ad)/i.test(ua)) {
            var i = document.createElement('iframe');
            i.src = '/favicon.ico';
            i.style.display = 'none';
            i.onload = function () {
                setTimeout(function () {
                    i.remove();
                }, 9);
            };
            document.body.appendChild(i);
        }
    }
  },
  async mounted() {
    if (_.isEmpty(this.$store.getters.getArticleList)) {
      await fetchArticleList(this.$store)
      let self = this,
        search = queryString.parse(location.search),
        id = self.$route.query.id || search.id
      this.articleList = _.filter(this.$store.getters.getArticleList, item => {
        return item.id == id
      })
    } else {
      this.articleList = this.$store.getters.getCurrentArticleList
    }
    //修改title
    this.setDocumentTitle(this.articleList[0].name)

    //分享设置
    let title = `${this.articleList[0].name}`,
      desc = `${this.articleList[0].name}`,
      link = `weixin.7ipr.com/app/weixin/policy/index.html#/detailList?id=${this.articleList[0].id}`,
      imgUrl = ''
    wxShareConfig({
        title,
        desc,
        link,
        imgUrl
      })
  },
  beforeMount() {
    document.body.style.background = '#f7f7f7'
  }
}
</script>


<style scoped lang="stylus">
@import '../stylus/pages/detailList'
</style>
