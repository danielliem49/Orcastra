import { deleteComment, updateComment } from '../../store/comment';
import { timeConversion } from '../../modules/helperFunctions';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './Comments.css';

export default function CommentIndexItem({ idea, comment }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [commentContent, setCommentContent] = useState(comment?.text);
  const [commentEdit, setCommentEdit] = useState(false);
  const [commentAction, setCommentAction] = useState(false);
  const shown = { opacity: 1 };
  const hidden = { opacity: 0 };

  const handleEditComment = (e) => {
    e.preventDefault();
    const commentInfo = { ...comment, text: commentContent };
    setCommentEdit(false);
    dispatch(updateComment(commentInfo));
  };

  const handleDeleteComment = (e) => {
    e.preventDefault();
    dispatch(deleteComment(comment._id));
  };

  const handleCloseEdit = (e) => {
    if (e.keyCode === 27) {
      setCommentEdit(false);
      setCommentContent(comment.text);
    }
  };

  return (
    comment && (
      // <div
      //   className='comment-item'
      //   id={commentEdit ? 'comment-edit-active' : undefined}
      //   onMouseEnter={() => setCommentAction(true)}
      //   onMouseLeave={() => setCommentAction(false)}
      // >
      //   <div className='comment-wrapper'>
      //     <div>
      //       <div className='comment-item-user-info'>
      //         {comment.author.username}
      //       </div>
      //       <div className='comment-item-text'>{comment.text}</div>
      //       <div className='comment-item-date'>
      //         {timeConversion(comment.createdAt)}
      //       </div>
      //     </div>
      //     <div>
      //       {sessionUser &&
      //         (comment.authorId === sessionUser.id ||
      //           idea?.ownerId === sessionUser.id) && (
      //           <div
      //             className='comment-actions'
      //             style={commentAction ? shown : hidden}
      //           >
      //             {comment.authorId === sessionUser.id && (
      //               <div
      //                 className='edit-action'
      //                 onClick={() => setCommentEdit(true)}
      //               >
      //                 <EditIcon
      //                   fontSize='small'
      //                   sx={{ m: '0 2px' }}
      //                 />
      //               </div>
      //             )}

      //             <div
      //               className='delete-action'
      //               onClick={handleDeleteComment}
      //             >
      //               <DeleteIcon
      //                 fontSize='small'
      //                 sx={{ m: '0 2px' }}
      //               />
      //             </div>
      //           </div>
      //         )}
      //     </div>
      //     {commentEdit ? (
      //       <form
      //         className='edit-comment-form'
      //         onSubmit={(e) => handleEditComment(e)}
      //       >
      //         <input
      //           type='text'
      //           name='content'
      //           id='comment'
      //           autoComplete='off'
      //           autoFocus
      //           value={commentContent}
      //           onChange={(e) => setCommentContent(e.target.value)}
      //           onKeyDown={handleCloseEdit}
      //         />
      //         <p className='comment-edit-info'>
      //           escape to{' '}
      //           <span
      //             onClick={() => {
      //               setCommentEdit(false);
      //               setCommentContent(comment.text);
      //             }}
      //           >
      //             cancel
      //           </span>{' '}
      //           &bull; enter to{' '}
      //           <span onClick={handleEditComment}>save</span>
      //         </p>
      //       </form>
      //     ) : null}
      //   </div>
      // </div>
      <div
        className='comment-item'
        id={commentEdit ? 'comment-edit-active' : undefined}
        onMouseEnter={() => setCommentAction(true)}
        onMouseLeave={() => setCommentAction(false)}
      >
        <div className='comment-user-icon'>
          <img
            src={comment.author.profileImageUrl}
            alt='userprofileimg'
          />
        </div>

        <div className='comment-body'>
          <div className='comment-username'>
            <h4>
              {comment.author.username}
              {/* Username */}
              <span id='time'>
                {timeConversion(comment.createdAt)}
              </span>
            </h4>
            {sessionUser &&
              comment.author._id === sessionUser._id && (
                <div
                  className='comment-actions'
                  style={commentAction ? shown : hidden}
                >
                  {comment.author._id === sessionUser._id && (
                    <div
                      className='edit-action'
                      onClick={() => setCommentEdit(true)}
                    >
                      <EditIcon
                        fontSize='small'
                        sx={{ m: '0 2px' }}
                      />
                    </div>
                  )}
                  {/* {console.log(comment.author._id)} */}
                  <div
                    className='delete-action'
                    onClick={handleDeleteComment}
                  >
                    <DeleteIcon
                      fontSize='small'
                      sx={{ m: '0 2px' }}
                    />
                  </div>
                </div>
              )}
          </div>
          <div className='comment-text'>
            <p>{comment.text}</p>
          </div>

          {commentEdit ? (
            <form
              className='edit-comment-form'
              onSubmit={handleEditComment}
            >
              <input
                type='textarea'
                name='content'
                id='comment'
                autoComplete='off'
                autoFocus
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                onKeyDown={handleCloseEdit}
              />
              <p className='comment-edit-info'>
                escape to{' '}
                <span
                  onClick={() => {
                    setCommentEdit(false);
                    setCommentContent(comment.text);
                  }}
                >
                  cancel
                </span>{' '}
                &bull; enter to{' '}
                <span onClick={handleEditComment}>save</span>
              </p>
            </form>
          ) : null}
        </div>
      </div>
    )
  );
}
