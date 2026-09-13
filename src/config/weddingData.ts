export interface WeddingEvent {
  id: string;
  title: string;
  time: string;
  image: string;
}

export interface WeddingConfig {
  couple: {
    groom: string;
    bride: string;
    displayNames: string;
    hashtag: string;
    weddingDateISO: string;
    weddingDateFormatted: string;
    cardImage: string;
  };
  events: WeddingEvent[];
  venue: {
    title: string;
    subtitle: string;
    image: string;
    googleMapsUrl: string;
  };
}

export const weddingData: WeddingConfig = {
  couple: {
    groom: "Rahul Dey",
    bride: "Riya Dutta",
    displayNames: "Rahul & Riya",
    hashtag: "#rahul&riya",
    weddingDateISO: "2027-01-29T22:00:00+05:30",
    weddingDateFormatted: "29th January 2027",
    cardImage: "./assets/rahul-riya-card.jpg"
  },
  events: [
    {
      id: "aiburobhaat",
      title: "Aiburobhaat",
      time: "28th January at 12:00PM",
      image: "https://framerusercontent.com/images/RyrQ3GkLOS6pTcBYAX0khZoVg8.png"
    },
    {
      id: "gaye-holud",
      title: "Gaye Holud",
      time: "29th January at 11:30AM",
      image: "https://framerusercontent.com/images/WrfjNxr7VjXKuKn5TveLCxhc20.png"
    },
    {
      id: "wedding",
      title: "Wedding",
      time: "29th January at 7:00PM",
      image: "https://framerusercontent.com/images/8Brl0AhnVBzPv6gVebEQwb4HNM.png"
    },
    {
      id: "reception",
      title: "Reception",
      time: "31st January at 7:00PM",
      image: "https://framerusercontent.com/images/pNt6kgA3ZztIJRfpMMOJt5PYmRQ.png"
    }
  ],
  venue: {
    title: "Where We Celebrate",
    subtitle: "Venue",
    image: "https://framerusercontent.com/images/0mK5EEB7YyosOg9eyRtmM3SvrI.png",
    googleMapsUrl: "https://www.google.com/maps/place/23.224608,87.086432/data=!4m6!3m5!1s0!7e2!8m2!3d23.224608!4d87.086432!18m1!1e1"
  }
};
