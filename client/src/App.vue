<template>
  <div>
    <landing :page="page" @changePage="changePage"></landing>
    <home :page="page" @changePage="changePage"></home>    
  </div>
</template>

<script>
import landing from "./landing.vue";
import home from "./home.vue";
export default {
  name: "app",
  components: {
    landing,
    home
  },
  data(){
    return {
      page : 'landing'
    }
  },
  methods : {
    changePage(value){
      this.page = value
    }
  },
  created(){
    if(localStorage.token){
      this.page = 'home'
    }
    else{
      this.page = 'landing'
    }
  }
};
</script>

<style scoped>
</style>
