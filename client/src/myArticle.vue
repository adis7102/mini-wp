<template>
    <div>
      <b-card :img-src="myArticle.image" img-alt="Card image" img-left class="mb-3">
        <b-card-text>
          <h5>{{ myArticle.title }}</h5>
        </b-card-text>
        <b-card-text>
          <h5>{{ myArticle.createdAt }}</h5>
        </b-card-text>
        <b-button
          @click="deleteArticle(myArticle._id)"
          variant="danger"
          style="float : right; margin-top: 100px;"
        >DELETE</b-button>
        <b-button
          @click="toUpdate(myArticle._id)"
          variant="success"
          style="float : right; margin-top: 100px;"
        >UPDATE</b-button>
      </b-card>
    </div>
</template>

<script>
import ax from "./api/api.js";
import update from "./updateArticle";
export default {
  name: "myArticle",
  components: {
    update
  },
  props: ["myArticle"],
  data() {
    return {
      dataMyArticle: [],
      date: "",
    //   prevVal: {
    //     id : this.myArticle._id,
    //     inputUpdateTitle: this.myArticle.title,
    //     inputUpdateContent: this.myArticle.Content,
    //     inputUpdateImage: this.myArticle.image
    //   }
    };
  },
  methods: {    
    toUpdate(id) {
      this.$emit('updateArticle', 'update',id)
    },
    reFetch() {
    },
    deleteArticle(id) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          ax({
            method: "delete",
            url: `/articles/${id}`,
            headers: { token: localStorage.token }
          })
            .then(({ data }) => {
              console.log(data);
              Swal.fire("Deleted!", "Your article has been deleted.", "success");
              this.reFetch();
            })
            .catch(err => {
              console.log(err);
            });          
        }
      });
    }
  },
  created(){
      
  }
};
</script>

<style>
</style>
