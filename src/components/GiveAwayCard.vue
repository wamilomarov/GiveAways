<template>
  <v-flex mb-3>
    <v-card>
      <v-img :src="giveawayData.image" aspect-ratio="2.75"></v-img>

      <v-card-title primary-title>
        <div>
          <h3 class="headline mb-0">
            {{ giveawayData.title }} by <a href="">{{ giveawayData.creator.username }}</a>
          </h3>
          <div>{{ giveawayData.description }}</div>
        </div>
      </v-card-title>

      <v-card-actions>
        <v-btn color="orange">Join</v-btn>
        <v-btn flat color="blue">More</v-btn>
      </v-card-actions>
    </v-card>
  </v-flex>

</template>

<script>
export default {
  props: {
    giveawayData: Object
  }
};
</script>
