<template lang="pug">
#detail
  .header
    img(src="~assets/detail-header.png")
  .content(v-html="article.content")
  .footer
    img(src="~assets/detail-footer.png")
</template>

<script>
import {
  mapGetters,
  mapActions
} from 'vuex'

import {
	wxShareConfig
} from '../util/util'

async function fetchArticle(store,id) {
  return store.dispatch('getArticle',{id})
}

export default {
  data() {
    return {
      article: {},
    }
  },
  computed: {
    ...mapGetters([
      'getArticle',
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
    let id = this.$route.query.id
    await fetchArticle(this.$store,id)
    this.article = this.$store.getters.getArticle

    //修改title
    this.setDocumentTitle(this.article.name)

    //分享设置
    let title = `${this.article.name}`,
      desc = `${this.article.name}`,
      link = `weixin.7ipr.com/app/weixin/policy/index.html#/detail?id=${this.article.id}`,
      imgUrl = ''
    wxShareConfig({
        title,
        desc,
        link,
        imgUrl
      })
  },
  beforeMount(){
    document.body.style.background = '#fff'
  }
}
</script>

<style scoped lang="stylus">
@import '../stylus/pages/detail'
</style>
