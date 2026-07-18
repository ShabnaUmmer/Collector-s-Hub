import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import Img from '../ui/Img';
import { FiHeart, FiMessageCircle, FiBookmark } from 'react-icons/fi';
import { AiFillHeart, AiFillBook } from 'react-icons/ai';
import './PostCard.css';

export default function PostCard({ post, onClick }) {
  const { likedPosts, savedPosts, toggleLike, toggleSave } = useApp();
  const liked = likedPosts.includes(post.id);
  const saved = savedPosts.includes(post.id);
  const [expanded, setExpanded] = useState(false);

  const caption = post.caption;
  const isLong = caption.length > 120;
  const displayCaption = isLong && !expanded ? caption.slice(0, 120) + '...' : caption;

  return (
    <div className="post-card">
      <div className="post-header">
        <div className="post-user">
          <img
            src={post.user.avatar}
            alt={post.user.name}
            className="post-avatar"
            onError={e => e.target.style.display = 'none'}
          />
          <div>
            <div className="post-username">{post.user.name}</div>
            <div className="post-meta-tag">{post.category}</div>
          </div>
        </div>
        <span className="post-time">{formatTime(post.postedAt)}</span>
      </div>

      <div className="post-image-wrap" onClick={onClick} style={{ cursor: 'pointer' }}>
        <Img src={post.image} alt={post.caption} className="post-image" />
      </div>

      <div className="post-body">
        <div className="post-actions">
          <button
            className={`post-btn like-btn ${liked ? 'liked' : ''}`}
            onClick={() => toggleLike(post.id)}
          >
            {liked ? <AiFillHeart size={20} /> : <FiHeart size={18} />}
            <span>{post.likes + (liked ? 1 : 0)}</span>
          </button>

          <button className="post-btn comment-btn" onClick={onClick}>
            <FiMessageCircle size={18} />
            <span>{post.comments}</span>
          </button>

          <button
            className={`post-btn save-btn ${saved ? 'saved' : ''}`}
            onClick={() => toggleSave(post.id)}
            style={{ marginLeft: 'auto' }}
          >
            {saved ? <AiFillBook size={18} /> : <FiBookmark size={18} />}
          </button>
        </div>

        <p className="post-caption">
          <strong>{post.user.username} </strong>
          {displayCaption}
          {isLong && (
            <button className="caption-toggle" onClick={() => setExpanded(e => !e)}>
              {expanded ? ' less' : ' more'}
            </button>
          )}
        </p>
      </div>
    </div>
  );
}

function formatTime(iso) {
  const d = new Date(iso);
  const diff = (Date.now() - d) / 1000;
  if (diff < 3600) return Math.floor(diff / 60) + 'm ago';
  if (diff < 86400) return Math.floor(diff / 3600) + 'h ago';
  return Math.floor(diff / 86400) + 'd ago';
}
