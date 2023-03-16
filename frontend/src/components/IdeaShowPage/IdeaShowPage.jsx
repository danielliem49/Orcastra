import { deleteIdea, fetchIdea, getIdea } from '../../store/idea';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import {
    createComment,
    fetchIdeaComments,
} from '../../store/comment';
import { useHistory } from 'react-router-dom';
import './IdeaShowPage.css';
import EditModalButton from '../IdeaEditModal';
import { margin, width } from '@mui/system';
import CommentContainer from '../Comments/CommentContainer';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';



export default function IdeaShowPage() {
    const dispatch = useDispatch();
    const history = useHistory()
    // const [comment, setComment] = useState('');
    const { ideaId } = useParams();
    const idea = useSelector(getIdea(ideaId));
    const sessionUser = useSelector(state => state.session.user)
    const [currImg, setCurrImg] = useState(0)

    function incrementImage () {
        console.log(currImg)
        console.log(idea.imageUrls.length - 1)
        if (currImg === idea.imageUrls.length - 1) {
            setCurrImg(0)
        } else {
            setCurrImg(currImg + 1)
        }
    }

    function decrementImage () {
        console.log(currImg)
        console.log(idea.imageUrls.length - 1)

        if (currImg === 0) {
            setCurrImg(idea.imageUrls.length -1)
        } else {
            setCurrImg(currImg - 1 )
        }
    }

    useEffect(() => {
        dispatch(fetchIdea(ideaId));
    }, [dispatch, ideaId]);

    function handleDelete() {
        dispatch(deleteIdea(ideaId)).then(history.push('/feed'))
    }


    if (!idea) {
        return null;
    } else {
        return (
            <div className='isp-container'>
                <div className='isp-media-container'>
                    <div className='media' style={{backgroundImage: `url(${idea.imageUrls[currImg]})`}}>
                        <div className='media-button-wrapper'>
                        <div className='left-media' onClick={decrementImage}><ChevronLeftIcon/></div>
                        </div>
                        <div className='center-media'></div>
                        <div className='media-button-wrapper'>
                        <div className='right-media' onClick={incrementImage}><ChevronRightIcon/></div>
                        </div>
                    </div>
                </div>

                <div className='isp-info-container'>
                    <div className='isp-title'>{idea.title}</div>
                    <div> {idea.owner.username} </div>
                    <div className='isp-description'>{idea.body}</div>
                    <div className='isp-actions'>
                        {/* <button >Bid</button>
                        <button>Save</button>
                        <button>Contact</button> */}
                        {sessionUser && 
                          sessionUser._id === idea.owner._id ? 
                            <div className="de-btn-container">
                              <button className="idea-show-button" onClick={handleDelete}>Delete</button>
                              <button className="idea-show-button"><EditModalButton idea={idea} /></button>
                            </div> : <></>}
                    </div>

                </div>

                <div className='isp-comments-container'>
                    <CommentContainer idea={idea} />
                </div>
            </div>
        );
    }
}
