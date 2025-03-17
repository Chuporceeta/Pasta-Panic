import {Devvit} from '@devvit/public-api';
import {Router} from "./Posts/Router.js";

Devvit.configure({
  redditAPI: true,
  redis: true,
});

Devvit.addCustomPostType({
  name: 'Pasta Panic',
  height: 'tall',
  render: Router
});


Devvit.addMenuItem({
  label: 'Add Pinned Post',
  location: 'subreddit',
  forUserType: 'moderator',
  onPress: async (_event, context) => {
    const { reddit, ui } = context;
    ui.showToast("Submitting your post - upon completion you'll navigate there.");

    const subreddit = await reddit.getCurrentSubreddit();
    const post = await reddit.submitPost({
      title: 'My devvit post',
      subredditName: subreddit.name,
      preview: (
        <vstack height="100%" width="100%" alignment="middle center">
          <text size="large">Loading ...</text>
        </vstack>
      ),
    });
    await post.sticky();
    ui.navigateTo(post);
  },
});


export default Devvit;
