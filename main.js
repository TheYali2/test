const express = require('express');
const fetch = require('node-fetch');
const app = express();

const PORT = process.env.PORT || 3000;
const subreddit = 'ani_bm';

app.get('/', (req, res) => {
  res.json({
    message: 'ברוך הבא ל-Reddit Random Image API!',
    usage: '/api/random-image',
    description: 'מקבל תמונה רנדומלית מסאב-רדיט ספציפי ללא NSFW.'
  });
});

app.get('/api/random-image', async (req, res) => {
  try {
    const response = await fetch(`https://www.reddit.com/r/${subreddit}/hot.json?limit=100`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) RedditAPIClient/1.0'
      }
    });

    const data = await response.json();

    const postsWithImages = data.data.children.filter(post => {
      const postData = post.data;
      return postData.post_hint === 'image' && !postData.over_18 && postData.url && !postData.is_video;
    });

    if (postsWithImages.length === 0) {
      return res.status(404).json({ error: 'No safe images found' });
    }

    const randomPost = postsWithImages[Math.floor(Math.random() * postsWithImages.length)];

    res.json({
      image: randomPost.data.url,
      title: randomPost.data.title,
      subreddit: randomPost.data.subreddit,
      nsfw: randomPost.over_18
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch images from Reddit' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
