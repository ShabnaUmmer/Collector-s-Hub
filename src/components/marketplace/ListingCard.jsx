import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import Img from '../ui/Img';
import { FiPlusCircle, FiCheckCircle, FiHeart, FiMapPin } from 'react-icons/fi';
import './ListingCard.css';

const CONDITION_COLOR = {
  'Mint': '#16a34a',
  'Near Mint': '#65a30d',
  'Excellent': '#ca8a04',
  'Good': '#ea580c',
  'Fair': '#dc2626',
  'Poor': '#9f1239',
};

export default function ListingCard({ item }) {
  const { addToCollection, isInCollection } = useApp();
  const inOwned = isInCollection(item.id, 'owned');
  const inWishlist = isInCollection(item.id, 'wishlist');

  return (
    <div className="listing-card">
      <Link to={`/marketplace/${item.id}`} className="card-image-link">
        <Img src={item.image} alt={item.title} className="card-image" />
        <span className="card-category">{item.category}</span>
      </Link>

      <div className="card-body">
        <Link to={`/marketplace/${item.id}`} className="card-title">
          {item.title}
        </Link>

        <div className="card-meta">
          <span className="condition-dot" style={{ background: CONDITION_COLOR[item.condition] || '#888' }} />
          <span className="condition-text">{item.condition}</span>
          <span className="card-sep">·</span>
          <FiMapPin size={11} />
          <span className="card-location">{item.location}</span>
        </div>

        <div className="card-footer">
          <span className="card-price">${item.price.toLocaleString()}</span>
          <div className="card-actions">
            <button
              className={`action-btn ${inOwned ? 'active' : ''}`}
              onClick={() => addToCollection(item, 'owned')}
              title="Add to Collection"
            >
              {inOwned
                ? <FiCheckCircle size={13} />
                : <FiPlusCircle size={13} />
              }
              Own
            </button>
            <button
              className={`action-btn wishlist-btn ${inWishlist ? 'active' : ''}`}
              onClick={() => addToCollection(item, 'wishlist')}
              title="Add to Wishlist"
            >
              <FiHeart size={14} />
            </button>
          </div>
        </div>

        <div className="card-seller">by {item.seller}</div>
      </div>
    </div>
  );
}
