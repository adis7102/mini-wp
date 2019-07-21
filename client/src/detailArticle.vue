<template>
  <div>
    <b-card>
      <b-media>
        <b-img :src="dataArticle.image" width="200" alt="placeholder"></b-img>
        <h5 class="mt-0">{{ dataArticle.title }}</h5>
        <p v-html="dataArticle.content">{{ dataArticle.content }}</p>        
      </b-media>
    </b-card>
  </div>
</template>

<script>
import ax from "./api/api";
export default {
  name: "detail",
  props: {
    detail: String
  },
  data() {
    return {
      dataArticle: ""
    };
  },
  methods: {
    toFeeds() {
      this.$emit("changeBody", "detail");
    },
    findOne(){
      ax({
      method: "get",
      url: `articles/${this.detail}`,
      headers: {
        token: localStorage.getItem("token")
      }
      })
      .then(({ data }) => {
        console.log(data, "ini data dari detail article");
        this.dataArticle = data;
        console.log(this.dataArticle)
      })
      .catch(err => {
        console.log(err.response);
      });
    }
  },
  created() {
    this.findOne()
  },
  // watch: {
  //   detail: function(){
  //     console.log("ASD")
  //     this.findOne()
  //   }
  // }
};
</script>

<style>
</style>
