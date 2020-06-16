import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    trackData: [{
      id: "19CsKwFodNoWzRQPy9B2",
      image: "https://firebasestorage.googleapis.com/v0/b/mp3player-4dc8c.appspot.com/o/mak-HwqSY8SHnoQ-unsplash.jpg?alt=media&token=04148b5d-0be4-4e9a-8ce7-3575a6b3d179",
      name: "悲傷金曲",
      songs: [
        {
          albumName: "Party time",
          id: "UaAAk4emD1jEqVzOLJg1",
          image: "https://green-travel-blog.com/wp-content/uploads/2019/09/Gili-Lankanfushi-NorthMaleAtoll-Relaxation-luxery-resort-.jpg",
          singer: "Eddie",
          time: "03:02",
          title: "Luxery",
          url: "https://firebasestorage.googleapis.com/v0/b/mp3player-4dc8c.appspot.com/o/Luxery.mp3?alt=media&token=c832b225-139b-4586-8489-dda638759591",
        }, {
          albumName: "Country",
          id: "gw3jzlzE2fQ9UsvPAlIJ",
          image: "https://s3.amazonaws.com/fest-production/2014/05/29/23/07/47/777/Lightning_In_A_Bottle_2014_Art_Gimbel__55_of_111_.jpg",
          singer: "Woogie",
          time: "01:48",
          title: "The Woogie",
          url: "https://firebasestorage.googleapis.com/v0/b/mp3player-4dc8c.appspot.com/o/The_Woogie.mp3?alt=media&token=00a048cb-b386-4a3c-877f-de247bc81e9b",
        }]
    }],
    loading: true,
  },
  mutations: {
    trackData(state, payload) {
      state.trackData = payload;
    },
    loadData(state, payload) {
      state.loading = payload;
    }
  },
  actions: {
    async getTrackList({ commit }) {
      let trackData!: any;
      await firebase.firestore().collection("track").get().then((querySnapshot) => {
        trackData = querySnapshot.docs.map(doc => {
          return {
            id: doc.id,
            name: doc.data().name,
            image: doc.data().url,
          }
        });
      })
      for (let index = 0; index < trackData.length; index++) {
        const track = trackData[index];
        await firebase.firestore().collection(`track/${track.id.toString()}/song`).get().then(q => {
          const songs = q.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          track['songs'] = songs;
        })
      }
      commit('trackData', trackData);
      commit('loadData', false);
    },
  },
  modules: {
  }
})
