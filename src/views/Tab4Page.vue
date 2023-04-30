<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Settings</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="ion-padding">
      <div v-if="auth_status">
        <ion-grid class="ion-text-center">
          <ion-row>
            <ion-col> 
              <ion-avatar style="width: 10rem; height: auto; aspect-ratio: 1/1">
                <img
                  alt="avatar"
                  :src=" auth_user?.photoURL || 'https://ionicframework.com/docs/img/demos/avatar.svg'"
                />
              </ion-avatar>
            </ion-col>
            </ion-row>
          <ion-row>
          <ion-col>
            <ion-label>Welcome</ion-label>
            <br>
            <ion-label style="font-weight: bold; text-transform: uppercase;" position="floating">{{ auth_user?.email?.split('@')[0] }}</ion-label>
          </ion-col>
          </ion-row>
        </ion-grid>
        
        <ion-button
          expand="block"
          fill="outline"
          color="success"
          @click="logout"
          >Logout</ion-button
        >
      </div>

      <div v-if="!auth_status">
      

        <ion-button
          expand="block"
          fill="outline"
          color="secondary"
          @click="openSignUp(true)"
          >Register</ion-button
        >

        <ion-modal :is-open="isOpenSignUp">
          <ion-header>
            <ion-toolbar>
              <ion-title>Sign Up</ion-title>
              <ion-buttons slot="end">
                <ion-button @click="openSignUp(false)">Close</ion-button>
              </ion-buttons>
            </ion-toolbar>
          </ion-header>
          <ion-content class="ion-padding">
            <form @submit.prevent="login">

              <ion-input
                label="Full Name"
                type="text"
                label-placement="floating"
                fill="outline"
                placeholder="Name"
                v-model="signUpCredentials.full_name"
              ></ion-input>


              <ion-input
                label="Email Address"
                type="email"
                label-placement="floating"
                fill="outline"
                placeholder="email@domain.com"
                v-model="signUpCredentials.email"
              ></ion-input>

              <ion-input
                label="Password"
                type="password"
                label-placement="floating"
                fill="outline"
                placeholder="Password"
                v-model="signUpCredentials.password"
              ></ion-input>
            </form> 

            <ion-button @click="signup" expand="block">Sign Up</ion-button>
          </ion-content>
        </ion-modal>

        <ion-button
        expand="block"
        fill="outline"
        color="success"
        @click="openLogin(true)"
        >Login</ion-button
      >
        <ion-modal :is-open="isOpenLogin">
          <ion-header>
            <ion-toolbar>
              <ion-title>Login</ion-title>
              <ion-buttons slot="end">
                <ion-button @click="openLogin(false)">Close</ion-button>
              </ion-buttons>
            </ion-toolbar>
          </ion-header>
          <ion-content class="ion-padding">
            <form @submit.prevent="login">
              <ion-input
                label="Email Address"
                type="email"
                label-placement="floating"
                fill="outline"
                placeholder="email@domain.com"
                v-model="loginCredential.email"
              ></ion-input>

              <ion-input
                label="Password"
                type="password"
                label-placement="floating"
                fill="outline"
                placeholder="Password"
                v-model="loginCredential.password"
              ></ion-input>
            </form>

            <ion-button @click="login" expand="block">Login</ion-button>
          </ion-content>
        </ion-modal>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonButtons,
  IonButton,
  IonModal,
  IonHeader,
  IonToolbar,
  IonContent,
  IonTitle,
  IonInput,
  IonPage,
  IonItem,
} from "@ionic/vue";
import { defineComponent, ref } from "vue";
import signInEmailPassword from "../auth";
import createUserEmailPass from "@/auth_new";
import { getAuth, UserCredential } from "firebase/auth";
export default defineComponent({
  components: {
    IonButtons,
    IonButton,
    IonModal,
    IonHeader,
    IonContent,
    IonToolbar,
    IonTitle,
    IonPage,
    IonInput,
    IonItem,
  },
  created() {
    getAuth().onAuthStateChanged((user) => {
      if (user) {
        this.auth_status = true;
      } else {
        this.auth_status = false;
      }
    });
  },
  data() {
    return {
      isOpenLogin: false,
      isOpenSignUp: false,
      loginCredential:{
        email: "",
        password: "",
      },
      signUpCredentials:{
        full_name: "",
        email: "",
        password: "",
      },
      auth_status: false,
    };
  },
  methods: {
    openLogin(isOpen: boolean) {
      this.isOpenLogin = isOpen;
    },
    openSignUp(isOpen: boolean) {
      this.isOpenSignUp = isOpen;
    },
    login() {
      signInEmailPassword(this.loginCredential.email, this.loginCredential.password);
      this.isOpenLogin = false;
    },
    signup() {
      createUserEmailPass(this.signUpCredentials.full_name,this.signUpCredentials.email, this.signUpCredentials.password);
      this.isOpenSignUp = false;
    },
    logout() {
      getAuth().signOut();
    },
  },
  computed: {
    auth_user() {
      return getAuth().currentUser;
    },
  },

});
</script>
