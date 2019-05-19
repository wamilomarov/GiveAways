<template>
  <v-container>
    <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <DateRangePicker/>
        <GiveAwayCard
          v-for="giveaway in giveaways"
          :key="giveaway.id"
          :giveawayData="giveaway"
        ></GiveAwayCard>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import GiveAwayCard from "@/components/GiveAwayCard.vue";
import DateRangePicker from "../components/DateRangePicker";

export default {
  components: {
    DateRangePicker,
    GiveAwayCard
  },
  data() {
    return {
      giveaways: [
        {
          id: 3,
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
        },
        {
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
          },
          rules: [
            {
              rule: {
                name: "Comment post"
              },
              value: "post-id"
            },
            {
              rule: {
                name: "Like sponsors"
              },
              value: 35
            }
          ]
        },
        {
          id: 2,
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
          },
          rules: [
            {
              rule: {
                name: "Comment post"
              },
              value: "post-id"
            },
            {
              rule: {
                name: "Like sponsors"
              },
              value: 35
            }
          ]
        }
      ]
    };
  }
};
</script>
