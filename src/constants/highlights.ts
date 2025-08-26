interface Highlight {
  title: string
  description: string
  image: string
  location: string
}

export const all: Highlight[] = [
  {
    title: 'Amasunzu',
    description:
      'Amasunzu is a traditional Rwandan hairstyle that was once worn by men and women. The unique style is created by cutting some of the hair sideways and braiding the top. A person who had this hairstyle was identified as powerful, noble, prestigious and brave. Amasunzu hairstyle made a come back in 2018 when Lupita Nyong’o wore it on the red carpet at the Oscar. Visit the king’s Palace and the Ethnographic Museum to learn more about Rwanda’s cultural heritage.',
    image: '/images/2.jpg',
    location: 'Rwanda',
  },
  {
    title: 'Nyanza',
    description:
      "Home to the King's Palace - a reconstruction of the traditional royal residence, a beautifully-crafted thatched dwelling shaped like a beehive.",
    image: '/images/6.jpg',
    location: 'Nyanza, Rwanda',
  },
  {
    title: 'Lake Kivu',
    description:
      'Part of Africa’s Great Rift Valley, Lake Kivu is dotted with islands and inlets along its shoreline, with charming beach resorts, spectacular vistas and plenty of opportunities for hiking and cycling.',
    image: '/images/8.jpg',
    location: 'Gisenyi, Rwanda',
  },
]
