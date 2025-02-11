import { getSinglePostData } from "@/actions";
import SinglePostContent from "@/components/SinglePostContent";

const PostSinglePage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const { post, authorProfile, comments, commentsAuthors, myLike, myBookmark } =
    await getSinglePostData(id);
  return (
    <SinglePostContent
      post={post}
      authorProfile={authorProfile}
      comments={comments}
      commentsAuthors={commentsAuthors}
      myLike={myLike}
      myBookmark={myBookmark}
    />
  );
};

export default PostSinglePage;
