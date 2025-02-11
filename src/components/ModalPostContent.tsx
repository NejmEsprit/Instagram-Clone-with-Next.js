import { getSinglePostData } from '@/actions';
import React from 'react'
import SinglePostContent from './SinglePostContent';

const ModalPostContent = async({postId}:{postId:string}) => {
    const {
        post, authorProfile, comments,
        commentsAuthors, myLike,myBookmark
      } = await getSinglePostData(postId);
  return (
    <SinglePostContent
    post={post}
    authorProfile={authorProfile}
    comments={comments}
    commentsAuthors={commentsAuthors}
    myLike={myLike}
    myBookmark={myBookmark}
    
  />
  )
}

export default ModalPostContent