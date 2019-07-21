<template>
  <div>
    <div class="d-flex mb-3 ">
      <b-card id="allArticle-card">
        <b-row>
          <b-col>
            <img id="allArticle-img" :src="allArticle.image" alt="image" />
          </b-col>
          <b-col id="allArticle-card-value">
            <b-card-text>
              <a href="#" @click="toDetail(allArticle._id)"><h5>{{ allArticle.title }}</h5></a>
            </b-card-text>
            <b-card-text>
              <p>Created at : {{ allArticle.createdAt }}</p>
            </b-card-text>
          </b-col>
        </b-row>
      </b-card>
    </div>
  </div>
</template>

<script>
import ax from "./api/api.js";
import detail from "./detailArticle"
export default {
  name: "allArticleCard",
  components : {
    detail
  },
  props: ["allArticle"],
  data() {
    return {
      body : 'feeds'
    };
  },
  methods: {
    toDetail(id){
      this.$emit('changeBody', id)
    }
  }
};
</script>

<style>
</style>
