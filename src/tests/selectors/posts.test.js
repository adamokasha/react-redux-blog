import {sortPostsByDate, sortCommentsByDate} from '../../selectors/posts';
import posts from '../fixtures/posts';

test('should sort posts by most recent', () => {
  const sortedPosts = sortPostsByDate(posts);
  expect(sortedPosts).toEqual([ posts[1], posts[0] ])
});

test('should sort comments by most recent', () => {
  const sortedComments = sortCommentsByDate(posts[0].comments);
  expect(sortedComments).toEqual([ posts[0].comments[1], posts[0].comments[0]])
});