import DailySummary from '../DailySummary';

export default function DailySummaryExample() {
  const mockData = {
    summary: "Today's news landscape shows positive developments across multiple sectors. Technology breakthroughs in AI and healthcare are driving market optimism, while international cooperation on climate issues signals progress on global challenges.",
    sentiment: "positive" as const,
    keyStories: [
      "Global markets surge on strong tech sector performance",
      "Medical AI breakthrough promises faster disease diagnosis", 
      "Historic climate agreement signed by world leaders"
    ],
    date: new Date().toLocaleDateString("en-US", { 
      weekday: "long", 
      year: "numeric", 
      month: "long", 
      day: "numeric" 
    })
  };

  return <DailySummary {...mockData} />;
}