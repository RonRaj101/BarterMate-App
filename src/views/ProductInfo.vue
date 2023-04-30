<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-back-button text="Previous" :icon="caretBack"></ion-back-button>
          </ion-buttons>
          <ion-title>Product</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content :fullscreen="true" class="ion-padding">
       
        <h1> {{ product_id }}</h1>
        
  
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
    IonPage
  } from "@ionic/vue";
  import { defineComponent, ref } from "vue";
  import { useRoute } from 'vue-router';
  import { caretBack } from 'ionicons/icons';

  
  export default defineComponent({
    components: {
      IonButtons,
      IonButton,
      IonModal,
      IonHeader,
      IonContent,
      IonToolbar,
      IonTitle,
      IonPage
    },
    data() {
      return {
        isOpen: false,
      };
    },
    methods: {
      setOpen(isOpen: boolean) {
        this.isOpen = isOpen;
      },
    },
    setup(){
      const route = useRoute();
      const product_id = route.params.id;
      return { product_id };

      return { caretBack };
    }
  });
  </script>
  