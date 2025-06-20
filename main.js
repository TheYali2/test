const express = require('express');
const fetch = require('node-fetch');
const app = express();

const PORT = process.env.PORT || 3000;
const DEFAULT_SUBREDDIT = 'ani_bm';

app.get('/', (req, res) => {
  res.json({
    message: 'ברוך הבא ל-Reddit Random Image API!',
    usage: '/api/random-image?subreddit=SUBREDDIT_NAME',
    example: '/api/random-image?subreddit=aww',
    note: 'סאב-רדיטים NSFW אינם נתמכים.'
  });
});

app.get('/api/random-image', async (req, res) => {
  const subreddit = req.query.subreddit || DEFAULT_SUBREDDIT;

  try {
    const response = await fetch(`https://www.reddit.com/r/${subreddit}/hot.json?limit=100`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 RedditAPIClient/1.0'
      }
    });

    // נסה להמיר ל־JSON
    const data = await response.json();

    // סינון פוסטים עם תמונה, לא NSFW, לא וידאו
    const postsWithImages = data.data.children.filter(post => {
      const postData = post.data;
      return (
        postData.post_hint === 'image' &&
        !postData.over_18 &&
        postData.url &&
        !postData.is_video
      );
    });

    if (postsWithImages.length === 0) {
      return res.status(404).json({ error: 'לא נמצאו תמונות מתאימות (לא NSFW)' });
    }

    const randomPost = postsWithImages[Math.floor(Math.random() * postsWithImages.length)];

    res.json({
      image: randomPost.data.url,
      title: randomPost.data.title,
      subreddit: randomPost.data.subreddit,
      nsfw: randomPost.data.over_18
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'הבקשה נכשלה. ייתכן שהסאב-רדיט לא קיים או שהוא NSFW.',
      details: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Reddit Image API is running at http://localhost:${PORT}`);
});
