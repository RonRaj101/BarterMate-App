<style scoped>
ion-radio {
  margin: 1rem;
  margin-left: 0;
}

ion-radio::part(container) {
  width: 30px;
  height: 30px;

  border-radius: 8px;
  border: 2px solid #ddd;
}

ion-radio::part(mark) {
  background: none;
  transition: none;
  transform: none;
  border-radius: 0;
}

ion-radio.radio-checked::part(container) {
  background: green;
  border-color: transparent;
}

ion-radio.radio-checked::part(mark) {
  width: 6px;
  height: 10px;

  border-width: 0px 2px 2px 0px;
  border-style: solid;
  border-color: #fff;

  transform: rotate(45deg);
}
</style>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Search For Products</ion-title>
      </ion-toolbar>
      <ion-toolbar>
        <ion-searchbar></ion-searchbar>
        <ion-radio-group value="custom-checked" class="ion-padding">
          <ion-radio value="any" aria-label="Custom checkbox">Any</ion-radio>

          <ion-radio value="trade" aria-label="Custom checkbox"
            >Trade</ion-radio
          >

          <ion-radio value="cash">Cash</ion-radio>
        </ion-radio-group>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Search Results</ion-title>
        </ion-toolbar>
      </ion-header>

      <h1 class="text-center">Search Results</h1>
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
  IonRadio,
  IonRadioGroup,
} from "@ionic/vue";
import ExploreContainer from "@/components/ExploreContainer.vue";
</script>
