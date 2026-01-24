import NewsCard from '../NewsCard';

export default function NewsCardExample() {
  const mockArticle = {
    id: "example-1",
    title: "Revolutionary AI System Breakthrough in Medical Diagnosis",
    summary: "Researchers have developed an AI system that can diagnose rare diseases with 95% accuracy, potentially transforming healthcare delivery. The system analyzes medical imaging and patient data to identify conditions that often go undetected for years.",
    imageUrl: "@assets/generated_images/Technology_news_article_image_d49ffdf8.png",
    sources: ["BBC", "Nature", "Reuters"],
    category: "Technology", 
    timestamp: "4 hours ago",
    readTime: "5 min"
  };

  const handleChatClick = (id: string) => console.log(`Chat clicked for ${id}`);
  const handlePlayClick = (id: string) => console.log(`Play clicked for ${id}`);
  const handleShareClick = (id: string) => console.log(`Share clicked for ${id}`);

  return (
    <NewsCard 
      {...mockArticle}
      onChatClick={handleChatClick}
      onPlayClick={handlePlayClick} 
      onShareClick={handleShareClick}
    />
  );
}