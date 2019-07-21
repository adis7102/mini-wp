<template>
  <div id="home" v-if="page == 'home'">
    <div  class="navColour">
      <b-navbar toggleable="lg">
        <b-navbar-brand href="#"><i class="fab fa-wordpress"></i> Mini WordPress</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <!-- <b-nav-form>
              <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
              <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
            </b-nav-form>-->
            <b-button @click="logout">Sign Out</b-button>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <!-- sidenav -->
    <b-row id="container-row">
      <b-col cols="4">
        <b-list-group id="sidenav">
          <b-list-group-item @click="body = 'feeds'" href="#"><i class="fas fa-newspaper"></i> Feeds</b-list-group-item>
          <b-list-group-item @click="body = 'create'" href="#"><i class="fas fa-pen-nib"></i> Create New Article</b-list-group-item>
          <b-list-group-item @click="body = 'myArticle'" href="#"><i class="fas fa-book"></i> My Article</b-list-group-item>
          <!-- <b-list-group-item href="#">Action links are easy</b-list-group-item> -->
        </b-list-group>
      </b-col>
      <b-col id="content" cols="8">
        <div v-for="data in dataArticle" :key="data._id">
          <allArticle v-if="body == 'feeds'" :allArticle="data" @changeBody="toDetailPage" ></allArticle>
        </div>
        <div v-for="(article, i) in dataMyArticle" :key="`a-${i}`._id">
          <myArticle v-if="body == 'myArticle'" :myArticle="article" @updateArticle="changeBody"></myArticle>
        </div>
        <div v-if="body == 'create'">
          <create @articleCreated="fetchAllArticle"></create>
        </div>
        <div v-if="body == 'update'">
          <update :getIdArticle="articleId"></update>
        </div>
        <div v-if="body == 'detail'">
          <detail :detail="articleId"></detail>
        </div>
      </b-col>
    </b-row>
    <!-- <div class="footer">
      <p><i class="far fa-copyright"></i>Mini WordPress</p>
    </div>    -->
  </div>
</template>

<script>
import ax from "./api/api";
import allArticle from "./allArticle";
import create from "./createArticle";
import myArticle from "./myArticle";
import update from "./updateArticle";
import detail from "./detailArticle";

export default {
  name: "home",
  components: {
    allArticle,
    create,
    myArticle,
    update,
    detail
  },
  props: ["page"],
  data() {
    return {
      body: "feeds",
      articleId: "",
      dataArticle: [],
      dataMyArticle: [],
      newPost: {
        title: "",
        content: "",
        image: ""
      }
    };
  },
  methods: {
    toLanding() {
      this.$emit("changePage", "landing");
    },
    toDetailPage(id) {
      this.body = 'detail'
      this.articleId = id
      console.log(this.articleId, "MASUK")
    },
    changeBody(val, id) {
      this.fetchAllArticle();
      this.fetchMyArticle();
      console.log(id, "hei");
      this.articleId = id;
      this.body = val;
    },
    logout() {
      Swal.fire({
        title: "Are you sure wants to Logout?",       
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes!"
      }).then(result => {
        if (result.value) {
          localStorage.clear();
          this.toLanding();          
        }
      });
    },
    fetchAllArticle() {
      console.log("masuk fetch");
      ax({
        method: "get",
        url: "/articles",
        headers: { token: localStorage.token }
      })
        .then(({ data }) => {
          console.log(data);
          this.dataArticle = data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    fetchMyArticle() {
      console.log("masuk fetch my article");
      ax({
        method: "get",
        url: "/articles/getAll/myarticle",
        headers: { token: localStorage.token }
      })
        .then(({ data }) => {
          console.log(data);
          this.dataMyArticle = data;
        })
        .catch(err => {
          console.log(err.response);
        });
    }
  },
  // mounted
  created() {
    this.fetchAllArticle();
    this.fetchMyArticle();
  }
};
</script>

<style>

</style>
