<style>
.row > * {
  padding-left: 0;
  padding-right: 0;
}

#card-img {
  width: 100%;
  object-fit: contain;
  aspect-ratio: 4/3;
  background-color: transparent;
}
</style>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Browse</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="" :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Browse</ion-title>
        </ion-toolbar>
      </ion-header>

      <div class="content-section container">
        <div class="item-section-q">
          <h1>Latest</h1>
          <div class="row">
            <swiper
            :modules="modules"
            :breakpoints="breakpoints"
            :autoplay="true"
            :zoom="true"
            >
              <swiper-slide v-for="item in data" class="col-2">
                <ion-card>
                  <img
                    :alt="item.title"
                    :src="item.image_url"
                    id="card-img"
                  />
                  <ion-card-header>
                    <ion-card-title>{{ item.title }}</ion-card-title>
                    <ion-card-subtitle>Barter | Cash</ion-card-subtitle>
                  </ion-card-header>

                  <ion-card-content>
                    {{ item.description }}
                  </ion-card-content>

                  <ion-button
                    fill="clear"
                    router-direction="forward"
                    :router-link="'/details/' + item.title"
                    >Details</ion-button
                  >
                </ion-card>
              </swiper-slide>
            </swiper>
          </div>
        </div>

        <div class="item-section-2">
          <h1>Featured</h1>
          <div class="row">
            <swiper
              :modules="modules"
              :breakpoints="breakpoints"
              :autoplay="true"
              :zoom="true"
            >
              <swiper-slide v-for="item in data" class="col-2">
                <ion-card>
                  <img
                    :alt="item.title"
                    :src="item.image_url"
                    id="card-img"
                  />
                  <ion-card-header>
                    <ion-card-title>{{ item.title }}</ion-card-title>
                    <ion-card-subtitle>Barter | Cash</ion-card-subtitle>
                  </ion-card-header>

                  <ion-card-content>
                    {{ item.description }}
                  </ion-card-content>

                  <ion-button
                    fill="clear"
                    router-direction="forward"
                    :router-link="'/details/' + item.title"
                    >Details</ion-button
                  >
                </ion-card>
              </swiper-slide>
            </swiper>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonNavLink,
  IonButton,
  IonCard,
  IonCardTitle,
  IonCardSubtitle,
  IonCardHeader,
  IonCardContent,
} from "@ionic/vue";
import ExploreContainer from "@/components/ExploreContainer.vue";
import { IonSearchbar } from "@ionic/vue";
import { defineComponent } from "vue";
import data_json from "@/data.json";

import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Keyboard, Pagination, Scrollbar, Zoom } from "swiper";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/keyboard";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/zoom";
import "@ionic/vue/css/ionic-swiper.css";
</script>
<script lang="ts">
import { getAuth } from "firebase/auth";
export default {
  name: "Tab1Page",
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    ExploreContainer,
    IonSearchbar,
    Animation,
    IonNavLink,
    IonButton,
    IonCard,
    IonCardTitle,
    IonCardSubtitle,
    IonCardHeader,
    IonCardContent,
    Swiper,
    SwiperSlide,
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
  mounted() {
    //assign data to data_json
    console.log(data_json);
  },
  data() {
    return {
      //asign type object to data
      data: data_json,
      search_animation: true,
      auth_status: false,
      modules: [Autoplay, Keyboard, Pagination, Scrollbar, Zoom],
        breakpoints: {
          // when window width is >= 480px
          480: {
            slidesPerView: 1,
            spaceBetween: 30,
          },
          // when window width is >= 640px
          640: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 50,
          },
          1280: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
      }
    };
  },
};
</script>
