const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = 3000;

// סאב-רדיט ספציפי (תשנה כאן לפי הצורך)
const subreddit = 'ani_bm';

app.get('/api/random-image', async (req, res) => {
  try {
    const response = await fetch(`https://www.reddit.com/r/${subreddit}/hot.json?limit=100`);
    const data = await response.json();

    // סינון פוסטים שיש להם תמונה, לא NSFW, ולא וידאו
    const postsWithImages = data.data.children.filter(post => {
      const postData = post.data;
      return (
        postData.post_hint === 'image' &&
        !postData.over_18 &&              // לא NSFW
        postData.url &&                   // יש URL לתמונה
        !postData.is_video               // לא וידאו
      );
    });

    if (postsWithImages.length === 0) {
      return res.status(404).json({ error: 'No safe images found' });
    }

    // בוחרים פוסט רנדומלי מתוך הפוסטים המסוננים
    const randomPost = postsWithImages[Math.floor(Math.random() * postsWithImages.length)];

    res.json({
      image: randomPost.data.url,
      title: randomPost.data.title,
      subreddit: randomPost.data.subreddit,
      nsfw: randomPost.data.over_18
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch images from Reddit' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/api/random-image`);
});
