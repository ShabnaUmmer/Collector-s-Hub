import { useParams, Link } from 'react-router-dom';
import { marketplaceListings } from '../data/marketplace';
import { useApp } from '../context/AppContext';
import Img from '../components/ui/Img';
import EmptyState from '../components/ui/EmptyState';
import {
  FiArrowLeft, FiMapPin, FiEye, FiCalendar,
  FiPlusCircle, FiCheckCircle, FiHeart, FiTag
} from 'react-icons/fi';
import { AiFillHeart } from 'react-icons/ai';
import './ListingDetail.css';

const CONDITION_COLOR = {
  'Mint': '#16a34a',
  'Near Mint': '#65a30d',
  'Excellent': '#ca8a04',
  'Good': '#ea580c',
  'Fair': '#dc2626',
  'Poor': '#9f1239',
};

export default function ListingDetail() {
  const { id } = useParams();
  const item = marketplaceListings.find(m => m.id === id);
  const { addToCollection, isInCollection } = useApp();

  if (!item) return (
    <div className="page-container">
      <EmptyState
        title="Listing not found"
        description="This listing may have been removed."
        action={<Link to="/marketplace" className="btn-primary">Back to Marketplace</Link>}
      />
    </div>
  );

  const inOwned = isInCollection(item.id, 'owned');
  const inWishlist = isInCollection(item.id, 'wishlist');
  const inSelling = isInCollection(item.id, 'selling');

  return (
    <div className="page-container">
      <Link to="/marketplace" className="back-link">
        <FiArrowLeft size={16} />
        Back to Marketplace
      </Link>

      <div className="detail-grid">
        <div className="detail-image-col">
          <div className="detail-image-wrap">
            <Img src={item.image} alt={item.title} className="detail-image" />
          </div>
        </div>

        <div className="detail-info-col">
          <span className="detail-category">{item.category}</span>
          <h1 className="detail-title">{item.title}</h1>

          <div className="detail-condition">
            <span className="condition-dot" style={{ background: CONDITION_COLOR[item.condition] || '#888' }} />
            {item.condition}
          </div>

          <div className="detail-price">${item.price.toLocaleString()}</div>

          <div className="detail-seller-info">
            <span className="seller-label">Seller</span>
            <span className="seller-name">{item.seller}</span>
            <span className="separator">·</span>
            <FiMapPin size={13} />
            <span className="seller-location">{item.location}</span>
          </div>

          <p className="detail-description">{item.description}</p>

          <div className="detail-stats">
            <div className="stat">
              <FiEye size={15} className="stat-icon" />
              <span className="stat-value">{item.views.toLocaleString()}</span>
              <span className="stat-label">views</span>
            </div>
            <div className="stat">
              <FiCalendar size={15} className="stat-icon" />
              <span className="stat-value">
                {new Date(item.listedAt).toLocaleDateString('en-US', {
                  month: 'short', day: 'numeric', year: 'numeric'
                })}
              </span>
              <span className="stat-label">listed</span>
            </div>
          </div>

          <div className="detail-actions">
            <button
              className={`btn-primary full-width ${inOwned ? 'btn-active' : ''}`}
              onClick={() => addToCollection(item, 'owned')}
            >
              {inOwned ? <FiCheckCircle size={16} /> : <FiPlusCircle size={16} />}
              {inOwned ? 'In Collection' : 'Add to Collection'}
            </button>

            <button
              className={`btn-secondary full-width ${inWishlist ? 'btn-active-secondary' : ''}`}
              onClick={() => addToCollection(item, 'wishlist')}
            >
              {inWishlist ? <AiFillHeart size={16} /> : <FiHeart size={16} />}
              {inWishlist ? 'Wishlisted' : 'Add to Wishlist'}
            </button>

            <button
              className={`btn-ghost full-width ${inSelling ? 'btn-active-ghost' : ''}`}
              onClick={() => addToCollection(item, 'selling')}
            >
              <FiTag size={16} />
              {inSelling ? 'In Selling List' : 'List for Selling'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
