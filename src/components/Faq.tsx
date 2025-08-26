const FAQItem = ({ question, answer }: { question: any; answer: any }) => {
  return (
    <div>
      <details className="cursor-pointer text-primary-300">
        <summary className="text-primary-400 text-lg flex justify-between items-center mb-6">
          <h4>{question}</h4>
          <span className="text-primary-400">More</span>
        </summary>
        <p className="text-primary-300 mt-1">{answer}</p>
      </details>
      <hr />
    </div>
  )
}

const FAQSection = () => {
  const faqData = [
    {
      question: 'What is Storyline?',
      answer:
        "Storyline is a unique platform where users can share personal stories, engage with others by commenting on posts, and explore Rwanda's rich history. Our goal is to create a space where stories connect people and educate them about Rwanda's cultural and historical heritage.",
    },
    {
      question: 'How can I contribute to the historical content about Rwanda?',
      answer:
        "Users can contribute by sharing well-researched articles or stories related to Rwanda's history. We encourage fact-checking and collaboration with historians to ensure the accuracy of the content. All submissions will be reviewed by our editorial team before publication.",
    },
    {
      question: 'Can I comment on any story or historical post?',
      answer:
        'Yes, you can comment on any story or historical post. We encourage respectful and constructive discussions. Our platform is a space for sharing perspectives and learning from one another, so please be mindful of your comments.',
    },
    {
      question: 'How do I report inaccurate or inappropriate content?',
      answer:
        'If you come across content that is inaccurate or inappropriate, you can report it directly through the platform. Our moderation team will review the report and take necessary actions to maintain the quality and integrity of the information shared on Storyline.',
    },
    {
      question: 'Is Storyline free to use?',
      answer:
        "Yes, Storyline is free to use. Our platform is open to everyone who wishes to share their stories and learn more about Rwanda's history. We believe in providing access to knowledge and fostering community engagement without any barriers.",
    },
  ]

  return (
    <div className="py-6 w-[55%] md:w-full">
      <header className="text-primary-300">
        <h2 className="font-cinzelBold text-3xl justify-center items-center text-primary-400">
          FAQs
        </h2>
        <p className="my-4">Answers to the most frequently asked questions.</p>
      </header>

      {faqData.map((item, index) => (
        <FAQItem key={index} question={item.question} answer={item.answer} />
      ))}
    </div>
  )
}

export default FAQSection
