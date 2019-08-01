<template>
  <div>
    <label for="title">
      <h5>Title :</h5>
    </label>
    <b-form-input v-model="newPost.title" placeholder="Enter your title"></b-form-input>
    <br />
    <tinymce-editor
      v-model="newPost.content"
      id="tiny-editor"
      api-key="API_KEY"
      :init="{plugins: 'wordcount'}"
    ></tinymce-editor>

    <b-form-file v-model="newPost.image" class="mt-3" plain @change="onFilePicked"></b-form-file>
    <img :src="imageUrl" v-show="imageUrl" />
    <div class="mt-3">
      <b-spinner v-if="statusLoad" variant="primary" label="Spinning"></b-spinner>
      Selected file: {{ newPost.image ? newPost.image.name : '' }}
    </div>
    <b-button @click="createArticle" :disabled="disableButton" variant="info" style="float: left; background-color : #F9A825;">Submit</b-button>
  </div>
</template>

<script>
import ax from "./api/api";
import Editor from "@tinymce/tinymce-vue";
export default {
  name: "createArticle",
  props: ["create"],
  data() {
    return {
      newPost : {
        title : '',
        content : '',
        image : ''
      },
      disableButton : false,
      statusLoad : false,
      image : '',
      imageUrl: "",
      imageFile: "",
      loading: false,
      baseUrl: "http://localhost:3000"      
    };
  },
  components: {
    "tinymce-editor": Editor
  },
  methods: {
    toCreate() {
      this.$emit('articleCreated');     
    },
    toFeeds(){
      this.$emit('feeds', 'feeds')
    },
    refecthMyArt() {
       this.$emit('refetchMyArticle')
    },
    disable(val){
      this.disableButton = val
    },
    createArticle() {
      let newArticle = {
        title: this.newPost.title,
        content: this.newPost.content,
        image: this.image
      };
      ax({
        method: `post`,
        url: `/articles`,
        headers: { token: localStorage.token },
        data: newArticle
      })
        .then(({ data }) => {
          console.log("sukses ini kayanya");
          console.log(data);
          Swal.fire({            
            type: 'success',
            title: 'Succes Creating new Article',
            showConfirmButton: false,
            timer: 1700
          })
          this.newPost.title = ''
          this.newPost.content = ''
          this.image ='',
          this.imageUrl="",
          this.imageFile="",
          this.toCreate()
          this.refecthMyArt()
          this.toFeeds()
        })
        .catch(err => {
          console.log("kena error di create article");
          console.log(err.response);
        });
    },
     onFilePicked (e) {
      this.statusLoad = true      
      this.loading = true      
      this.imageUrl = ""
      this.disable(true)
      const files = e.target.files
      if(files[0] !== undefined) {
          this.imageName = files[0].name
          if(this.imageName.lastIndexOf('.') <= 0) {
              return
          }
          const fr = new FileReader ()
          fr.readAsDataURL(files[0])
          fr.addEventListener('load', () => {
              this.imageFile = files[0] // this is an image file that can be sent to server...
              const formData = new FormData()
                  formData.append('image',this.imageFile)
                  ax({
                    method: "POST",
                    url: `${this.baseUrl}/articles/upload`,
                    headers: {
                      token: localStorage.token
                    },
                    data: formData
                  })
                    .then(({ data }) =>{
                      this.loading = false
                      this.statusLoad = false                      
                      this.imageUrl = fr.result
                      this.image = data
                      this.disable(false)
                      })
                    .catch(err =>{
                      console.log(err.response)
                      })
          })
      } else {
          this.imageName = ''
          this.imageFile = ''
          this.imageUrl = ''
      }
    },
  }
};
</script>

<style>
/* #tiny-editor {
    width: 
} */
</style>
