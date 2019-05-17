<template>
  <v-card>
    <v-card>
      <v-img :src="giveawayData.image" aspect-ratio="2.75"></v-img>

      <v-card-title primary-title>
        <div>
          <h3 class="headline mb-0">
            {{ giveawayData.title }} by {{ giveawayData.creator.username }}
          </h3>
          <div>{{ giveawayData.description }}</div>
        </div>
      </v-card-title>

      <v-card-actions>
        <v-btn flat color="orange">Join</v-btn>
        <v-btn flat color="orange">More</v-btn>
      </v-card-actions>
    </v-card>
  </v-card>
</template>

<script>
export default {
  props: {
    giveawayData: Object
  },
  data() {
    return {
      giveaway: {
        id: 1,
        title: "Lamba giveaway",
        start: "15:30 12/04/2019",
        end: "23:59 21/04/2019",
        image: "/assets/images/gallery/5.image.jpg",
        description:
          "Lorem ipsum dollor site amet the best consectuer diam nerdistin adipiscing elites sed diam nonummy nibh the ebest uismod delgas tincidunt ut laoreet dolore magna...",
        creator: {
          id: 1,
          full_name: "Shamil Omarov",
          username: "@somarov_"
        }
      }
    };
  }
};
</script>
