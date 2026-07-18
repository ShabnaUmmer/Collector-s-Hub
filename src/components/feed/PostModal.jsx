import { useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import Img from '../ui/Img';
import { FiX, FiHeart, FiBookmark } from 'react-icons/fi';
import { AiFillHeart, AiFillBook } from 'react-icons/ai';
import './PostModal.css';

export default function PostModal({ post, onClose }) {
  const { likedPosts, savedPosts, toggleLike, toggleSave } = useApp();
  const liked = likedPosts.includes(post.id);
  const saved = savedPosts.includes(post.id);

  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-card">
        <button className="modal-close" onClick={onClose}>
          <FiX size={16} />
        </button>

        <div className="modal-image-col">
          <Img src={post.image} alt={post.caption} className="modal-image" />
        </div>

        <div className="modal-content-col">
          <div className="modal-user">
            <img
              src={post.user.avatar}
              alt={post.user.name}
              className="modal-avatar"
              onError={e => e.target.style.display = 'none'}
            />
            <div>
              <div className="modal-username">{post.user.name}</div>
              <div className="modal-handle">@{post.user.username}</div>
            </div>
          </div>

          <p className="modal-caption">{post.caption}</p>

          <div className="modal-tags">
            {post.tags?.map(t => <span key={t} className="tag">#{t}</span>)}
          </div>

          <div className="modal-stats">
            <span><strong>{(post.likes + (liked ? 1 : 0)).toLocaleString()}</strong> likes</span>
            <span><strong>{post.comments}</strong> comments</span>
          </div>

          <div className="modal-actions">
            <button
              className={`post-btn like-btn ${liked ? 'liked' : ''}`}
              onClick={() => toggleLike(post.id)}
            >
              {liked ? <AiFillHeart size={18} /> : <FiHeart size={18} />}
              {liked ? 'Unlike' : 'Like'}
            </button>
            <button
              className={`post-btn save-btn ${saved ? 'saved' : ''}`}
              onClick={() => toggleSave(post.id)}
            >
              {saved ? <AiFillBook size={18} /> : <FiBookmark size={18} />}
              {saved ? 'Saved' : 'Save'}
            </button>
          </div>

          <div className="modal-category">
            <span className="cat-label">Category</span>
            <span className="cat-value">{post.category}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
