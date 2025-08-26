const token = ''

const education = {
  continent: 'Europe',
  country: 'England',
  coverImage:
    'https://res.cloudinary.com/dnq1hgigs/image/upload/v1723376664/yubqzdalkjiykv1qasay.jpg',
  description:
    "What is Lorem Ipsum?\nLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\n\nWhy do we use it?\nIt is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
  food: {
    name: 'Food Content',
    description:
      'What is Lorem Ipsum?\nLorem Ipsum is simply dummy t…etimes on purpose (injected humour and the like).',
    images:
      'http://res.cloudinary.com/dnq1hgigs/image/upload/v1723422757/irwg8rvepghbmb5pq075.jpg',
  },
  interracialMarriage: {
    name: 'Interracial Marriage',
    description:
      'What is Lorem Ipsum?\nLorem Ipsum is simply dummy t…etimes on purpose (injected humour and the like).',
    images:
      'http://res.cloudinary.com/dnq1hgigs/image/upload/v1723422758/kstt4fzmqohqj4sy6gh2.jpg',
  },
  more: "What is Lorem Ipsum?\nLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\n\nWhy do we use it?\nIt is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
  title: 'Education 4, Genesis 4',
  youtubeLinks: 'https://www.youtube.com/embed/3VLvD6KgS7A',
}

async function createEducation() {
  try {
    const response = await fetch('http://localhost:4000/education', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(education),
    })
    const data = await response.json()
    console.log('***************************************')
    console.log(data)
  } catch (error) {
    console.log('==============================')
    console.log(error)
  }
}

function getEducation() {
  fetch('http://localhost:4000/education', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.log(error))
}

createEducation()
