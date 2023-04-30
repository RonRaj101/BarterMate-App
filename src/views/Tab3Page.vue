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
        <ion-title>My Dashboard</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="ion-padding">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">My Dashboard</ion-title>
        </ion-toolbar>
      </ion-header>

      <div>
        <ion-button @click="setOpen(true)" expand="block" fill="outline" color="primary" :disabled="!auth_status">List New Item</ion-button>
        
        <ion-modal :is-open="isOpen">
          <ion-header>
            <ion-toolbar>
              <ion-title>New Listing</ion-title>
              <ion-buttons slot="end">
                <ion-button @click="setOpen(false)" :disabled="auth_status">Close</ion-button>
              </ion-buttons>
            </ion-toolbar>
          </ion-header>
          <ion-content class="ion-padding">
            <form @submit.prevent="createListing" >

              <ion-label class="ion-padding" style="font-weight: 700;">Upload Image/s</ion-label>
              <input type="file" @click="takePicture">
              <div class="display-imgs">
                <img :src="selectedImage">
              </div>
              
              <ion-input
                label="Product Title"
                type="text"
                label-placement="floating"
                fill="outline"
                placeholder="Name"
                v-model="listingDetails.title"
                required
              >
              </ion-input>
         
              <ion-textarea
                label="Description"
                type="text"
                label-placement="floating"
                fill="outline"
                placeholder="Something about your product..."
                v-model="listingDetails.description"
                required
              ></ion-textarea>
        
              <ion-input
                label="Estimated Value"
                type="number"
                label-placement="floating"
                fill="outline"
                placeholder="(£)"
                v-model="listingDetails.value"
                required
              ></ion-input>

              <ion-label class="ion-padding" style="font-weight: 700;">Barter Preference</ion-label> 
              <ion-radio-group value="AYN330piOumjJzJnU0aD" v-model="listingDetails.barterPreference" class="ion-padding">
              
                <ion-radio value="AYN330piOumjJzJnU0aD" aria-label="Custom checkbox"
                  >Trade</ion-radio
                >
                <ion-radio value="a3yknPh654NLg0wkfcp7">Cash</ion-radio>
              </ion-radio-group>

              <ion-button type="submit" expand="block">Create Listing</ion-button>
            </form>

            {{ listingDetails }}
            
          </ion-content>
        </ion-modal>
      </div>



      
       
     
      
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonRadio, IonRadioGroup, IonModal, IonTextarea,IonLabel,
    IonButton,
    IonInput,IonButtons } from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';

import { defineComponent, ref } from "vue";
import signInEmailPassword from "../auth";
import { getAuth, UserCredential } from "firebase/auth";
import { Camera, CameraResultType } from '@capacitor/camera';
import { db } from "../firebase";
import { collection, doc, setDoc, query, where } from "firebase/firestore"; 
import { readJson } from 'fs-extra';


export default defineComponent({
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonRadio,
    IonRadioGroup,
    IonModal,
    IonTextarea,
    IonLabel,
    IonButton,
    IonInput,
    IonButtons
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
      isOpen: false,
      auth_status: false,
      selectedImage: '',
      curr_user: getAuth().currentUser?.uid,
      listingDetails: {
        title: '',
        description: '',
        value:Number,
        barterPreference: '',
        created_by: getAuth().currentUser?.uid,
        created_at: new Date(),
      },
    };
  },
  methods: {
    setOpen(isOpen: boolean) {
      this.isOpen = isOpen;
    },
    async takePicture() {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri
      });

      // image.webPath will contain a path that can be set as an image src.
      // You can access the original file using image.path, which can be
      // passed to the Filesystem API to read the raw data of the image,
      // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
      var imageUrl = image.webPath;

      // Can be set to the src of an image now
      this.selectedImage = imageUrl ?? '';
  },
  createListing(){
    //establish connection to firebase storage
    const productsRef = collection(db, "products");
    //add new document to products collection
    setDoc(doc(productsRef), this.listingDetails)
    .then(() => {
      console.log("Document successfully written!");
      
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
    this.isOpen = false;
  },
  getListings(){
    const productsRef = collection(db, "products");
    const q = query(productsRef, where("created_by", "==", getAuth().currentUser?.uid));
    console.log(q);
    return q;
  }
  },
  computed: {
    auth_user() {
      return getAuth().currentUser;
    },
  },

});

</script>
