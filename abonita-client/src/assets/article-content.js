import levels from "./images/levels.png";
import quiz from "./images/quiz.png";
import leaderboards from "./images/leaderboards.png";
import badges from "./images/badges.png";

const articles = [
  {
    name: "entertainment-factor",
    title: "Educational Levels",
    image: levels,
    content: [
      "Users can click on a level to access a set of interactive tasks specifically designed to strengthen their understanding of CSS. Each level presents challenges that gradually increase in difficulty, allowing learners to build their skills step by step. As users complete these tasks, they receive immediate feedback, helping them identify mistakes and improve in real time. This structured, hands-on approach keeps learners engaged while reinforcing practical knowledge.",
    ],
  },
  {
    name: "educational-value",
    title: "Quiz Assessment",
    image: quiz,
    content: [
      "Each level also presents multiple-choice questions that assess the user’s understanding of the concepts covered. These questions are designed to reinforce key ideas by challenging learners to apply what they have learned in a quick and engaging format. By selecting the correct answers, users can test their knowledge, identify areas that need improvement, and build confidence in their understanding of CSS concepts. Immediate feedback is provided after each question, helping users learn from mistakes and solidify their grasp of the material before progressing to more advanced levels.",
    ],
  },
  {
    name: "competitive-capability",
    title: "Leaderboard",
    image: leaderboards,
    content: [
      "The leaderboard displays the names of the top players, showcasing those who have achieved the highest scores or completed the most challenges. It serves as a motivational feature by encouraging friendly competition among users, pushing them to improve their performance and climb the rankings. By seeing their position relative to others, learners are inspired to stay engaged, complete more tasks, and continuously enhance their skills to earn a spot among the top performers.",
    ],
  },
  {
    name: "achievement-system",
    title: "Badges",
    image: badges,
    content: [
      "Users can view all the special badges they have earned, providing a visual record of their achievements and milestones. Each badge represents a specific accomplishment, such as completing a level, mastering a CSS concept, or excelling in challenges. This feature not only rewards progress but also motivates learners to continue engaging with the platform, as collecting badges becomes a tangible way to track growth, celebrate successes, and set goals for future learning.",
    ],
  },
];

export default articles;
