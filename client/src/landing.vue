<template>
  <div id="landing" v-if="page === 'landing'">
    <img id="image" src="https://wallpapercave.com/wp/LWEuptq.jpg" alt="asdad">
    <div id="title"><h1>Welcome to MiniWordPress</h1></div>

    <div id="card-container">      
      <div id="inside-card" class="card">
        <article class="card-body">
          <b-button v-b-modal.modal-register variant="outline-primary" style="float: right;">Register</b-button>
          <h4 class="card-title mb-4 mt-1">Sign in</h4>
          <form>
            <div class="form-group">
              <label>Your email</label>
              <input v-model="user.email" name class="form-control" placeholder="Email" type="email"/>
            </div>
            <!-- form-group// -->
            <div class="form-group">             
              <label>Your password</label>
              <input v-model="user.password" class="form-control" placeholder="******" type="password"/>
            </div>
            <!-- form-group// -->
            <div class="form-group">
              <!-- <div class="g-signin2" data-onsuccess="onSignIn"></div> -->
              <b-button variant="secondary" @click="googleSignIn"><i class="fab fa-google"></i> Sign in With Google</b-button>              
            </div>
            <!-- form-group// -->
            <div class="form-group">
              <button @click.prevent="login" type="submit" class="btn btn-primary btn-block">Login</button>
            </div>
            <!-- form-group// -->
          </form>
        </article>
      </div>
    </div>
    <!-- modal register -->
    <b-modal
    id="modal-register"
    ref="modal"
    title="Submit Your Data"
    @show="resetModalRegister"
    @hidden="resetModalRegister"
    @ok="handleOkRegister"
    >

      <form @submit.stop.prevent="register">
        <b-form-group
          label="Full Name"
          label-for="name-input"
          invalid-feedback="Name is required"
        >        
          <b-form-input
            id="name-input"
            v-model="newUser.name"
            required
          ></b-form-input>

          <b-form-group
          label="Email"
          label-for="email-input"
          invalid-feedback="Email is required"
        >
          <b-form-input
            id="email"
            v-model="newUser.email"
            required
          ></b-form-input>

          <b-form-group
          label="Password"
          label-for="password-input"
          invalid-feedback="password is required"
        >
          <b-form-input
            id="password"
            type="password"
            v-model="newUser.password"
            required
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>

    <b-modal
      id="modal-login"
      ref="modal"
      title="Login With Your Registered Email"
      @show="resetModalLogin"
      @hidden="resetModalLogin"
      @ok="handleOkLogin"
    >
      <form @submit.stop.prevent="login">      
          <b-form-group
          label="Email"
          label-for="email-input"
          invalid-feedback="Email is required"
        >
          <b-form-input
            id="email"
            v-model="user.email"
            required
          ></b-form-input>

          <b-form-group
          label="Password"
          label-for="password-input"
          invalid-feedback="password is required"
        >
          <b-form-input
            id="password"
            type="password"
            v-model="user.password"
            required
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
import ax from './api/api.js'

export default {
  name: "landing",
  props: ["page"],
  data() {
    return {
      newUser:{
        name:'',
        email:'',
        password:''
      },
      user:{
        email:'',
        password:''
      },
      body : 'feeds'
    };
  },
  methods: {
    toHome() {
      this.$emit("changePage", "home");
    },
    changeBody(val){
      this.body = val
    },
    register() {
      if(!this.newUser.name || !this.newUser.email || !this.newUser.password){
        Swal.fire({
          type: 'error',
          title: 'input field can\'t be blank!',
          footer: '<a href>Why do I have this issue?</a>'
        })
      }
      else {
        ax({
          method: "post",
          url : `/users/register`,
          data : this.newUser
        })
        .then(({data}) => {
          console.log(data, `Sucesssssss`)
          this.user.email = data.email,
          this.user.password = this.newUser.password
          this.newUser.name = ''
          this.newUser.email = ''
          this.newUser.password = ''
          this.login()
        })
        .catch(err => {
          Swal.fire({
          type: 'error',
          title: 'email / password can\'t be blank',
          footer: '<a href>Why do I have this issue?</a>'
          })
          console.log('kena error register')
          console.log(err, 'error register')
        })
      }
    },
    login(){
      if(!this.user.email || !this.user.password){
        Swal.fire({
          type: 'error',
          title: 'email / password can\'t be blank',
          footer: '<a href>Why do I have this issue?</a>'
        })
      }
      else {
        ax({
          method : `post`,
          url : `users/login`,
          data : this.user
        })
        .then(({data}) => {
          console.log('berhasil login euuy')
          this.user.email = ''
          this.user.password = ''
          localStorage.setItem('name', data.name)
          localStorage.setItem('token', data.token)
          this.toHome()
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000
          });
          Toast.fire({
            type: 'success',
            title: 'Signed in successfully'
          })
          
        })
        .catch(err => {
          console.log('kena error login')
          console.log(err, 'error login')          
        })
      }
    },
    googleSignIn(){      
      this.$gAuth.signIn()
      .then(GoogleUser => {
        console.log('user', GoogleUser)        
        GoogleUser.getAuthResponse().id_token
        ax({
        method : "post",
        url : `/users/loginGoogle`,
        data : { idToken : GoogleUser.getAuthResponse().id_token }
        })
        .then(({data}) => {
          localStorage.setItem('name', data.name)
          localStorage.setItem('token', data.token)
          this.toHome()
          console.log('sukses google sign in')
        })
        .catch(err => {
          console.log(err.response)
        })
      })
      .catch(error  => {
        //on fail do something
        console.log(error)
      })
    },
    resetModalRegister() {
        this.newUser.username = ''
        this.newUser.email = ''
        this.newUser.password = ''
    },
    handleOkRegister(bvModalEvt) {
        // Prevent modal from closing
        bvModalEvt.preventDefault()
        // Trigger submit handler
        this.register()
    },
    resetModalLogin() {
        this.newUser.username = ''
        this.newUser.email = ''
        this.newUser.password = ''
    },
    handleOkLogin(bvModalEvt) {
        // Prevent modal from closing
        bvModalEvt.preventDefault()
        // Trigger submit handler
        this.login()
    }
  }
};
</script>

<style>
*{
  box-sizing: border-box;
}
#image {
  width: 100%;
  height: auto;
  position: fixed;
  z-index: 1;
  filter: brightness(0.72) blur(1px);
}
/* #card-container {
  background-image: url("http://eskipaper.com/images/blue-landscape-1.jpg");

} */
#title {
  color: wheat;
  padding-top: 10%;
  position: relative;
  z-index:2;
  text-align: center;
}
#inside-card {
  color: wheat;
  width: 360px;
  height : 360px;
  background-color: rgba(0,0,0,0.5) !important;
  /* margin */
}
#card-container {
  position: relative;
  z-index: 3;
  margin-right: 80px;
  padding-left: 35%;  
}

</style>
